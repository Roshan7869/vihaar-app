// Service Worker for Vihaar App - Instagram-Speed Loading
// Target: 800ms-1.2s load times with aggressive caching

const CACHE_VERSION = 'v3';
const CACHE_NAME = `vihaar-app-${CACHE_VERSION}`;
const RUNTIME_CACHE = `vihaar-runtime-${CACHE_VERSION}`;
const IMAGE_CACHE = `vihaar-images-${CACHE_VERSION}`;
const API_CACHE = `vihaar-api-${CACHE_VERSION}`;

// Assets to precache on install (critical path)
const CRITICAL_ASSETS = [
    '/',
    '/explore',
    '/profile',
    '/offline.html',
];

// Image domains to cache (allowlist)
const CACHEABLE_IMAGE_DOMAINS = [
    'images.unsplash.com',
    'lh3.googleusercontent.com',
    'img.youtube.com',
];

// Cache TTL settings (in seconds)
const CACHE_TTL = {
    images: 60 * 60 * 24 * 30,      // 30 days
    api: 60 * 5,                     // 5 minutes
    pages: 60 * 60,                  // 1 hour
    static: 60 * 60 * 24 * 365,      // 1 year
};

// ============================================
// Install Event - Precache Critical Assets
// ============================================
self.addEventListener('install', (event) => {
    event.waitUntil(
        Promise.all([
            caches.open(CACHE_NAME).then((cache) => {
                return cache.addAll(CRITICAL_ASSETS);
            }),
            // Clear old caches
            clearOldCaches(),
        ])
    );
    // Activate immediately
    self.skipWaiting();
});

// ============================================
// Activate Event - Cleanup & Claim Clients
// ============================================
self.addEventListener('activate', (event) => {
    event.waitUntil(
        Promise.all([
            clearOldCaches(),
            // Claim all clients immediately
            self.clients.claim(),
        ])
    );
});

// ============================================
// Fetch Event - Optimized Caching Strategies
// ============================================
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') return;

    // Skip non-HTTP(S) requests
    if (!url.protocol.startsWith('http')) return;

    // Skip dev/HMR requests
    if (url.pathname.includes('_next/webpack')) return;

    // Route to appropriate strategy
    if (isImageRequest(request, url)) {
        event.respondWith(handleImageRequest(request));
        return;
    }

    if (isStaticAsset(url)) {
        event.respondWith(handleStaticAsset(request));
        return;
    }

    if (isApiRequest(url)) {
        event.respondWith(handleApiRequest(request));
        return;
    }

    if (isNavigationRequest(request)) {
        event.respondWith(handleNavigationRequest(request));
        return;
    }

    // Default: Stale-while-revalidate
    event.respondWith(staleWhileRevalidate(request, RUNTIME_CACHE));
});

// ============================================
// Request Type Detection
// ============================================
function isImageRequest(request, url) {
    if (request.destination === 'image') return true;
    if (url.pathname.match(/\.(jpg|jpeg|png|gif|webp|avif|svg)$/i)) return true;
    if (CACHEABLE_IMAGE_DOMAINS.some(domain => url.hostname.includes(domain))) return true;
    return false;
}

function isStaticAsset(url) {
    return url.pathname.startsWith('/_next/static/') ||
        url.pathname.endsWith('.js') ||
        url.pathname.endsWith('.css') ||
        url.pathname.endsWith('.woff2') ||
        url.pathname.endsWith('.woff');
}

function isApiRequest(url) {
    return url.pathname.startsWith('/api/');
}

function isNavigationRequest(request) {
    return request.mode === 'navigate';
}

// ============================================
// Caching Strategies
// ============================================

/**
 * Cache-First Strategy (for images)
 * Returns cached response immediately, updates cache in background
 * Instant image display with eventual freshness
 */
async function handleImageRequest(request) {
    const cache = await caches.open(IMAGE_CACHE);
    const cached = await cache.match(request);

    if (cached) {
        // Return cached immediately, update in background
        updateCacheInBackground(request, cache);
        return cached;
    }

    try {
        const response = await fetch(request);
        if (response.ok) {
            cache.put(request, response.clone());
        }
        return response;
    } catch (error) {
        return createOfflineImageResponse();
    }
}

/**
 * Cache-First Strategy (for static assets)
 * These rarely change, so cache-first is optimal
 */
async function handleStaticAsset(request) {
    const cached = await caches.match(request);
    if (cached) return cached;

    try {
        const response = await fetch(request);
        if (response.ok) {
            const cache = await caches.open(RUNTIME_CACHE);
            cache.put(request, response.clone());
        }
        return response;
    } catch (error) {
        return new Response('Offline', { status: 503 });
    }
}

/**
 * Network-First with Timeout (for API calls)
 * Try network first, fall back to cache if slow/offline
 */
