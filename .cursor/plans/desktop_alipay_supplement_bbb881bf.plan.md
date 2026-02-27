---
name: Desktop Alipay Supplement
overview: 在现有 snapvee_desktop_app_a668cd02.plan.md 中补充支付宝支付激活的完整方案，涉及数据库字段、API 路由、支付流程、定价页面设计和开发阶段描述共 5 处修改。
todos:
  - id: edit-5.3-db
    content: "修改 5.3 数据库设计: 补充 snapvee_desktop_orders 表的支付宝相关字段"
    status: pending
  - id: edit-5.4-api
    content: "修改 5.4 API 列表: 追加支付宝两个路由 (alipay + alipay/notify)"
    status: pending
  - id: add-5.7-flow
    content: "新增 5.7 节: 桌面端支付流程详细设计 (Stripe + 支付宝双通道)"
    status: pending
  - id: edit-5.6-ui
    content: "扩充 5.6 定价页面: 补充支付方式选择 UI 和交互描述"
    status: pending
  - id: edit-phases
    content: "更新 Phase 2 / Phase 4 描述和 todo: 加入支付宝相关内容"
    status: pending
isProject: false
---

# 补充桌面端支付宝支付激活方案

以下所有修改均写入 [.cursor/plans/snapvee_desktop_app_a668cd02.plan.md](.cursor/plans/snapvee_desktop_app_a668cd02.plan.md)。

---

## 修改 1: 5.3 数据库设计 -- 补充 `snapvee_desktop_orders` 字段

在现有 `snapvee_desktop_orders` 表定义中补充支付宝所需字段，与 Web 端 `snapvee_orders` 保持对齐：

```sql
CREATE TABLE snapvee_desktop_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  device_id VARCHAR(64) NOT NULL,
  order_no VARCHAR(64) UNIQUE,                     -- 内部订单号 (支付宝必须)
  stripe_session_id VARCHAR(255),
  stripe_payment_intent_id VARCHAR(255),
  plan VARCHAR(20) NOT NULL,                       -- 对应 Web 端定价
  amount INTEGER NOT NULL,                         -- 金额 (USD 分)
  currency VARCHAR(3) NOT NULL DEFAULT 'usd',
  amount_cny NUMERIC(10,2),                        -- 支付宝人民币金额
  payment_method VARCHAR(20) NOT NULL DEFAULT 'card', -- card / alipay
  status VARCHAR(20) NOT NULL DEFAULT 'pending',   -- pending / paid / cancelled
  is_early_bird BOOLEAN DEFAULT FALSE,             -- 是否早鸟价
  paid_at TIMESTAMPTZ,                             -- 支付完成时间
  payment_timeout_at TIMESTAMPTZ,                  -- 支付超时时间 (30 分钟)
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

新增字段：`order_no`, `amount_cny`, `payment_method`, `is_early_bird`, `paid_at`, `payment_timeout_at`, `updated_at`

---

## 修改 2: 5.4 服务端新增 API -- 补充支付宝路由

在现有 API 列表后面追加两个支付宝路由：

```
POST /api/desktop/purchase/alipay
  -> 创建支付宝桌面端激活订单
  -> body: { device_id }
  -> 检查早鸟名额 -> 计算 CNY 金额
  -> 调用 alipay-sdk pageExec('alipay.trade.page.pay')
  -> 返回: { form: string (HTML 表单), order_no: string }
  -> notify_url 指向 /api/desktop/purchase/alipay/notify
  -> return_url 指向桌面端定价页 ?success=true

POST /api/desktop/purchase/alipay/notify
  -> 支付宝异步通知回调 (POST application/x-www-form-urlencoded)
  -> 验签: alipaySdk.checkNotifySign(params)
  -> trade_status === TRADE_SUCCESS / TRADE_FINISHED 时:
     1. 查 snapvee_desktop_orders (by order_no)
     2. 更新订单 status = 'paid'
     3. 更新 snapvee_desktop_devices.license_status = 'active'
     4. 同步更新 Web 端用户等级 (snapvee_users.user_level)
     5. 如果 is_early_bird → 递增 early_bird_config.sold_count
     6. 发收据邮件
  -> 返回 "success"
```

---

## 修改 3: 新增 5.7 节 -- 桌面端支付流程详细设计

在 5.6 之后、第六节之前插入新的 5.7 节：

### 5.7 桌面端支付流程 (Stripe + 支付宝)

**定价配置 (复用 Web 端 `src/lib/stripe.ts`)**

- 桌面端激活价格与 Web 端 Early Bird 一致: $29.99 (早鸟) / $39.99 (常规)
- 支付宝 CNY 价格: 208 元 (可通过 `DESKTOP_ALIPAY_PRICE_CNY` 环境变量覆盖)
- 一次性付费，永久激活设备

**Stripe (银行卡) 流程**

```
桌面端 PricingPage -> 点击"银行卡支付"
  -> POST /api/desktop/purchase/checkout { deviceId, useEarlyBird }
  -> 服务端创建 Stripe Checkout Session (mode: 'payment', payment_method_types: ['card'])
  -> 返回 checkout URL -> shell.openExternal(url) 打开系统浏览器
  -> 用户完成支付 -> Stripe Webhook -> /api/desktop/purchase/webhook
  -> 更新 desktop_orders.status = 'paid'
  -> 更新 desktop_devices.license_status = 'active'
  -> 桌面端轮询 /api/desktop/device/status 确认激活
