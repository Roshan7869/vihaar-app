/**
 * Web Vitals Reporting Utility
 * Reports Core Web Vitals metrics for performance monitoring
 */

import { logger } from './logger';

type WebVitalsMetric = {
    name: 'CLS' | 'FCP' | 'FID' | 'INP' | 'LCP' | 'TTFB';
    value: number;
    delta: number;
    id: string;
    navigationType: 'navigate' | 'reload' | 'back_forward' | 'prerender';
};

/**
 * Report Web Vitals to analytics or console
 */
export function reportWebVitals(metric: WebVitalsMetric): void {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
        const color = getMetricColor(metric);
        logger.perf(
            `%c${metric.name}: ${metric.value.toFixed(2)}`,
            `color: ${color}; font-weight: bold;`
        );
    }

    // Send to analytics endpoint in production
    if (process.env.NODE_ENV === 'production') {
        const body = JSON.stringify({
            name: metric.name,
            value: metric.value,
            delta: metric.delta,
            id: metric.id,
            navigationType: metric.navigationType,
            page: typeof window !== 'undefined' ? window.location.pathname : '',
            timestamp: Date.now(),
        });

        // Use sendBeacon for reliable delivery
        if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
            navigator.sendBeacon('/api/analytics/vitals', body);
        } else if (typeof fetch !== 'undefined') {
            fetch('/api/analytics/vitals', {
                method: 'POST',
                body,
                keepalive: true,
                headers: { 'Content-Type': 'application/json' },
            }).catch(() => {
                // Silently fail if analytics fails
            });
        }
    }
}

/**
 * Get color based on metric performance
 */
function getMetricColor(metric: WebVitalsMetric): string {
    const thresholds: Record<string, [number, number]> = {
        CLS: [0.1, 0.25],
        FCP: [1800, 3000],
        FID: [100, 300],
        INP: [200, 500],
        LCP: [2500, 4000],
        TTFB: [800, 1800],
    };

    const [good, needsImprovement] = thresholds[metric.name] || [0, 0];

    if (metric.value <= good) return '#0cce6b'; // Green
    if (metric.value <= needsImprovement) return '#ffa400'; // Orange
    return '#ff4e42'; // Red
}

/**
 * Performance timing utilities
 */
export function measurePerformance(name: string): () => void {
    if (typeof performance === 'undefined') return () => { };

    const startMark = `${name}-start`;
    performance.mark(startMark);

    return () => {
        const endMark = `${name}-end`;
        performance.mark(endMark);

        try {
            performance.measure(name, startMark, endMark);
            const entries = performance.getEntriesByName(name);
            const duration = entries[entries.length - 1]?.duration || 0;

            if (process.env.NODE_ENV === 'development') {
                logger.perf(`${name}: ${duration.toFixed(2)}ms`);
            }

            // Cleanup
            performance.clearMarks(startMark);
            performance.clearMarks(endMark);
            performance.clearMeasures(name);
        } catch {
            // Silently fail
        }
    };
}

/**
 * Component render time tracker
 */
export function useRenderTime(componentName: string): void {
    if (typeof window === 'undefined') return;

    const startTime = performance.now();

    // Log on next tick (after render)
    setTimeout(() => {
        const duration = performance.now() - startTime;
        if (process.env.NODE_ENV === 'development' && duration > 16) {
            console.warn(`⚠️ Slow render: ${componentName} took ${duration.toFixed(2)}ms`);
        }
    }, 0);
}
