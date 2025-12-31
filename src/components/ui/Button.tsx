
import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", isLoading, leftIcon, rightIcon, children, disabled, ...props }, ref) => {

        // Base styles from Design System v2.0
        const baseStyles = "inline-flex items-center justify-center font-semibold transition-all duration-150 ease-out focus-ring active:scale-95 disabled:opacity-60 disabled:pointer-events-none disabled:active:scale-100 overflow-hidden relative ripple";

        // Variant styles
        const variants = {
            primary: "bg-primary text-primary-foreground shadow-sm hover:bg-[hsl(32,91%,47%)] hover:shadow-md hover:scale-[1.02]",
            secondary: "bg-transparent text-primary border-2 border-primary hover:bg-[#FFF5E6] hover:border-[hsl(32,91%,47%)]",
            ghost: "bg-transparent text-foreground hover:bg-muted hover:text-primary",
        };

        // Size styles
        const sizes = {
            sm: "h-8 px-4 text-xs rounded-md min-w-[80px]",
            md: "h-11 px-6 text-sm rounded-lg min-w-[100px]",
            lg: "h-14 px-8 text-base rounded-lg min-w-[120px]",
        };

        return (
            <button
                ref={ref}
                disabled={isLoading || disabled}
                className={cn(
                    baseStyles,
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
                {children}
                {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
            </button>
        );
    }
);

Button.displayName = "Button";

export { Button };
