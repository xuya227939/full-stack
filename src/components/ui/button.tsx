import type { VariantProps } from "class-variance-authority";
import { cn } from "@/utils/index";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import * as React from "react";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-hidden focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        primary:
          "bg-sky-600 text-white shadow-2xs hover:bg-sky-700 focus-visible:ring-sky-500/20",
        secondary:
          "bg-gray-100 text-gray-700 shadow-2xs hover:bg-gray-200 focus-visible:ring-gray-500/20",
        danger:
          "bg-destructive text-white shadow-2xs hover:bg-destructive/90 focus-visible:ring-destructive/20",
        outline:
          "border border-gray-300 text-black bg-white hover:text-sky-600 hover:border-sky-600 focus-visible:ring-sky-500/20",
        ghost:
          "bg-transparent text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-500/20",
        default:
          "bg-primary text-primary-foreground shadow-2xs hover:bg-primary/90",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  icon,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  // Slot (asChild) accepts only a single React element child
  if (asChild) {
    return (
      <Comp
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </Comp>
    );
  }

  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size, className }),
        loading && "cursor-not-allowed opacity-50",
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {icon && !loading && icon}
      {children}
    </Comp>
  );
}

export { Button, buttonVariants };
