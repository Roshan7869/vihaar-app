"use client";

import Link from "next/link";
import { Place } from "@/types";
import { cn } from "@/lib/utils";

interface HiddenGemCardProps {
    place: Place;
    aspectRatio?: "square" | "tall";
    className?: string;
}

export function HiddenGemCard({
    place,
    aspectRatio = "square",
    className,
}: HiddenGemCardProps) {
    const aspectClass = aspectRatio === "tall" ? "aspect-[3/4]" : "aspect-square";

    return (
        <Link
            href={`/places/${place.id}`}
            className={cn(
                "relative w-full rounded-2xl overflow-hidden group border border-white/5 shadow-lg shadow-black/30 hover:-translate-y-1 transition-transform duration-500 cursor-pointer",
                aspectClass,
                className
            )}
        >
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${place.images[0]}')` }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-4 left-4 right-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block mb-1">
                    {place.category}
                </span>
                <h3 className="text-white font-bold text-lg leading-tight">
                    {place.title}
                </h3>
            </div>

            {/* Bookmark Icon */}
            {place.isBookmarked && (
                <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-sm rounded-full p-2 text-white/90">
                    <span className="material-symbols-outlined block" style={{ fontSize: "16px" }}>
                        bookmark
                    </span>
                </div>
            )}
        </Link>
    );
}
