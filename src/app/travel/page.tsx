"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { BottomNav } from "@/components/nav/BottomNav";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Mock Data for Functional List
const BUS_DATA = [
    {
        id: "1",
        name: "Express 402",
        type: "AC Seater • WiFi",
        status: "ON TIME",
        departs: "09:00",
        arrives: "14:30",
        duration: "5h 30m",
        source: "Raipur",
        destination: "Jagdalpur",
        seats: 12
    },
    {
        id: "2",
        name: "Kanker Royal",
        type: "AC Sleeper (2+1)",
        status: "DELAYED",
        departs: "10:15",
        arrives: "16:00",
        duration: "5h 45m",
        source: "Raipur",
        destination: "Jagdalpur",
        seats: 8
    },
    {
        id: "3",
        name: "Mahindra Travels",
        type: "Non-AC Seater",
        status: "ON TIME",
        departs: "11:30",
        arrives: "17:30",
        duration: "6h 00m",
        source: "Durg",
        destination: "Kondagaon",
        seats: 24
    },
    {
        id: "4",
        name: "Payal Travels",
        type: "AC Sleeper",
        status: "FASTEST",
        departs: "22:00",
        arrives: "05:00",
        duration: "7h 00m",
        source: "Raipur",
        destination: "Bastar",
        seats: 15
    },
    {
        id: "5",
        name: "Royal Cruiser",
        type: "Volvo Multi-Axle",
        status: "ON TIME",
        departs: "23:00",
        arrives: "06:00",
        duration: "7h 00m",
        source: "Raipur",
        destination: "Jagdalpur",
        seats: 32
    }
];

const services = [
    { icon: "two_wheeler", label: "Rent Bike" },
    { icon: "car_rental", label: "Car Rental" },
    { icon: "local_taxi", label: "Cab" },
    { icon: "directions_bus", label: "Intercity" },
];

