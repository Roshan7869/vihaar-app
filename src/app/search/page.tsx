"use client";

import { useState, useEffect } from "react";
import { Icon } from "@/components/ui/Icon";
import { ProgressiveImage } from "@/components/ui/ProgressiveImage";
import { Skeleton } from "@/components/ui/Skeleton";
import { BottomNav } from "@/components/nav/BottomNav";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface SearchResult {
    id: string;
    image: string;
    category: string;
    title: string;
    location: string;
}

const filters = ["All", "Trending", "Near You", "Top Rated", "Events"];

const searchResults: SearchResult[] = [
    {
        id: "1",
        image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=400",
        category: "Nature",
        title: "Chitrakote Falls",
        location: "Bastar, CG",
    },
    {
        id: "2",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
        category: "Mountains",
        title: "Valley of Flowers",
        location: "Uttarakhand",
    },
    {
        id: "3",
        image: "https://images.unsplash.com/photo-1584559582128-b8be739912e4?w=400",
        category: "Heritage",
        title: "Bhoramdeo Temple",
        location: "Kawardha, CG",
    },
    {
        id: "4",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400",
        category: "Wildlife",
        title: "Kanger Valley",
        location: "Jagdalpur, CG",
    },
    {
        id: "5",
        image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400",
        category: "Nature",
        title: "Tirathgarh Falls",
        location: "Bastar, CG",
    },
    {
        id: "6",
        image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400",
        category: "Adventure",
        title: "Coorg Trails",
        location: "Karnataka",
    },
];

const INITIAL_LOAD = 4;
const LOAD_DELAY = 200;

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
    const [displayedResults, setDisplayedResults] = useState(searchResults.slice(0, INITIAL_LOAD));

    // Simulate initial load for shimmer visibility
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setDisplayedResults(searchResults.slice(0, INITIAL_LOAD));
            setIsLoading(false);
        }, LOAD_DELAY);
        return () => clearTimeout(timer);
    }, [activeFilter]);

    return (
        <div className="flex justify-center bg-background min-h-screen">
            <div className="max-w-[420px] w-full min-h-screen relative">
                <div className="min-h-screen pb-24">
                    {/* Header */}
                    <div className="sticky top-0 z-40 glass-header px-5 pt-4 pb-3">
                        <div className="flex items-center gap-3">
                            <Link
                                href="/"
                                className="w-10 h-10 flex items-center justify-center press"
                            >
                                <Icon name="arrow_back" />
                            </Link>
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    placeholder="Search destinations, events..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    autoFocus
                                    className="w-full h-12 bg-card rounded-xl px-4 pr-10 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                />
                                <Icon
                                    name="search"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                    size="md"
                                />
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="flex gap-2 overflow-x-auto no-scrollbar mt-4 -mx-5 px-5">
                            {filters.map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
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
                        <div className="grid grid-cols-2 gap-4">
                            {isLoading ? (
                                <>
                                    <SearchResultSkeleton />
                                    <SearchResultSkeleton />
                                    <SearchResultSkeleton />
                                    <SearchResultSkeleton />
                                </>
                            ) : (
                                displayedResults.map((result, index) => (
                                    <Link
                                        key={result.id}
                                        href={`/places/${result.id}`}
                                        className="aspect-[3/4] rounded-2xl overflow-hidden relative press cursor-pointer animate-fade-in group"
                                        style={{ animationDelay: `${index * 50}ms` }}
                                    >
                                        <ProgressiveImage
                                            src={result.image}
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

                        {/* Load more for remaining results */}
                        {!isLoading && displayedResults.length < searchResults.length && (
                            <button
                                onClick={() => setDisplayedResults(searchResults)}
                                className="mt-4 w-full py-3 glass rounded-full text-center text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors press"
                            >
                                Show all results ({searchResults.length - displayedResults.length} more)
                            </button>
                        )}
                    </div>
                </div>

                <BottomNav />
            </div>
        </div>
    );
}
