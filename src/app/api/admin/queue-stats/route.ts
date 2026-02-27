import { NextRequest, NextResponse } from "next/server";
import { getQueueStats, getDownloadQueue } from "@/lib/queue";

/**
 * 队列监控 API
 * GET /api/admin/queue-stats
 *
 * 返回队列的排队、执行和异常情况
 */
export async function GET(request: NextRequest) {
  try {
    // 简单的权限检查（可选）
    const authHeader = request.headers.get("authorization");
    const expectedToken = process.env.CLEANUP_API_KEY;

    // 如果设置了 API Key，则验证
    if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json(
        { code: -1, msg: "Unauthorized" },
        { status: 401 }
      );
    }

    // 获取队列统计信息
    const stats = await getQueueStats();

    // 获取更详细的信息（可选）
    const queue = getDownloadQueue();
    const [waitingJobs, activeJobs, failedJobs] = await Promise.all([
      queue.getWaiting(0, 10), // 获取前 10 个等待中的任务
      queue.getActive(0, 10), // 获取前 10 个正在执行的任务
      queue.getFailed(0, 10), // 获取前 10 个失败的任务
    ]);

    return NextResponse.json({
      code: 0,
      data: {
        // 队列计数
        counts: {
          waiting: stats.waiting,
          active: stats.active,
          completed: stats.completed,
          failed: stats.failed,
          delayed: stats.delayed,
          total: stats.total,
        },
        // 等待中的任务详情
        waitingJobs: waitingJobs.map((job) => ({
          id: job.id,
          taskId: job.data.taskId,
          platform: job.data.platform,
          priority: job.data.priority,
          timestamp: job.timestamp,
        })),
        // 正在执行的任务详情
        activeJobs: activeJobs.map((job) => ({
          id: job.id,
          taskId: job.data.taskId,
          platform: job.data.platform,
          priority: job.data.priority,
          timestamp: job.timestamp,
          processedOn: job.processedOn,
        })),
        // 失败的任务详情
        failedJobs: failedJobs.map((job) => ({
          id: job.id,
          taskId: job.data.taskId,
          platform: job.data.platform,
          failedReason: job.failedReason,
          attemptsMade: job.attemptsMade,
          timestamp: job.timestamp,
          finishedOn: job.finishedOn,
        })),
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    console.error("Queue stats API error:", error);
    return NextResponse.json(
      { code: -1, msg: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