export default function TravelPage() {
    const handleOpenMaps = () => {
        // Opens direction from Raipur to Jagdalpur (Example)
        window.open(
            "https://www.google.com/maps/dir/?api=1&origin=Raipur,+Chhattisgarh&destination=Jagdalpur,+Chhattisgarh&travelmode=driving",
            "_blank"
        );
    };

    return (
        <div className="relative flex h-screen w-full flex-col overflow-hidden max-w-md mx-auto shadow-2xl bg-[#0F0F0F]">
            {/* Background Glows for Premium Dark Feel */}
            <div className="fixed top-[-10%] right-[-20%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none z-0" />
            <div className="fixed bottom-[30%] left-[-20%] w-[300px] h-[300px] bg-amber-600/5 rounded-full blur-[100px] pointer-events-none z-0" />

            {/* Header */}
            <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 bg-gradient-to-b from-[#0F0F0F] via-[#0F0F0F]/80 to-transparent">
                <Link
                    href="/"
                    className="flex size-10 items-center justify-center rounded-full glass border border-white/5 press bg-black/40 text-white hover:bg-black/60 transition-colors"
                >
                    <Icon name="arrow_back" size="md" />
                </Link>
                <h2 className="text-white text-lg font-bold tracking-tight">Travel & Commute</h2>
                <button className="flex size-10 items-center justify-center rounded-full glass border border-white/5 press bg-black/40 text-white hover:bg-black/60 transition-colors">
                    <Icon name="notifications" size="md" />
                </button>
            </header>

            {/* Main Content Scrollable Area */}
            <div className="flex-1 flex flex-col pt-24 overflow-y-auto no-scrollbar scroll-smooth">

                {/* Services Section */}
                <div className="px-6 mb-8 shrink-0">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white font-semibold text-lg tracking-wide">Services</h3>
                        <span className="text-xs text-primary cursor-pointer hover:underline font-medium">View all</span>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                        {services.map((service) => (
                            <div key={service.label} className="flex flex-col items-center gap-2 group cursor-pointer">
                                <div className="size-16 rounded-2xl bg-[#1A1A1A] border border-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 group-hover:border-primary/30 shadow-lg group-hover:scale-105 group-active:scale-95">
                                    <Icon name={service.icon} className="text-amber-400 group-hover:text-white transition-colors" size="md" />
                                </div>
                                <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap group-hover:text-gray-300 transition-colors">{service.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Ongoing Buses List Section */}
                <div className="px-6 pb-40"> {/* Extra padding bottom for Map overlap to ensure visible scroll end */}
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white font-semibold text-lg tracking-wide">Ongoing Buses</h3>
                        <div className="flex gap-2 items-center bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20">
                            <span className="size-1.5 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] text-green-500 font-bold uppercase tracking-wider">Live Updates</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {BUS_DATA.map((bus, idx) => (
                            <div
                                key={bus.id}
                                className="bg-[#1A1A1A]/80 backdrop-blur-md border border-white/5 rounded-3xl p-5 relative overflow-hidden group cursor-pointer hover:bg-[#252525] transition-all duration-300 hover:border-white/10 hover:shadow-xl active:scale-[0.98]"
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                {/* Decor */}
                                <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-br from-amber-500/5 to-transparent rounded-bl-full pointer-events-none group-hover:from-amber-500/10 transition-colors" />

                                {/* Bus Header */}
                                <div className="flex justify-between items-start mb-6 relative z-10">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-full bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-white/10 transition-colors">
                                            <Icon name="directions_bus" size="md" className="text-gray-300 group-hover:text-white transition-colors" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold text-sm tracking-wide">{bus.name}</h4>
                                            <p className="text-gray-500 text-[10px] font-medium">{bus.type}</p>
                                        </div>
                                    </div>
                                    <div className={cn(
                                        "px-2.5 py-1 rounded-full border text-[10px] font-bold tracking-wide shadow-sm",
                                        bus.status === "ON TIME" ? "bg-primary/10 border-primary/20 text-primary shadow-primary/10" :
                                            bus.status === "FASTEST" ? "bg-blue-500/10 border-blue-500/20 text-blue-400 shadow-blue-500/10" :
                                                "bg-red-500/10 border-red-500/20 text-red-400 shadow-red-500/10"
                                    )}>
                                        {bus.status}
                                    </div>
                                </div>

                                {/* Route Info */}
                                <div className="relative z-10 flex items-center justify-between mb-6">
                                    <div className="flex flex-col">
                                        <span className="text-2xl font-bold text-white tracking-tight">{bus.departs}</span>
                                        <span className="text-xs text-gray-500 mt-1 font-medium">{bus.source}</span>
                                    </div>
                                    <div className="flex-1 mx-4 flex flex-col items-center gap-1">
                                        <span className="text-[10px] text-gray-500 font-medium">{bus.duration}</span>
                                        <div className="w-full h-[2px] bg-white/10 relative rounded-full overflow-hidden">
                                            <div className="absolute left-0 top-0 bottom-0 w-[60%] bg-gradient-to-r from-amber-600 to-amber-400 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                                            <div className="absolute left-[60%] top-1/2 -translate-y-1/2 size-2 bg-white rounded-full shadow-lg border-2 border-amber-500" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-2xl font-bold text-gray-400 tracking-tight">{bus.arrives}</span>
                                        <span className="text-xs text-gray-500 mt-1 font-medium">{bus.destination}</span>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-between pt-4 border-t border-white/5 relative z-10">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="w-6 h-6 rounded-full bg-neutral-800 border border-[#1A1A1A] flex items-center justify-center ring-2 ring-[#1A1A1A]">
                                                <Icon name="person" size="xs" className="text-gray-500" />
                                            </div>
                                        ))}
                                        <div className="w-6 h-6 rounded-full bg-neutral-800 border border-[#1A1A1A] flex items-center justify-center text-[8px] text-gray-400 ring-2 ring-[#1A1A1A]">+{bus.seats}</div>
                                    </div>
                                    <button className="flex items-center gap-1 text-primary text-xs font-bold group-hover:translate-x-1 transition-transform uppercase tracking-wider">
                                        Book Seat <Icon name="arrow_forward" size="xs" />
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* More Loading Skeleton / Space filler */}
                        <div className="py-4 flex flex-col items-center justify-center gap-2 opacity-50">
                            <div className="flex gap-1">
                                <span className="size-1.5 bg-gray-600 rounded-full animate-bounce delay-0" />
                                <span className="size-1.5 bg-gray-600 rounded-full animate-bounce delay-100" />
                                <span className="size-1.5 bg-gray-600 rounded-full animate-bounce delay-200" />
                            </div>
                            <span className="text-[10px] text-gray-600 font-medium uppercase tracking-widest">End of List</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Map Section - Fixed Bottom Panel */}
            <div
                className="absolute bottom-0 left-0 right-0 z-40 bg-[#120c09] transition-transform duration-300 rounded-t-[2.5rem] shadow-[0_-8px_40px_rgba(0,0,0,0.8)] border-t border-white/10 h-[100px] mb-[64px]" /* mb-[64px] clears Navbar */
            >
                <button
                    onClick={handleOpenMaps}
                    className="w-full h-full relative group overflow-hidden rounded-t-[2.5rem] focus:outline-none"
                    aria-label="Open in Maps"
                >
                    {/* Map Pattern Background */}
                    <div className="absolute inset-0 opacity-30 transition-opacity duration-300 group-hover:opacity-40" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }} />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />

                    {/* Open in Maps Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="glass-nav px-6 py-3 rounded-full flex items-center gap-2 shadow-2xl border border-primary/20 pointer-events-auto group-active:scale-95 transition-all duration-300 bg-[#1A1A1A]/90 group-hover:bg-primary group-hover:border-primary">
                            <Icon name="map" className="text-primary group-hover:text-white transition-colors" size="md" />
                            <span className="text-sm font-semibold text-white">Open in Maps</span>
                        </div>
                    </div>

                    {/* Map Marker Decoration */}
                    <div className="absolute top-[20%] left-[20%] opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 -translate-y-2 group-hover:translate-y-0">
                        <Icon name="location_on" filled className="text-amber-500 drop-shadow-lg" />
                    </div>
                </button>
            </div>

            {/* Bottom Navigation */}
            <div className="relative z-50">
                <BottomNav />
            </div>
        </div>
    );
}
