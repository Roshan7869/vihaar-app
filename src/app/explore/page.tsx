"use client";

import { useRouter } from "next/navigation";
import { ExploreCard } from "@/components/explore/ExploreCard";
import { BottomNav } from "@/components/nav/BottomNav";

const exploreItems = [
    {
        id: "1",
        image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=1200",
        category: "Nature",
        title: "Chitrakote Falls",
        description: "Best visited during monsoon for full waterfall flow 🌧️",
    },
    {
        id: "2",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200",
        category: "Mountains",
        title: "Valley of Flowers",
        description: "UNESCO World Heritage site in the Himalayas 🏔️",
    },
    {
        id: "3",
        image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200",
        category: "Adventure",
        title: "Coorg Coffee Trails",
        description: "Misty hills and aromatic coffee plantations ☕",
    },
    {
        id: "4",
        image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=1200",
        category: "Wildlife",
        title: "Kanger Valley",
        description: "Home to rare limestone caves and biodiversity 🦜",
    },
    {
        id: "5",
        image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200",
        category: "Trekking",
        title: "Mainpat Plateau",
        description: "Mini Tibet of India with breathtaking views 🏯",
    },
];

export default function ExplorePage() {
    const router = useRouter();

    const handleNavigate = () => {
        router.push("/travel");
    };

    return (
        <div className="flex justify-center bg-background min-h-screen">
            <div className="max-w-[420px] w-full min-h-screen relative">
                <div className="h-screen overflow-y-scroll snap-y-mandatory no-scrollbar">
                    {exploreItems.map((item) => (
                        <ExploreCard
                            key={item.id}
                            image={item.image}
                            category={item.category}
                            title={item.title}
                            description={item.description}
                            onNavigate={() => handleNavigate()}
                        />
                    ))}
                </div>

                <BottomNav />
            </div>
        </div>
    );
}
