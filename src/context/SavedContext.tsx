"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

const SAVED_KEY = "vihaar_saved_places";

interface SavedContextValue {
  savedIds: string[];
  isSaved: (id: string) => boolean;
  toggleSaved: (id: string, metadata?: SavedPlaceMeta) => void;
  savedPlaces: SavedPlaceEntry[];
  unsave: (id: string) => void;
}

export interface SavedPlaceMeta {
  title: string;
  location: string;
  category: string;
  image: string;
}

export interface SavedPlaceEntry extends SavedPlaceMeta {
  id: string;
  savedAt: number;
}

const SavedContext = createContext<SavedContextValue | null>(null);

export function SavedProvider({ children }: { children: ReactNode }) {
  const [savedPlaces, setSavedPlaces] = useState<SavedPlaceEntry[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(SAVED_KEY);
      if (raw) {
        const parsed: SavedPlaceEntry[] = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setSavedPlaces(parsed);
        }
      }
    } catch {
      // If parsing fails, start fresh
      localStorage.removeItem(SAVED_KEY);
    }
  }, []);

  // Persist to localStorage whenever saved list changes
  useEffect(() => {
    try {
      localStorage.setItem(SAVED_KEY, JSON.stringify(savedPlaces));
    } catch {
      // localStorage might be unavailable (private browsing quotas)
    }
  }, [savedPlaces]);

  const savedIds = savedPlaces.map((p) => p.id);

  const isSaved = (id: string) => savedIds.includes(id);

  const toggleSaved = (id: string, metadata?: SavedPlaceMeta) => {
    setSavedPlaces((prev) => {
      if (prev.some((p) => p.id === id)) {
        return prev.filter((p) => p.id !== id);
      }
      const entry: SavedPlaceEntry = {
        id,
        savedAt: Date.now(),
        title: metadata?.title ?? id,
        location: metadata?.location ?? "",
        category: metadata?.category ?? "",
        image: metadata?.image ?? "",
      };
      return [entry, ...prev];
    });
  };

  const unsave = (id: string) => {
    setSavedPlaces((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <SavedContext.Provider value={{ savedIds, isSaved, toggleSaved, savedPlaces, unsave }}>
      {children}
    </SavedContext.Provider>
  );
}

export function useSaved() {
  const ctx = useContext(SavedContext);
  if (!ctx) throw new Error("useSaved must be used inside SavedProvider");
  return ctx;
}
