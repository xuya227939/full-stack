#!/usr/bin/env node

/**
 * 统一的环境启动脚本
 * 根据 APP_ENV 或 NODE_ENV 自动选择加载对应的 .env 文件
 */

const { spawn } = require("child_process");
const { loadEnv, printEnvConfig } = require("./load-env");

// 从环境变量获取环境类型，优先级：APP_ENV > NODE_ENV > 默认 test
const env = process.env.APP_ENV || process.env.NODE_ENV || "test";

// 加载对应环境的环境变量
loadEnv(env, true);
printEnvConfig();

// 启动 Next.js - 使用 npx 确保能找到 next 命令
const nextProcess = spawn("npx", ["next", "start"], {
  stdio: "inherit",
  env: process.env,
  shell: false, // npx 不需要 shell
});

nextProcess.on("error", (error) => {
  console.error("❌ Failed to start Next.js:", error);
  process.exit(1);
});

nextProcess.on("exit", (code) => {
  process.exit(code || 0);
});
