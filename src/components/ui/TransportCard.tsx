
import React from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export interface TransportOption {
    id: string;
    type: "bus" | "cab" | "rental" | "train";
    provider: string; // e.g. "Uber", "Express Bus", "ZoomCar"
    name: string; // e.g. "Sedan", "Volvo AC", "Swift Dzire" 
    time: string; // e.g. "10:00 AM - 02:00 PM" or "4h 30m"
    price: string;
    rating?: number;
    features: string[]; // e.g. ["AC", "WiFi", "Snacks"]
    status?: "ontime" | "delayed" | "fastest" | "cheapest";
}

interface TransportCardProps {
    option: TransportOption;
    onBook?: (id: string) => void;
    className?: string;
}

export function TransportCard({ option, onBook, className }: TransportCardProps) {
    return (
        <div className={cn(
            "group relative bg-card rounded-2xl p-5 border border-border/50 hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-md",
            className
        )}>
            {/* Badge/Status */}
            {option.status && (
                <div className={cn(
                    "absolute top-3 right-3 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide",
                    option.status === "ontime" || option.status === "fastest"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                )}>
                    {option.status}
                </div>
            )}

            <div className="flex gap-4 items-start">
                {/* Icon/Logo */}
                <div className="size-12 shrink-0 rounded-xl bg-muted flex items-center justify-center text-primary group-hover:scale-105 transition-transform duration-300">
                    <Icon
                        name={
                            option.type === "bus" ? "directions_bus" :
                                option.type === "cab" ? "local_taxi" :
                                    option.type === "train" ? "train" :
                                        "two_wheeler"
                        }
                        size="md"
                    />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start pr-16">
                        <div>
                            <h4 className="font-bold text-foreground text-base leading-tight">
                                {option.provider}
                            </h4>
                            <p className="text-sm text-muted-foreground mt-0.5">{option.name}</p>
                        </div>
                    </div>

                    {/* Time / Route Line */}
                    <div className="my-3 flex items-center gap-3">
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-muted/50 text-xs font-medium text-foreground">
                            <Icon name="schedule" size="xs" className="text-muted-foreground" />
                            {option.time}
                        </div>
                        {option.rating && (
                            <div className="flex items-center gap-1 text-xs font-bold text-foreground">
                                <Icon name="star" size="xs" className="text-yellow-500" filled />
                                {option.rating}
                            </div>
                        )}
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {option.features.map((feat, i) => (
                            <span key={i} className="text-[10px] text-muted-foreground bg-background border border-border px-1.5 py-0.5 rounded">
                                {feat}
                            </span>
                        ))}
                    </div>

                    {/* Footer Price & Action */}
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-muted-foreground font-medium">Starting from</span>
                            <span className="text-lg font-extrabold text-primary">{option.price}</span>
                        </div>

                        <Button
                            size="sm"
                            className="h-9 px-5 rounded-full"
                            onClick={() => onBook?.(option.id)}
                        >
                            Book
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