```

**支付宝流程**

```
桌面端 PricingPage -> 点击"支付宝支付"
  -> POST /api/desktop/purchase/alipay { device_id }
  -> 服务端创建桌面端订单 (snapvee_desktop_orders)
  -> 调用 alipay-sdk 生成 page.pay 表单 HTML
  -> 返回 { form, order_no }
  -> shell.openExternal 或 BrowserWindow 打开支付宝收银台
  -> 用户扫码/登录支付 -> 支付宝异步通知 /api/desktop/purchase/alipay/notify
  -> 验签 + 激活设备 + 同步用户等级 + 发收据邮件
  -> 桌面端轮询 /api/desktop/device/status 确认激活
```

**支付宝实现要点 (参考 Web 端 `/api/payment/alipay`)**

- SDK 初始化: 复用 `alipay-sdk`，使用相同 `ALIPAY_APP_ID` / `ALIPAY_PRIVATE_KEY` / `ALIPAY_PUBLIC_KEY` 环境变量
- 商品描述: `subject: "SnapVee Desktop - 设备激活"`
- 超时: `timeout_express: '30m'`
- 订单号前缀: `SNVD` (区分 Web 端 `SNV`)
- 激活逻辑: 新增 `src/lib/desktop-orders.ts`，提供 `createDesktopAlipayOrder()` / `updateDesktopOrderStatus()` / `activateDesktopLicense()` 三个函数
- 激活时同时更新 `snapvee_desktop_devices.license_status` 和 `snapvee_users.user_level`

**支付宝环境变量 (复用现有)**

```
ALIPAY_APP_ID=...          # 已有
ALIPAY_PRIVATE_KEY=...     # 已有
ALIPAY_PUBLIC_KEY=...      # 已有
ALIPAY_GATEWAY=...         # 已有
DESKTOP_ALIPAY_PRICE_CNY=208  # 新增: 桌面端支付宝人民币价格
```

---

## 修改 4: 5.6 桌面端定价页面 -- 扩充描述

将 5.6 从简单的 4 个要点扩充为包含支付方式选择的完整 UI 描述：

### 5.6 桌面端定价页面 (与 Web 端不同)

桌面端定价页面强调:

- **一个账号 = 一台设备**，激活后绑定
- 定价金额与 Web 端一致
- 不显示"批量下载"等 Web 端特有功能
- 突出桌面端优势: 本地下载、无速度限制、使用自己的 Cookie、无服务器排队

**支付方式 (双按钮，与 Web 端 Early Bird 卡片一致)**

- **银行卡支付** (Stripe) -- 紫色主按钮
- **支付宝支付** -- 蓝色次按钮
- 支付成功后轮询 `/api/desktop/device/status` 并自动刷新页面状态
- 支付宝返回页显示 toast "支付成功！设备已激活"

**PricingPage.tsx (桌面端 Renderer)**

```
┌─────────────────────────────────────┐
│  SnapVee Desktop 定价               │
│                                     │
│  ┌─────────────────────────────┐    │
│  │  ⭐ 设备激活                 │    │
│  │  $29.99  ~~$39.99~~  早鸟价  │    │
│  │  仅剩 xxx 个名额            │    │
│  │                             │    │
│  │  ✓ 永久激活本设备            │    │
│  │  ✓ 本地高速下载 无速度限制   │    │
│  │  ✓ 使用自己的浏览器 Cookie   │    │
│  │  ✓ 4K 不限、≤2 小时         │    │
│  │  ✓ 同步 Web 端 Pro 权益     │    │
│  │                             │    │
│  │  [====== 银行卡支付 ======]  │    │
│  │  [====== 支付宝支付 ======]  │    │
│  └─────────────────────────────┘    │
│                                     │
│  ⚠ 一个账号只能激活一台设备         │
│  ⚠ 激活后绑定当前设备不可转移       │
└─────────────────────────────────────┘
```

---

## 修改 5: 开发阶段描述 -- 更新 Phase 2 和 Phase 4

**Phase 2** Web 端新增 API 部分追加：

- `/api/desktop/purchase/alipay` (创建支付宝订单)
- `/api/desktop/purchase/alipay/notify` (支付宝异步通知)
- `src/lib/desktop-orders.ts` (桌面端订单管理)
- 环境变量: `DESKTOP_ALIPAY_PRICE_CNY`

**Phase 4** 桌面端定价页部分修改为：

- 桌面端定价页 (一账号一设备、Stripe + 支付宝 双支付方式激活)

**Phase 4 todo** 描述更新：

```
"Phase 4: UI 移植 + 专属页面 -- 下载/任务/设置页面、桌面端定价页(一账号一设备、Stripe+支付宝)、移除 Next.js 依赖"
```
