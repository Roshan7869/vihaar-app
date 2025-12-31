
import React from "react";
import { ProgressiveImage } from "@/components/ui/ProgressiveImage";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";

export interface DestinationCardProps {
    title: string;
    description?: string;
    imageUrl: string;
    location?: string;
    rating?: number;
    badge?: string;
    onClick?: () => void;
    className?: string;
    featured?: boolean;
}

export function DestinationCard({
    title,
    description,
    imageUrl,
    location,
    rating,
    badge,
    onClick,
    className,
    featured = false,
}: DestinationCardProps) {
    return (
        <div
            onClick={onClick}
            className={cn(
                "group relative flex flex-col bg-card rounded-2xl overflow-hidden shadow-sm transition-all duration-300 card-hover cursor-pointer border border-border/50 hover:border-primary/20",
                featured ? "h-[320px]" : "h-auto",
                className
            )}
        >
            {/* Image Section */}
            <div className={cn(
                "relative overflow-hidden w-full bg-muted",
                featured ? "h-full" : "aspect-[4/3]"
            )}>
                <ProgressiveImage
                    src={imageUrl}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                {/* Badge */}
                {badge && (
                    <div className="absolute top-3 right-3 z-10 bg-primary/90 text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
                        {badge}
                    </div>
                )}

                {/* Content Overlay (for Featured/Hero style cards) */}
                {featured && (
                    <div className="absolute bottom-0 left-0 right-0 p-5 z-20 flex flex-col gap-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold text-white leading-tight shadow-black/10 drop-shadow-md">
                                {title}
                            </h3>
                            {rating && (
                                <div className="flex items-center gap-1 bg-black/30 backdrop-blur-md px-2 py-1 rounded-lg">
                                    <Icon name="star" filled className="text-yellow-400" size="xs" />
                                    <span className="text-white text-xs font-medium">{rating}</span>
                                </div>
                            )}
                        </div>
                        {location && (
                            <div className="flex items-center gap-1.5 text-gray-200 text-sm">
                                <Icon name="location_on" size="xs" />
                                <span>{location}</span>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Content Section (for Standard cards) */}
            {!featured && (
                <div className="p-4 flex flex-col gap-3 bg-card z-10 relative flex-1">
                    <div className="flex justify-between items-start gap-2">
                        <h3 className="text-lg font-bold text-foreground leading-tight group-hover:text-primary transition-colors duration-200 line-clamp-1">
                            {title}
                        </h3>
                        {rating && (
                            <div className="flex items-center gap-1 shrink-0 bg-muted px-1.5 py-0.5 rounded-md">
                                <Icon name="star" filled className="text-yellow-500" size="xs" />
                                <span className="text-xs font-bold text-foreground">{rating}</span>
                            </div>
                        )}
                    </div>

                    {location && (
                        <div className="flex items-center gap-1 text-muted-foreground text-xs font-medium">
                            <Icon name="location_on" size="xs" className="text-primary/70" />
                            <span className="line-clamp-1">{location}</span>
                        </div>
                    )}

                    {description && (
                        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed flex-1">
                            {description}
                        </p>
                    )}

                    <div className="pt-3 mt-auto border-t border-border flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">Tour</span>
                        <span className="text-primary text-xs font-bold uppercase tracking-wide flex items-center gap-1 group/btn group-hover:underline decoration-2 underline-offset-4">
                            Explore
                            <Icon name="arrow_forward" size="xs" className="transition-transform duration-200 group-hover/btn:translate-x-1" />
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
