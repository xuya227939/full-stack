import { cn } from "@/utils/index";
import type { PropsWithoutRef } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
interface MarkdownProps {
  type: "blog" | "detail";
  text: string;
  className?: string;
}

export function Markdown(props: PropsWithoutRef<MarkdownProps>) {
  let cl = cn(
    "prose prose-invert mx-auto max-w-prose",
    "prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white",
    "prose-a:text-purple-400 prose-a:no-underline hover:prose-a:underline",
    "prose-code:text-purple-300 prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800",
    "prose-li:text-gray-300 prose-blockquote:text-gray-400 prose-blockquote:border-purple-500",
    props.className
  );

  if (props.type !== "blog") {
    cl = cn("", props.className);
  }

  return (
    <div className={cl}>
      <ReactMarkdown
        rehypePlugins={[rehypeHighlight]}
        remarkPlugins={[remarkGfm]}
      >
        {props.text}
      </ReactMarkdown>
    </div>
  );
}
