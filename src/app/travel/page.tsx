"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { BottomNav } from "@/components/nav/BottomNav";
import { TransportCard, TransportOption } from "@/components/ui/TransportCard";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Mock Data
const TRANSPORT_DATA: TransportOption[] = [
    {
        id: "1",
        type: "bus",
        provider: "Kanker Roadways",
        name: "Luxury AC Sleeper (2+1)",
        time: "09:00 PM - 06:00 AM",
        price: "₹850",
        rating: 4.5,
        features: ["AC", "Blanket", "Charging Point", "Water"],
        status: "fastest"
    },
    {
        id: "2",
        type: "bus",
        provider: "Mahendra Travels",
        name: "Semi Sleeper (2+2)",
        time: "10:30 PM - 08:00 AM",
        price: "₹650",
        rating: 4.2,
        features: ["Charging Point", "Reading Light"],
        status: "cheapest"
    },
    {
        id: "3",
        type: "cab",
        provider: "Uber Intercity",
        name: "Sedan (Dzire/Etios)",
        time: "On Demand",
        price: "₹3,500",
        rating: 4.8,
        features: ["AC", "4 Seater", "Doorstep Pickup"],
        status: "ontime"
    },
    {
        id: "4",
        type: "rental",
        provider: "ZoomCar",
        name: "Hyundai Creta",
        time: "Self Drive",
        price: "₹2,200/day",
        rating: 4.6,
        features: ["Manual", "Petrol", "5 Seater"],
    }
];

const MODES = [
    { id: "all", label: "All", icon: "dataset" },
    { id: "bus", label: "Bus", icon: "directions_bus" },
    { id: "cab", label: "Cab", icon: "local_taxi" },
    { id: "rental", label: "Rental", icon: "car_rental" },
];

export default function TravelPage() {
    const [selectedMode, setSelectedMode] = useState("all");
    const [source, setSource] = useState("Raipur");
    const [destination, setDestination] = useState("Jagdalpur");

    const filteredOptions = TRANSPORT_DATA.filter(item =>
        selectedMode === "all" ? true : item.type === selectedMode
    );

    return (
        <div className="min-h-screen bg-background pb-20 md:pb-0">
            {/* Header - Mobile & Desktop */}
            <header className="sticky top-0 z-40 glass-header border-b border-border/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="md:hidden flex items-center justify-center p-2 rounded-full hover:bg-muted transition-colors">
                            <Icon name="arrow_back" size="md" />
                        </Link>
                        <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-600">
                            Travel & Commute
                        </h1>
                    </div>
                    <div className="hidden md:flex items-center gap-4">
                        <Button variant="ghost" size="sm">My Bookings</Button>
                        <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <Icon name="person" size="sm" />
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Column: Search & Filters */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Search Card */}
                        <div className="bg-card rounded-3xl p-6 shadow-sm border border-border/50 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10" />

                            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                                <Icon name="route" className="text-primary" />
                                Plan Your Journey
                            </h2>

                            <div className="space-y-4 relative">
                                {/* Connector Line */}
                                <div className="absolute left-[1.15rem] top-10 bottom-10 w-0.5 border-l-2 border-dashed border-border z-0" />

                                <div className="relative z-10">
                                    <label className="text-xs font-semibold text-muted-foreground ml-9 mb-1.5 block">From</label>
                                    <div className="flex items-center gap-3">
                                        <div className="size-4 rounded-full border-[3px] border-primary bg-background shrink-0" />
                                        <div className="flex-1 h-12 bg-muted/50 rounded-xl px-4 flex items-center border border-transparent focus-within:border-primary/50 focus-within:bg-background transition-all">
                                            <input
                                                type="text"
                                                value={source}
                                                onChange={(e) => setSource(e.target.value)}
                                                className="bg-transparent w-full outline-none text-sm font-semibold"
                                                placeholder="Source City"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="relative z-10">
                                    <label className="text-xs font-semibold text-muted-foreground ml-9 mb-1.5 block">To</label>
                                    <div className="flex items-center gap-3">
                                        <div className="size-4 rounded-full border-[3px] border-orange-600 bg-background shrink-0" />
                                        <div className="flex-1 h-12 bg-muted/50 rounded-xl px-4 flex items-center border border-transparent focus-within:border-primary/50 focus-within:bg-background transition-all">
                                            <input
                                                type="text"
                                                value={destination}
                                                onChange={(e) => setDestination(e.target.value)}
                                                className="bg-transparent w-full outline-none text-sm font-semibold"
                                                placeholder="Destination City"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-border/50 grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Date</label>
                                    <div className="h-10 bg-muted/50 rounded-lg px-3 flex items-center">
                                        <span className="text-sm font-medium">Tomorrow, 15 Oct</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Travelers</label>
                                    <div className="h-10 bg-muted/50 rounded-lg px-3 flex items-center">
                                        <span className="text-sm font-medium">1 Adult</span>
                                    </div>
                                </div>
                            </div>

                            <Button className="w-full mt-6" size="lg">
                                Search Options
                            </Button>
                        </div>

                        {/* Mode Toggles (Desktop hidden, Mobile visible inside form usually, but separating for clarity) */}
                        <div className="hidden lg:block bg-card rounded-2xl p-4 shadow-sm border border-border/50">
                            <h3 className="text-sm font-bold text-muted-foreground mb-3 uppercase tracking-wider">Transport Mode</h3>
                            <div className="space-y-1">
                                {MODES.map(mode => (
                                    <button
                                        key={mode.id}
                                        onClick={() => setSelectedMode(mode.id)}
                                        className={cn(
                                            "w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all group",
                                            selectedMode === mode.id
                                                ? "bg-primary/10 text-primary"
                                                : "hover:bg-muted text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Icon name={mode.icon} size="sm" />
                                            {mode.label}
                                        </div>
                                        {selectedMode === mode.id && <Icon name="check" size="sm" />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Results */}
                    <div className="lg:col-span-8">
                        {/* Mobile Category Tabs */}
                        <div className="lg:hidden flex gap-2 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 sticky top-16 z-30 bg-background/95 backdrop-blur-sm pt-2">
                            {MODES.map(mode => (
                                <button
                                    key={mode.id}
                                    onClick={() => setSelectedMode(mode.id)}
                                    className={cn(
                                        "flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold border transition-all",
                                        selectedMode === mode.id
                                            ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                                            : "bg-card text-muted-foreground border-border"
                                    )}
                                >
                                    <Icon name={mode.icon} size="xs" />
                                    {mode.label}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-foreground">
                                {filteredOptions.length} Options Available
                            </h2>
                            <button className="flex items-center gap-1 text-primary text-sm font-semibold">
                                <Icon name="sort" size="sm" /> Sort by
                            </button>
                        </div>

                        <div className="space-y-4">
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((option, idx) => (
                                    <div
                                        key={option.id}
                                        className="animate-reveal-up"
                                        style={{ animationDelay: `${idx * 0.1}s` }}
                                    >
                                        <TransportCard option={option} />
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-20 bg-card rounded-3xl border border-dashed border-border">
                                    <div className="size-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Icon name="search_off" size="lg" className="text-muted-foreground" />
                                    </div>
                                    <p className="text-muted-foreground font-medium">No transport options found for this filter.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <div className="md:hidden">
                <BottomNav />
            </div>
        </div>
    );
}