async function handleApiRequest(request) {
    const cache = await caches.open(API_CACHE);

    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 3000);

        const response = await fetch(request, { signal: controller.signal });
        clearTimeout(timeout);

        if (response.ok) {
            // Cache successful responses
            cache.put(request, response.clone());
        }
        return response;
    } catch (error) {
        // Return cached on error/timeout
        const cached = await cache.match(request);
        if (cached) return cached;

        return new Response(
            JSON.stringify({ error: 'Offline', cached: false }),
            {
                status: 503,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}

/**
 * Stale-While-Revalidate (for navigation)
 * Instant page load with background refresh
 */
async function handleNavigationRequest(request) {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);

    // Start network fetch immediately (non-blocking)
    const networkFetch = fetch(request)
        .then((response) => {
            if (response.ok) {
                cache.put(request, response.clone());
            }
            return response;
        })
        .catch(() => null);

    // Return cached immediately if available
    if (cached) {
        return cached;
    }

    // Wait for network if no cache
    const networkResponse = await networkFetch;
    if (networkResponse) {
        return networkResponse;
    }

    // Fallback to offline page
    return caches.match('/offline.html') ||
        new Response('Offline', { status: 503 });
}

/**
 * Stale-While-Revalidate (generic)
 */
async function staleWhileRevalidate(request, cacheName) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);

    const networkFetch = fetch(request)
        .then((response) => {
            if (response && response.ok) {
                cache.put(request, response.clone());
            }
            return response;
        })
        .catch(() => null);

    if (cached) {
        return cached;
    }

    const networkResponse = await networkFetch;
    return networkResponse || new Response('Offline', { status: 503 });
}

// ============================================
// Helper Functions
// ============================================

/**
 * Update cache in background (non-blocking)
 */
function updateCacheInBackground(request, cache) {
    fetch(request)
        .then((response) => {
            if (response.ok) {
                cache.put(request, response);
            }
        })
        .catch(() => { });
}

/**
 * Create placeholder for failed images
 */
function createOfflineImageResponse() {
    const svg = `
        <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
            <rect fill="#201612" width="400" height="300"/>
            <text x="50%" y="50%" fill="#666" text-anchor="middle" dy=".3em">
                Image unavailable
            </text>
        </svg>
    `;
    return new Response(svg, {
        headers: { 'Content-Type': 'image/svg+xml' }
    });
}

/**
 * Clear old cache versions
 */
async function clearOldCaches() {
    const cacheNames = await caches.keys();
    const currentCaches = [CACHE_NAME, RUNTIME_CACHE, IMAGE_CACHE, API_CACHE];

    return Promise.all(
        cacheNames
            .filter((name) => !currentCaches.includes(name))
            .map((name) => caches.delete(name))
    );
}

// ============================================
// Message Handlers
// ============================================

self.addEventListener('message', (event) => {
    const { type, payload } = event.data || {};

    switch (type) {
        case 'PRECACHE_IMAGES':
            precacheImages(payload?.images || []);
            break;
        case 'PRECACHE_ROUTES':
            precacheRoutes(payload?.routes || []);
            break;
        case 'CLEAR_CACHE':
            clearAllCaches();
            break;
        case 'SKIP_WAITING':
            self.skipWaiting();
            break;
    }
});

/**
 * Precache images on demand
 */
async function precacheImages(urls) {
    const cache = await caches.open(IMAGE_CACHE);

    await Promise.all(
        urls.map(async (url) => {
            // Skip if already cached
            if (await cache.match(url)) return;

            try {
                const response = await fetch(url);
                if (response.ok) {
                    await cache.put(url, response);
                }
            } catch (error) {
                // Silently fail for precaching
            }
        })
    );
}

/**
 * Precache routes for instant navigation
 */
async function precacheRoutes(routes) {
    const cache = await caches.open(CACHE_NAME);

    await Promise.all(
        routes.map(async (route) => {
            if (await cache.match(route)) return;

            try {
                const response = await fetch(route);
                if (response.ok) {
                    await cache.put(route, response);
                }
            } catch (error) {
                // Silently fail
            }
        })
    );
}

/**
 * Clear all app caches
 */
async function clearAllCaches() {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map((name) => caches.delete(name)));
}

// ============================================
// Periodic Cache Cleanup
// ============================================

self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'cache-cleanup') {
        event.waitUntil(cleanupCaches());
    }
});

async function cleanupCaches() {
    // Clean up image cache (keep last 100)
    const imageCache = await caches.open(IMAGE_CACHE);
    const imageRequests = await imageCache.keys();

    if (imageRequests.length > 100) {
        const toDelete = imageRequests.slice(0, imageRequests.length - 100);
        await Promise.all(toDelete.map((req) => imageCache.delete(req)));
    }

    // Clean up API cache (remove expired)
    const apiCache = await caches.open(API_CACHE);
    const apiRequests = await apiCache.keys();

    for (const request of apiRequests) {
        const response = await apiCache.match(request);
        if (response) {
            const dateHeader = response.headers.get('date');
            if (dateHeader) {
                const age = Date.now() - new Date(dateHeader).getTime();
                if (age > CACHE_TTL.api * 1000) {
                    await apiCache.delete(request);
                }
            }
        }
    }
}

// ============================================
// Push Notifications (future use)
// ============================================

self.addEventListener('push', (event) => {
    if (!event.data) return;

    const data = event.data.json();

    event.waitUntil(
        self.registration.showNotification(data.title || 'Vihaar', {
            body: data.body,
            icon: '/icons/icon-192x192.png',
            badge: '/icons/badge-72x72.png',
            data: data.url,
        })
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    if (event.notification.data) {
        event.waitUntil(
            clients.openWindow(event.notification.data)
        );
    }
});
