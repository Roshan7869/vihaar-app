/**
 * Logger Utility - Environment-aware logging
 * Use this instead of console.log for clean production builds
 */

const isDev = process.env.NODE_ENV === 'development';

export const logger = {
    /**
     * General information logs (dev only)
     */
    info: (message: string, ...args: unknown[]) => {
        if (isDev) console.log(`ℹ️ ${message}`, ...args);
    },

    /**
     * Warning logs (dev only)
     */
    warn: (message: string, ...args: unknown[]) => {
        if (isDev) console.warn(`⚠️ ${message}`, ...args);
    },

    /**
     * Error logs (always shown - critical for debugging)
     */
    error: (message: string, ...args: unknown[]) => {
        console.error(`❌ ${message}`, ...args);
    },

    /**
     * Service Worker logs (dev only)
     */
    sw: (message: string, ...args: unknown[]) => {
        if (isDev) console.log(`🔧 [SW] ${message}`, ...args);
    },

    /**
     * Performance logs (dev only)
     */
    perf: (message: string, ...args: unknown[]) => {
        if (isDev) console.log(`⚡ [PERF] ${message}`, ...args);
    },

    /**
     * Debug logs (dev only) - for verbose debugging
     */
    debug: (message: string, ...args: unknown[]) => {
        if (isDev) console.debug(`🐛 [DEBUG] ${message}`, ...args);
    },
};
