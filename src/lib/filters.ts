import { Place, FeaturedPlace, PlaceCategory } from "@/types";

/**
 * Filter Utilities for Category-based Filtering
 */

/**
 * Map filter ID to place categories
 */
export function mapFilterToCategories(filterId: string): PlaceCategory[] | null {
    const categoryMap: Record<string, PlaceCategory[]> = {
        all: [], // Empty array means show all
        temples: ["temple"],
        tribal: ["tribal"],
        food: ["food"],
        nature: ["nature", "waterfalls"],
        historical: ["historical", "heritage"],
        trending: [], // Handle separately by rating
    };

    return categoryMap[filterId] || null;
}

/**
 * Filter places by selected category
 */
export function filterPlacesByCategory<T extends Place | FeaturedPlace>(
    places: T[],
    filterId: string
): T[] {
    // Show all places
    if (filterId === "all") {
        return places;
    }

    // Trending filter - show places with rating >= 4.5
    if (filterId === "trending") {
        return places.filter((place) => (place.rating || 0) >= 4.5);
    }

    // Category-based filtering
    const categories = mapFilterToCategories(filterId);
    if (!categories || categories.length === 0) {
        return places;
    }

    return places.filter((place) =>
        categories.includes(place.category as PlaceCategory)
    );
}

/**
 * Get count of places for each category
 */
export function getCategoryCount<T extends Place | FeaturedPlace>(
    places: T[],
    filterId: string
): number {
    return filterPlacesByCategory(places, filterId).length;
}

/**
 * Check if a filter has any results
 */
export function hasFilterResults<T extends Place | FeaturedPlace>(
    places: T[],
    filterId: string
): boolean {
    return getCategoryCount(places, filterId) > 0;
}

/**
 * Get display name for category
 */
export function getCategoryDisplayName(filterId: string): string {
    const displayNames: Record<string, string> = {
        all: "All Places",
        temples: "Temples",
        tribal: "Tribal Art & Culture",
        food: "Food & Cuisine",
        nature: "Nature & Waterfalls",
        historical: "Historical Sites",
        trending: "Trending Now",
    };

    return displayNames[filterId] || filterId;
}

/**
 * Sort places by rating (highest first)
 */
export function sortPlacesByRating<T extends Place | FeaturedPlace>(
    places: T[]
): T[] {
    return [...places].sort((a, b) => (b.rating || 0) - (a.rating || 0));
}

/**
 * Sort places by distance (if available)
 */
export function sortPlacesByDistance<T extends Place | FeaturedPlace>(
    places: T[]
): T[] {
    return [...places].sort((a, b) => {
        const distanceA = parseFloat((a as any).distance || "999");
        const distanceB = parseFloat((b as any).distance || "999");
        return distanceA - distanceB;
    });
}
