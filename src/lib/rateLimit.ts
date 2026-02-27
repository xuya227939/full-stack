import { getRedis } from "@/lib/redis";

/**
 * Rate Limiting 配置
 */
export interface RateLimitConfig {
  /** 时间窗口（秒） */
  windowSeconds: number;
  /** 窗口内最大请求数 */
  maxRequests: number;
  /** 标识符前缀（用于区分不同的限流规则） */
  keyPrefix: string;
}

/**
 * Rate Limiting 检查结果
 */
export interface RateLimitResult {
  /** 是否允许请求 */
  allowed: boolean;
  /** 当前窗口内的请求次数 */
  current: number;
  /** 剩余可用请求次数 */
  remaining: number;
  /** 重置时间（Unix 时间戳，秒） */
  resetAt: number;
  /** 距离重置的秒数 */
  retryAfter: number;
}

/**
 * 预定义的速率限制配置
 */
export const RATE_LIMIT_CONFIGS = {
  /** 下载接口：每用户每分钟 5 次 */
  DOWNLOAD: {
    windowSeconds: 60,
    maxRequests: 5,
    keyPrefix: "ratelimit:download",
  } as RateLimitConfig,

  /** 元数据接口：每用户每分钟 10 次 */
  METADATA: {
    windowSeconds: 60,
    maxRequests: 10,
    keyPrefix: "ratelimit:metadata",
  } as RateLimitConfig,

  /** 严格限制：每用户每分钟 3 次 */
  STRICT: {
    windowSeconds: 60,
    maxRequests: 3,
    keyPrefix: "ratelimit:strict",
  } as RateLimitConfig,
};

/**
 * 检查速率限制（基于 Redis）
 * 使用滑动窗口算法（简化版：固定窗口 + INCR）
 *
 * @param identifier - 唯一标识符（通常是用户 ID 或 IP 地址）
 * @param config - 速率限制配置
 * @returns 速率限制检查结果
 */
export async function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): Promise<RateLimitResult> {
  const redis = getRedis();
  const now = Math.floor(Date.now() / 1000);

  // 使用时间窗口作为 key 的一部分，实现固定窗口算法
  const windowStart = Math.floor(now / config.windowSeconds) * config.windowSeconds;
  const key = `${config.keyPrefix}:${identifier}:${windowStart}`;

  try {
    // 使用 Redis 事务保证原子性
    const pipeline = redis.pipeline();
    pipeline.incr(key);
    pipeline.expire(key, config.windowSeconds + 1); // 额外 1 秒缓冲

    const results = await pipeline.exec();

    if (!results || results.length === 0) {
      // Redis 错误，默认允许（降级处理）
      console.error("[RateLimit] Redis pipeline failed, allowing request");
      return {
        allowed: true,
        current: 0,
        remaining: config.maxRequests,
        resetAt: windowStart + config.windowSeconds,
        retryAfter: 0,
      };
    }

    const [incrError, currentCount] = results[0] as [Error | null, number];

    if (incrError) {
      console.error("[RateLimit] Redis INCR error:", incrError);
      // 降级处理：允许请求
      return {
        allowed: true,
        current: 0,
        remaining: config.maxRequests,
        resetAt: windowStart + config.windowSeconds,
        retryAfter: 0,
      };
    }

    const current = currentCount || 1;
    const allowed = current <= config.maxRequests;
    const remaining = Math.max(0, config.maxRequests - current);
    const resetAt = windowStart + config.windowSeconds;
    const retryAfter = allowed ? 0 : resetAt - now;

    return {
      allowed,
      current,
      remaining,
      resetAt,
      retryAfter,
    };
  } catch (error) {
    console.error("[RateLimit] Error checking rate limit:", error);
    // 降级处理：允许请求
    return {
      allowed: true,
      current: 0,
      remaining: config.maxRequests,
      resetAt: now + config.windowSeconds,
      retryAfter: 0,
    };
  }
}

/**
 * 获取客户端 IP 地址
 * 支持 Cloudflare、Vercel 等代理环境
 *
 * @param request - Next.js 请求对象
 * @returns IP 地址
 */
export function getClientIP(request: Request): string {
  // Cloudflare
  const cfConnectingIP = request.headers.get("cf-connecting-ip");
  if (cfConnectingIP) return cfConnectingIP;

  // Vercel
  const xForwardedFor = request.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    // x-forwarded-for 可能包含多个 IP，取第一个
    return xForwardedFor.split(",")[0].trim();
  }

  // X-Real-IP (Nginx)
  const xRealIP = request.headers.get("x-real-ip");
  if (xRealIP) return xRealIP;

  // 默认
  return "unknown";
}

/**
 * 创建速率限制响应头
 *
 * @param result - 速率限制检查结果
 * @param config - 速率限制配置
 * @returns 响应头对象
 */
export function createRateLimitHeaders(
  result: RateLimitResult,
  config: RateLimitConfig
): Record<string, string> {
  return {
    "X-RateLimit-Limit": config.maxRequests.toString(),
    "X-RateLimit-Remaining": result.remaining.toString(),
    "X-RateLimit-Reset": result.resetAt.toString(),
    ...(result.retryAfter > 0 && {
      "Retry-After": result.retryAfter.toString(),
    }),
  };
}
