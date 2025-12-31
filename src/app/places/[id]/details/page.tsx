"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { TopBar } from "@/components/nav/TopBar";
import { getPlaceById, placeDetails } from "@/lib/data";
import { DetailTab } from "@/types";

export default function PlaceDetailPage() {
    const router = useRouter();
    const params = useParams();
    const placeId = params.id as string;
    const [activeTab, setActiveTab] = useState<DetailTab>("Overview");

    // Get place data
    const place = getPlaceById(placeId) || placeDetails["chitrakote-falls"];

    const tabs: DetailTab[] = ["Overview", "History", "Accommodations"];

    return (
        <div className="relative h-screen w-full flex flex-col app-container shadow-2xl bg-black overflow-hidden">
            {/* Background Image - Optimized with Next.js Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={place.images[0]}
                    alt={place.title}
                    fill
                    sizes="(max-width: 480px) 100vw, 480px"
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
            </div>

            {/* Top Bar */}
            <TopBar transparent={true} />

            {/* Scrollable Content */}
            <div className="absolute inset-0 z-10 overflow-y-auto no-scrollbar snap-y snap-mandatory pt-20">
                {/* Spacer for background visibility */}
                <div className="h-[45vh] w-full shrink-0 snap-start pointer-events-none" />

                {/* Bottom Sheet */}
                <div className="glass-panel min-h-[50vh] rounded-t-[2.5rem] relative -mt-4 pb-12 snap-start">
                    {/* Pull Handle */}
                    <div className="w-full flex justify-center pt-4 pb-2">
                        <div className="w-12 h-1.5 rounded-full bg-white/20" />
                    </div>

                    <div className="px-6 pt-2">
                        {/* Title Section */}
                        <div className="flex justify-between items-start mb-1">
                            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white drop-shadow-sm max-w-[70%]">
                                {place.title}
                            </h1>
                            <div className="flex items-center justify-center bg-orange-gradient rounded-full px-3 py-1.5 mt-1 shadow-lg shadow-primary/20">
                                <span className="text-[10px] font-bold text-black tracking-wider uppercase">
                                    {place.category}
                                </span>
                            </div>
                        </div>

                        {/* Location & Rating */}
                        <div className="flex items-center gap-4 mt-2 mb-8 text-sm text-gray-300">
                            <div className="flex items-center gap-1 text-primary">
                                <span className="material-symbols-outlined text-[18px]">location_on</span>
                                <span className="text-gray-300">{place.location}</span>
                            </div>
                            <div className="h-1 w-1 rounded-full bg-gray-600" />
                            <div className="flex items-center gap-1">
                                <span
                                    className="material-symbols-outlined text-primary text-[18px]"
                                    style={{ fontVariationSettings: "'FILL' 1" }}
                                >
                                    star
                                </span>
                                <span className="text-white font-semibold">{place.rating}</span>
                                <span className="text-gray-400 text-xs">({place.reviewCount})</span>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex border-b border-white/10 mb-8 relative">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`flex-1 pb-4 border-b-2 font-medium text-base tracking-wide transition-colors ${activeTab === tab
                                        ? "border-primary text-primary font-bold"
                                        : "border-transparent text-gray-400 hover:text-white"
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        {activeTab === "Overview" && (
                            <div className="flex flex-col gap-6 animate-fade-in">
                                {/* Description */}
                                <div className="prose prose-sm prose-invert">
                                    <p className="text-gray-300 leading-relaxed font-normal text-base opacity-90">
                                        {place.description?.split('"').map((part, i) =>
                                            i % 2 === 1 ? (
                                                <span key={i} className="text-primary font-medium">
                                                    &ldquo;{part}&rdquo;
                                                </span>
                                            ) : (
                                                part
                                            )
                                        )}
                                    </p>
                                </div>

                                {/* Info Cards */}
                                <div className="flex gap-4">
                                    {place.bestTime && (
                                        <div className="flex-1 p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
                                            <div className="text-primary mb-1">
                                                <span className="material-symbols-outlined">schedule</span>
                                            </div>
                                            <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">
                                                Best Time
                                            </p>
                                            <p className="text-white font-semibold">{place.bestTime}</p>
                                        </div>
                                    )}
                                    {place.entryFee && (
                                        <div className="flex-1 p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
                                            <div className="text-primary mb-1">
                                                <span className="material-symbols-outlined">payments</span>
                                            </div>
                                            <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">
                                                Entry Fee
                                            </p>
                                            <p className="text-white font-semibold">{place.entryFee}</p>
                                        </div>
                                    )}
                                </div>

                                {/* CTA Button */}
                                <button className="w-full h-14 mt-2 rounded-full bg-orange-gradient text-black font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-primary/25 active:scale-[0.98] transition-transform hover:brightness-110">
                                    Book a Guided Tour
                                    <span className="material-symbols-outlined text-[24px]">arrow_forward</span>
                                </button>
                            </div>
                        )}

                        {activeTab === "History" && (
                            <div className="py-8 text-center text-gray-400 animate-fade-in">
                                <span className="material-symbols-outlined text-6xl text-white/20 mb-4 block">
                                    history_edu
                                </span>
                                <p>Historical information coming soon...</p>
                            </div>
                        )}

                        {activeTab === "Accommodations" && (
                            <div className="py-8 text-center text-gray-400 animate-fade-in">
                                <span className="material-symbols-outlined text-6xl text-white/20 mb-4 block">
                                    hotel
                                </span>
                                <p>Nearby accommodations coming soon...</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
