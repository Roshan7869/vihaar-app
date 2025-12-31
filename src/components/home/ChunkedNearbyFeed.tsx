"use client";

import { useState, useEffect, useCallback } from "react";
import { Icon } from "@/components/ui/Icon";
import { ProgressiveImage } from "@/components/ui/ProgressiveImage";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";

interface NearbyItem {
    id: string;
    image: string;
    rating: number;
    category: string;
    title: string;
    location: string;
    distance: string;
    description: string;
}

const allNearbyItems: NearbyItem[] = [
    {
        id: "1",
        image: "https://images.unsplash.com/photo-1584559582128-b8be739912e4?w=800",
        rating: 4.8,
        category: "Temple",
        title: "Danteshwari Temple",
        location: "Dantewada, Chhattisgarh",
        distance: "2.5 km",
        description: "One of the 52 Shakti Peeths, dedicated to Goddess Danteshwari, the presiding deity of Bastar.",
    },
    {
        id: "2",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
        rating: 4.5,
        category: "Nature",
        title: "Kanger Valley National Park",
        location: "Jagdalpur, Chhattisgarh",
        distance: "12 km",
        description: "Biosphere reserve with limestone caves, waterfalls, and diverse flora fauna including hill mynas.",
    },
    {
        id: "3",
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
        rating: 4.2,
        category: "Food",
        title: "Tribal Kitchen",
        location: "Jagdalpur Market, Chhattisgarh",
        distance: "0.8 km",
        description: "Authentic Bastar tribal cuisine featuring local delicacies like bamboo chicken and red ant chutney.",
    },
    {
        id: "4",
        image: "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=800",
        rating: 4.6,
        category: "Museum",
        title: "Anthropological Museum",
        location: "Jagdalpur, Chhattisgarh",
        distance: "3.2 km",
        description: "Showcasing rich tribal heritage, artifacts, and cultural traditions of Bastar region.",
    },
    {
        id: "5",
        image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800",
        rating: 4.9,
        category: "Nature",
        title: "Tirathgarh Falls",
        location: "Jagdalpur, Chhattisgarh",
        distance: "8 km",
        description: "A 300ft cascading waterfall through lush green forests, perfect for nature photography.",
    },
    {
        id: "6",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
        rating: 4.4,
        category: "Nature",
        title: "Kutumsar Cave",
        location: "Kanger Valley, Chhattisgarh",
        distance: "15 km",
        description: "One of the longest natural caves in India with stunning stalactite and stalagmite formations.",
    },
];

const categories = [
    { id: "all", label: "All", icon: "category" },
    { id: "Temple", label: "Temple", icon: "temple_hindu" },
    { id: "Nature", label: "Nature", icon: "forest" },
    { id: "Food", label: "Food", icon: "restaurant" },
    { id: "Museum", label: "Museum", icon: "museum" },
    { id: "Heritage", label: "Heritage", icon: "account_balance" },
];

// Configuration for chunk loading
const INITIAL_ITEMS = 2;
const CHUNK_SIZE = 2;
const LOAD_DELAY = 300; // ms delay to simulate/show loading effect

interface ChunkedNearbyFeedProps {
    onItemClick?: (id: string) => void;
    onViewAll?: () => void;
}

/**
 * Skeleton for a single nearby item card
 */
