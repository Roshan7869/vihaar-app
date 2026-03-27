"use client";

import { useState, useMemo } from "react";
import { Icon } from "@/components/ui/Icon";
import { ProgressiveImage } from "@/components/ui/ProgressiveImage";
import { BottomNav } from "@/components/nav/BottomNav";
import { bhilaiPlaces } from "@/lib/bhilai-places";
import { cn } from "@/lib/utils";
import Link from "next/link";

const FILTER_LABELS: Record<string, string> = {
    all: "All",
    temple: "Temple",
    nature: "Nature",
    historical: "Historical",
    art_craft: "Shopping",
    event: "Industrial",
};

const filters = Object.keys(FILTER_LABELS);

function sanitizeInput(value: string): string {
    return value
        .replace(/[<>&"'`]/g, "")
        .slice(0, 100);
}

export default function SearchPage() {
    const [activeFilter, setActiveFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredResults = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        return bhilaiPlaces.filter((place) => {
            // Category filter
            const categoryMatch =
                activeFilter === "all" ||
                place.category === activeFilter;

            // Text search
            const textMatch =
                !q ||
                place.title.toLowerCase().includes(q) ||
                place.location.toLowerCase().includes(q) ||
                place.category.toLowerCase().includes(q) ||
                place.tags?.some((t) => t.toLowerCase().includes(q));

            return categoryMatch && textMatch;
        });
    }, [activeFilter, searchQuery]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(sanitizeInput(e.target.value));
    };

    const handleClear = () => setSearchQuery("");

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
                                <input
                                    type="search"
                                    placeholder="Search destinations, temples..."
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    maxLength={100}
                                    autoFocus
                                    className="w-full h-12 bg-card rounded-xl px-4 pr-10 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                />
                                {searchQuery ? (
                                    <button
                                        onClick={handleClear}
                                        aria-label="Clear search"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground press"
                                    >
                                        <Icon name="close" size="md" />
                                    </button>
                                ) : (
                                    <Icon
                                        name="search"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                        size="md"
                                    />
                                )}
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
                                    {FILTER_LABELS[filter]}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Results */}
                    <div className="px-5 pt-4">
                        <p className="text-xs text-muted-foreground mb-3">
                            {filteredResults.length === 0
                                ? "No results found"
                                : `${filteredResults.length} place${filteredResults.length !== 1 ? "s" : ""} found`}
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            {filteredResults.length === 0 ? (
                                <div className="col-span-2 flex flex-col items-center justify-center py-16 text-muted-foreground">
                                    <Icon name="search_off" size="xl" className="mb-3 opacity-40" />
                                    <p className="font-semibold text-base">No places found</p>
                                    <p className="text-sm mt-1 text-center">
                                        Try a different search term or category
                                    </p>
                                    {searchQuery && (
                                        <button
                                            onClick={handleClear}
                                            className="mt-4 px-5 py-2 bg-primary text-primary-foreground rounded-full text-sm font-semibold press"
                                        >
                                            Clear Search
                                        </button>
                                    )}
                                </div>
                            ) : (
                                filteredResults.map((result, index) => (
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
                    </div>
                </div>

                <BottomNav />
            </div>
        </div>
    );
}
