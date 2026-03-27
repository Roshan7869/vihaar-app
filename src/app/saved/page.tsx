"use client";

import { Icon } from "@/components/ui/Icon";
import { ProgressiveImage } from "@/components/ui/ProgressiveImage";
import { BottomNav } from "@/components/nav/BottomNav";
import { useSaved } from "@/context/SavedContext";
import Link from "next/link";

export default function SavedPage() {
    const { savedPlaces, unsavePlace } = useSaved();

    return (
        <div className="flex justify-center bg-background min-h-screen">
            <div className="max-w-[420px] w-full min-h-screen relative">
                <div className="min-h-screen pb-24">
                    {/* Header */}
                    <header className="sticky top-0 z-40 glass-header px-5 py-4">
                        <h1 className="text-xl font-extrabold text-center text-foreground">
                            Saved Places
                            {savedPlaces.length > 0 && (
                                <span className="ml-2 text-base font-semibold text-muted-foreground">
                                    ({savedPlaces.length})
                                </span>
                            )}
                        </h1>
                    </header>

                    <div className="px-5 pt-4">
                        {savedPlaces.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                                <Icon name="favorite_border" size="xl" className="mb-4 opacity-50" />
                                <p className="text-lg font-semibold">No saved places yet</p>
                                <p className="text-sm mt-1">Start exploring and save your favorites!</p>
                                <Link
                                    href="/"
                                    className="mt-6 px-6 py-3 bg-primary text-primary-foreground rounded-2xl font-bold press shadow-glow"
                                >
                                    Explore Places
                                </Link>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3">
                                {savedPlaces.map((item) => (
                                    <div
                                        key={item.id}
                                        className="glass rounded-2xl p-3 flex gap-4 items-center"
                                    >
                                        <Link
                                            href={`/places/${item.id}`}
                                            className="flex gap-4 items-center flex-1 min-w-0 press cursor-pointer"
                                        >
                                            <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                                                <ProgressiveImage
                                                    src={item.images[0]}
                                                    alt={item.title}
                                                    fill
                                                    sizes="80px"
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <span className="text-[10px] text-primary font-semibold uppercase tracking-wide">
                                                    {item.category}
                                                </span>
                                                <h4 className="font-bold mt-0.5 text-foreground truncate">{item.title}</h4>
                                                <div className="flex items-center gap-1 mt-1 text-muted-foreground">
                                                    <Icon name="location_on" size="xs" />
                                                    <span className="text-xs truncate">{item.location}</span>
                                                </div>
                                            </div>
                                        </Link>
                                        <button
                                            onClick={() => unsavePlace(item.id)}
                                            aria-label={`Remove ${item.title} from saved`}
                                            className="w-10 h-10 flex items-center justify-center press text-destructive flex-shrink-0"
                                        >
                                            <Icon name="favorite" filled size="md" className="text-destructive" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <BottomNav />
            </div>
        </div>
    );
}
