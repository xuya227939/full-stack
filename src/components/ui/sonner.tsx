"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";
import { useIsMobile } from "@/hooks/useMobile";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();
  const isMobile = useIsMobile();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      position={isMobile ? "top-center" : props.position}
      className="toaster group"
      closeButton={false}
      swipeDirections={[]}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          closeButton:
            "!w-6 !h-6 !top-1/2 !-translate-y-1/2 !left-[unset] !-right-1 !translate-x-1/2 !border-0 !bg-gray-100 hover:!bg-gray-200 !text-gray-500 hover:!text-gray-700 !opacity-100 !rounded-full !shadow-sm",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
