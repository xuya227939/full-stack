#!/usr/bin/env tsx

/**
 * 定时清理任务脚本
 * - 已完成任务 + R2 文件：按 FILE_RETENTION_HOURS（默认 24h）删除
 * - 失败任务：按 DATABASE_RETENTION_DAYS（默认 30 天）删除
 * - Redis 队列：按 QUEUE_RETENTION_HOURS（默认 24h）清理
 *
 * 要使「24h 后 R2 文件自动删除」生效，必须定时执行本脚本，例如每小时一次：
 *   0 * * * * cd /path/to/snapvee-front && npx tsx scripts/cleanup-tasks.ts
 *
 * 或每天一次（则文件最多多留 24h）：
 *   0 2 * * * cd /path/to/snapvee-front && npm run cleanup
 *
 * 环境变量：FILE_RETENTION_HOURS=24（文件保留小时）, DATABASE_RETENTION_DAYS=30, QUEUE_RETENTION_HOURS=24
 */

// 加载环境变量
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { loadEnv, printEnvConfig } = require("./load-env");

// 根据命令行参数优先，再根据环境变量加载配置
const env =
  process.argv[2] ||
  process.env.APP_ENV ||
  (process.env.NODE_ENV === "production"
    ? "production"
    : process.env.NODE_ENV === "test"
      ? "test"
      : "development");

loadEnv(env, true);
printEnvConfig();

import { createAdminClient } from "../src/lib/supabase/admin";

// R2 模块必须在 loadEnv 之后动态加载，否则 CLOUDFLARE_R2_* 未注入，extractR2KeyFromUrl 会一直返回 null
type R2Module = typeof import("../src/lib/utils/r2Storage");

// 队列模块必须在 loadEnv 之后动态加载，否则 REDIS_HOST/REDIS_PORT 仍是默认 localhost:6379
async function getQueueModule() {
  const mod = await import("../src/lib/queue");
  return { getDownloadQueue: mod.getDownloadQueue, cleanQueue: mod.cleanQueue };
}

// 配置参数（可通过环境变量覆盖）
const CONFIG = {
  // 数据库清理配置
  DATABASE_RETENTION_DAYS: parseInt(
    process.env.DATABASE_RETENTION_DAYS || "30",
    10,
  ), // 失败任务保留最近 30 天
  DATABASE_MAX_COMPLETED: parseInt(
    process.env.DATABASE_MAX_COMPLETED || "1000",
    10,
  ), // 最多保留 1000 个已完成任务

  // 已完成任务对应的 R2 文件保留时间（小时），超过则删 R2 并删任务记录
  FILE_RETENTION_HOURS: parseInt(process.env.FILE_RETENTION_HOURS || "24", 10), // 默认 24 小时后删除文件

  // 队列清理配置
  QUEUE_RETENTION_HOURS: parseInt(
    process.env.QUEUE_RETENTION_HOURS || "24",
    10,
  ), // 保留最近 24 小时
  QUEUE_CLEAN_LIMIT: parseInt(process.env.QUEUE_CLEAN_LIMIT || "1000", 10), // 每次清理最多 1000 个
};

/**
 * 删除任务对应的 R2 文件
 * @param r2 - 在 loadEnv 之后动态加载的 r2Storage 模块，否则 CLOUDFLARE_R2_* 未注入会无法解析 key
 * @param tasks - 包含 download_url 的任务列表
 * @returns 删除的文件数量
 */
async function cleanupR2Files(
  r2: R2Module,
  tasks: { id: string; download_url: string | null }[],
): Promise<number> {
  const r2Info = r2.getR2ConfigInfo();
  console.log(
    `   R2: configured=${r2Info.configured}, cdnUrl=${r2Info.cdnUrl || "(empty)"}, bucket=${r2Info.bucketName}`,
  );
  if (!r2.isR2Configured()) {
    return 0;
  }

  let deletedCount = 0;

  for (const task of tasks) {
    if (!task.download_url) continue;

    try {
      // 检查是否是 JSON（数组 / Live Photo / Note / Douyin Note）
      let urls: string[] = [];
      try {
        const parsed = JSON.parse(task.download_url);
        if (Array.isArray(parsed)) {
          urls = parsed;
        } else if (parsed && typeof parsed === "object") {
          if (parsed.type === "livePhotos" && Array.isArray(parsed.items)) {
            for (const item of parsed.items) {
              if (item.image) urls.push(item.image);
              if (item.video) urls.push(item.video);
            }
          } else if (parsed.type === "note" && Array.isArray(parsed.images)) {
            urls = [...parsed.images];
            if (parsed.audio) urls.push(parsed.audio);
          } else if (
            parsed.type === "douyinNote" &&
            Array.isArray(parsed.images) &&
            parsed.video
          ) {
            urls = [...parsed.images, parsed.video];
          }
        }
      } catch {
        // 不是 JSON，是单个 URL
        urls = [task.download_url];
      }
      if (urls.length === 0 && task.download_url) {
        urls = [task.download_url];
      }

      // 删除每个 R2 文件
      for (const url of urls) {
        const r2Key = r2.extractR2KeyFromUrl(url);
        if (r2Key) {
          await r2.deleteFromR2(r2Key);
          deletedCount++;
        }
      }
    } catch (error: any) {
      console.warn(
        `   ⚠️ Failed to delete R2 files for task ${task.id}:`,
        error.message,
      );
    }
  }

  return deletedCount;
}

