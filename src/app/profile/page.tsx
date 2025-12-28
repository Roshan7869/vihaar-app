"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BottomNav } from "@/components/nav/BottomNav";
import { currentUser, wishlistItems } from "@/lib/data";

export default function ProfilePage() {
    const router = useRouter();

    return (
        <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden app-container shadow-2xl bg-[#0D0D0D] pb-32">
            {/* Background Glows */}
            <div className="fixed top-[-10%] right-[-10%] w-[300px] h-[300px] bg-primary/20 rounded-full blur-[100px] pointer-events-none z-0" />
            <div className="fixed bottom-[-10%] left-[-10%] w-[250px] h-[250px] bg-amber-500/10 rounded-full blur-[80px] pointer-events-none z-0" />

            {/* Header */}
            <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 glass-nav">
                <button
                    onClick={() => router.back()}
                    className="flex size-10 items-center justify-center rounded-full bg-white/5 active:bg-white/10 transition-colors"
                >
                    <span className="material-symbols-outlined text-white" style={{ fontSize: "24px" }}>
                        arrow_back
                    </span>
                </button>
                <h2 className="text-white text-lg font-bold tracking-tight">My Profile</h2>
                <button className="flex size-10 items-center justify-center rounded-full bg-white/5 active:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-white" style={{ fontSize: "24px" }}>
                        settings
                    </span>
                </button>
            </header>

            {/* Main Content */}
            <main className="flex-1 relative z-10 flex flex-col px-4 pb-24">
                {/* Avatar Section */}
                <div className="mt-4 flex flex-col items-center">
                    <div className="relative group cursor-pointer">
                        <div className="absolute -inset-1 rounded-full bg-golden-gradient opacity-70 blur-sm group-hover:opacity-100 transition duration-200" />
                        <div className="relative size-28 rounded-full border-4 border-[#211611] overflow-hidden bg-gray-800">
                            <img
                                alt="Profile"
                                className="h-full w-full object-cover"
                                src={currentUser.avatar}
                            />
                        </div>
                        <div className="absolute bottom-1 right-1 bg-primary border-4 border-[#211611] rounded-full p-1 flex items-center justify-center">
                            <span
                                className="material-symbols-outlined text-white"
                                style={{ fontSize: "14px", fontWeight: "700" }}
                            >
                                edit
                            </span>
                        </div>
                    </div>
                    <h1 className="mt-4 text-2xl font-bold text-white text-center leading-tight">
                        {currentUser.name}
                    </h1>
                    <div className="flex items-center gap-1 mt-1 text-[#c6a495] text-sm font-medium">
                        <span className="material-symbols-outlined text-primary" style={{ fontSize: "16px" }}>
                            location_on
                        </span>
                        {currentUser.location}
                    </div>
                </div>

                {/* Stats Card */}
                <div className="mt-8 relative overflow-hidden rounded-2xl glass-card p-6">
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
                    <div className="relative z-10 flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-[#c6a495] text-sm font-medium uppercase tracking-wider">
                                Total Visits
                            </span>
                            <div className="flex items-baseline gap-1 mt-1">
                                <span className="text-5xl font-extrabold text-white tracking-tight">
                                    {currentUser.totalVisits}
                                </span>
                                <span className="text-sm text-white/60 font-normal">places</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            <div className="flex items-center gap-1.5 bg-golden-gradient px-3 py-1 rounded-full shadow-lg shadow-amber-900/20">
                                <span
                                    className="material-symbols-outlined text-[#211611]"
                                    style={{ fontSize: "18px" }}
                                >
                                    military_tech
                                </span>
                                <span className="text-[#211611] text-xs font-bold uppercase tracking-wide">
                                    {currentUser.level} Level
                                </span>
                            </div>
                            <span className="text-xs text-[#c6a495]">{currentUser.levelPercentile} Explorer</span>
                        </div>
                    </div>
                </div>

                {/* Tab Toggle */}
                <div className="mt-8 p-1.5 bg-[#130d0a] border border-white/5 rounded-full flex relative">
                    <div className="absolute left-1.5 top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-primary rounded-full shadow-lg shadow-orange-900/30" />
                    <button className="flex-1 relative z-10 py-3 text-center text-sm font-bold text-white transition-colors">
                        To Explore
                    </button>
                    <button className="flex-1 relative z-10 py-3 text-center text-sm font-bold text-white/50 hover:text-white/80 transition-colors">
                        Visited
                    </button>
                </div>

                {/* Wishlist */}
                <div className="mt-6 flex flex-col gap-4">
                    <h3 className="px-2 text-white/90 text-sm font-semibold mb-1 flex items-center justify-between">
                        <span>Wishlist</span>
                        <span className="text-xs text-primary font-normal cursor-pointer hover:underline">
                            See all
                        </span>
                    </h3>

                    {wishlistItems.map((item) => (
                        <Link
                            key={item.id}
                            href={`/places/${item.id}`}
                            className="group glass-card rounded-xl p-3 flex gap-4 items-center hover:bg-white/5 transition-colors cursor-pointer"
                        >
                            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                                <img
                                    alt={item.title}
                                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    src={item.image}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            </div>
                            <div className="flex flex-col flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <h4 className="text-white font-bold text-base truncate pr-2">
                                        {item.title}
                                    </h4>
                                    <span
                                        className="material-symbols-outlined text-white/40 group-hover:text-primary transition-colors"
                                        style={{ fontSize: "20px" }}
                                    >
                                        bookmark
                                    </span>
                                </div>
                                <p className="text-[#c6a495] text-xs mt-0.5 truncate">{item.subtitle}</p>
                                <div className="flex items-center gap-3 mt-2.5">
                                    <div className="flex items-center gap-1">
                                        <span
                                            className="material-symbols-outlined text-primary"
                                            style={{ fontSize: "14px" }}
                                        >
                                            distance
                                        </span>
                                        <span className="text-white/60 text-[10px] font-medium">{item.distance}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span
                                            className="material-symbols-outlined text-yellow-400"
                                            style={{ fontSize: "14px" }}
                                        >
                                            star
                                        </span>
                                        <span className="text-white/60 text-[10px] font-medium">{item.rating}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>

            {/* Floating Action Button */}
            <button className="fixed bottom-24 right-6 z-40 bg-golden-gradient size-14 rounded-full shadow-2xl shadow-orange-500/40 flex items-center justify-center text-[#211611] hover:scale-105 transition-transform active:scale-95">
                <span className="material-symbols-outlined" style={{ fontSize: "28px" }}>
                    add_location_alt
                </span>
            </button>

            <BottomNav />
        </div>
    );
}
