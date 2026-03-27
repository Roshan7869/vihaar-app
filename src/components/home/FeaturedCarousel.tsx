"use client";

import { useState, useRef } from "react";
import { Icon } from "@/components/ui/Icon";
import { DestinationCard } from "@/components/ui/DestinationCard";
import { featuredPlaces } from "@/lib/data";

interface FeaturedCarouselProps {
    onExplore?: (id: string) => void;
}

export const FeaturedCarousel = ({ onExplore }: FeaturedCarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const startX = useRef(0);
    const currentX = useRef(0);

    const handleStart = (clientX: number) => {
        setIsDragging(true);
        startX.current = clientX;
        currentX.current = clientX;
    };

    const handleMove = (clientX: number) => {
        if (!isDragging) return;
        currentX.current = clientX;
        const diff = currentX.current - startX.current;
        setDragOffset(diff);
    };

    const handleEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);

        const diff = startX.current - currentX.current;
        const threshold = 50;

        if (diff > threshold && currentIndex < featuredPlaces.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else if (diff < -threshold && currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }

        setDragOffset(0);
    };

    // Touch events
    const handleTouchStart = (e: React.TouchEvent) => handleStart(e.touches[0].clientX);
    const handleTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);
    const handleTouchEnd = () => handleEnd();

    // Mouse events for desktop
    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        handleStart(e.clientX);
    };
    const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
    const handleMouseUp = () => handleEnd();
    const handleMouseLeave = () => {
        if (isDragging) handleEnd();
    };

    const containerWidth = containerRef.current?.offsetWidth || 0;
    const translateX = -currentIndex * 100 + (containerWidth > 0 ? (dragOffset / containerWidth) * 100 : 0);

    return (
        <section className="px-5 pt-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-foreground">Featured of the Week</h2>
                <div className="flex gap-1">
                    {featuredPlaces.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`Go to slide ${index + 1}`}
                            className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                ? "bg-primary w-6"
                                : "bg-muted-foreground/40 w-2"
                                }`}
                        />
                    ))}
                </div>
            </div>

            <div
                ref={containerRef}
                className="relative rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing select-none parallax-container"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
            >
                <div
                    className={`flex ${isDragging ? '' : 'transition-transform duration-700'}`}
                    style={{
                        transform: `translateX(${translateX}%)`,
                        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                >
                    {featuredPlaces.map((item) => (
                        <div key={item.id} className="w-full flex-shrink-0 px-1">
                            <DestinationCard
                                featured={true}
                                title={item.title}
                                imageUrl={item.images[0]}
                                location={item.location}
                                description={item.subtitle ?? item.description}
                                badge={item.tag ?? item.category}
                                rating={item.rating}
                                onClick={() => {
                                    if (!isDragging) onExplore?.(item.id);
                                }}
                                className="w-full h-auto aspect-[4/3] shadow-lg"
                            />
                        </div>
                    ))}
                </div>

                {/* Swipe hint */}
                <div className="absolute top-4 right-4 glass px-3 py-1.5 rounded-full flex items-center gap-1 animate-pulse">
                    <Icon name="swipe" size="sm" className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Swipe</span>
                </div>
            </div>
        </section>
    );
};