async function cleanupDatabase() {
  console.log("\n🗄️  Starting database cleanup...");
  const r2 = await import("../src/lib/utils/r2Storage");
  const supabase = createAdminClient();
  let totalR2FilesDeleted = 0;

  try {
    // 已完成任务 + R2 文件：按「文件保留小时数」删除（默认 24h）
    const fileCutoff = new Date();
    fileCutoff.setHours(fileCutoff.getHours() - CONFIG.FILE_RETENTION_HOURS);
    console.log(
      `   [Files] Deleting completed tasks (and R2 files) older than ${CONFIG.FILE_RETENTION_HOURS}h (before ${fileCutoff.toISOString()})`,
    );

    const { data: tasksToDeleteByFileAge } = await supabase
      .from("snapvee_download_tasks")
      .select("id, download_url")
      .eq("status", "completed")
      .lt("updated_at", fileCutoff.toISOString());

    if (tasksToDeleteByFileAge && tasksToDeleteByFileAge.length > 0) {
      console.log(
        `   🗑️ Cleaning up R2 files for ${tasksToDeleteByFileAge.length} completed tasks (>${CONFIG.FILE_RETENTION_HOURS}h)...`,
      );
      const r2Deleted = await cleanupR2Files(r2, tasksToDeleteByFileAge);
      totalR2FilesDeleted += r2Deleted;
      console.log(`   ✅ Deleted ${r2Deleted} R2 files`);
    }

    // 删除超过「文件保留小时」的已完成任务
    const { data: deletedCompleted, error: errorCompleted } = await supabase
      .from("snapvee_download_tasks")
      .delete()
      .eq("status", "completed")
      .lt("updated_at", fileCutoff.toISOString())
      .select("id");

    if (errorCompleted) {
      console.error("   ❌ Error deleting completed tasks:", errorCompleted);
    } else {
      console.log(
        `   ✅ Deleted ${deletedCompleted?.length || 0} completed tasks`,
      );
    }

    // 失败任务：按「数据库保留天数」删除（默认 30 天）
    const dbCutoff = new Date();
    dbCutoff.setDate(dbCutoff.getDate() - CONFIG.DATABASE_RETENTION_DAYS);
    console.log(
      `   [DB] Deleting failed tasks older than ${CONFIG.DATABASE_RETENTION_DAYS} days (before ${dbCutoff.toISOString()})`,
    );
    const { data: deletedFailed, error: errorFailed } = await supabase
      .from("snapvee_download_tasks")
      .delete()
      .eq("status", "failed")
      .lt("created_at", dbCutoff.toISOString())
      .select("id");

    if (errorFailed) {
      console.error("   ❌ Error deleting failed tasks:", errorFailed);
    } else {
      console.log(`   ✅ Deleted ${deletedFailed?.length || 0} failed tasks`);
    }

    // 如果已完成任务超过限制，删除最旧的
    const { count: completedCount } = await supabase
      .from("snapvee_download_tasks")
      .select("*", { count: "exact", head: true })
      .eq("status", "completed");

    if (completedCount && completedCount > CONFIG.DATABASE_MAX_COMPLETED) {
      const excess = completedCount - CONFIG.DATABASE_MAX_COMPLETED;
      console.log(
        `   📊 Found ${completedCount} completed tasks, limit is ${CONFIG.DATABASE_MAX_COMPLETED}, deleting ${excess} oldest...`,
      );

      // 获取要删除的任务（包含 download_url）
      const { data: oldTasks } = await supabase
        .from("snapvee_download_tasks")
        .select("id, download_url")
        .eq("status", "completed")
        .order("updated_at", { ascending: true })
        .limit(excess);

      if (oldTasks && oldTasks.length > 0) {
        // 先删除 R2 文件
        console.log(
          `   🗑️ Cleaning up R2 files for ${oldTasks.length} excess tasks...`,
        );
        const r2Deleted = await cleanupR2Files(r2, oldTasks);
        totalR2FilesDeleted += r2Deleted;
        console.log(`   ✅ Deleted ${r2Deleted} R2 files`);

        // 再删除数据库记录
        const idsToDelete = oldTasks.map((t) => t.id);
        const { error: deleteError } = await supabase
          .from("snapvee_download_tasks")
          .delete()
          .in("id", idsToDelete);

        if (deleteError) {
          console.error("   ❌ Error deleting excess tasks:", deleteError);
        } else {
          console.log(`   ✅ Deleted ${idsToDelete.length} excess tasks`);
        }
      }
    }

    // 孤儿 R2：按对象 LastModified 删除超过保留期的文件（仅用户下载产生的 key，不删静态资源）
    const r2Ok = r2.isR2Configured();
    const r2Info = r2.getR2ConfigInfo();
    const staticPrefixes = r2Info.prefix
      ? [
          `${r2Info.prefix}/images`,
          `${r2Info.prefix}/version`,
          `${r2Info.prefix}/wechat`,
          `${r2Info.prefix}/blog`,
        ]
      : ["images", "version", "wechat", "blog"];
    console.log(
      `   [Orphan R2] ${r2Ok ? `Deleting objects older than ${CONFIG.FILE_RETENTION_HOURS}h (before ${fileCutoff.toISOString()}), skipping static: ${staticPrefixes.join(", ")}` : "R2 not configured (need CLOUDFLARE_R2_ENDPOINT, ACCESS_KEY_ID, SECRET_ACCESS_KEY, BUCKET_NAME, PUBLIC_BASE_URL), skipping."}`,
    );
    if (r2Ok) {
      const orphanDeleted = await r2.deleteR2ObjectsOlderThan(
        fileCutoff,
        staticPrefixes,
      );
      totalR2FilesDeleted += orphanDeleted;
      if (orphanDeleted > 0) {
        console.log(`   ✅ Deleted ${orphanDeleted} orphan R2 objects`);
      } else {
        console.log(
          `   ✅ No orphan R2 objects older than ${CONFIG.FILE_RETENTION_HOURS}h`,
        );
      }
    }

    // ============================================
    // 清理转码任务 (snapvee_transcode_tasks)
    // ============================================
    console.log("\n🎬 Cleaning up transcode tasks...");

    // 已完成转码任务 + R2 文件：按「文件保留小时数」删除
    const { data: transcodeTasksToDelete } = await supabase
      .from("snapvee_transcode_tasks")
      .select("id, result_url")
      .eq("status", "completed")
      .lt("updated_at", fileCutoff.toISOString());

    if (transcodeTasksToDelete && transcodeTasksToDelete.length > 0) {
      console.log(
        `   🗑️ Cleaning up R2 files for ${transcodeTasksToDelete.length} completed transcode tasks...`,
      );
      // 删除 R2 文件
      for (const task of transcodeTasksToDelete) {
        if (task.result_url) {
          try {
            const r2Key = r2.extractR2KeyFromUrl(task.result_url);
            if (r2Key) {
              await r2.deleteFromR2(r2Key);
              totalR2FilesDeleted++;
            }
          } catch (e: any) {
            console.warn(
              `   ⚠️ Failed to delete R2 file for transcode task ${task.id}:`,
              e.message,
            );
          }
        }
      }
    }

    // 删除超过「文件保留小时」的已完成转码任务
    const { data: deletedTranscodeCompleted, error: errorTranscodeCompleted } =
      await supabase
        .from("snapvee_transcode_tasks")
        .delete()
        .eq("status", "completed")
        .lt("updated_at", fileCutoff.toISOString())
        .select("id");

    if (errorTranscodeCompleted) {
      console.error(
        "   ❌ Error deleting completed transcode tasks:",
        errorTranscodeCompleted,
      );
    } else {
      console.log(
        `   ✅ Deleted ${deletedTranscodeCompleted?.length || 0} completed transcode tasks`,
      );
    }

    // 删除超过「数据库保留天数」的失败转码任务
    const { data: deletedTranscodeFailed, error: errorTranscodeFailed } =
      await supabase
        .from("snapvee_transcode_tasks")
        .delete()
        .eq("status", "failed")
        .lt("created_at", dbCutoff.toISOString())
        .select("id");

    if (errorTranscodeFailed) {
      console.error(
        "   ❌ Error deleting failed transcode tasks:",
        errorTranscodeFailed,
      );
    } else {
      console.log(
        `   ✅ Deleted ${deletedTranscodeFailed?.length || 0} failed transcode tasks`,
      );
    }

    // 获取清理后的统计
    const { count: totalCount } = await supabase
      .from("snapvee_download_tasks")
      .select("*", { count: "exact", head: true });

    const { count: completedCountAfter } = await supabase
      .from("snapvee_download_tasks")
      .select("*", { count: "exact", head: true })
      .eq("status", "completed");

    const { count: failedCountAfter } = await supabase
      .from("snapvee_download_tasks")
      .select("*", { count: "exact", head: true })
      .eq("status", "failed");

    const { count: transcodeCount } = await supabase
      .from("snapvee_transcode_tasks")
      .select("*", { count: "exact", head: true });

    console.log("\n📊 Database stats after cleanup:");
    console.log(
      `   Download tasks: ${totalCount || 0} (completed: ${completedCountAfter || 0}, failed: ${failedCountAfter || 0})`,
    );
    console.log(`   Transcode tasks: ${transcodeCount || 0}`);
    console.log(`   R2 files deleted: ${totalR2FilesDeleted}`);

    return {
      success: true,
      deletedCompleted: deletedCompleted?.length || 0,
      deletedFailed: deletedFailed?.length || 0,
      deletedR2Files: totalR2FilesDeleted,
      stats: {
        total: totalCount || 0,
        completed: completedCountAfter || 0,
        failed: failedCountAfter || 0,
      },
    };
  } catch (error: any) {
    console.error("❌ Database cleanup failed:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

async function cleanupQueue() {
  console.log("\n🔄 Starting queue cleanup...");

  try {
    const { getDownloadQueue, cleanQueue } = await getQueueModule();

    const maxAge = CONFIG.QUEUE_RETENTION_HOURS * 3600; // 转换为秒
    console.log(
      `   Cleaning tasks older than ${CONFIG.QUEUE_RETENTION_HOURS} hours`,
    );

    const result = await cleanQueue(maxAge, CONFIG.QUEUE_CLEAN_LIMIT);

    console.log(`   ✅ Cleaned ${result.total} tasks from queue:`);
    console.log(`      - Completed: ${result.completed}`);
    console.log(`      - Failed: ${result.failed}`);
    console.log(`      - Waiting: ${result.waiting}`);

    // 获取清理后的统计
    const queue = getDownloadQueue();
    const [completed, failed, waiting, active] = await Promise.all([
      queue.getCompletedCount(),
      queue.getFailedCount(),
      queue.getWaitingCount(),
      queue.getActiveCount(),
    ]);

    console.log("\n📊 Queue stats after cleanup:");
    console.log(`   Completed: ${completed}`);
    console.log(`   Failed: ${failed}`);
    console.log(`   Waiting: ${waiting}`);
    console.log(`   Active: ${active}`);
    console.log(`   Total: ${completed + failed + waiting + active}`);

    return {
      success: true,
      cleaned: result,
      stats: {
        completed,
        failed,
        waiting,
        active,
        total: completed + failed + waiting + active,
      },
    };
  } catch (error: any) {
    console.error("❌ Queue cleanup failed:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

async function main() {
  console.log("🧹 Starting cleanup task...");
  console.log("📋 Configuration:");
  console.log(
    `   File retention (completed + R2): ${CONFIG.FILE_RETENTION_HOURS} hours`,
  );
  console.log(
    `   Database retention (failed): ${CONFIG.DATABASE_RETENTION_DAYS} days`,
  );
  console.log(`   Database max completed: ${CONFIG.DATABASE_MAX_COMPLETED}`);
  console.log(`   Queue retention: ${CONFIG.QUEUE_RETENTION_HOURS} hours`);
  console.log(`   Queue clean limit: ${CONFIG.QUEUE_CLEAN_LIMIT}`);

  const results = {
    database: await cleanupDatabase(),
    queue: await cleanupQueue(),
  };

  console.log("\n✅ Cleanup completed!");
  console.log(JSON.stringify(results, null, 2));

  process.exit(0);
}

main().catch((error) => {
  console.error("❌ Cleanup script failed:", error);
  process.exit(1);
});
