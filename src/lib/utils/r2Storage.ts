/**
 * Cloudflare R2 存储工具
 *
 * 用于将下载的文件上传到 R2，通过 CDN 分发给用户
 *
 * 环境变量配置（使用现有的 Cloudflare R2 配置）：
 * - CLOUDFLARE_R2_ENDPOINT: R2 端点 URL
 * - CLOUDFLARE_R2_ACCESS_KEY_ID: R2 访问密钥 ID
 * - CLOUDFLARE_R2_SECRET_ACCESS_KEY: R2 访问密钥
 * - CLOUDFLARE_R2_BUCKET_NAME: R2 存储桶名称
 * - CLOUDFLARE_R2_PREFIX: R2 存储前缀（如 snapvee）
 * - CLOUDFLARE_R2_PUBLIC_BASE_URL: CDN 域名
 */

import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  HeadObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import * as fs from "fs";
import * as path from "path";

// R2 配置（使用现有的环境变量）
const R2_CONFIG = {
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT || "",
  accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || "",
  secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || "",
  bucketName: process.env.CLOUDFLARE_R2_BUCKET_NAME || "snapvee",
  prefix: process.env.CLOUDFLARE_R2_PREFIX || "",
  cdnUrl: process.env.CLOUDFLARE_R2_PUBLIC_BASE_URL || "",
};

// R2 客户端（延迟初始化）
let r2Client: S3Client | null = null;

/**
 * 检查 R2 是否配置
 */
export function isR2Configured(): boolean {
  return !!(
    R2_CONFIG.endpoint &&
    R2_CONFIG.accessKeyId &&
    R2_CONFIG.secretAccessKey &&
    R2_CONFIG.bucketName &&
    R2_CONFIG.cdnUrl
  );
}

/**
 * 获取 R2 客户端
 */
function getR2Client(): S3Client {
  if (!r2Client) {
    if (!isR2Configured()) {
      throw new Error(
        "R2 storage is not configured. Please set R2_* environment variables.",
      );
    }

    r2Client = new S3Client({
      region: "auto",
      endpoint: R2_CONFIG.endpoint,
      credentials: {
        accessKeyId: R2_CONFIG.accessKeyId,
        secretAccessKey: R2_CONFIG.secretAccessKey,
      },
    });
  }
  return r2Client;
}

/**
 * 根据文件扩展名获取 Content-Type
 */
function getContentType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes: Record<string, string> = {
    // 视频
    ".mp4": "video/mp4",
    ".webm": "video/webm",
    ".mkv": "video/x-matroska",
    ".mov": "video/quicktime",
    ".flv": "video/x-flv",
    // 音频
    ".m4a": "audio/mp4",
    ".mp3": "audio/mpeg",
    ".ogg": "audio/ogg",
    ".opus": "audio/opus",
    ".wav": "audio/wav",
    // 图片
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".webp": "image/webp",
  };
  return mimeTypes[ext] || "application/octet-stream";
}

/**
 * 上传文件到 R2
 *
 * @param filePath - 本地文件路径
 * @param key - R2 存储键（如 "userId/taskId/filename.mp4"）
 * @returns CDN URL
 */
export async function uploadToR2(
  filePath: string,
  key: string,
): Promise<string> {
  const client = getR2Client();

  // 检查文件是否存在
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const contentType = getContentType(filePath);
  const fileSize = fs.statSync(filePath).size;

  console.log(
    `📤 Uploading to R2: ${key} (${(fileSize / 1024 / 1024).toFixed(2)} MB, ${contentType})`,
  );

  try {
    // 使用流式上传，避免大文件占用过多内存
    // 对于小文件（<100MB）使用 readFileSync，大文件使用 stream
    const STREAM_THRESHOLD = 100 * 1024 * 1024; // 100MB

    if (fileSize < STREAM_THRESHOLD) {
      // 小文件：直接读入内存上传
      const fileBuffer = fs.readFileSync(filePath);
      await client.send(
        new PutObjectCommand({
          Bucket: R2_CONFIG.bucketName,
          Key: key,
          Body: fileBuffer,
          ContentType: contentType,
          ContentLength: fileSize,
          CacheControl: "public, max-age=86400",
        }),
      );
    } else {
      // 大文件：使用流式上传，避免内存溢出
      console.log(
        `📤 Using stream upload for large file (${(fileSize / 1024 / 1024).toFixed(2)} MB)`,
      );
      const fileStream = fs.createReadStream(filePath);
      await client.send(
        new PutObjectCommand({
          Bucket: R2_CONFIG.bucketName,
          Key: key,
          Body: fileStream,
          ContentType: contentType,
          ContentLength: fileSize,
          CacheControl: "public, max-age=86400",
        }),
      );
    }

    const cdnUrl = `${R2_CONFIG.cdnUrl}/${key}`;
    console.log(`✅ Uploaded to R2: ${cdnUrl}`);

    return cdnUrl;
  } catch (error: any) {
    console.error(`❌ R2 upload failed:`, error.message);
    throw new Error(`Failed to upload to R2: ${error.message}`);
  }
}

