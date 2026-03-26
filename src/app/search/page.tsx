"use client";

import { useState, useEffect, useMemo } from "react";
import { Icon } from "@/components/ui/Icon";
import { ProgressiveImage } from "@/components/ui/ProgressiveImage";
import { Skeleton } from "@/components/ui/Skeleton";
import { BottomNav } from "@/components/nav/BottomNav";
import { cn } from "@/lib/utils";
import { hiddenGems, allExplorePlaces } from "@/lib/data";
import { Place } from "@/types";
import Link from "next/link";

const filters = ["All", "Trending", "Near You", "Top Rated", "Events"];

// Combined searchable places from all datasets
const allPlaces: Place[] = [
    ...hiddenGems,
    ...allExplorePlaces.filter(
        (p) => !hiddenGems.some((h) => h.id === p.id)
    ),
];

function sanitize(input: string): string {
    return input.replace(/[<>"'&]/g, "").trim();
}

function filterPlaces(places: Place[], query: string, filter: string): Place[] {
    const q = sanitize(query).toLowerCase();

    return places.filter((place) => {
        // Text search
        const matchesQuery =
            !q ||
            place.title.toLowerCase().includes(q) ||
            (place.subtitle ?? "").toLowerCase().includes(q) ||
            place.location.toLowerCase().includes(q) ||
            place.district.toLowerCase().includes(q) ||
            place.category.toLowerCase().includes(q) ||
            (place.tags ?? []).some((t) => t.toLowerCase().includes(q));

        // Filter chip
        let matchesFilter = true;
        if (filter === "Top Rated") {
            matchesFilter = place.rating >= 4.5;
        } else if (filter === "Trending") {
            matchesFilter = place.rating >= 4.4;
        } else if (filter === "Events") {
            matchesFilter = place.category === "festival" || place.category === "event";
        } else if (filter === "Near You") {
            // Sort by distance when "Near You" — show all, sorted later
            matchesFilter = true;
        }

        return matchesQuery && matchesFilter;
    });
}

const INITIAL_LOAD = 6;
const LOAD_DELAY = 150;

function SearchResultSkeleton() {
    return (
        <div className="aspect-[3/4] rounded-2xl overflow-hidden relative bg-card">
            <Skeleton className="absolute inset-0 rounded-none" />
            <div className="absolute bottom-3 left-3 right-3 space-y-2">
                <Skeleton className="w-12 h-4 rounded-full" />
                <Skeleton className="w-3/4 h-5" variant="text" />
                <Skeleton className="w-1/2 h-3" variant="text" />
            </div>
        </div>
    );
}

export default function SearchPage() {
    const [activeFilter, setActiveFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [showCount, setShowCount] = useState(INITIAL_LOAD);

    const filteredResults = useMemo(
        () => filterPlaces(allPlaces, searchQuery, activeFilter),
        [searchQuery, activeFilter]
    );

    const displayedResults = filteredResults.slice(0, showCount);

    // Simulate initial load for shimmer visibility
    useEffect(() => {
        setIsLoading(true);
        setShowCount(INITIAL_LOAD);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, LOAD_DELAY);
        return () => clearTimeout(timer);
    }, [activeFilter]);

    // Reset show count when query changes (no skeleton needed for query)
    useEffect(() => {
        setShowCount(INITIAL_LOAD);
    }, [searchQuery]);

    return (
        <div className="flex justify-center bg-background min-h-screen">
            <div className="max-w-[420px] w-full min-h-screen relative">
                <div className="min-h-screen pb-24">
                    {/* Header */}
                    <div className="sticky top-0 z-40 glass-header px-5 pt-4 pb-3">
                        <div className="flex items-center gap-3">
                            <Link
                                href="/"
                                aria-label="Go back"
                                className="w-10 h-10 flex items-center justify-center press"
                            >
                                <Icon name="arrow_back" />
                            </Link>
                            <div className="flex-1 relative">
                                <label htmlFor="search-input" className="sr-only">
                                    Search destinations
                                </label>
                                <input
                                    id="search-input"
                                    type="search"
                                    placeholder="Search destinations, events..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    autoFocus
                                    maxLength={100}
                                    autoComplete="off"
                                    spellCheck={false}
                                    className="w-full h-12 bg-card rounded-xl px-4 pr-10 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                />
                                {searchQuery ? (
                                    <button
                                        onClick={() => setSearchQuery("")}
                                        aria-label="Clear search"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        <Icon name="close" size="md" />
                                    </button>
                                ) : (
                                    <Icon
                                        name="search"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                                        size="md"
                                    />
                                )}
                            </div>
                        </div>

                        {/* Filters */}
                        <div
                            className="flex gap-2 overflow-x-auto no-scrollbar mt-4 -mx-5 px-5"
                            role="group"
                            aria-label="Filter results"
                        >
                            {filters.map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    aria-pressed={activeFilter === filter}
                                    className={cn(
                                        "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all press",
                                        activeFilter === filter
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-card text-muted-foreground"
                                    )}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Results Grid */}
                    <div className="px-5 pt-4">
                        {/* Result count */}
                        {!isLoading && (
                            <p className="text-xs text-muted-foreground mb-3">
                                {filteredResults.length === 0
                                    ? "No results found"
                                    : `${filteredResults.length} destination${filteredResults.length === 1 ? "" : "s"} found`}
                            </p>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            {isLoading ? (
                                <>
                                    <SearchResultSkeleton />
                                    <SearchResultSkeleton />
                                    <SearchResultSkeleton />
                                    <SearchResultSkeleton />
                                </>
                            ) : filteredResults.length === 0 ? (
                                <div className="col-span-2 flex flex-col items-center justify-center py-16 text-muted-foreground">
                                    <Icon name="search_off" size="xl" className="mb-3 opacity-40" />
                                    <p className="font-semibold">No destinations found</p>
                                    <p className="text-sm mt-1">Try a different search term or filter</p>
                                </div>
                            ) : (
                                displayedResults.map((result, index) => (
                                    <Link
                                        key={result.id}
                                        href={`/places/${result.id}`}
                                        className="aspect-[3/4] rounded-2xl overflow-hidden relative press cursor-pointer animate-fade-in group"
                                        style={{ animationDelay: `${index * 50}ms` }}
                                    >
                                        <ProgressiveImage
                                            src={result.images[0]}
                                            alt={result.title}
                                            fill
                                            sizes="(max-width: 420px) 50vw, 210px"
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 gradient-overlay" />
                                        <div className="absolute bottom-3 left-3 right-3">
                                            <span className="text-[9px] bg-primary/80 px-2 py-0.5 rounded-full font-bold uppercase text-primary-foreground">
                                                {result.category}
                                            </span>
                                            <h4 className="mt-1 font-bold text-sm leading-tight line-clamp-2 text-foreground">
                                                {result.title}
                                            </h4>
                                            <div className="flex items-center gap-1 mt-0.5 text-muted-foreground">
                                                <Icon name="location_on" size="sm" className="text-[12px]" />
                                                <span className="text-[11px]">{result.location}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            )}
                        </div>

                        {/* Load more */}
                        {!isLoading && displayedResults.length < filteredResults.length && (
                            <button
                                onClick={() => setShowCount((c) => c + INITIAL_LOAD)}
                                className="mt-4 w-full py-3 glass rounded-full text-center text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors press"
                            >
                                Show more ({filteredResults.length - displayedResults.length} remaining)
                            </button>
                        )}
                    </div>
                </div>

                <BottomNav />
            </div>
        </div>
    );
}
