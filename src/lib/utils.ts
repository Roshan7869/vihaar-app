import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx and tailwind-merge for optimal class merging
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Format distance string
 */
export function formatDistance(km: number): string {
    if (km < 1) {
        return `${Math.round(km * 1000)} m`;
    }
    return `${km} km`;
}

/**
 * Format rating to one decimal place
 */
export function formatRating(rating: number): string {
    return rating.toFixed(1);
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + "...";
}

/**
 * Format a category string for display (replaces underscores with spaces, title-cases)
 */
export function formatCategory(category: string): string {
    return category
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
}
