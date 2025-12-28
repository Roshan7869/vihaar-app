"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { explorePlaces, exploreFilters } from "@/lib/data";

export default function ExplorePage() {
    const router = useRouter();

    const formatLikes = (likes: number) => {
        if (likes >= 1000) {
            return `${(likes / 1000).toFixed(1)}k`;
        }
        return likes.toString();
    };

    return (
        <div className="relative h-screen w-full app-container shadow-2xl bg-black overflow-hidden flex flex-col">
            {/* Top Header */}
            <div className="absolute top-0 left-0 right-0 z-50 pt-12 pb-2 px-4 pointer-events-none">
                <div className="flex items-center justify-between pointer-events-auto">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors"
                    >
                        <span className="material-symbols-outlined text-white" style={{ fontSize: "24px" }}>
                            arrow_back
                        </span>
                    </button>
                    <div className="flex items-center gap-2">
                        <button className="flex h-10 items-center justify-center gap-x-2 rounded-full bg-primary pl-5 pr-4 golden-glow shadow-lg shadow-orange-900/40 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <span className="material-symbols-outlined text-white" style={{ fontSize: "20px" }}>
                                near_me
                            </span>
                            <p className="text-white text-sm font-bold leading-normal whitespace-nowrap">
                                Near 5 km
                            </p>
                            <span className="material-symbols-outlined text-white" style={{ fontSize: "20px" }}>
                                keyboard_arrow_down
                            </span>
                        </button>
                        <button className="flex items-center justify-center w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors">
                            <span className="material-symbols-outlined text-white" style={{ fontSize: "24px" }}>
                                tune
                            </span>
                        </button>
                    </div>
                </div>

                {/* Category Tags */}
                <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pointer-events-auto mt-4 px-1 pb-2">
                    {exploreFilters.map((filter) => (
                        <button
                            key={filter.id}
                            className="whitespace-nowrap px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/5 text-xs font-medium text-white/80 hover:bg-white/20 transition-colors"
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Swipeable Cards */}
            <div className="flex-1 w-full h-full overflow-y-scroll snap-y snap-mandatory no-scrollbar scroll-smooth">
                {explorePlaces.map((place) => (
                    <div key={place.id} className="relative w-full h-full snap-start shrink-0">
                        {/* Background Image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url('${place.images[0]}')` }}
                        />
                        <div className="absolute inset-0 bg-glass-gradient-bottom pointer-events-none" />

                        {/* Right Action Buttons */}
                        <div className="absolute right-4 bottom-32 flex flex-col gap-5 items-center z-20">
                            {/* Like */}
                            <div className="flex flex-col items-center gap-1">
                                <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all active:scale-90 shadow-lg">
                                    <span className="material-symbols-outlined text-white text-[26px]">
                                        favorite
                                    </span>
                                </button>
                                <span className="text-xs font-medium text-white drop-shadow-md">
                                    {formatLikes(place.likes || 0)}
                                </span>
                            </div>

                            {/* Comment */}
                            <div className="flex flex-col items-center gap-1">
                                <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all active:scale-90 shadow-lg">
                                    <span className="material-symbols-outlined text-white text-[26px]">
                                        chat_bubble
                                    </span>
                                </button>
                                <span className="text-xs font-medium text-white drop-shadow-md">84</span>
                            </div>

                            {/* Directions */}
                            <div className="flex flex-col items-center gap-1 mt-2">
                                <button className="w-12 h-12 rounded-full bg-primary border border-orange-400/50 flex items-center justify-center shadow-lg shadow-orange-600/50">
                                    <span className="material-symbols-outlined text-white text-[26px]">
                                        directions
                                    </span>
                                </button>
                                <span className="text-xs font-bold text-primary drop-shadow-md">Go</span>
                            </div>
                        </div>

                        {/* Content Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 pb-28 z-10 pointer-events-none">
                            <div className="pointer-events-auto">
                                {/* Tags */}
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="px-3 py-1 rounded-full bg-primary/90 text-[11px] font-bold text-white uppercase tracking-wider backdrop-blur-md shadow-lg border border-white/10">
                                        {place.category}
                                    </span>
                                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                                        <span
                                            className="material-symbols-outlined text-yellow-400 text-[14px]"
                                            style={{ fontVariationSettings: "'FILL' 1" }}
                                        >
                                            star
                                        </span>
                                        <span className="text-xs font-bold text-white">{place.rating}</span>
                                    </div>
                                </div>

                                {/* Title */}
                                <Link href={`/places/${place.id}`}>
                                    <h2 className="text-3xl font-extrabold text-white leading-tight mb-2 drop-shadow-lg tracking-tight hover:text-primary transition-colors">
                                        {place.title}
                                    </h2>
                                </Link>

                                {/* Location */}
                                <div className="flex items-center gap-2 text-white/90 mb-3 drop-shadow-md">
                                    <span className="material-symbols-outlined text-[18px] text-primary">
                                        location_on
                                    </span>
                                    <p className="text-sm font-semibold">
                                        {place.location} • {place.distance}
                                    </p>
                                </div>

                                {/* Description */}
                                <p className="text-white/80 text-sm line-clamp-2 leading-relaxed max-w-[80%] font-medium drop-shadow-md">
                                    {place.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Navigation */}
            <div className="absolute bottom-6 left-6 right-6 z-50">
                <div className="glass-panel rounded-2xl px-8 py-4 flex items-center justify-between shadow-2xl border border-white/10 bg-black/40">
                    <Link
                        href="/"
                        className="flex flex-col items-center justify-center gap-1.5 text-white/50 hover:text-white transition-colors group"
                    >
                        <span
                            className="material-symbols-outlined group-hover:scale-110 transition-transform"
                            style={{ fontSize: "26px" }}
                        >
                            home
                        </span>
                        <span className="text-[10px] font-medium tracking-wide">Home</span>
                    </Link>
                    <button className="flex flex-col items-center justify-center gap-1.5 text-primary relative">
                        <div className="absolute -top-1 w-1 h-1 bg-primary rounded-full shadow-[0_0_8px_rgba(223,89,32,0.8)]" />
                        <span
                            className="material-symbols-outlined drop-shadow-[0_0_12px_rgba(223,89,32,0.6)]"
                            style={{ fontSize: "26px", fontVariationSettings: "'FILL' 1" }}
                        >
                            explore
                        </span>
                        <span className="text-[10px] font-bold tracking-wide">Explore</span>
                    </button>
                    <Link
                        href="/profile"
                        className="flex flex-col items-center justify-center gap-1.5 text-white/50 hover:text-white transition-colors group"
                    >
                        <span
                            className="material-symbols-outlined group-hover:scale-110 transition-transform"
                            style={{ fontSize: "26px" }}
                        >
                            person
                        </span>
                        <span className="text-[10px] font-medium tracking-wide">Profile</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
