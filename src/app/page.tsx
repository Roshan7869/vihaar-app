"use client";

import Link from "next/link";
import { BottomNav } from "@/components/nav/BottomNav";
import { CategoryChips } from "@/components/ui/CategoryChips";
import { featuredPlaces, hiddenGems, categoryFilters } from "@/lib/data";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#201612] text-white pb-32 app-container overflow-hidden antialiased">
      {/* Background Orange Shimmer Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/30 blur-[150px] pointer-events-none -z-10 rounded-full -translate-y-1/2" />

      {/* Header */}
      <header className="sticky top-0 z-50 glass-header pb-4 pt-2">
        <div className="flex items-center justify-between px-5 py-3">
          <div className="flex items-center gap-3">
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl font-cursive font-bold leading-none tracking-tight text-primary">
                Vihaar
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="h-10 w-10 flex items-center justify-center text-white hover:text-white/80 transition-colors">
              <span className="material-symbols-outlined text-2xl">search</span>
            </button>
            <div className="flex items-center gap-1.5 bg-surface-dark border border-white/10 pl-2 pr-3 py-1.5 rounded-full shadow-sm">
              <span className="material-symbols-outlined text-primary text-[18px]">
                location_on
              </span>
              <span className="text-[12px] font-bold text-white/90 tracking-wide">
                Raipur
              </span>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="px-5 mt-2">
          <CategoryChips categories={categoryFilters} />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col gap-8 pt-6">
        {/* Featured This Week */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-5">
            <h2 className="text-[20px] font-bold text-white tracking-tight">
              Featured This Week
            </h2>
            <button className="text-xs font-bold text-primary hover:text-primary/80 uppercase tracking-wider flex items-center gap-1">
              See All{" "}
              <span className="material-symbols-outlined text-[16px]">
                arrow_forward
              </span>
            </button>
          </div>

          {/* Featured Carousel */}
          <div className="flex overflow-x-auto px-5 gap-4 hide-scrollbar snap-x snap-mandatory pb-4">
            {featuredPlaces.map((place) => (
              <Link
                key={place.id}
                href={`/places/${place.id}`}
                className="snap-center shrink-0 w-[85vw] max-w-[360px] relative rounded-[32px] overflow-hidden aspect-[16/10] group shadow-xl shadow-black/40 border border-white/5"
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${place.images[0]}')` }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#201612] via-[#201612]/40 to-transparent opacity-90" />

                {/* Tag Badge */}
                <div className="absolute top-5 left-5">
                  <span
                    className={`px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide shadow-lg uppercase ${place.tagType === "festival"
                      ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-amber-500/20"
                      : "bg-white/10 backdrop-blur-md text-white border border-white/20"
                      }`}
                  >
                    {place.tag || place.category}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <p className="text-amber-400 text-xs font-bold mb-1 uppercase tracking-wider flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">location_on</span>
                    {place.location} {place.eventDate && `• ${place.eventDate}`}
                  </p>
                  <h3 className="text-2xl font-bold text-white leading-tight mb-2 text-shadow-sm">
                    {place.title}
                  </h3>
                  <p className="text-white/70 text-sm line-clamp-2 font-light leading-relaxed">
                    {place.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Hidden Gems Nearby - Horizontal Carousel */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-5">
            <h2 className="text-[20px] font-bold text-white tracking-tight">
              Hidden Gems Nearby
            </h2>
            <div className="flex gap-2">
              <button className="h-8 w-8 rounded-full bg-surface-dark border border-white/5 flex items-center justify-center text-white/70 hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110">
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                  chevron_left
                </span>
              </button>
              <button className="h-8 w-8 rounded-full bg-surface-dark border border-white/5 flex items-center justify-center text-white/70 hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110">
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                  chevron_right
                </span>
              </button>
            </div>
          </div>

          {/* Horizontal Carousel - Full Width Cards */}
          <div className="flex overflow-x-auto px-5 gap-4 hide-scrollbar snap-x snap-mandatory pb-4">
            {hiddenGems.map((place) => (
              <Link
                key={place.id}
                href={`/places/${place.id}`}
                className="snap-center shrink-0 w-full relative rounded-[32px] overflow-hidden aspect-[4/5] group shadow-xl shadow-black/40 border border-white/5"
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${place.images[0]}')` }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* Bookmark Icon */}
                {place.isBookmarked && (
                  <div className="absolute top-5 right-5 z-10">
                    <div className="bg-black/40 backdrop-blur-sm rounded-full p-2 text-white/90">
                      <span className="material-symbols-outlined block" style={{ fontSize: "20px" }}>
                        bookmark
                      </span>
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <span className="text-[12px] text-amber-400 font-bold uppercase tracking-wider block mb-2">
                    {place.category}
                  </span>
                  <h3 className="text-white font-bold text-3xl leading-tight mb-2">
                    {place.title}
                  </h3>
                  <p className="text-white/70 text-sm line-clamp-2 font-light leading-relaxed">
                    {place.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