function NearbyItemSkeleton() {
    return (
        <div className="rounded-3xl overflow-hidden bg-card border border-white/5">
            <div className="relative aspect-[15/16]">
                <Skeleton className="absolute inset-0 rounded-none" />
                {/* Top overlay with rating skeleton */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    <Skeleton className="w-16 h-8 rounded-full" />
                    <Skeleton className="w-20 h-8 rounded-full" />
                </div>
                {/* Bottom content skeleton */}
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

export const ChunkedNearbyFeed = ({ onItemClick, onViewAll }: ChunkedNearbyFeedProps) => {
    const [activeCategory, setActiveCategory] = useState("all");
    const [displayedItems, setDisplayedItems] = useState<NearbyItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);

    // Get filtered items based on category
    const filteredItems = activeCategory === "all"
        ? allNearbyItems
        : allNearbyItems.filter(item => item.category === activeCategory);

    // Check if there are more items to load
    const hasMore = displayedItems.length < filteredItems.length;

    // Initial load
    useEffect(() => {
        setIsLoading(true);
        setDisplayedItems([]);

        // Simulate initial load delay for shimmer effect visibility
        const timer = setTimeout(() => {
            setDisplayedItems(filteredItems.slice(0, INITIAL_ITEMS));
            setIsLoading(false);
        }, LOAD_DELAY);

        return () => clearTimeout(timer);
    }, [activeCategory]);

    // Load more items
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
                >
                    View All
                </button>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex gap-2 mb-5 overflow-x-auto pb-2 no-scrollbar -mx-5 px-5">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={cn(
                            "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all press",
                            activeCategory === cat.id
                                ? "bg-primary text-primary-foreground"
                                : "glass text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <Icon name={cat.icon} size="xs" />
                        {cat.label}
                    </button>
                ))}
            </div>

            <div className="flex flex-col gap-4">
                {/* Initial loading state */}
                {isLoading ? (
                    <>
                        <NearbyItemSkeleton />
                        <NearbyItemSkeleton />
                    </>
                ) : displayedItems.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                        <Icon name="search_off" size="lg" className="mx-auto mb-2 opacity-50" />
                        <p>No places found in this category</p>
                    </div>
                ) : (
                    <>
                        {/* Displayed items with staggered animation */}
                        {displayedItems.map((item, index) => (
                            <div
                                key={item.id}
                                onClick={() => onItemClick?.(item.id)}
                                className="glass rounded-3xl overflow-hidden press cursor-pointer group animate-fade-in"
                                style={{ animationDelay: `${(index % CHUNK_SIZE) * 100}ms` }}
                            >
                                <div className="relative">
                                    <div className="relative aspect-[15/16]">
                                        <ProgressiveImage
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            sizes="(max-width: 420px) 100vw, 420px"
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>

                                    {/* Top overlay with rating */}
                                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                                        <div className="glass px-3 py-1.5 rounded-full flex items-center gap-1">
                                            <Icon name="star" size="sm" className="text-yellow-400" filled />
                                            <span className="text-sm font-bold text-foreground">{item.rating}</span>
                                        </div>
                                        <div className="glass px-3 py-1.5 rounded-full flex items-center gap-1">
                                            <Icon name="near_me" size="sm" className="text-primary" />
                                            <span className="text-sm font-medium text-foreground">{item.distance}</span>
                                        </div>
                                    </div>

                                    {/* Bottom content overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 p-5 gradient-card">
                                        {/* Category */}
                                        <span className="text-xs bg-primary/90 px-3 py-1 rounded-full font-bold uppercase tracking-wide text-primary-foreground inline-block mb-3">
                                            {item.category}
                                        </span>

                                        {/* Title */}
                                        <h3 className="text-xl font-extrabold leading-tight mb-2 text-foreground">
                                            {item.title}
                                        </h3>

                                        {/* Location */}
                                        <div className="flex items-center gap-1 text-muted-foreground mb-3">
                                            <Icon name="location_on" size="sm" />
                                            <span className="text-sm">{item.location}</span>
                                        </div>

                                        {/* Description */}
                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                            {item.description}
                                        </p>

                                        {/* Action button */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onItemClick?.(item.id);
                                            }}
                                            className="mt-4 bg-primary text-primary-foreground px-5 py-2 rounded-full font-bold text-sm press transition-all hover:bg-primary/90 flex items-center gap-2"
                                        >
                                            <Icon name="explore" size="sm" />
                                            Explore
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Loading skeleton placeholders for next chunk */}
                        {loadingMore && (
                            <>
                                {Array.from({ length: remainingCount }).map((_, i) => (
                                    <NearbyItemSkeleton key={`skeleton-${i}`} />
                                ))}
                            </>
                        )}

                        {/* Load More Button */}
                        {hasMore && !loadingMore && (
                            <button
                                onClick={loadMoreItems}
                                className="mt-2 py-3 glass rounded-full text-center text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors press"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    <Icon name="expand_more" size="sm" />
                                    Load More ({filteredItems.length - displayedItems.length} remaining)
                                </span>
                            </button>
                        )}

                        {/* End message */}
                        {!hasMore && displayedItems.length > 0 && (
                            <p className="text-center text-sm text-muted-foreground/50 py-2">
                                You've seen all places
                            </p>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};
