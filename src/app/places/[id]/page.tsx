"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { ProgressiveImage } from "@/components/ui/ProgressiveImage";
import { BottomNav } from "@/components/nav/BottomNav";
import { useSaved } from "@/context/SavedContext";
import { bhilaiPlaces } from "@/lib/bhilai-places";
import { featuredPlaces } from "@/lib/data";
import { formatCategory } from "@/lib/utils";
import Link from "next/link";

interface PlaceDetailPageProps {
    params: Promise<{ id: string }>;
}

export default function PlaceDetailPage({ params }: PlaceDetailPageProps) {
    const { id } = use(params);
    const router = useRouter();
    const { toggleSaved, isSaved } = useSaved();
    const [linkCopied, setLinkCopied] = useState(false);

    // Look up place from bhilaiPlaces or featuredPlaces
    const place =
        bhilaiPlaces.find((p) => p.id === id) ??
        featuredPlaces.find((p) => p.id === id) ??
        null;

    const saved = place ? isSaved(place.id) : false;

    const handleToggleSave = () => {
        if (!place) return;
        toggleSaved(place);
    };

    const handleShare = async () => {
        if (!place) return;
        const shareData = {
            title: place.title,
            text: place.short_description ?? place.description,
            url: window.location.href,
        };
        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch {
                // User cancelled or share failed
            }
        } else {
            // Fallback: copy link to clipboard
            try {
                await navigator.clipboard.writeText(window.location.href);
                setLinkCopied(true);
                setTimeout(() => setLinkCopied(false), 2000);
            } catch {
                // clipboard not available
            }
        }
    };

    const handleNavigate = () => {
        if (place?.google_maps_url) {
            window.open(place.google_maps_url, "_blank", "noopener,noreferrer");
        } else {
            router.push("/travel");
        }
    };

    // 404 state
    if (!place) {
        return (
            <div className="flex justify-center bg-background min-h-screen">
                <div className="max-w-[420px] w-full min-h-screen flex flex-col items-center justify-center gap-4 p-8">
                    <Icon name="location_off" size="xl" className="text-muted-foreground opacity-50" />
                    <h1 className="text-xl font-bold text-foreground">Place Not Found</h1>
                    <p className="text-muted-foreground text-sm text-center">
                        We couldn&apos;t find that place. It may have been removed or the link is incorrect.
                    </p>
                    <Link
                        href="/"
                        className="px-6 py-3 bg-primary text-primary-foreground rounded-2xl font-bold press shadow-glow"
                    >
                        Go Home
                    </Link>
                </div>
            </div>
        );
    }

    const heroImage = place.images[0];
    const category = formatCategory(place.category);

    return (
        <div className="flex justify-center bg-background min-h-screen">
            <div className="max-w-[420px] w-full min-h-screen relative">
                <div className="min-h-screen pb-24">
                    {/* Hero */}
                    <div className="relative h-[60vh]">
                        <ProgressiveImage
                            src={heroImage}
                            alt={place.title}
                            fill
                            sizes="100vw"
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 gradient-overlay" />

                        {/* Top actions */}
                        <div className="absolute top-0 left-0 right-0 flex justify-between items-start p-5 pt-6 z-20 pointer-events-none">
                            <Link
                                href="/"
                                aria-label="Go back"
                                className="w-10 h-10 glass rounded-full flex items-center justify-center press pointer-events-auto"
                            >
                                <Icon name="arrow_back" />
                            </Link>
                            <div className="flex flex-col gap-3 pointer-events-auto">
                                <button
                                    onClick={handleToggleSave}
                                    aria-label={saved ? "Remove from saved" : "Save this place"}
                                    className="w-12 h-12 glass rounded-full flex items-center justify-center press transition-colors"
                                >
                                    <Icon
                                        name="favorite"
                                        filled={saved}
                                        size="md"
                                        className={saved ? "text-destructive" : "text-white"}
                                    />
                                </button>
                                <button
                                    onClick={handleShare}
                                    aria-label={linkCopied ? "Link copied!" : "Share this place"}
                                    className="w-12 h-12 glass rounded-full flex items-center justify-center press transition-colors"
                                >
                                    <Icon name={linkCopied ? "check" : "share"} size="md" className={linkCopied ? "text-green-400" : "text-white"} />
                                </button>
                                <button
                                    onClick={handleNavigate}
                                    aria-label="Navigate to location"
                                    className="w-12 h-12 bg-primary rounded-full flex items-center justify-center press text-white shadow-xl shadow-primary/30 transition-transform hover:scale-105 active:scale-95"
                                >
                                    <Icon name="navigation" size="md" filled />
                                </button>
                            </div>
                        </div>

                        {/* Title overlay */}
                        <div className="absolute bottom-6 left-5 right-5">
                            <span className="text-[11px] bg-primary px-3 py-1 rounded-full font-bold uppercase tracking-wide text-primary-foreground">
                                {category}
                            </span>
                            <h1 className="mt-3 text-3xl font-extrabold leading-tight text-foreground">
                                {place.title}
                            </h1>
                            <div className="flex items-center gap-1 mt-2 text-muted-foreground">
                                <Icon name="location_on" size="sm" />
                                <span className="text-sm">{place.location}</span>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="px-5 pt-6 space-y-6">
                        {/* Rating row */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                                <Icon name="star" filled size="sm" className="text-yellow-400" />
                                <span className="font-bold text-foreground">{place.rating}</span>
                                <span className="text-muted-foreground text-sm">({place.reviewCount} reviews)</span>
                            </div>
                            {place.distance && (
                                <div className="flex items-center gap-1 text-muted-foreground text-sm">
                                    <Icon name="near_me" size="sm" />
                                    <span>{place.distance}</span>
                                </div>
                            )}
                            {place.entryFee && (
                                <div className="flex items-center gap-1 text-muted-foreground text-sm">
                                    <Icon name="confirmation_number" size="sm" />
                                    <span>{place.entryFee}</span>
                                </div>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <h3 className="font-bold text-lg mb-2 text-foreground">About</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                {place.description}
                            </p>
                        </div>

                        {/* Tags */}
                        {place.tags && place.tags.length > 0 && (
                            <div>
                                <h3 className="font-bold text-lg mb-3 text-foreground">Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {place.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Visit info */}
                        <div>
                            <h3 className="font-bold text-lg mb-3 text-foreground">Plan Your Visit</h3>
                            <div className="grid grid-cols-1 gap-3">
                                {place.bestTime && (
                                    <div className="glass p-4 rounded-xl flex items-center gap-3">
                                        <Icon name="calendar_month" className="text-primary" />
                                        <div>
                                            <p className="font-medium text-foreground">Best Time</p>
                                            <p className="text-muted-foreground text-sm">{place.bestTime}</p>
                                        </div>
                                    </div>
                                )}
                                {place.timings && (
                                    <div className="glass p-4 rounded-xl flex items-center gap-3">
                                        <Icon name="schedule" className="text-primary" />
                                        <div>
                                            <p className="font-medium text-foreground">Timings</p>
                                            <p className="text-muted-foreground text-sm">
                                                {place.timings.opens_at} – {place.timings.closes_at}
                                                {place.timings.closed_days.length > 0 && (
                                                    <span> · Closed {place.timings.closed_days.join(", ")}</span>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                )}
                                {place.entryFee && (
                                    <div className="glass p-4 rounded-xl flex items-center gap-3">
                                        <Icon name="confirmation_number" className="text-primary" />
                                        <div>
                                            <p className="font-medium text-foreground">Entry Fee</p>
                                            <p className="text-muted-foreground text-sm">{place.entryFee}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Fixed CTA */}
                    <div className="fixed bottom-20 left-0 right-0 px-5 max-w-[420px] mx-auto">
                        <button
                            onClick={handleNavigate}
                            className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-bold flex items-center justify-center gap-2 press shadow-glow"
                        >
                            <Icon name="near_me" filled />
                            Navigate to Location
                        </button>
                    </div>
                </div>

                <BottomNav />
            </div>
        </div>
    );
}
