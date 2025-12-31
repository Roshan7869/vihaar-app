"use client";

import { Icon } from "@/components/ui/Icon";

interface TopBarProps {
    onSearchClick?: () => void;
}

export const TopBar = ({ onSearchClick }: TopBarProps) => {
    return (
        <header className="sticky top-0 z-40 glass-header px-5 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-extrabold text-primary tracking-tight">
                Vihaar
            </h1>
            <button
                onClick={onSearchClick}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors press"
            >
                <Icon name="search" />
            </button>
        </header>
    );
};
