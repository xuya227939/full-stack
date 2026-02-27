#!/usr/bin/env node

/**
 * 测试环境启动脚本
 * 在启动 Next.js 之前加载 .env.test 文件
 */

const { spawn } = require("child_process");
const { loadEnv, printEnvConfig } = require("./load-env");

// 加载测试环境变量
loadEnv("test", true);
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
