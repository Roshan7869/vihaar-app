"use client";

import { useRef, useEffect, useState, useCallback } from "react";

/**
 * Reusable Intersection Observer Utility
 * 
 * Provides hooks and utilities for viewport-based loading and visibility detection
 * Used for lazy loading images, infinite scroll, and animation triggers
 */

interface IntersectionOptions extends IntersectionObserverInit {
    freezeOnceVisible?: boolean;
    initialIsIntersecting?: boolean;
}

/**
 * Hook: useIntersectionObserver
 * 
 * Generic intersection observer hook
 * Returns ref and intersection state
 * 
 * @example
 * const { ref, isIntersecting, entry } = useIntersectionObserver({
 *   threshold: 0.5,
 *   rootMargin: '100px',
 *   freezeOnceVisible: true
 * });
 */
export function useIntersectionObserver(
    options: IntersectionOptions = {}
): {
    ref: React.RefObject<HTMLDivElement | null>;
    isIntersecting: boolean;
    entry: IntersectionObserverEntry | null;
} {
    const {
        threshold = 0.1,
        root = null,
        rootMargin = "0px",
        freezeOnceVisible = false,
        initialIsIntersecting = false,
    } = options;

    const ref = useRef<HTMLDivElement>(null);
    const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
    const [isIntersecting, setIsIntersecting] = useState(initialIsIntersecting);
    const frozen = useRef(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // If frozen and visible, don't observe anymore
        if (frozen.current && freezeOnceVisible) return;

        const observer = new IntersectionObserver(
            ([observerEntry]) => {
                setEntry(observerEntry);
                const nowIntersecting = observerEntry.isIntersecting;

                setIsIntersecting(nowIntersecting);

                // Freeze if visible and freezeOnceVisible is true
                if (nowIntersecting && freezeOnceVisible) {
                    frozen.current = true;
                    observer.disconnect();
                }
            },
            { threshold, root, rootMargin }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [threshold, root, rootMargin, freezeOnceVisible]);

    return { ref, isIntersecting, entry };
}

/**
 * Hook: useLazyLoad
 * 
 * Simplified hook for lazy loading content
 * Returns ref and visibility state (frozen once visible)
 * 
 * @example
 * const [ref, isVisible] = useLazyLoad({ rootMargin: '200px' });
 * 
 * return (
 *   <div ref={ref}>
 *     {isVisible && <ExpensiveComponent />}
 *   </div>
 * );
 */
export function useLazyLoad(
    options: Omit<IntersectionOptions, "freezeOnceVisible"> = {}
): [React.RefObject<HTMLDivElement | null>, boolean] {
    const { ref, isIntersecting } = useIntersectionObserver({
        ...options,
        freezeOnceVisible: true,
        rootMargin: options.rootMargin || "200px",
    });

    return [ref, isIntersecting];
}

/**
 * Hook: useOnScreen
 * 
 * Track if element is currently on screen
 * Unlike useLazyLoad, this updates when element leaves viewport
 * 
 * @example
 * const { ref, isOnScreen } = useOnScreen({ threshold: 0.5 });
 */
export function useOnScreen(
    options: Omit<IntersectionOptions, "freezeOnceVisible"> = {}
): {
    ref: React.RefObject<HTMLDivElement | null>;
    isOnScreen: boolean;
} {
    const { ref, isIntersecting } = useIntersectionObserver({
        ...options,
        freezeOnceVisible: false,
    });

    return { ref, isOnScreen: isIntersecting };
}

/**
 * Hook: useVisibleItems
 * 
 * Track which items in a list are currently visible
 * Useful for pausing videos/animations when not visible
 * 
 * @example
 * const visibleIds = useVisibleItems(items, itemRefs);
 */
export function useVisibleItems<T extends { id: string | number }>(
    items: T[],
    threshold: number = 0.5
): Set<string | number> {
    const [visibleIds, setVisibleIds] = useState<Set<string | number>>(new Set());
    const observerRef = useRef<IntersectionObserver | null>(null);
    const elementsRef = useRef<Map<string | number, Element>>(new Map());

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                setVisibleIds((prev) => {
                    const next = new Set(prev);
                    entries.forEach((entry) => {
                        const id = entry.target.getAttribute("data-item-id");
                        if (id) {
                            if (entry.isIntersecting) {
                                next.add(id);
                            } else {
                                next.delete(id);
                            }
                        }
                    });
                    return next;
                });
            },
            { threshold }
        );

        return () => {
            observerRef.current?.disconnect();
        };
    }, [threshold]);

    // Function to register/unregister elements
    const registerElement = useCallback((id: string | number, element: Element | null) => {
        if (element) {
            element.setAttribute("data-item-id", String(id));
            elementsRef.current.set(id, element);
            observerRef.current?.observe(element);
        } else {
            const existing = elementsRef.current.get(id);
            if (existing) {
                observerRef.current?.unobserve(existing);
                elementsRef.current.delete(id);
            }
        }
    }, []);

    return visibleIds;
}

/**
 * Utility: observeElements
 * 
 * Observe multiple elements with a single observer
 * Useful for batch operations
 * 
 * @example
 * const cleanup = observeElements(
 *   document.querySelectorAll('.lazy-image'),
 *   (entry) => {
 *     if (entry.isIntersecting) {
 *       loadImage(entry.target);
 *     }
 *   }
 * );
 */
export function observeElements(
    elements: NodeListOf<Element> | Element[],
    callback: (entry: IntersectionObserverEntry) => void,
    options: IntersectionObserverInit = {}
): () => void {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(callback);
    }, options);

    Array.from(elements).forEach((element) => {
        observer.observe(element);
    });

    return () => observer.disconnect();
}

/**
 * Utility: preloadOnVisible
 * 
 * Preload resources when element becomes visible
 * 
 * @example
 * preloadOnVisible(element, [
 *   '/images/hero.jpg',
 *   '/api/data.json'
 * ]);
 */
export function preloadOnVisible(
    element: Element,
    resources: string[],
    options: IntersectionObserverInit = { rootMargin: "200px" }
): () => void {
    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                resources.forEach((url) => {
                    const link = document.createElement("link");
                    link.rel = "preload";
                    link.href = url;

                    // Determine resource type
                    if (url.match(/\.(jpg|jpeg|png|webp|avif|gif)$/i)) {
                        link.as = "image";
                    } else if (url.match(/\.(js)$/i)) {
                        link.as = "script";
                    } else if (url.match(/\.(css)$/i)) {
                        link.as = "style";
                    } else {
                        link.as = "fetch";
                    }

                    document.head.appendChild(link);
                });

                observer.disconnect();
            }
        },
        options
    );

    observer.observe(element);

    return () => observer.disconnect();
}
