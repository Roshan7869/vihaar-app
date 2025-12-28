"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface TopBarProps {
    title?: string;
    showBack?: boolean;
    transparent?: boolean;
    showFavorite?: boolean;
    showShare?: boolean;
}

export function TopBar({
    title,
    showBack = true,
    transparent = false,
    showFavorite = true,
    showShare = true,
}: TopBarProps) {
    const router = useRouter();

    return (
        <div
            className={cn(
                "fixed top-0 left-0 right-0 z-50 p-4 pt-12 flex justify-between items-center app-container pointer-events-none",
                !transparent && "bg-black/20 backdrop-blur-md"
            )}
        >
            {showBack ? (
                <button
                    onClick={() => router.back()}
                    className="pointer-events-auto size-12 flex items-center justify-center rounded-full glass-btn active:scale-95 transition-transform text-white hover:bg-white/10 group"
                >
                    <span className="material-symbols-outlined text-[24px] group-hover:text-primary transition-colors">
                        arrow_back
                    </span>
                </button>
            ) : (
                <div className="size-12" />
            )}

            {title && (
                <h2 className="text-white text-lg font-bold tracking-tight pointer-events-auto text-shadow-sm">
                    {title}
                </h2>
            )}

            <div className="flex gap-3 pointer-events-auto">
                {showFavorite && (
                    <button className="size-12 flex items-center justify-center rounded-full glass-btn active:scale-95 transition-transform text-white hover:bg-white/10 group">
                        <span className="material-symbols-outlined text-[24px] group-hover:text-primary transition-colors">
                            favorite
                        </span>
                    </button>
                )}
                {showShare && (
                    <button className="size-12 flex items-center justify-center rounded-full glass-btn active:scale-95 transition-transform text-white hover:bg-white/10 group">
                        <span className="material-symbols-outlined text-[24px] group-hover:text-primary transition-colors">
                            ios_share
                        </span>
                    </button>
                )}
            </div>
        </div>
    );
}
