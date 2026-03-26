"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { ProgressiveImage } from "@/components/ui/ProgressiveImage";
import { BottomNav } from "@/components/nav/BottomNav";
import { useSaved } from "@/context/SavedContext";
import { getPlaceById } from "@/lib/data";
import Link from "next/link";

interface PlaceDetailPageProps {
    params: Promise<{ id: string }>;
}

export default function PlaceDetailPage({ params }: PlaceDetailPageProps) {
    const { id } = use(params);
    const { isSaved, toggleSaved } = useSaved();
    const router = useRouter();

    const place = getPlaceById(id);
    const saved = isSaved(id);

    const handleNavigate = () => {
        if (place?.google_maps_url) {
            window.open(place.google_maps_url, "_blank", "noopener,noreferrer");
        } else {
            router.push("/travel");
        }
    };

    const handleShare = async () => {
        const shareData = {
            title: place?.title ?? "Vihaar",
            text: place?.short_description ?? place?.description ?? "Discover amazing places in Chhattisgarh",
            url: window.location.href,
        };
        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch {
                // User cancelled or share failed
            }
        } else {
            await navigator.clipboard.writeText(window.location.href);
        }
    };

    const heroImage =
        place?.images?.[0] ??
        "https://images.unsplash.com/photo-1548013146-72479768bada?w=1200";
    const title = place?.title ?? "Destination";
    const location = place?.location ? `${place.location}${place.district && place.district !== place.location ? `, ${place.district}` : ""}` : "Chhattisgarh";
    const category = place?.category ?? "nature";
    const description = place?.description ?? "A beautiful destination in Chhattisgarh.";
    const bestTime = place?.bestTime;
    const entryFee = place?.entryFee;
    const tags = place?.tags ?? [];
    const rating = place?.rating;
    const reviewCount = place?.reviewCount;

    return (
        <div className="flex justify-center bg-background min-h-screen">
            <div className="max-w-[420px] w-full min-h-screen relative">
                <div className="min-h-screen pb-24">
                    {/* Hero */}
                    <div className="relative h-[60vh]">
                        <ProgressiveImage
                            src={heroImage}
                            alt={title}
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
                                    onClick={() =>
                                        toggleSaved(id, {
                                            title,
                                            location,
                                            category,
                                            image: heroImage,
                                        })
                                    }
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
                                    aria-label="Share this place"
                                    className="w-12 h-12 glass rounded-full flex items-center justify-center press text-white transition-colors"
                                >
                                    <Icon name="share" size="md" />
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
                                {title}
                            </h1>
                            <div className="flex items-center gap-3 mt-2 text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Icon name="location_on" size="sm" />
                                    <span className="text-sm">{location}</span>
                                </div>
                                {rating && (
                                    <div className="flex items-center gap-1">
                                        <Icon name="star" size="sm" filled className="text-primary" />
                                        <span className="text-sm font-semibold text-foreground">{rating}</span>
                                        {reviewCount && (
                                            <span className="text-xs text-muted-foreground">({reviewCount})</span>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="px-5 pt-6 space-y-6">
                        {/* Description */}
                        <div>
                            <h3 className="font-bold text-lg mb-2 text-foreground">About</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
                        </div>

                        {/* Info Cards */}
                        {(bestTime || entryFee) && (
                            <div className="grid grid-cols-2 gap-3">
                                {bestTime && (
                                    <div className="glass p-4 rounded-xl flex items-center gap-3">
                                        <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                                            <Icon name="calendar_month" className="text-primary" size="md" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Best Time</p>
                                            <p className="text-sm font-semibold text-foreground">{bestTime}</p>
                                        </div>
                                    </div>
                                )}
                                {entryFee && (
                                    <div className="glass p-4 rounded-xl flex items-center gap-3">
                                        <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                                            <Icon name="payments" className="text-primary" size="md" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Entry Fee</p>
                                            <p className="text-sm font-semibold text-foreground">{entryFee}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Tags */}
                        {tags.length > 0 && (
                            <div>
                                <h3 className="font-bold text-lg mb-3 text-foreground">Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium capitalize"
                                        >
                                            {tag.replace(/-/g, " ")}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
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
