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
 * Progressive Image Component with shimmer loading
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

    // Common image props
    const imageClassName = cn(
        "transition-opacity duration-500",
        isLoaded ? "opacity-100" : "opacity-0",
        className
    );

    if (fill) {
        return (
            <>
                {/* Shimmer placeholder */}
                {!isLoaded && (
                    <div className="absolute inset-0 shimmer bg-muted" />
                )}

                {/* Error state */}
                {hasError && (
                    <div className="absolute inset-0 flex items-center justify-center bg-card">
                        <span className="text-muted-foreground text-sm">Image unavailable</span>
                    </div>
                )}

                {/* Actual image */}
                {!hasError && (
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
                )}
            </>
        );
    }

    // Fixed dimensions mode
    return (
        <div className="relative overflow-hidden bg-muted" style={{ width, height }}>
            {/* Shimmer placeholder */}
            {!isLoaded && (
                <div className="absolute inset-0 shimmer bg-muted" />
            )}

            {/* Error state */}
            {hasError && (
                <div className="absolute inset-0 flex items-center justify-center bg-card">
                    <span className="text-muted-foreground text-xs">Image unavailable</span>
                </div>
            )}

            {/* Actual image */}
            {!hasError && (
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
            )}
        </div>
    );
}
