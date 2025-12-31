"use client";

import { useState, memo, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { IMAGE_SIZES, IMAGE_QUALITY, BLUR_DATA_URL } from "@/lib/image-config";

interface OptimizedImageProps {
    src: string;
    alt: string;
    fill?: boolean;
    width?: number;
    height?: number;
    priority?: boolean;
    className?: string;
    sizes?: string;
    quality?: number;
    onLoad?: () => void;
}

/**
 * Optimized Image Component
 * - Uses Next.js Image for automatic optimization
 * - Includes loading state with skeleton
 * - Handles errors gracefully
 * - Memoized to prevent unnecessary re-renders
 */
export const OptimizedImage = memo(function OptimizedImage({
    src,
    alt,
    fill = false,
    width,
    height,
    priority = false,
    className = "",
    sizes = IMAGE_SIZES.card,
    quality = IMAGE_QUALITY.card,
    onLoad,
}: OptimizedImageProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    const handleLoad = useCallback(() => {
        setIsLoading(false);
        onLoad?.();
    }, [onLoad]);

    const handleError = useCallback(() => {
        setError(true);
        setIsLoading(false);
    }, []);

    // Fallback for failed images
    const fallbackSrc =
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23201612' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' fill='%23666' text-anchor='middle' dy='.3em'%3EImage unavailable%3C/text%3E%3C/svg%3E";

    const imageProps = fill
        ? { fill: true }
        : { width: width || 400, height: height || 300 };

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {/* Loading skeleton with shimmer */}
            {isLoading && !error && (
                <div className="absolute inset-0 shimmer" />
            )}

            <Image
                src={error ? fallbackSrc : src}
                alt={alt}
                {...imageProps}
                priority={priority}
                sizes={sizes}
                quality={quality}
                className={`object-cover transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"
                    }`}
                onLoad={handleLoad}
                onError={handleError}
                loading={priority ? "eager" : "lazy"}
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
            />
        </div>
    );
});

/**
 * Background Image Component
 * For full-screen or container backgrounds
 */
export const OptimizedBgImage = memo(function OptimizedBgImage({
    src,
    alt,
    priority = false,
    className = "",
    sizes = IMAGE_SIZES.fullScreen,
    quality = IMAGE_QUALITY.background,
}: Omit<OptimizedImageProps, "fill" | "width" | "height">) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(false);

    const handleLoad = useCallback(() => setIsLoaded(true), []);
    const handleError = useCallback(() => setError(true), []);

    const fallbackSrc =
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23201612' width='400' height='300'/%3E%3C/svg%3E";

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {/* Loading skeleton with shimmer */}
            {!isLoaded && !error && (
                <div className="absolute inset-0 shimmer" />
            )}

            <Image
                src={error ? fallbackSrc : src}
                alt={alt}
                fill
                priority={priority}
                sizes={sizes}
                quality={quality}
                className={`object-cover transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"
                    }`}
                onLoad={handleLoad}
                onError={handleError}
                loading={priority ? "eager" : "lazy"}
            />
        </div>
    );
});

/**
 * Hook for lazy loading with Intersection Observer
 * Used for components that should only render when visible
 */
export function useLazyLoad(
    options?: IntersectionObserverInit
): [React.RefObject<HTMLDivElement | null>, boolean] {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1, rootMargin: "200px", ...options }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [options]);

    return [ref, isVisible];
}

// Re-export image config for convenience
export { IMAGE_SIZES, IMAGE_QUALITY } from "@/lib/image-config";
