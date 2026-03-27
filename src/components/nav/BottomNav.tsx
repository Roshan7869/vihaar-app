"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { useSaved } from "@/context/SavedContext";
import { cn } from "@/lib/utils";

interface NavItem {
    id: string;
    label: string;
    icon: string;
    href: string;
}

const navItems: NavItem[] = [
    { id: "home", label: "Home", icon: "home", href: "/" },
    { id: "explore", label: "Explore", icon: "explore", href: "/explore" },
    { id: "saved", label: "Saved", icon: "favorite", href: "/saved" },
    { id: "profile", label: "Profile", icon: "person", href: "/profile" },
];

export const BottomNav = () => {
    const pathname = usePathname();
    const { savedCount } = useSaved();

    // Determine active tab based on current route
    const getActiveTab = () => {
        if (pathname === "/") return "home";
        if (pathname.startsWith("/explore")) return "explore";
        if (pathname.startsWith("/saved")) return "saved";
        if (pathname.startsWith("/profile")) return "profile";
        return "home";
    };

    const activeTab = getActiveTab();

    return (
        <nav
            className="fixed bottom-0 left-0 right-0 z-50 safe-bottom"
            aria-label="Main navigation"
        >
            <div className="max-w-[420px] mx-auto glass-nav">
                <div className="flex justify-around py-3">
                    {navItems.map((item) => {
                        const isActive = activeTab === item.id;
                        return (
                            <Link
                                key={item.id}
                                href={item.href}
                                aria-label={item.label}
                                aria-current={isActive ? "page" : undefined}
                                className={cn(
                                    "flex flex-col items-center gap-0.5 px-6 py-1 transition-colors press relative",
                                    isActive ? "text-primary" : "text-muted-foreground"
                                )}
                            >
                                <div className="relative">
                                    <Icon
                                        name={item.icon}
                                        filled={isActive}
                                        size="lg"
                                    />
                                    {item.id === "saved" && savedCount > 0 && (
                                        <span
                                            className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 bg-destructive rounded-full flex items-center justify-center px-1 text-[9px] font-bold text-white leading-none"
                                            aria-label={`${savedCount} saved places`}
                                        >
                                            {savedCount > 99 ? "99+" : savedCount}
                                        </span>
                                    )}
                                </div>
                                <span className={cn(
                                    "text-[10px]",
                                    isActive ? "font-bold" : "font-medium"
                                )}>
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
};
