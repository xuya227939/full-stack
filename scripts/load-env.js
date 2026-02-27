#!/usr/bin/env node

/**
 * 统一的环境变量加载工具
 * 所有服务（Next.js API、Worker）都使用此工具加载环境变量
 */

const dotenv = require("dotenv");
const { resolve } = require("path");
const { existsSync } = require("fs");

/**
 * 统一的环境变量加载函数
 * @param {string} env - 环境名称: 'test' | 'production' | 'development'
 * @param {boolean} verbose - 是否打印详细信息
 */
function loadEnv(env = "development", verbose = true) {
  const envFiles = [];

  // 根据环境确定加载顺序
  // 后面的文件会覆盖前面的（如果存在相同的变量）
  if (env === "test") {
    envFiles.push(".env.test", ".env");
  } else if (env === "production") {
    envFiles.push(".env.production", ".env");
  } else {
    envFiles.push(".env.local", ".env.development", ".env");
  }

  let loaded = false;

  // 按顺序加载，后面的会覆盖前面的
  // 注意：使用 override: false 确保系统环境变量优先级最高
  for (const envFile of envFiles) {
    const envPath = resolve(process.cwd(), envFile);
    if (existsSync(envPath)) {
      if (verbose) {
        console.log(`📄 Loading ${envFile}...`);
      }
      // 使用 override: false 确保已存在的环境变量不会被覆盖
      // 这样可以支持通过系统环境变量或 PM2 设置的环境变量
      dotenv.config({ path: envPath, override: false });
      loaded = true;
    }
  }

  // 设置 NODE_ENV 和 APP_ENV（如果未设置）
  if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = env === "production" ? "production" : env;
  }
  if (!process.env.APP_ENV) {
    process.env.APP_ENV = env;
  }

  if (verbose && !loaded) {
    console.warn(
      "⚠️  No .env file found, using system environment variables only",
    );
  }

  return loaded;
}

/**
 * 打印环境变量配置（不打印敏感信息）
 */
function printEnvConfig() {
  console.log("🔧 Environment configuration:");
  console.log(`   NODE_ENV: ${process.env.NODE_ENV || "not set"}`);
  console.log(`   APP_ENV: ${process.env.APP_ENV || "not set"}`);
  console.log(`   REDIS_HOST: ${process.env.REDIS_HOST || "not set"}`);
  console.log(`   REDIS_PORT: ${process.env.REDIS_PORT || "not set"}`);
  console.log(
    `   REDIS_PASSWORD: ${process.env.REDIS_PASSWORD ? "***" : "not set"}`,
  );
  console.log(
    `   SUPABASE_URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL ? "set" : "not set"}`,
  );
  console.log(
    `   SUPABASE_KEY: ${process.env.SUPABASE_SERVICE_ROLE_KEY ? "set" : "not set"}`,
  );
  console.log(
    `   R2_CDN_URL: ${process.env.CLOUDFLARE_R2_PUBLIC_BASE_URL || "not set"}`,
  );
  console.log(
    `   R2_BUCKET: ${process.env.CLOUDFLARE_R2_BUCKET_NAME || "not set"}`,
  );
  console.log(
    `   R2_ENDPOINT: ${process.env.CLOUDFLARE_R2_ENDPOINT ? "set" : "not set"}`,
  );
  console.log(
    `   R2_ACCESS_KEY: ${process.env.CLOUDFLARE_R2_ACCESS_KEY_ID ? "set" : "not set"}`,
  );
  console.log(
    `   R2_SECRET_KEY: ${process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY ? "set" : "not set"}`,
  );
}

// 如果直接运行此脚本，从命令行参数获取环境
if (require.main === module) {
  const env = process.argv[2] || process.env.NODE_ENV || "development";
  loadEnv(env);
  printEnvConfig();
}

module.exports = { loadEnv, printEnvConfig };
