import type { PropsWithoutRef } from "react";
import { cn } from "@/utils";
interface LogoTextProps {
  className?: string;
  onClick?: (params?: any) => void;
  text?: string;
  icon?: React.ReactNode;
}

export function LogoText(props: PropsWithoutRef<LogoTextProps>) {
  return (
    <span className={cn("inline-block mr-4 text-white", props.className)}>
      SnapVee
    </span>
  );
}
