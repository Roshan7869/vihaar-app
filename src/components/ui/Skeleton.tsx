"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
    className?: string;
    variant?: "text" | "circular" | "rectangular" | "card";
    style?: React.CSSProperties;
}

/**
 * Premium Skeleton Component
 * Provides smooth animated loading placeholder with wave shimmer effect
 */
export function Skeleton({ className, variant = "rectangular", style }: SkeletonProps) {
    const variantClasses = {
        text: "h-4 rounded-md",
        circular: "rounded-full aspect-square",
        rectangular: "rounded-xl",
        card: "rounded-3xl aspect-[16/10]",
    };

    return (
        <div
            className={cn(
                "skeleton-wave bg-muted",
                variantClasses[variant],
                className
            )}
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
        <div className="snap-center shrink-0 w-[85vw] max-w-[360px] relative rounded-3xl overflow-hidden aspect-[16/10] bg-card border border-white/5">
            <Skeleton className="absolute inset-0 rounded-none" />
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
        <div className="snap-center shrink-0 w-full relative rounded-3xl overflow-hidden aspect-[4/5] bg-card border border-white/5">
            <Skeleton className="absolute inset-0 rounded-none" />
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
        <div className="relative w-full h-full bg-card">
            <Skeleton className="absolute inset-0 rounded-none" />
            {/* Right action buttons skeleton */}
            <div className="absolute right-4 bottom-32 flex flex-col gap-5 items-center">
                <Skeleton className="w-12 h-12" variant="circular" />
                <Skeleton className="w-12 h-12" variant="circular" />
                <Skeleton className="w-12 h-12" variant="circular" />
            </div>
            {/* Content skeleton */}
            <div className="absolute bottom-0 left-0 right-0 p-6 pb-28 space-y-3">
                <div className="flex items-center gap-2">
                    <Skeleton className="w-20 h-6 rounded-full" />
                    <Skeleton className="w-12 h-6 rounded-full" />
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
            className="border-4 border-background"
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
        <div className="glass rounded-2xl p-3 flex gap-4 items-center">
            <Skeleton className="h-20 w-20 shrink-0 rounded-xl" />
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
                    className="h-9 rounded-full shimmer-fast"
                    style={{ width: 70 + Math.random() * 30 }}
                />
            ))}
        </div>
    );
}

/**
 * Feed Item Skeleton - For nearby tours
 */
export function FeedItemSkeleton() {
    return (
        <div className="rounded-3xl overflow-hidden bg-card border border-white/5 animate-fade-in">
            <div className="relative aspect-[15/16]">
                <Skeleton className="absolute inset-0 rounded-none" />
                {/* Top badges */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    <Skeleton className="w-16 h-8 rounded-full" />
                    <Skeleton className="w-20 h-8 rounded-full" />
                </div>
                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 space-y-3 gradient-overlay">
                    <Skeleton className="w-16 h-5 rounded-full" />
                    <Skeleton className="w-3/4 h-6" variant="text" />
                    <Skeleton className="w-1/2 h-4" variant="text" />
                    <Skeleton className="w-full h-4" variant="text" />
                    <Skeleton className="w-28 h-10 rounded-full mt-2" />
                </div>
            </div>
        </div>
    );
}

/**
 * Grid Item Skeleton - For search results
 */
export function GridItemSkeleton() {
    return (
        <div className="aspect-[3/4] rounded-2xl overflow-hidden relative bg-card animate-fade-in">
            <Skeleton className="absolute inset-0 rounded-none" />
            <div className="absolute bottom-3 left-3 right-3 space-y-2">
                <Skeleton className="w-12 h-4 rounded-full" />
                <Skeleton className="w-3/4 h-5" variant="text" />
                <Skeleton className="w-1/2 h-3" variant="text" />
            </div>
        </div>
    );
}
