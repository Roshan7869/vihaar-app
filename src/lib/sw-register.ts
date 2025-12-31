/**
 * Service Worker Registration Utility
 * Registers the service worker for offline support
 */

import { logger } from './logger';

export function registerServiceWorker(): void {
    if (typeof window === 'undefined') return;
    if (!('serviceWorker' in navigator)) {
        logger.sw('Service workers not supported');
        return;
    }

    window.addEventListener('load', async () => {
        try {
            const registration = await navigator.serviceWorker.register('/sw.js', {
                scope: '/',
            });

            logger.sw('Registered successfully:', registration.scope);

            // Handle updates
            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;
                if (!newWorker) return;

                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        // New service worker available
                        logger.sw('New version available! Please refresh.');

                        // Optional: Show update notification to user
                        if (window.confirm('New version available! Refresh to update?')) {
                            window.location.reload();
                        }
                    }
                });
            });

            // Check for updates periodically
            setInterval(() => {
                registration.update();
            }, 60 * 60 * 1000); // Every hour

        } catch (error) {
            logger.error('[SW] Registration failed:', error);
        }
    });

    // Handle controller change (new SW activated)
    navigator.serviceWorker.addEventListener('controllerchange', () => {
        logger.sw('Controller changed, reloading...');
        window.location.reload();
    });
}

/**
 * Unregister service worker (for debugging)
 */
export async function unregisterServiceWorker(): Promise<void> {
    if (typeof window === 'undefined') return;
    if (!('serviceWorker' in navigator)) return;

    try {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const registration of registrations) {
            await registration.unregister();
            logger.sw('Unregistered successfully');
        }
    } catch (error) {
        logger.error('[SW] Unregistration failed:', error);
    }
}

/**
 * Check if app is running in standalone mode (installed as PWA)
 */
export function isStandalone(): boolean {
    if (typeof window === 'undefined') return false;

    return (
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true
    );
}

/**
 * Send message to service worker
 */
export async function sendMessageToSW(message: any): Promise<void> {
    if (typeof window === 'undefined') return;
    if (!navigator.serviceWorker.controller) return;

    return new Promise((resolve, reject) => {
        const messageChannel = new MessageChannel();

        messageChannel.port1.onmessage = (event) => {
            if (event.data.error) {
                reject(event.data.error);
            } else {
                resolve(event.data);
            }
        };

        navigator.serviceWorker.controller!.postMessage(message, [
            messageChannel.port2,
        ]);
    });
}
