"use client";

import { Icon } from "@/components/ui/Icon";
import { BottomNav } from "@/components/nav/BottomNav";
import Link from "next/link";

const services = [
    { icon: "two_wheeler", label: "Rent Bike" },
    { icon: "car_rental", label: "Car Rental" },
    { icon: "local_taxi", label: "Cab" },
    { icon: "directions_bus", label: "Intercity" },
];

export default function TravelPage() {
    const handleOpenMaps = () => {
        window.open(
            "https://www.google.com/maps",
            "_blank"
        );
    };

    return (
        <div className="relative flex h-screen w-full flex-col overflow-hidden max-w-md mx-auto shadow-2xl bg-background">
            {/* Background Glows */}
            <div className="fixed top-[-10%] right-[-20%] w-[400px] h-[400px] bg-primary/20 rounded-full blur-[120px] pointer-events-none z-0" />
            <div className="fixed bottom-[30%] left-[-20%] w-[300px] h-[300px] bg-amber-600/10 rounded-full blur-[100px] pointer-events-none z-0" />

            {/* Header */}
            <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5">
                <Link
                    href="/"
                    className="flex size-10 items-center justify-center rounded-full glass press"
                >
                    <Icon name="arrow_back" size="md" />
                </Link>
                <h2 className="text-foreground text-lg font-bold tracking-tight">Travel & Commute</h2>
                <button className="flex size-10 items-center justify-center rounded-full glass press">
                    <Icon name="notifications" size="md" />
                </button>
            </header>

            {/* Main Content */}
            <main className="flex flex-col h-full relative z-10 pt-20">
                {/* Top Section - Services & Buses */}
                <div className="h-[60%] flex flex-col px-6 space-y-6 pb-4 overflow-y-auto no-scrollbar">
                    {/* Services Section */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-foreground font-semibold text-lg">Services</h3>
                            <span className="text-xs text-primary cursor-pointer">View all</span>
                        </div>
                        <div className="grid grid-cols-4 gap-3">
                            {services.map((service) => (
                                <div key={service.label} className="flex flex-col items-center gap-2 group cursor-pointer">
                                    <div className="size-16 rounded-2xl glass flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 border border-white/5 group-hover:border-primary/30">
                                        <Icon name={service.icon} className="text-amber-400 group-hover:text-white transition-colors" />
                                    </div>
                                    <span className="text-[10px] text-muted-foreground font-medium">{service.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Ongoing Buses Section */}
                    <div className="flex-1 min-h-0 flex flex-col">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-foreground font-semibold text-lg">Ongoing Buses</h3>
                            <div className="flex gap-2 items-center">
                                <span className="size-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-xs text-green-500 font-medium">Live Updates</span>
                            </div>
                        </div>

                        {/* Bus Card */}
                        <div className="glass rounded-3xl p-5 relative overflow-hidden group cursor-pointer hover:bg-white/5 transition-colors">
                            <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-br from-amber-300 to-amber-600 opacity-10 blur-3xl rounded-full" />

                            {/* Bus Header */}
                            <div className="flex justify-between items-start mb-6 relative z-10">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-full bg-white/10 flex items-center justify-center">
                                        <Icon name="directions_bus" size="md" />
                                    </div>
                                    <div>
                                        <h4 className="text-foreground font-bold text-sm">Express 402</h4>
                                        <p className="text-muted-foreground text-[10px]">AC Seater • WiFi</p>
                                    </div>
                                </div>
                                <div className="px-2.5 py-1 rounded-full bg-primary/20 border border-primary/20">
                                    <span className="text-primary text-[10px] font-bold tracking-wide">ON TIME</span>
                                </div>
                            </div>

                            {/* Route Info */}
                            <div className="relative z-10 flex items-center justify-between mb-6">
                                <div className="flex flex-col">
                                    <span className="text-2xl font-bold text-foreground">09:00</span>
                                    <span className="text-xs text-muted-foreground mt-1">Raipur</span>
                                </div>
                                <div className="flex-1 mx-4 flex flex-col items-center gap-1">
                                    <span className="text-[10px] text-muted-foreground">5h 30m</span>
                                    <div className="w-full h-[2px] bg-white/10 relative">
                                        <div className="absolute left-0 top-0 bottom-0 w-[60%] bg-gradient-to-r from-amber-300 to-amber-600 rounded-full shadow-[0_0_10px_rgba(252,211,77,0.5)]" />
                                        <div className="absolute left-[60%] top-1/2 -translate-y-1/2 size-2 bg-white rounded-full shadow-lg" />
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-2xl font-bold text-muted-foreground">14:30</span>
                                    <span className="text-xs text-muted-foreground mt-1">Jagdalpur</span>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between pt-4 border-t border-white/5 relative z-10">
                                <div className="flex -space-x-2">
                                    <div className="w-6 h-6 rounded-full bg-primary/30 border border-background flex items-center justify-center">
                                        <Icon name="person" size="xs" className="text-primary" />
                                    </div>
                                    <div className="w-6 h-6 rounded-full bg-primary/20 border border-background flex items-center justify-center">
                                        <Icon name="person" size="xs" className="text-primary/70" />
                                    </div>
                                    <div className="w-6 h-6 rounded-full bg-white/10 border border-background flex items-center justify-center text-[8px] text-foreground">+12</div>
                                </div>
                                <button className="flex items-center gap-1 text-primary text-xs font-bold group-hover:translate-x-1 transition-transform">
                                    Book Seat <Icon name="arrow_forward" size="xs" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map Section */}
                <button
                    onClick={handleOpenMaps}
                    className="flex-1 w-full relative z-20 group overflow-hidden rounded-t-[2.5rem] shadow-[0_-8px_40px_rgba(0,0,0,0.6)] border-t border-white/10 bg-[#120c09]"
                >
                    {/* Map Pattern Background */}
                    <div className="absolute inset-0 opacity-40" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }} />

                    {/* Map Lines */}
                    <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-0 left-1/3 w-2 h-full bg-[#3a2e28] rotate-12 transform origin-top" />
                        <div className="absolute top-1/2 left-0 w-full h-3 bg-[#3a2e28] -rotate-6 transform origin-left" />
                        <div className="absolute top-1/4 right-0 w-2/3 h-1 bg-[#2c221d]" />
                        <div className="absolute bottom-1/3 left-1/4 w-1 h-1/2 bg-[#2c221d] rotate-45" />
                    </div>

                    {/* Your Location Marker */}
                    <div className="absolute top-[40%] left-[45%] flex flex-col items-center z-10 group-hover:scale-110 transition-transform duration-500 ease-out">
                        <div className="px-3 py-1.5 glass rounded-lg mb-2 shadow-lg border-primary/30">
                            <span className="text-xs font-bold text-foreground whitespace-nowrap">Your Location</span>
                        </div>
                        <div className="relative">
                            <div className="absolute -inset-4 bg-primary/30 rounded-full animate-ping" />
                            <div className="relative size-4 bg-primary rounded-full border-2 border-white shadow-[0_0_20px_rgba(223,89,32,0.8)]" />
                        </div>
                    </div>

                    {/* Destination Markers */}
                    <div className="absolute top-[60%] right-[20%] z-10">
                        <Icon name="location_on" filled className="text-amber-500 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" size="lg" />
                    </div>
                    <div className="absolute top-[20%] left-[20%] z-10">
                        <Icon name="location_on" filled className="text-white/40" />
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />

                    {/* Open in Maps Button */}
                    <div className="absolute bottom-28 left-0 right-0 flex justify-center pointer-events-none">
                        <div className="glass-nav px-5 py-2.5 rounded-full flex items-center gap-2 shadow-2xl border border-primary/20 pointer-events-auto group-active:scale-95 transition-transform">
                            <Icon name="map" className="text-primary" size="md" />
                            <span className="text-sm font-semibold text-foreground">Open in Maps</span>
                        </div>
                    </div>
                </button>
            </main>

            {/* Bottom Navigation */}
            <BottomNav />
        </div>
    );
}
