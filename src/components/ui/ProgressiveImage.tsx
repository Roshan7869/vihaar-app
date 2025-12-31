"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProgressiveImageProps {
    src: string;
    alt: string;
    fill?: boolean;
    width?: number;
    height?: number;
    priority?: boolean;
    className?: string;
    sizes?: string;
    quality?: number;
}

/**
 * Premium Progressive Image Component
 * Features blur-up loading effect, smooth transitions, and error handling
 */
export function ProgressiveImage({
    src,
    alt,
    fill = false,
    width,
    height,
    priority = false,
    className = "",
    sizes,
    quality = 75,
}: ProgressiveImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    // Reset state when src changes
    useEffect(() => {
        setIsLoaded(false);
        setHasError(false);
    }, [src]);

    const handleLoad = () => {
        setIsLoaded(true);
    };

    const handleError = () => {
        setHasError(true);
        setIsLoaded(true);
    };

    // Image wrapper with blur-up effect
    const wrapperClassName = cn(
        "transition-all duration-700 ease-out",
        isLoaded ? "filter-none" : "blur-sm scale-[1.02]"
    );

    // Image opacity transition
    const imageClassName = cn(
        "transition-all duration-700",
        isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-[1.02]",
        className
    );

    if (fill) {
        return (
            <>
                {/* Skeleton wave placeholder */}
                <div
                    className={cn(
                        "absolute inset-0 skeleton-wave transition-opacity duration-500",
                        isLoaded ? "opacity-0" : "opacity-100"
                    )}
                />

                {/* Error state */}
                {hasError && (
                    <div className="absolute inset-0 flex items-center justify-center bg-card/80 backdrop-blur-sm">
                        <div className="text-center">
                            <span className="material-symbols-outlined text-muted-foreground/50 text-4xl mb-2 block">
                                image_not_supported
                            </span>
                            <span className="text-muted-foreground text-sm">Image unavailable</span>
                        </div>
                    </div>
                )}

                {/* Actual image with blur-up effect */}
                {!hasError && (
                    <div className={wrapperClassName}>
                        <Image
                            src={src}
                            alt={alt}
                            fill
                            priority={priority}
                            sizes={sizes || "100vw"}
                            quality={quality}
                            className={imageClassName}
                            onLoad={handleLoad}
                            onError={handleError}
                        />
                    </div>
                )}
            </>
        );
    }

    // Fixed dimensions mode
    return (
        <div
            className="relative overflow-hidden bg-muted rounded-xl"
            style={{ width, height }}
        >
            {/* Skeleton wave placeholder */}
            <div
                className={cn(
                    "absolute inset-0 skeleton-wave transition-opacity duration-500",
                    isLoaded ? "opacity-0" : "opacity-100"
                )}
            />

            {/* Error state */}
            {hasError && (
                <div className="absolute inset-0 flex items-center justify-center bg-card/80 backdrop-blur-sm">
                    <span className="text-muted-foreground text-xs">Image unavailable</span>
                </div>
            )}

            {/* Actual image */}
            {!hasError && (
                <div className={wrapperClassName}>
                    <Image
                        src={src}
                        alt={alt}
                        width={width || 600}
                        height={height || 400}
                        priority={priority}
                        sizes={sizes || "100vw"}
                        quality={quality}
                        className={imageClassName}
                        onLoad={handleLoad}
                        onError={handleError}
                    />
                </div>
            )}
        </div>
    );
}
