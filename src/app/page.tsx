"use client";

import { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/nav/BottomNav";
import { FeaturedCarousel } from "@/components/home/FeaturedCarousel";
import { ChunkedNearbyFeed } from "@/components/home/ChunkedNearbyFeed";
import { registerServiceWorker } from "@/lib/sw-register";

// Pages to prefetch in sequence
const PAGES_TO_PREFETCH = ["/explore", "/search", "/saved", "/profile", "/travel"];
const PREFETCH_BATCH_SIZE = 3;
const PREFETCH_DELAY = 500; // ms between batches

export default function HomePage() {
  const router = useRouter();
  const [prefetchIndex, setPrefetchIndex] = useState(0);
  const [isHomeLoaded, setIsHomeLoaded] = useState(false);

  // Register service worker on mount
  useEffect(() => {
    registerServiceWorker();
  }, []);

  // Prefetch pages in batches of 3 after home loads
  useEffect(() => {
    if (!isHomeLoaded) return;

    const prefetchNextBatch = () => {
      const startIdx = prefetchIndex;
      const endIdx = Math.min(startIdx + PREFETCH_BATCH_SIZE, PAGES_TO_PREFETCH.length);

      // Prefetch this batch
      for (let i = startIdx; i < endIdx; i++) {
        router.prefetch(PAGES_TO_PREFETCH[i]);
      }

      // If there are more pages, schedule next batch
      if (endIdx < PAGES_TO_PREFETCH.length) {
        setTimeout(() => {
          setPrefetchIndex(endIdx);
        }, PREFETCH_DELAY);
      }
    };

    prefetchNextBatch();
  }, [isHomeLoaded, prefetchIndex, router]);

  // Called when home feed completes initial load
  const handleHomeLoadComplete = useCallback(() => {
    setIsHomeLoaded(true);
  }, []);

  const handleSearchClick = () => {
    router.push("/search");
  };

  const handleExplore = (id: string) => {
    router.push(`/places/${id}`);
  };

  const handleItemClick = (id: string) => {
    router.push(`/places/${id}`);
  };

  const handleViewAll = () => {
    router.push("/search");
  };

  return (
    <div className="flex justify-center bg-background min-h-screen">
      <div className="max-w-[420px] w-full min-h-screen relative">
        {/* Background Glow */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/20 blur-[150px] pointer-events-none -z-10 rounded-full -translate-y-1/2" />

        {/* Main Content */}
        <div className="pb-24 overflow-y-auto no-scrollbar">
          <TopBar onSearchClick={handleSearchClick} />
          <FeaturedCarousel onExplore={handleExplore} />
          <ChunkedNearbyFeed
            onItemClick={handleItemClick}
            onViewAll={handleViewAll}
            onLoadComplete={handleHomeLoadComplete}
          />
        </div>

        {/* Bottom Navigation */}
        <BottomNav />
      </div>
    </div>
  );
}
