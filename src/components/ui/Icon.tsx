"use client";

import { cn } from "@/lib/utils";

interface IconProps {
    name: string;
    filled?: boolean;
    className?: string;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
    xs: "text-[12px]",
    sm: "text-[16px]",
    md: "text-[20px]",
    lg: "text-[24px]",
    xl: "text-[32px]",
};

export const Icon = ({ name, filled = false, className, size = "lg" }: IconProps) => {
    return (
        <span
            className={cn(
                "material-symbols-outlined select-none",
                sizeClasses[size],
                className
            )}
            style={{
                fontVariationSettings: filled ? "'FILL' 1" : "'FILL' 0",
            }}
        >
            {name}
        </span>
    );
};
