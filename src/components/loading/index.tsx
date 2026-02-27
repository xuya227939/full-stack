import { Loader2 } from "lucide-react";
import { cn } from "@/utils/index";

export function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        {/* 主加载动画 */}
        <div className="relative">
          <Loader2 className="text-primary h-8 w-8 animate-spin sm:h-10 sm:w-10" />
          {/* 外圈动画 */}
          <div className="border-primary/20 absolute inset-0 animate-ping rounded-full border-2" />
        </div>

        {/* 加载文本 */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-muted-foreground text-sm font-medium sm:text-base">
            Loading...
          </p>
          <p className="text-muted-foreground/60 text-xs sm:text-sm">
            Please wait a moment
          </p>
        </div>
      </div>
    </div>
  );
}

// 可选：创建一个更简单的内联加载组件
export function InlineSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Loader2 className="text-primary h-4 w-4 animate-spin" />
    </div>
  );
}

// 可选：创建一个带文本的加载组件
export function LoadingWithText({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="flex items-center gap-2">
      <Loader2 className="text-primary h-4 w-4 animate-spin" />
      <span className="text-muted-foreground text-sm">{text}</span>
    </div>
  );
}
