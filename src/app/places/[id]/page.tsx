"use client";

import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { TopBar } from "@/components/nav/TopBar";
import { BottomNav } from "@/components/nav/BottomNav";
import { getPlaceById, placeDetails } from "@/lib/data";

export default function PlaceIntroPage() {
    const router = useRouter();
    const params = useParams();
    const placeId = params.id as string;

    // Get place data
    const place = getPlaceById(placeId) || placeDetails["chitrakote-falls"];

    return (
        <div className="relative h-screen w-full flex flex-col app-container shadow-2xl bg-black overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                    style={{ backgroundImage: `url('${place.images[0]}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent via-50% to-black" />
            </div>

            {/* Top Bar */}
            <TopBar transparent={true} />

            {/* Content Overlay */}
            <div className="absolute bottom-[140px] left-0 right-0 px-6 z-20 pointer-events-none flex flex-col justify-end">
                <div className="flex flex-col gap-1 mb-6">
                    <h1 className="text-5xl font-bold leading-tight tracking-tight text-white text-shadow-lg">
                        {place.title}
                    </h1>
                    <div className="flex items-center gap-2 text-primary mt-1">
                        <span className="material-symbols-outlined text-[22px] drop-shadow-md">
                            location_on
                        </span>
                        <span className="text-white/90 text-lg font-medium drop-shadow-md">
                            {place.location}
                        </span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="w-full app-container pointer-events-auto">
                    <div className="flex gap-4">
                        <Link
                            href={`/places/${placeId}/details`}
                            className="flex-1 h-14 rounded-2xl glass-action-btn text-white font-semibold text-base flex items-center justify-center gap-2 transition-all hover:bg-white/10 active:scale-95"
                        >
                            <span className="material-symbols-outlined text-[20px] bg-white text-black rounded-full p-0.5">
                                info
                            </span>
                            View Details
                        </Link>
                        <button className="flex-1 h-14 rounded-2xl glass-action-btn text-white font-semibold text-base flex items-center justify-center gap-2 transition-all hover:bg-white/10 active:scale-95">
                            <span
                                className="material-symbols-outlined text-[20px]"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                                navigation
                            </span>
                            Travel Here
                        </button>
                    </div>
                </div>
            </div>

            <BottomNav />
        </div>
    );
}
