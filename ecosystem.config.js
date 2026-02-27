module.exports = {
  apps: [
    {
      name: "worker-1",
      script: "npm",
      args: "run worker",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "3G",
      node_args: "--max-old-space-size=2048",
      error_file: "./logs/pm2-worker-1-error.log",
      out_file: "./logs/pm2-worker-1-out.log",
      log_file: "./logs/pm2-worker-1-combined.log",
      time: true,
      merge_logs: true,
      env_test: {
        NODE_ENV: "test",
        APP_ENV: "test",
      },
      env_production: {
        NODE_ENV: "production",
        APP_ENV: "production",
      },
    },
  ],
};
