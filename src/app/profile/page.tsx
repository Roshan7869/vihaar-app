"use client";

import { Icon } from "@/components/ui/Icon";
import { BottomNav } from "@/components/nav/BottomNav";
import { useSaved } from "@/context/SavedContext";
import { bhilaiPlaces } from "@/lib/bhilai-places";
import Link from "next/link";

const notifications = [
    {
        icon: "local_fire_department",
        title: "Trending Destination",
        desc: "Chitrakote Falls is trending this week!",
        time: "2h ago",
        unread: true,
    },
    {
        icon: "celebration",
        title: "New Event",
        desc: "Bastar Dussehra festival starting soon",
        time: "1d ago",
        unread: true,
    },
    {
        icon: "star",
        title: "Review Request",
        desc: "How was your visit to Kanger Valley?",
        time: "3d ago",
        unread: false,
    },
];

const settingsItems = [
    { icon: "person", label: "Edit Profile", href: null },
    { icon: "bookmark", label: "Saved Places", href: "/saved" },
    { icon: "search", label: "Explore Places", href: "/search" },
    { icon: "settings", label: "Preferences", href: null },
];

export default function ProfilePage() {
    const { savedCount, savedPlaces } = useSaved();
    const totalPlaces = bhilaiPlaces.length;

    return (
        <div className="flex justify-center bg-background min-h-screen">
            <div className="max-w-[420px] w-full min-h-screen relative">
                <div className="min-h-screen pb-24">
                    {/* Header */}
                    <header className="sticky top-0 z-40 glass-header px-5 py-4 flex justify-between items-center">
                        <h1 className="text-xl font-bold text-foreground">Profile</h1>
                        <button
                            className="w-10 h-10 flex items-center justify-center relative press"
                            aria-label="Notifications"
                        >
                            <Icon name="notifications" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full" />
                        </button>
                    </header>

                    <div className="px-5 pt-4 space-y-6">
                        {/* User Info */}
                        <div className="glass p-6 rounded-2xl flex flex-col items-center text-center">
                            <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                                <Icon name="person" className="text-primary text-[48px]" />
                            </div>
                            <h2 className="text-xl font-bold text-foreground">Traveler</h2>
                            <div className="flex items-center gap-1 mt-1 text-muted-foreground">
                                <Icon name="location_on" size="sm" />
                                <span className="text-sm">Raipur, Chhattisgarh</span>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="glass p-5 rounded-2xl text-center">
                                <div className="w-12 h-12 bg-destructive/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                                    <Icon name="favorite" filled className="text-destructive" />
                                </div>
                                <p className="text-3xl font-extrabold text-foreground">{savedCount}</p>
                                <p className="text-muted-foreground text-sm mt-1">Saved Places</p>
                            </div>
                            <div className="glass p-5 rounded-2xl text-center">
                                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                                    <Icon name="explore" className="text-primary" />
                                </div>
                                <p className="text-3xl font-extrabold text-foreground">{totalPlaces}</p>
                                <p className="text-muted-foreground text-sm mt-1">Places to Explore</p>
                            </div>
                        </div>

                        {/* Saved Places Preview */}
                        {savedPlaces.length > 0 && (
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="font-bold text-foreground">Recently Saved</h3>
                                    <Link
                                        href="/saved"
                                        className="text-primary text-sm font-semibold press"
                                    >
                                        View All
                                    </Link>
                                </div>
                                <div className="flex gap-3 overflow-x-auto no-scrollbar">
                                    {savedPlaces.slice(0, 5).map((place) => (
                                        <Link
                                            key={place.id}
                                            href={`/places/${place.id}`}
                                            className="flex-shrink-0 glass rounded-xl p-3 flex flex-col gap-1 w-28 press"
                                        >
                                            <div
                                                className="w-full h-16 rounded-lg bg-cover bg-center"
                                                style={{ backgroundImage: `url(${place.images[0]})` }}
                                            />
                                            <p className="text-[10px] font-semibold text-foreground truncate mt-1">{place.title}</p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Notifications */}
                        <div>
                            <h3 className="font-bold mb-4 text-foreground">Recent Notifications</h3>
                            <div className="space-y-3">
                                {notifications.map((notif, index) => (
                                    <div
                                        key={index}
                                        className={`glass p-4 rounded-xl flex gap-3 ${notif.unread ? "border-l-2 border-l-primary" : ""
                                            }`}
                                    >
                                        <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Icon name={notif.icon} size="md" className="text-primary" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-sm text-foreground">{notif.title}</p>
                                            <p className="text-muted-foreground text-xs mt-0.5 line-clamp-1">
                                                {notif.desc}
                                            </p>
                                        </div>
                                        <span className="text-muted-foreground text-xs flex-shrink-0">
                                            {notif.time}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Settings shortcuts */}
                        <div>
                            <h3 className="font-bold mb-4 text-foreground">Settings</h3>
                            <div className="glass rounded-2xl divide-y divide-white/5">
                                {settingsItems.map((item) =>
                                    item.href ? (
                                        <Link
                                            key={item.label}
                                            href={item.href}
                                            className="w-full p-4 flex items-center gap-3 press"
                                        >
                                            <Icon name={item.icon} className="text-muted-foreground" size="md" />
                                            <span className="flex-1 text-left font-medium text-foreground">{item.label}</span>
                                            <Icon name="chevron_right" className="text-muted-foreground" size="md" />
                                        </Link>
                                    ) : (
                                        <button
                                            key={item.label}
                                            className="w-full p-4 flex items-center gap-3 press"
                                        >
                                            <Icon name={item.icon} className="text-muted-foreground" size="md" />
                                            <span className="flex-1 text-left font-medium text-foreground">{item.label}</span>
                                            <Icon name="chevron_right" className="text-muted-foreground" size="md" />
                                        </button>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <BottomNav />
            </div>
        </div>
    );
}
