-- ============================================
-- SnapVee 数据库初始化脚本
-- ============================================

-- 用户表（扩展 auth.users）
CREATE TABLE IF NOT EXISTS public.snapvee_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  username TEXT UNIQUE,
  user_level INTEGER DEFAULT 0, -- 0=免费, 1=基础, 2=pro
  trial_count INTEGER DEFAULT 0,
  trial_limit INTEGER DEFAULT 5,
  subscription_status TEXT DEFAULT 'trial', -- trial, active, expired
  subscription_expires_at TIMESTAMPTZ,
  stripe_customer_id TEXT,
  is_early_bird BOOLEAN DEFAULT FALSE, -- 是否为早鸟用户
  early_bird_number INTEGER DEFAULT NULL, -- 早鸟用户编号
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

