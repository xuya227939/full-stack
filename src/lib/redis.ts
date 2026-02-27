import Redis from "ioredis";

let redis: Redis | null = null;

/**
 * 获取 Redis 连接实例（单例模式）
 */
export function getRedis(): Redis {
  if (redis) {
    return redis;
  }

  const redisHost = process.env.REDIS_HOST || "localhost";
  const redisPort = parseInt(process.env.REDIS_PORT || "6379", 10);
  const redisPassword = process.env.REDIS_PASSWORD || undefined;

  redis = new Redis({
    host: redisHost,
    port: redisPort,
    password: redisPassword,
    maxRetriesPerRequest: 3,
    retryStrategy: (times) => {
      const delay = Math.min(times * 50, 2000);
      return delay;
    },
    reconnectOnError: (err) => {
      const targetError = "READONLY";
      if (err.message.includes(targetError)) {
        return true;
      }
      return false;
    },
  });

  redis.on("error", (err) => {
    console.error("Redis connection error:", err);
  });

  redis.on("connect", () => {
    console.log("Redis connected successfully");
  });

  return redis;
}

/**
 * 关闭 Redis 连接
 */
export function closeRedis(): void {
  if (redis) {
    redis.disconnect();
    redis = null;
  }
}
