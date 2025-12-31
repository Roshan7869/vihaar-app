"use client";

import React, { useRef, useEffect, useState, useCallback, memo, ReactNode } from "react";

interface InfiniteScrollProps<T> {
    items: T[];
    renderItem: (item: T, index: number) => ReactNode;
    loadMore: () => void;
    hasMore: boolean;
    isLoading?: boolean;
    threshold?: number;
    className?: string;
    loadingComponent?: ReactNode;
    endComponent?: ReactNode;
    keyExtractor: (item: T) => string | number;
}

/**
 * InfiniteScroll Component - Smooth Infinite Loading
 * 
 * Uses Intersection Observer for sentinel-based loading
 * Provides smooth 60fps scrolling performance
 * 
 * Features:
 * - Sentinel-based loading (loads when sentinel is visible)
 * - Configurable threshold for when to trigger load
 * - Loading and end-of-list indicators
 * - Smooth performance with memo optimization
 * 
 * @example
 * <InfiniteScroll
 *   items={places}
 *   renderItem={(place) => <PlaceCard place={place} />}
 *   loadMore={() => fetchMorePlaces()}
 *   hasMore={hasMorePlaces}
 *   isLoading={isLoading}
 *   keyExtractor={(place) => place.id}
 * />
 */
function InfiniteScrollComponent<T>({
    items,
    renderItem,
    loadMore,
    hasMore,
    isLoading = false,
    threshold = 200,
    className = "",
    loadingComponent,
    endComponent,
    keyExtractor,
}: InfiniteScrollProps<T>) {
    const sentinelRef = useRef<HTMLDivElement>(null);
    const loadMoreRef = useRef(loadMore);
    const [isIntersecting, setIsIntersecting] = useState(false);

    // Keep loadMore ref updated
    useEffect(() => {
        loadMoreRef.current = loadMore;
    }, [loadMore]);

    // Intersection Observer for sentinel
    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting);
            },
            {
                root: null,
                rootMargin: `${threshold}px`,
                threshold: 0,
            }
        );

        observer.observe(sentinel);

        return () => {
            observer.disconnect();
        };
    }, [threshold]);

    // Trigger load when sentinel is visible
    useEffect(() => {
        if (isIntersecting && hasMore && !isLoading) {
            loadMoreRef.current();
        }
    }, [isIntersecting, hasMore, isLoading]);

    // Default loading component
    const defaultLoadingComponent = (
        <div className="flex items-center justify-center py-8">
            <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" />
                <span className="text-white/60 text-sm">Loading more...</span>
            </div>
        </div>
    );

    // Default end component
    const defaultEndComponent = (
        <div className="flex items-center justify-center py-8">
            <span className="text-white/40 text-sm">You've reached the end</span>
        </div>
    );

    return (
        <div className={className}>
            {/* Render all items */}
            {items.map((item, index) => (
                <div key={keyExtractor(item)}>
                    {renderItem(item, index)}
                </div>
            ))}

            {/* Sentinel element - triggers load when visible */}
            <div ref={sentinelRef} className="h-1" aria-hidden="true" />

            {/* Loading indicator */}
            {isLoading && (loadingComponent || defaultLoadingComponent)}

            {/* End of list indicator */}
            {!hasMore && !isLoading && items.length > 0 && (endComponent || defaultEndComponent)}
        </div>
    );
}

export const InfiniteScroll = memo(InfiniteScrollComponent) as typeof InfiniteScrollComponent;

/**
 * Hook: useInfiniteScroll
 * 
 * Provides infinite scroll functionality for any container
 * Returns ref and status for custom implementations
 * 
 * @example
 * const { ref, isNearEnd } = useInfiniteScroll({
 *   threshold: 200,
 *   onEndReached: () => loadMore()
 * });
 */
export function useInfiniteScroll(options: {
    threshold?: number;
    onEndReached?: () => void;
    disabled?: boolean;
}): {
    ref: React.RefObject<HTMLDivElement | null>;
    isNearEnd: boolean;
} {
    const { threshold = 200, onEndReached, disabled = false } = options;
    const ref = useRef<HTMLDivElement>(null);
    const [isNearEnd, setIsNearEnd] = useState(false);
    const onEndReachedRef = useRef(onEndReached);

    // Keep callback ref updated
    useEffect(() => {
        onEndReachedRef.current = onEndReached;
    }, [onEndReached]);

    // Intersection Observer
    useEffect(() => {
        if (disabled) return;

        const sentinel = ref.current;
        if (!sentinel) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                const nearEnd = entry.isIntersecting;
                setIsNearEnd(nearEnd);

                if (nearEnd && onEndReachedRef.current) {
                    onEndReachedRef.current();
                }
            },
            {
                root: null,
                rootMargin: `${threshold}px`,
                threshold: 0,
            }
        );

        observer.observe(sentinel);

        return () => {
            observer.disconnect();
        };
    }, [threshold, disabled]);

    return { ref, isNearEnd };
}

/**
 * Hook: usePagination
 * 
 * Manages pagination state for infinite scroll
 * 
 * @example
 * const { page, hasMore, setHasMore, nextPage, reset } = usePagination();
 */
export function usePagination(initialPage: number = 1) {
    const [page, setPage] = useState(initialPage);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const nextPage = useCallback(() => {
        setPage((prev) => prev + 1);
    }, []);

    const reset = useCallback(() => {
        setPage(initialPage);
        setHasMore(true);
        setIsLoading(false);
    }, [initialPage]);

    return {
        page,
        hasMore,
        setHasMore,
        isLoading,
        setIsLoading,
        nextPage,
        reset,
    };
}
