export interface DownloadTaskResponse {
  code: number;
  datas?: {
    taskId?: string; // 单个任务
    tasks?: Array<{
      taskId: string;
      jobId?: string;
      status: string;
      url: string;
      platform: string;
      error?: string;
    }>; // 批量任务
    isBatch?: boolean;
    status?: string;
    message: string;
  };
  msg?: string;
  requiresUpgrade?: boolean;
}

export interface TaskStatusResponse {
  code: number;
  datas?: {
    id: string;
    status: string;
    progress?: number; // 下载进度 (0-100)
    platform: string;
    url: string;
    downloadUrl?: string;
    errorMessage?: string;
    createdAt: string;
    updatedAt: string;
  };
  msg?: string;
}

import axios from "axios";

/**
 * 获取 Nicovideo 视频元数据
 * 直接请求后端服务器（有 yt-dlp 的地方）
 */
export async function getNicovideoMetadata(
  url: string,
  cookiePath?: string,
): Promise<{
  code: number;
  datas?: any;
  msg?: string;
}> {
  try {
    // 使用后端服务器 API（有 yt-dlp 的地方）
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
    let apiPath = `${baseUrl}/api/videos/metadata/nicovideo?url=${encodeURIComponent(url)}`;
    if (cookiePath) {
      apiPath += `&cookie=${encodeURIComponent(cookiePath)}`;
    }

    const response = await axios.get(apiPath, { withCredentials: true });
    const data = response.data;

    if (response.status !== 200) {
      return {
        code: -1,
        msg: data.msg || "Failed to fetch Nicovideo metadata",
      };
    }

    return data;
  } catch (error: any) {
    if (error.response?.data) {
      return {
        code: -1,
        msg: error.response.data.msg || error.message || "Network error",
      };
    }
    return {
      code: -1,
      msg: error.message || "Network error",
    };
  }
}
