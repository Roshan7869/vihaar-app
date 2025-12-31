"use client";

import { useState, useRef, useEffect } from "react";

interface LazyYouTubeProps {
    videoId: string;
    title: string;
    thumbnail?: string;
    className?: string;
}

/**
 * LazyYouTube Component - YouTube-like Loading
 * 
 * Shows thumbnail until user clicks play
 * Loads YouTube iframe only when needed
 * Saves bandwidth and improves performance
 * 
 * @example
 * <LazyYouTube
 *   videoId="dQw4w9WgXcQ"
 *   title="Video Title"
 * />
 */
export function LazyYouTube({
    videoId,
    title,
    thumbnail,
    className = "",
}: LazyYouTubeProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Intersection Observer - preload when scrolled into view
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1, rootMargin: "200px" }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const thumbnailSrc =
        thumbnail || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    return (
        <div
            ref={containerRef}
            className={`relative w-full aspect-video bg-black rounded-lg overflow-hidden ${className}`}
        >
            {!isPlaying && (
                <div
                    className="relative w-full h-full cursor-pointer group"
                    onClick={() => setIsPlaying(true)}
                    style={{
                        backgroundImage: `url(${thumbnailSrc})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300" />

                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-red-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                            <svg
                                className="w-8 h-8 md:w-10 md:h-10 text-white ml-1"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </div>

                    {/* Loading indicator (when visible but not playing) */}
                    {isVisible && !isPlaying && (
                        <div className="absolute top-2 right-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                        </div>
                    )}

                    {/* Video title overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                        <p className="text-white text-sm font-medium line-clamp-2">
                            {title}
                        </p>
                    </div>
                </div>
            )}

            {/* YouTube iframe (only rendered when playing) */}
            {isPlaying && (
                <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                    title={title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            )}
        </div>
    );
}
