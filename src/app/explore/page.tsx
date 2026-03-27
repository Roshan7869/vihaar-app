"use client";

import { useRouter } from "next/navigation";
import { ExploreCard } from "@/components/explore/ExploreCard";
import { BottomNav } from "@/components/nav/BottomNav";
import { explorePlaces } from "@/lib/data";
import { useSaved } from "@/context/SavedContext";

export default function ExplorePage() {
    const router = useRouter();
    const { toggleSaved, isSaved } = useSaved();

    return (
        <div className="flex justify-center bg-background min-h-screen">
            <div className="max-w-[420px] w-full min-h-screen relative">
                <div className="h-screen overflow-y-scroll snap-y-mandatory no-scrollbar">
                    {explorePlaces.map((item) => (
                        <ExploreCard
                            key={item.id}
                            image={item.images[0]}
                            category={item.category}
                            title={item.title}
                            description={item.description}
                            liked={isSaved(item.id)}
                            onNavigate={() => router.push(`/places/${item.id}`)}
                            onLike={() => toggleSaved(item)}
                            onShare={async () => {
                                const url = `${window.location.origin}/places/${item.id}`;
                                if (navigator.share) {
                                    await navigator.share({ title: item.title, url }).catch(() => {});
                                } else {
                                    await navigator.clipboard.writeText(url).catch(() => {});
                                }
                            }}
                        />
                    ))}
                </div>

                <BottomNav />
            </div>
        </div>
    );
}