/**
 * 从 R2 删除文件
 *
 * @param key - R2 存储键
 */
export async function deleteFromR2(key: string): Promise<void> {
  const client = getR2Client();

  try {
    await client.send(
      new DeleteObjectCommand({
        Bucket: R2_CONFIG.bucketName,
        Key: key,
      }),
    );
    console.log(`🗑️ Deleted from R2: ${key}`);
  } catch (error: any) {
    console.error(`❌ R2 delete failed:`, error.message);
    // 删除失败不抛出异常，因为文件可能已被 Lifecycle 自动删除
  }
}

/**
 * 检查文件是否存在于 R2
 *
 * @param key - R2 存储键
 * @returns 是否存在
 */
export async function existsInR2(key: string): Promise<boolean> {
  const client = getR2Client();

  try {
    await client.send(
      new HeadObjectCommand({
        Bucket: R2_CONFIG.bucketName,
        Key: key,
      }),
    );
    return true;
  } catch (error: any) {
    if (error.name === "NotFound" || error.$metadata?.httpStatusCode === 404) {
      return false;
    }
    throw error;
  }
}

/**
 * 生成 R2 存储键
 *
 * @param userId - 用户 ID
 * @param filename - 文件名
 * @returns R2 存储键
 */
export function generateR2Key(userId: string, filename: string): string {
  // 格式：prefix/userId/filename 或 userId/filename（无 prefix）
  // 简化路径，去掉 taskId 层级
  const basePath = `${userId}/${filename}`;
  return R2_CONFIG.prefix ? `${R2_CONFIG.prefix}/${basePath}` : basePath;
}

/**
 * 从 CDN URL 提取 R2 Key
 *
 * @param cdnUrl - CDN URL
 * @returns R2 存储键，如果不是 R2 URL 则返回 null
 */
export function extractR2KeyFromUrl(cdnUrl: string): string | null {
  if (!R2_CONFIG.cdnUrl || !cdnUrl.startsWith(R2_CONFIG.cdnUrl)) {
    return null;
  }
  return cdnUrl.replace(`${R2_CONFIG.cdnUrl}/`, "");
}

/**
 * 获取 R2 配置信息（用于日志）
 */
export function getR2ConfigInfo(): {
  configured: boolean;
  bucketName: string;
  cdnUrl: string;
  prefix: string;
} {
  return {
    configured: isR2Configured(),
    bucketName: R2_CONFIG.bucketName,
    cdnUrl: R2_CONFIG.cdnUrl,
    prefix: R2_CONFIG.prefix,
  };
}

/**
 * 按 R2 对象 LastModified 删除超过保留期的文件（孤儿文件：DB 已无对应任务）
 * 仅删除用户下载产生的文件，不删除静态资源（images/version/wechat 等）。
 * @param cutoff - 早于此时间的对象将被删除
 * @param skipPrefixes - 不删除的 key 前缀（如 ['snapvee/images/', 'snapvee/version/', 'snapvee/wechat/']），与 prefix 同级的静态目录
 * @returns 删除的对象数量
 */
export async function deleteR2ObjectsOlderThan(
  cutoff: Date,
  skipPrefixes?: string[],
): Promise<number> {
  if (!isR2Configured()) return 0;

  const client = getR2Client();
  const prefix = R2_CONFIG.prefix ? `${R2_CONFIG.prefix}/` : "";
  const skipSet = new Set(
    (skipPrefixes ?? []).map((p) => (p.endsWith("/") ? p : `${p}/`)),
  );
  let deletedCount = 0;
  let continuationToken: string | undefined;

  do {
    const listCmd = new ListObjectsV2Command({
      Bucket: R2_CONFIG.bucketName,
      Prefix: prefix,
      MaxKeys: 1000,
      ContinuationToken: continuationToken,
    });
    const listRes = await client.send(listCmd);
    const contents = listRes.Contents ?? [];

    for (const obj of contents) {
      if (!obj.Key) continue;
      const lastMod = obj.LastModified;
      if (!lastMod || lastMod >= cutoff) continue;

      const skip = [...skipSet].some(
        (s) => obj.Key === s || obj.Key!.startsWith(s),
      );
      if (skip) continue;

      try {
        await client.send(
          new DeleteObjectCommand({
            Bucket: R2_CONFIG.bucketName,
            Key: obj.Key,
          }),
        );
        deletedCount++;
        console.log(
          `🗑️ Deleted orphan R2: ${obj.Key} (lastModified ${lastMod.toISOString()})`,
        );
      } catch (err: any) {
        console.warn(`   ⚠️ Failed to delete R2 ${obj.Key}:`, err.message);
      }
    }

    continuationToken = listRes.IsTruncated
      ? listRes.NextContinuationToken
      : undefined;
  } while (continuationToken);

  return deletedCount;
}
