"use client";

import { Icon } from "@/components/ui/Icon";
import { ProgressiveImage } from "@/components/ui/ProgressiveImage";
import { BottomNav } from "@/components/nav/BottomNav";
import Link from "next/link";

const savedItems = [
    {
        id: "1",
        image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=400",
        title: "Chitrakote Falls",
        location: "Bastar, Chhattisgarh",
        category: "Waterfall",
    },
    {
        id: "2",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
        title: "Valley of Flowers",
        location: "Uttarakhand",
        category: "Mountains",
    },
    {
        id: "3",
        image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400",
        title: "Tirathgarh Falls",
        location: "Jagdalpur, Chhattisgarh",
        category: "Nature",
    },
];

export default function SavedPage() {
    return (
        <div className="flex justify-center bg-background min-h-screen">
            <div className="max-w-[420px] w-full min-h-screen relative">
                <div className="min-h-screen pb-24">
                    {/* Header */}
                    <header className="sticky top-0 z-40 glass-header px-5 py-4">
                        <h1 className="text-xl font-extrabold text-center text-foreground">Saved Places</h1>
                    </header>

                    <div className="px-5 pt-4">
                        {savedItems.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                                <Icon name="favorite_border" size="xl" className="mb-4 opacity-50" />
                                <p className="text-lg font-semibold">No saved places yet</p>
                                <p className="text-sm mt-1">Start exploring and save your favorites!</p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3">
                                {savedItems.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={`/places/${item.id}`}
                                        className="glass rounded-2xl p-3 flex gap-4 items-center press cursor-pointer"
                                    >
                                        <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                                            <ProgressiveImage
                                                src={item.image}
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
                                            <h4 className="font-bold mt-0.5 text-foreground">{item.title}</h4>
                                            <div className="flex items-center gap-1 mt-1 text-muted-foreground">
                                                <Icon name="location_on" size="xs" />
                                                <span className="text-xs">{item.location}</span>
                                            </div>
                                        </div>
                                        <Icon name="chevron_right" className="text-muted-foreground flex-shrink-0" />
                                    </Link>
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
