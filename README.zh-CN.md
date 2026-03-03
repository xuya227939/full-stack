# full-stack 食用指南

Language: [English](./README.md) | **中文**

一个基于 Next.js 16 + React 19 的全栈项目，包含：

- Web 前端与 API 路由
- 用户认证与 Supabase 数据访问
- Stripe / 支付宝支付链路
- 邮件发送（Resend）
- 任务清理脚本

## 网站案例

**[SnapVee](https://snapvee.com)** — 通用社媒内容 AI 解析器。从 YouTube、TikTok、Instagram 等 50+ 平台提取、下载并转换内容，具备企业级精度。

![SnapVee 首页](images/case_1.png)

**[SkillHub](https://skillforge.cc/)** — Claude Skills 与 GPT Skills 市场。发现精选优质技能模板，从写作到编程，一站式提升工作效率。

![SkillHub 首页](images/case_2.png)

**[出海挣美金](https://course.jchencode.com/)** — 从零打造被动收入英文网站的实战课程。系统化学习路径，涵盖 SEO、变现与 AI 内容生产。

![出海挣美金 课程](images/case_3.png)

**[Meshivo 3D](https://meshivo.com/)** — AI 驱动的 3D 建模平台。将文字描述转化为高质量 3D 模型，支持智能材质、一键优化及多格式导出，适用于游戏资产、产品展示与 3D 打印。

![Meshivo 3D 首页](images/case_4.png)

## 1. 运行环境

- Node.js `>= 20.9`
- Bun `>= 1.2.x`（推荐，项目有 `bun.lock`）
- 可访问的 Supabase / Redis / 支付渠道（按你启用的功能决定）

## 2. 快速开始（本地开发）

```bash
# 1) 安装依赖
bun install

# 2) 准备环境变量
cp .env.example .env.local

# 3) 启动开发服务（默认 webpack，稳定）
bun run dev
```

启动后访问：

- `http://localhost:3000`

## 3. 必备环境变量（建议先补齐）

最少建议先配置这些，不然很多接口会报错或降级：

```env
# Auth
NEXTAUTH_SECRET=replace_me

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
SUPABASE_PUBLISHABLE_DEFAULT_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx

# 本地回调基址（支付回调会用到）
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
```

按需再补：

- Stripe：`STRIPE_SECRET_KEY`、`STRIPE_WEBHOOK_SECRET`、`STRIPE_PRICE_ID_*`
- 支付宝：`ALIPAY_*`
- 邮件：`RESEND_API_KEY`、`SMTP_USER`、`SMTP_HOST`
- Redis：`REDIS_HOST`、`REDIS_PORT`、`REDIS_PASSWORD`
- R2：`CLOUDFLARE_R2_*`

## 4. 常用命令

```bash
# 开发（推荐）
bun run dev

# 开发（Turbopack）
bun run dev:turbopack

# 代码检查
bun run lint

# 构建 / 启动
bun run build
bun run start

# 测试环境构建与启动（会读取 .env.test）
bun run build:test
bun run start:test

# 生产环境构建与启动（会读取 .env.production）
bun run build:prod
bun run start:prod
```

## 5. 环境变量加载规则

`scripts/load-env.js` 中的加载顺序如下（后加载优先）：

- 开发环境：`.env.local` -> `.env.development` -> `.env`
- 测试环境：`.env.test` -> `.env`
- 生产环境：`.env.production` -> `.env`

另外：

- 系统环境变量优先级最高（不会被 `.env*` 覆盖）
- 若未显式设置，会补默认：`NODE_ENV`、`APP_ENV`

## 6. 目录速览

- `src/app`：页面与 API 路由
- `src/components`：UI 与业务组件
- `src/lib`：鉴权、支付、邮件、存储等基础能力
- `scripts`：环境启动脚本、清理脚本
- `supabase`：Supabase 相关配置

## 7. 常见问题排查

1. `localhost` 打开后报 500：先检查 Supabase / 支付相关环境变量是否缺失。
2. `Module not found` / 启动异常：执行 `rm -rf .next && bun install && bun run dev`。
3. 3000 端口被占用：Next 会自动切到其它端口，或先释放 3000 再启动。

## 8. 当前仓库注意事项

`package.json` 里有 worker 相关脚本（如 `worker`、`worker:convert`），但当前仓库中对应 `scripts/start-*.ts` 文件可能不存在。  
如果要启用 worker，请先补齐对应脚本或同步完整 worker 代码。
