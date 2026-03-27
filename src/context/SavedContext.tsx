"use client";

import { createContext, useContext, useState, useEffect, useCallback, useMemo, ReactNode } from "react";
import { Place } from "@/types";

interface SavedContextType {
    savedPlaces: Place[];
    savedIds: Set<string>;
    savePlace: (place: Place) => void;
    unsavePlace: (id: string) => void;
    toggleSaved: (place: Place) => void;
    isSaved: (id: string) => boolean;
    savedCount: number;
}

const SavedContext = createContext<SavedContextType | undefined>(undefined);

const STORAGE_KEY = "vihaar_saved_places";

export function SavedProvider({ children }: { children: ReactNode }) {
    const [savedPlaces, setSavedPlaces] = useState<Place[]>([]);
    const [hydrated, setHydrated] = useState(false);

    // Hydrate from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                // localStorage hydration — setState in effect is the correct pattern here
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setSavedPlaces(JSON.parse(stored) as Place[]);
            }
        } catch {
            // Ignore parse errors
        }
        setHydrated(true);
    }, []);

    // Persist to localStorage whenever savedPlaces changes (after hydration)
    useEffect(() => {
        if (!hydrated) return;
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(savedPlaces));
        } catch {
            // Ignore storage errors
        }
    }, [savedPlaces, hydrated]);

    const savedIds = useMemo(() => new Set(savedPlaces.map((p) => p.id)), [savedPlaces]);

    const savePlace = useCallback((place: Place) => {
        setSavedPlaces((prev) => {
            if (prev.some((p) => p.id === place.id)) return prev;
            return [place, ...prev];
        });
    }, []);

    const unsavePlace = useCallback((id: string) => {
        setSavedPlaces((prev) => prev.filter((p) => p.id !== id));
    }, []);

    const toggleSaved = useCallback(
        (place: Place) => {
            if (savedIds.has(place.id)) {
                unsavePlace(place.id);
            } else {
                savePlace(place);
            }
        },
        [savedIds, savePlace, unsavePlace]
    );

    const isSaved = useCallback((id: string) => savedIds.has(id), [savedIds]);

    const value = useMemo(
        () => ({
            savedPlaces,
            savedIds,
            savePlace,
            unsavePlace,
            toggleSaved,
            isSaved,
            savedCount: savedPlaces.length,
        }),
        [savedPlaces, savedIds, savePlace, unsavePlace, toggleSaved, isSaved]
    );

    return <SavedContext.Provider value={value}>{children}</SavedContext.Provider>;
}

export function useSaved() {
    const context = useContext(SavedContext);
    if (context === undefined) {
        throw new Error("useSaved must be used within a SavedProvider");
    }
    return context;
}
