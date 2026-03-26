"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Icon } from "@/components/ui/Icon";
import { Skeleton } from "@/components/ui/Skeleton";
import { DestinationCard } from "@/components/ui/DestinationCard";
import { cn } from "@/lib/utils";
import { bhilaiPlaces, hiddenGems } from "@/lib/data";
import { Place } from "@/types";

// Merge bhilai places and hidden gems (de-duped) for the nearby feed
const allNearbyPlaces: Place[] = [
    ...bhilaiPlaces,
    ...hiddenGems.filter((h) => !bhilaiPlaces.some((b) => b.id === h.id)),
];

const categoryMap: Record<string, string> = {
    temple: "Temple",
    nature: "Nature",
    food: "Food",
    heritage: "Heritage",
    festival: "Festival",
    tribal: "Tribal",
    caves: "Caves",
    waterfalls: "Nature",
    historical: "Heritage",
    art_craft: "Art & Craft",
    event: "Events",
};

const categories = [
    { id: "all", label: "All", icon: "category" },
    { id: "temple", label: "Temple", icon: "temple_hindu" },
    { id: "nature", label: "Nature", icon: "forest" },
    { id: "food", label: "Food", icon: "restaurant" },
    { id: "heritage", label: "Heritage", icon: "account_balance" },
    { id: "tribal", label: "Tribal", icon: "diversity_3" },
];

// Configuration for chunk loading
const INITIAL_ITEMS = 2;
const CHUNK_SIZE = 2;
const LOAD_DELAY = 300; // ms delay to show loading effect

interface ChunkedNearbyFeedProps {
    onItemClick?: (id: string) => void;
    onViewAll?: () => void;
    onLoadComplete?: () => void; // Callback when initial load completes
}

/**
 * Skeleton for a single nearby item card
 */
function NearbyItemSkeleton() {
    return (
        <div className="rounded-3xl overflow-hidden bg-card border border-white/5">
            <div className="relative aspect-[15/16]">
                <Skeleton className="absolute inset-0 rounded-none" />
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    <Skeleton className="w-16 h-8 rounded-full" />
                    <Skeleton className="w-20 h-8 rounded-full" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5 space-y-3">
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

export const ChunkedNearbyFeed = ({ onItemClick, onViewAll, onLoadComplete }: ChunkedNearbyFeedProps) => {
    const [activeCategory, setActiveCategory] = useState("all");
    const [displayedItems, setDisplayedItems] = useState<Place[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);

    // Ref for the sentinel element (triggers loading when visible)
    const sentinelRef = useRef<HTMLDivElement>(null);

    // Get filtered items based on category
    const filteredItems = activeCategory === "all"
        ? allNearbyPlaces
        : allNearbyPlaces.filter((item) => {
            if (activeCategory === "nature") {
                return item.category === "nature" || item.category === "waterfalls" || item.category === "caves";
            }
            if (activeCategory === "heritage") {
                return item.category === "heritage" || item.category === "historical";
            }
            return item.category === activeCategory;
        });

    // Check if there are more items to load
    const hasMore = displayedItems.length < filteredItems.length;

    // Initial load
    useEffect(() => {
        setIsLoading(true);
        setDisplayedItems([]);

        const timer = setTimeout(() => {
            setDisplayedItems(filteredItems.slice(0, INITIAL_ITEMS));
            setIsLoading(false);
            onLoadComplete?.();
        }, LOAD_DELAY);

        return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeCategory]);

    // Load more items function
    const loadMoreItems = useCallback(() => {
        if (loadingMore || !hasMore) return;

        setLoadingMore(true);

        setTimeout(() => {
            const currentCount = displayedItems.length;
            const nextItems = filteredItems.slice(currentCount, currentCount + CHUNK_SIZE);
            setDisplayedItems(prev => [...prev, ...nextItems]);
            setLoadingMore(false);
        }, LOAD_DELAY);
    }, [displayedItems.length, filteredItems, hasMore, loadingMore]);

    // Intersection Observer for infinite scroll
    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel || isLoading) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && hasMore && !loadingMore) {
                    loadMoreItems();
                }
            },
            {
                root: null,
                rootMargin: "200px", // Start loading 200px before reaching the end
                threshold: 0,
            }
        );

        observer.observe(sentinel);

        return () => observer.disconnect();
    }, [hasMore, loadingMore, isLoading, loadMoreItems]);

    // Calculate how many skeleton placeholders to show
    const remainingCount = Math.min(
        CHUNK_SIZE,
        filteredItems.length - displayedItems.length
    );

    return (
        <section className="px-5 pt-6 pb-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-foreground">Nearby Tours</h2>
                <button
                    onClick={onViewAll}
                    className="text-primary text-sm font-semibold press"
                    aria-label="View all nearby places"
                >
                    View All
                </button>
            </div>

            {/* Category Filter Tabs */}
            <div
                className="flex gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar -mx-5 px-5"
                role="group"
                aria-label="Filter by category"
            >
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        aria-pressed={activeCategory === cat.id}
                        className={cn(
                            "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 border",
                            activeCategory === cat.id
                                ? "bg-primary text-primary-foreground border-primary shadow-md transform scale-105"
                                : "bg-card text-muted-foreground border-border hover:border-primary hover:text-primary hover:bg-primary/5"
                        )}
                    >
                        <Icon name={cat.icon} size="xs" />
                        {cat.label}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Initial loading state */}
                {isLoading ? (
                    <>
                        <NearbyItemSkeleton />
                        <NearbyItemSkeleton />
                    </>
                ) : displayedItems.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground col-span-full">
                        <Icon name="search_off" size="lg" className="mx-auto mb-2 opacity-50" />
                        <p>No places found in this category</p>
                    </div>
                ) : (
                    <>
                        {/* Displayed items with staggered animation */}
                        {displayedItems.map((item, index) => (
                            <div
                                key={item.id}
                                className="animate-reveal-up"
                                style={{
                                    animationDelay: `${(index % CHUNK_SIZE) * 0.1}s`,
                                }}
                            >
                                <DestinationCard
                                    title={item.title}
                                    imageUrl={item.images[0]}
                                    rating={item.rating}
                                    location={item.location}
                                    description={item.short_description ?? item.description}
                                    badge={categoryMap[item.category] ?? item.category}
                                    onClick={() => onItemClick?.(item.id)}
                                />
                            </div>
                        ))}

                        {/* Loading skeleton placeholders - shown automatically when loading more */}
                        {loadingMore && (
                            <>
                                {Array.from({ length: remainingCount }).map((_, i) => (
                                    <NearbyItemSkeleton key={`skeleton-${i}`} />
                                ))}
                            </>
                        )}

                        {/* Sentinel element for intersection observer - invisible trigger */}
                        {hasMore && (
                            <div ref={sentinelRef} className="h-4" aria-hidden="true" />
                        )}

                        {/* End message */}
                        {!hasMore && displayedItems.length > 0 && (
                            <p className="text-center text-sm text-muted-foreground/50 py-2 col-span-full">
                                You&apos;ve seen all places
                            </p>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};
