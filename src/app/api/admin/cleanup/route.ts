import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
// @ts-ignore
import { getDownloadQueue, cleanQueue } from "@/lib/queue";

/**
 * 清理任务 API
 * POST /api/admin/cleanup
 *
 * 清理：
 * 1. Redis 队列中的旧任务
 * 2. 数据库中的旧任务记录
 *
 * 需要管理员权限（可以通过环境变量或 API Key 控制）
 */
export async function POST(request: NextRequest) {
  try {
    // 简单的权限检查（生产环境应该使用更安全的认证）
    const authHeader = request.headers.get("authorization");
    const expectedToken = process.env.CLEANUP_API_KEY;

    if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json(
        { code: -1, msg: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      cleanQueue: shouldCleanQueue = true,
      cleanDatabase: shouldCleanDatabase = true,
      daysToKeep = 30, // 保留最近 N 天的记录
      maxCompletedTasks = 1000, // 最多保留的已完成任务数
    } = body;

    const results: any = {
      queue: null,
      database: null,
    };

    // 1. 清理 Redis 队列
    if (shouldCleanQueue) {
      try {
        await cleanQueue();
        // @ts-ignore
        const stats = await getDownloadQueue().then((queue) =>
          Promise.all([
            queue.getCompletedCount(),
            queue.getFailedCount(),
            queue.getWaitingCount(),
            queue.getActiveCount(),
          ]).then(([completed, failed, waiting, active]) => ({
            completed,
            failed,
            waiting,
            active,
          }))
        );

        results.queue = {
          success: true,
          stats,
        };
      } catch (error: any) {
        results.queue = {
          success: false,
          error: error.message,
        };
      }
    }

    // 2. 清理数据库任务
    if (shouldCleanDatabase) {
      try {
        const supabase = createAdminClient();
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

        // 删除超过保留期的已完成任务
        const { data: deletedCompleted, error: errorCompleted } = await supabase
          .from("snapvee_download_tasks")
          .delete()
          .eq("status", "completed")
          .lt("created_at", cutoffDate.toISOString())
          .select("id");

        // 删除超过保留期的失败任务
        const { data: deletedFailed, error: errorFailed } = await supabase
          .from("snapvee_download_tasks")
          .delete()
          .eq("status", "failed")
          .lt("created_at", cutoffDate.toISOString())
          .select("id");

        // 如果已完成任务超过限制，删除最旧的
        const { count: completedCount } = await supabase
          .from("snapvee_download_tasks")
          .select("*", { count: "exact", head: true })
          .eq("status", "completed");

        if (completedCount && completedCount > maxCompletedTasks) {
          const { data: oldTasks } = await supabase
            .from("snapvee_download_tasks")
            .select("id")
            .eq("status", "completed")
            .order("created_at", { ascending: true })
            .limit(completedCount - maxCompletedTasks);

          if (oldTasks && oldTasks.length > 0) {
            const idsToDelete = oldTasks.map((t) => t.id);
            await supabase
              .from("snapvee_download_tasks")
              .delete()
              .in("id", idsToDelete);
          }
        }

        // 获取当前统计
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

        results.database = {
          success: true,
          deletedCompleted: deletedCompleted?.length || 0,
          deletedFailed: deletedFailed?.length || 0,
          stats: {
            total: totalCount || 0,
            completed: completedCountAfter || 0,
            failed: failedCountAfter || 0,
          },
        };

        if (errorCompleted || errorFailed) {
          results.database.error = {
            completed: errorCompleted?.message,
            failed: errorFailed?.message,
          };
        }
      } catch (error: any) {
        results.database = {
          success: false,
          error: error.message,
        };
      }
    }

    return NextResponse.json({
      code: 0,
      msg: "Cleanup completed",
      results,
    });
  } catch (error: any) {
    console.error("Cleanup API error:", error);
    return NextResponse.json(
      { code: -1, msg: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * 获取清理统计信息
 * GET /api/admin/cleanup
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = createAdminClient();

    // 获取任务统计
    const { count: totalCount } = await supabase
      .from("snapvee_download_tasks")
      .select("*", { count: "exact", head: true });

    const { count: completedCount } = await supabase
      .from("snapvee_download_tasks")
      .select("*", { count: "exact", head: true })
      .eq("status", "completed");

    const { count: failedCount } = await supabase
      .from("snapvee_download_tasks")
      .select("*", { count: "exact", head: true })
      .eq("status", "failed");

    const { count: pendingCount } = await supabase
      .from("snapvee_download_tasks")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending");

    const { count: processingCount } = await supabase
      .from("snapvee_download_tasks")
      .select("*", { count: "exact", head: true })
      .eq("status", "processing");

    // 获取队列统计
    let queueStats = null;
    try {
      // @ts-ignore
      queueStats = await getDownloadQueue().then((queue) =>
        Promise.all([
          queue.getCompletedCount(),
          queue.getFailedCount(),
          queue.getWaitingCount(),
          queue.getActiveCount(),
        ]).then(([completed, failed, waiting, active]) => ({
          completed,
          failed,
          waiting,
          active,
          total: completed + failed + waiting + active,
        }))
      );
    } catch (error: any) {
      queueStats = { error: error.message };
    }

    // 获取最旧的任务创建时间
    const { data: oldestTask } = await supabase
      .from("snapvee_download_tasks")
      .select("created_at")
      .order("created_at", { ascending: true })
      .limit(1)
      .single();

    return NextResponse.json({
      code: 0,
      data: {
        database: {
          total: totalCount || 0,
          completed: completedCount || 0,
          failed: failedCount || 0,
          pending: pendingCount || 0,
          processing: processingCount || 0,
          oldestTaskDate: oldestTask?.created_at || null,
        },
        queue: queueStats,
      },
    });
  } catch (error: any) {
    console.error("Cleanup stats API error:", error);
    return NextResponse.json(
      { code: -1, msg: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
