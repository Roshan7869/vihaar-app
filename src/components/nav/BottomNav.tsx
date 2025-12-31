"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

interface NavItem {
    id: string;
    label: string;
    icon: string;
    href: string;
    badge?: boolean;
}

const navItems: NavItem[] = [
    { id: "home", label: "Home", icon: "home", href: "/" },
    { id: "explore", label: "Explore", icon: "explore", href: "/explore" },
    { id: "saved", label: "Saved", icon: "favorite", href: "/saved" },
    { id: "profile", label: "Profile", icon: "person", href: "/profile", badge: true },
];

export const BottomNav = () => {
    const pathname = usePathname();

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
        <nav className="fixed bottom-0 left-0 right-0 z-50 safe-bottom">
            <div className="max-w-[420px] mx-auto glass-nav">
                <div className="flex justify-around py-3">
                    {navItems.map((item) => (
                        <Link
                            key={item.id}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center gap-0.5 px-6 py-1 transition-colors press relative",
                                activeTab === item.id ? "text-primary" : "text-muted-foreground"
                            )}
                        >
                            <div className="relative">
                                <Icon
                                    name={item.icon}
                                    filled={activeTab === item.id}
                                    size="lg"
                                />
                                {item.badge && (
                                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-destructive rounded-full" />
                                )}
                            </div>
                            <span className={cn(
                                "text-[10px]",
                                activeTab === item.id ? "font-bold" : "font-medium"
                            )}>
                                {item.label}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};
