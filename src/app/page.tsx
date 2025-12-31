"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/nav/BottomNav";
import { FeaturedCarousel } from "@/components/home/FeaturedCarousel";
import { ChunkedNearbyFeed } from "@/components/home/ChunkedNearbyFeed";
import { registerServiceWorker } from "@/lib/sw-register";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    registerServiceWorker();
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
          <ChunkedNearbyFeed onItemClick={handleItemClick} onViewAll={handleViewAll} />
        </div>

        {/* Bottom Navigation */}
        <BottomNav />
      </div>
    </div>
  );
}
