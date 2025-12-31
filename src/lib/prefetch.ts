"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/**
 * Smart Prefetching Utility
 * Preloads images and data based on connection speed
 */

interface PrefetchOptions {
    onlyFastConnection?: boolean;
    priority?: "high" | "low";
}

/**
 * Check if user has fast connection
 */
function isFastConnection(): boolean {
    if (typeof navigator === "undefined") return true;

    const connection = (navigator as any).connection;
    if (!connection) return true;

    const effectiveType = connection.effectiveType;
    return effectiveType === "4g" || effectiveType === "wifi";
}

/**
 * Prefetch images when browser is idle
 */
export function prefetchImages(
    urls: string[],
    options: PrefetchOptions = {}
): void {
    const { onlyFastConnection = true, priority = "low" } = options;

    if (typeof window === "undefined") return;
    if (onlyFastConnection && !isFastConnection()) return;

    const prefetch = () => {
        urls.forEach((url) => {
            const link = document.createElement("link");
            link.rel = "prefetch";
            link.as = "image";
            link.href = url;
            if (priority === "high") {
                link.setAttribute("fetchpriority", "high");
            }
            document.head.appendChild(link);
        });
    };

    if ("requestIdleCallback" in window) {
        requestIdleCallback(prefetch, { timeout: 2000 });
    } else {
        setTimeout(prefetch, 100);
    }
}

/**
 * Prefetch page routes for instant navigation
 */
export function prefetchRoutes(routes: string[]): void {
    if (typeof window === "undefined") return;

    routes.forEach((route) => {
        const link = document.createElement("link");
        link.rel = "prefetch";
        link.href = route;
        document.head.appendChild(link);
    });
}

/**
 * Hook: Prefetch next items in a list
 */
export function usePrefetchNext<T extends { id: string; images: string[] }>(
    items: T[],
    currentIndex: number,
    count: number = 3
): void {
    useEffect(() => {
        if (!isFastConnection()) return;

        const nextItems = items.slice(currentIndex + 1, currentIndex + 1 + count);
        const imagesToPrefetch = nextItems.flatMap((item) => item.images.slice(0, 2));

        prefetchImages(imagesToPrefetch, { priority: "low" });
    }, [items, currentIndex, count]);
}

/**
 * Hook: Intersection observer for lazy loading
 */
export function useIntersectionObserver(
    options: IntersectionObserverInit = {}
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
    }, []);

    return [ref, isVisible];
}

/**
 * Hook: Preload critical resources on mount
 */
export function usePreloadCritical(resources: string[]): void {
    useEffect(() => {
        resources.forEach((url) => {
            const link = document.createElement("link");
            link.rel = "preload";
            link.as = url.match(/\.(jpg|png|webp|avif)$/i) ? "image" : "fetch";
            link.href = url;
            document.head.appendChild(link);
        });
    }, []);
}
