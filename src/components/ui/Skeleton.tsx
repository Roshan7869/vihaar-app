"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
    className?: string;
    variant?: "text" | "circular" | "rectangular" | "card";
    style?: React.CSSProperties;
}

/**
 * Base Skeleton Component
 * Provides animated loading placeholder with pulse effect
 */
export function Skeleton({ className, variant = "rectangular", style }: SkeletonProps) {
    const baseClasses = "bg-muted shimmer";

    const variantClasses = {
        text: "h-4 rounded",
        circular: "rounded-full",
        rectangular: "rounded-lg",
        card: "rounded-[32px] aspect-[16/10]",
    };

    return (
        <div
            className={cn(baseClasses, variantClasses[variant], className)}
            style={style}
            aria-hidden="true"
            role="presentation"
        />
    );
}

/**
 * Featured Place Card Skeleton
 * Used in the homepage Featured This Week carousel
 */
export function PlaceCardSkeleton() {
    return (
        <div className="snap-center shrink-0 w-[85vw] max-w-[360px] relative rounded-[32px] overflow-hidden aspect-[16/10] bg-surface-dark border border-white/5">
            <Skeleton className="absolute inset-0" variant="rectangular" />
            {/* Tag skeleton */}
            <div className="absolute top-5 left-5">
                <Skeleton className="w-16 h-6 rounded-full" />
            </div>
            {/* Content skeleton */}
            <div className="absolute bottom-0 left-0 w-full p-6 space-y-3">
                <Skeleton className="w-24 h-4" variant="text" />
                <Skeleton className="w-3/4 h-7" variant="text" />
                <Skeleton className="w-full h-4" variant="text" />
            </div>
        </div>
    );
}

/**
 * Hidden Gem Card Skeleton
 * Used in the homepage Hidden Gems carousel
 */
export function HiddenGemSkeleton() {
    return (
        <div className="snap-center shrink-0 w-full relative rounded-[32px] overflow-hidden aspect-[4/5] bg-surface-dark border border-white/5">
            <Skeleton className="absolute inset-0" variant="rectangular" />
            <div className="absolute bottom-0 left-0 w-full p-6 space-y-3">
                <Skeleton className="w-16 h-4" variant="text" />
                <Skeleton className="w-2/3 h-8" variant="text" />
                <Skeleton className="w-full h-4" variant="text" />
            </div>
        </div>
    );
}

/**
 * Explore Page Card Skeleton
 * Full-screen swipeable card skeleton
 */
export function ExploreCardSkeleton() {
    return (
        <div className="relative w-full h-full bg-surface-dark">
            <Skeleton className="absolute inset-0" variant="rectangular" />
            {/* Right action buttons skeleton */}
            <div className="absolute right-4 bottom-32 flex flex-col gap-5 items-center">
                <Skeleton className="w-12 h-12 rounded-full" variant="circular" />
                <Skeleton className="w-12 h-12 rounded-full" variant="circular" />
                <Skeleton className="w-12 h-12 rounded-full" variant="circular" />
            </div>
            {/* Content skeleton */}
            <div className="absolute bottom-0 left-0 right-0 p-6 pb-28 space-y-3">
                <div className="flex items-center gap-2">
                    <Skeleton className="w-20 h-6 rounded-full" variant="rectangular" />
                    <Skeleton className="w-12 h-6 rounded-full" variant="rectangular" />
                </div>
                <Skeleton className="w-3/4 h-8" variant="text" />
                <Skeleton className="w-1/2 h-4" variant="text" />
                <Skeleton className="w-full h-4" variant="text" />
            </div>
        </div>
    );
}

/**
 * Profile Avatar Skeleton
 */
export function AvatarSkeleton({ size = 112 }: { size?: number }) {
    return (
        <Skeleton
            className="border-4 border-[#211611]"
            variant="circular"
            style={{ width: size, height: size }}
        />
    );
}

/**
 * Wishlist Item Skeleton
 */
export function WishlistItemSkeleton() {
    return (
        <div className="glass-card rounded-xl p-3 flex gap-4 items-center">
            <Skeleton className="h-20 w-20 shrink-0 rounded-lg" variant="rectangular" />
            <div className="flex flex-col flex-1 gap-2">
                <Skeleton className="w-3/4 h-5" variant="text" />
                <Skeleton className="w-1/2 h-3" variant="text" />
                <div className="flex gap-4 mt-1">
                    <Skeleton className="w-16 h-3" variant="text" />
                    <Skeleton className="w-12 h-3" variant="text" />
                </div>
            </div>
        </div>
    );
}

/**
 * Category Chips Skeleton
 */
export function CategoryChipsSkeleton({ count = 5 }: { count?: number }) {
    return (
        <div className="flex gap-2">
            {Array.from({ length: count }).map((_, i) => (
                <Skeleton
                    key={i}
                    className="h-8 rounded-full"
                    style={{ width: 60 + Math.random() * 40 }}
                />
            ))}
        </div>
    );
}
