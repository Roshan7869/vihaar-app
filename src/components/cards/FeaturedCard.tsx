"use client";

import Image from "next/image";
import Link from "next/link";
import { FeaturedPlace } from "@/types";

interface FeaturedCardProps {
    place: FeaturedPlace;
}

export function FeaturedCard({ place }: FeaturedCardProps) {
    return (
        <Link
            href={`/places/${place.id}`}
            className="snap-center shrink-0 w-[85vw] max-w-[360px] relative rounded-[32px] overflow-hidden aspect-[16/10] group shadow-xl shadow-black/40 border border-white/5 cursor-pointer"
        >
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${place.images[0]}')` }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/40 to-transparent opacity-90" />

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
    );
}
