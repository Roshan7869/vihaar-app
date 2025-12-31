/**
 * Responsive Image Sizes Configuration
 * Use these constants for consistent sizing across the app
 * 
 * Updated for Instagram-like performance targeting 800ms-1.2s load times
 */
export const IMAGE_SIZES = {
    // Hero images - full width on mobile, max 1920px
    hero: "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1920px",

    // Featured cards - 85vw on mobile, max 360px
    featured: "(max-width: 480px) 85vw, 360px",

    // Card images - responsive grid
    card: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",

    // Thumbnail images
    thumbnail: "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw",

    // Avatar images - fixed size
    avatar: "112px",

    // Wishlist item images
    wishlistItem: "80px",

    // Full screen background
    fullScreen: "(max-width: 480px) 100vw, 480px",

    // New granular sizes for different viewports
    // Small cards (like hidden gems in carousel)
    smallCard: "(max-width: 320px) 280px, (max-width: 480px) 320px, 360px",

    // Medium cards (explore page cards)
    mediumCard: "(max-width: 480px) 100vw, (max-width: 768px) 50vw, 400px",

    // Large cards (detail page hero)
    largeCard: "(max-width: 480px) 100vw, (max-width: 1024px) 80vw, 800px",

    // Grid items (2-column grid)
    gridItem: "(max-width: 480px) 50vw, (max-width: 768px) 33vw, 25vw",

    // Icon-sized images
    icon: "48px",

    // Profile header background
    profileBg: "(max-width: 480px) 480px, 640px",
};

/**
 * Image Quality Presets
 * Higher quality for important images, lower for thumbnails
 * 
 * Quality levels aligned with next.config.ts qualities: [60, 75, 85, 90]
 */
export const IMAGE_QUALITY = {
    // Maximum quality for hero/featured (90)
    hero: 90,

    // High quality for featured content (85)
    featured: 85,

    // Default quality for cards (75)
    card: 75,

    // Lower quality for thumbnails (60)
    thumbnail: 60,

    // Heavy compression OK for backgrounds (60)
    background: 60,

    // Placeholder quality (very low, not in config)
    placeholder: 30,
};

/**
 * Blur Data URL for placeholder (tiny transparent image)
 * Base64 encoded SVG for instant display
 */
export const BLUR_DATA_URL =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3QgZmlsbD0iIzMxMjIxYyIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIi8+PC9zdmc+";

/**
 * Shimmer placeholder for loading states
 * Inline SVG with animation
 */
export const SHIMMER_DATA_URL =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIi8+PHN0b3Agb2Zmc2V0PSI1MCUiIHN0b3AtY29sb3I9InJnYmEoMjU1LDI1NSwyNTUsMC4xNSkiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCBmaWxsPSIjMzEyMjFjIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIvPjxyZWN0IGZpbGw9InVybCgjZykiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIi8+PC9zdmc+";

/**
 * Device pixel ratios to support
 * Used for generating srcset with appropriate density
 */
export const DEVICE_PIXEL_RATIOS = [1, 1.5, 2, 3];

/**
 * Breakpoints for responsive images
 * Aligned with Tailwind default breakpoints
 */
export const BREAKPOINTS = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
} as const;

/**
 * Precomputed sizes for common use cases
 * Avoids recalculating in components
 */
export const PRECOMPUTED_SIZES = {
    // Mobile portrait (width ~375px)
    mobilePortrait: 375,

    // Mobile landscape (width ~667px)
    mobileLandscape: 667,

    // Tablet portrait (width ~768px)
    tabletPortrait: 768,

    // Tablet landscape (width ~1024px)
    tabletLandscape: 1024,

    // Desktop (width ~1440px)
    desktop: 1440,
} as const;

/**
 * Helper function to generate responsive sizes string
 */
export function generateSizesString(config: {
    mobile: string;
    tablet?: string;
    desktop?: string;
}): string {
    const { mobile, tablet, desktop } = config;

    let sizes = `(max-width: ${BREAKPOINTS.sm}px) ${mobile}`;

    if (tablet) {
        sizes += `, (max-width: ${BREAKPOINTS.lg}px) ${tablet}`;
    }

    if (desktop) {
        sizes += `, ${desktop}`;
    } else if (tablet) {
        sizes += `, ${tablet}`;
    } else {
        sizes += `, ${mobile}`;
    }

    return sizes;
}
