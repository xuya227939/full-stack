import type { VariantProps } from "class-variance-authority";
import { cn } from "@/utils/index";
import { cva } from "class-variance-authority";
import * as React from "react";

const inputVariants = cva(
  "flex w-full border bg-background text-foreground transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-border focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:outline-none",
        filled:
          "bg-secondary/50 border-transparent focus-visible:bg-background focus-visible:border-border focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:outline-none",
        outlined:
          "border-2 border-border bg-transparent focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:outline-none",
        underlined:
          "border-0 border-b-2 border-border bg-transparent rounded-none focus-visible:border-primary focus-visible:ring-0 focus-visible:outline-none px-0",
      },
      inputSize: {
        sm: "h-8 px-2 py-1 text-xs rounded-md",
        default: "h-10 px-3 py-2 text-sm rounded-md",
        lg: "h-12 px-4 py-3 text-base rounded-lg",
        xl: "h-14 px-5 py-4 text-lg rounded-lg",
      },
      state: {
        default: "",
        error:
          "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20",
        success:
          "border-green-500 focus-visible:border-green-500 focus-visible:ring-green-500/20",
        warning:
          "border-yellow-500 focus-visible:border-yellow-500 focus-visible:ring-yellow-500/20",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
      state: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  label?: string;
  helperText?: string;
  errorText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  clearable?: boolean;
  loading?: boolean;
  containerClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      variant,
      inputSize,
      state,
      label,
      helperText,
      errorText,
      leftIcon,
      rightIcon,
      clearable,
      loading,
      containerClassName,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(value || "");
    const [isFocused, setIsFocused] = React.useState(false);

    React.useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value);
      }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInternalValue(newValue);
      onChange?.(e);
    };

    const handleClear = () => {
      const syntheticEvent = {
        target: { value: "" },
        currentTarget: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>;
      setInternalValue("");
      onChange?.(syntheticEvent);
    };

    const currentState = errorText ? "error" : state;
    const showClearButton =
      clearable && internalValue && !props.disabled && !props.readOnly;

    return (
      <div className={cn("space-y-1", containerClassName)}>
        {label && (
          <label
            className={cn(
              "block text-sm leading-none font-medium",
              currentState === "error" && "text-destructive",
              currentState === "success" && "text-green-600",
              currentState === "warning" && "text-yellow-600",
              props.disabled && "opacity-50"
            )}
          >
            {label}
            {props.required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              inputVariants({ variant, inputSize, state: currentState }),
              leftIcon && "pl-10",
              (rightIcon || showClearButton || loading) && "pr-10",
              isFocused &&
                variant === "default" &&
                "shadow-primary/10 shadow-sm",
              className
            )}
            ref={ref}
            value={internalValue}
            onChange={handleChange}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            {...props}
          />
          {(rightIcon || showClearButton || loading) && (
            <div className="absolute top-1/2 right-3 flex -translate-y-1/2 items-center space-x-1">
              {loading && (
                <div className="border-primary h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
              )}
              {showClearButton && !loading && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white transition-colors hover:bg-red-600"
                  tabIndex={-1}
                >
                  <span className="text-sm leading-none font-medium">×</span>
                </button>
              )}
              {rightIcon && !loading && rightIcon}
            </div>
          )}
        </div>
        {(helperText || errorText) && (
          <p
            className={cn(
              "text-xs",
              currentState === "error" && "text-destructive",
              currentState === "success" && "text-green-600",
              currentState === "warning" && "text-yellow-600",
              currentState === "default" && "text-muted-foreground"
            )}
          >
            {errorText || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input, inputVariants };
