"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavItem {
    id: string;
    label: string;
    icon: string;
    path: string;
}

const navItems: NavItem[] = [
    { id: "home", label: "Home", icon: "home", path: "/" },
    { id: "explore", label: "Explore", icon: "explore", path: "/explore" },
    { id: "profile", label: "Profile", icon: "person", path: "/profile" },
];

export function BottomNav() {
    const pathname = usePathname();

    const isActive = (path: string) => {
        if (path === "/") return pathname === "/";
        return pathname.startsWith(path);
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 z-40">
            <div className="app-container pointer-events-auto glass-nav pb-6 pt-4 px-6 flex justify-around items-center rounded-t-[32px] shadow-[0_-5px_20px_rgba(0,0,0,0.3)]">
                {navItems.map((item) => (
                    <Link
                        key={item.id}
                        href={item.path}
                        className="flex flex-col items-center gap-1 group w-16"
                    >
                        <div
                            className={cn(
                                "size-10 rounded-full flex items-center justify-center transition-colors",
                                isActive(item.path) ? "bg-white/10" : "group-hover:bg-white/10"
                            )}
                        >
                            <span
                                className={cn(
                                    "material-symbols-outlined text-[28px] transition-transform",
                                    isActive(item.path)
                                        ? "text-primary scale-110"
                                        : "text-gray-400 group-hover:text-white group-hover:scale-110"
                                )}
                                style={isActive(item.path) ? { fontVariationSettings: "'FILL' 1" } : undefined}
                            >
                                {item.icon}
                            </span>
                        </div>
                        <span
                            className={cn(
                                "text-xs font-medium transition-colors",
                                isActive(item.path)
                                    ? "text-primary"
                                    : "text-gray-400 group-hover:text-white"
                            )}
                        >
                            {item.label}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
