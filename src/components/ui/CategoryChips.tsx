"use client";

import { CategoryFilter } from "@/types";
import { cn } from "@/lib/utils";

interface CategoryChipsProps {
    categories: CategoryFilter[];
    onSelect?: (category: CategoryFilter) => void;
}

export function CategoryChips({ categories, onSelect }: CategoryChipsProps) {
    return (
        <div className="flex gap-2.5 overflow-x-auto hide-scrollbar pb-1">
            {categories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => onSelect?.(category)}
                    className={cn(
                        "flex items-center justify-center rounded-full px-5 py-2 text-sm font-medium shrink-0 border transition-all whitespace-nowrap",
                        category.isActive
                            ? "bg-primary text-white shadow-lg shadow-primary/20 border-transparent font-semibold"
                            : "bg-surface-dark text-white/70 border-white/5 hover:bg-white/5 hover:border-white/20"
                    )}
                >
                    {category.label}
                </button>
            ))}
        </div>
    );
}
