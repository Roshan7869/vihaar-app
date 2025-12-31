"use client";

import { createContext, useContext, useState, useMemo, ReactNode } from "react";
import { PlaceCategory } from "@/types";

interface FilterContextType {
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    resetFilter: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    const resetFilter = () => {
        setSelectedCategory("all");
    };

    const value = useMemo(
        () => ({
            selectedCategory,
            setSelectedCategory,
            resetFilter,
        }),
        [selectedCategory]
    );

    return (
        <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
    );
}

export function useFilter() {
    const context = useContext(FilterContext);
    if (context === undefined) {
        throw new Error("useFilter must be used within a FilterProvider");
    }
    return context;
}
