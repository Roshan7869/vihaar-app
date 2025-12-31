"use client";

import React, { useRef, useEffect, useState, useCallback, memo } from "react";

interface VirtualScrollProps<T> {
    items: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
    itemHeight: number;
    containerHeight: number;
    overscan?: number;
    className?: string;
    onEndReached?: () => void;
    endReachedThreshold?: number;
}

/**
 * VirtualScroll Component - 60fps Smooth Scrolling
 * 
 * Renders only visible items for optimal performance
 * Handles large lists without lag
 * 
 * @example
 * <VirtualScroll
 *   items={places}
 *   renderItem={(place) => <PlaceCard place={place} />}
 *   itemHeight={400}
 *   containerHeight={800}
 * />
 */
function VirtualScrollComponent<T extends { id: string | number }>({
    items,
    renderItem,
    itemHeight,
    containerHeight,
    overscan = 3,
    className = "",
    onEndReached,
    endReachedThreshold = 200,
}: VirtualScrollProps<T>) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollTop, setScrollTop] = useState(0);

    // Calculate visible range
    const totalHeight = items.length * itemHeight;
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const endIndex = Math.min(
        items.length,
        Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
    );

    const visibleItems = items.slice(startIndex, endIndex);
    const offsetY = startIndex * itemHeight;

    // Handle scroll
    const handleScroll = useCallback(
        (e: React.UIEvent<HTMLDivElement>) => {
            const target = e.currentTarget;
            setScrollTop(target.scrollTop);

            // Check if near end
            if (onEndReached) {
                const distanceFromEnd =
                    totalHeight - (target.scrollTop + containerHeight);
                if (distanceFromEnd < endReachedThreshold) {
                    onEndReached();
                }
            }
        },
        [totalHeight, containerHeight, endReachedThreshold, onEndReached]
    );

    return (
        <div
            ref={containerRef}
            className={`overflow-auto ${className}`}
            style={{ height: containerHeight }}
            onScroll={handleScroll}
        >
            <div style={{ height: totalHeight, position: "relative" }}>
                <div
                    style={{
                        position: "absolute",
                        top: offsetY,
                        left: 0,
                        right: 0,
                    }}
                >
                    {visibleItems.map((item, index) => (
                        <div
                            key={item.id}
                            style={{ height: itemHeight }}
                        >
                            {renderItem(item, startIndex + index)}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export const VirtualScroll = memo(VirtualScrollComponent) as typeof VirtualScrollComponent;

/**
 * Hook: Virtual list for horizontal scrolling
 */
export function useVirtualHorizontalScroll<T>(
    items: T[],
    itemWidth: number,
    containerWidth: number,
    overscan: number = 2
) {
    const [scrollLeft, setScrollLeft] = useState(0);

    const totalWidth = items.length * itemWidth;
    const startIndex = Math.max(0, Math.floor(scrollLeft / itemWidth) - overscan);
    const endIndex = Math.min(
        items.length,
        Math.ceil((scrollLeft + containerWidth) / itemWidth) + overscan
    );

    const visibleItems = items.slice(startIndex, endIndex);
    const offsetX = startIndex * itemWidth;

    const handleScroll = useCallback((scrollPosition: number) => {
        setScrollLeft(scrollPosition);
    }, []);

    return {
        visibleItems,
        startIndex,
        offsetX,
        totalWidth,
        handleScroll,
    };
}
