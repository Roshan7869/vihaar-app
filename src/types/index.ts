// ============================================
// Vihaar App - TypeScript Types & Interfaces
// ============================================

export type PlaceCategory =
  | "nature"
  | "heritage"
  | "festival"
  | "food"
  | "tribal"
  | "temple"
  | "caves"
  | "waterfalls"
  | "historical"
  | "art_craft"
  | "event";

export type UserLevel = "bronze" | "silver" | "gold" | "platinum";

// ============================================
// Timing & Pricing Types
// ============================================
export interface PlaceTimings {
  opens_at: string;
  closes_at: string;
  closed_days: string[];
}

export interface PriceInfo {
  is_free: boolean;
  entry_fee: number;
  currency: string;
}

// ============================================
// Place / Destination Types
// ============================================
export interface Place {
  id: string;
  title: string;
  subtitle?: string;
  location: string;
  district: string;
  category: PlaceCategory;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  bestTime?: string;
  entryFee?: string;
  distance?: string;
  likes?: number;
  isBookmarked?: boolean;
  // Extended fields for Bhilai places
  tags?: string[];
  short_description?: string;
  timings?: PlaceTimings;
  price_info?: PriceInfo;
  google_maps_url?: string;
  views_count?: number;
}

export interface FeaturedPlace extends Place {
  tag?: string;
  tagType?: "festival" | "heritage" | "trending";
  eventDate?: string;
}

// ============================================
// User Types
// ============================================
export interface User {
  id: string;
  name: string;
  location: string;
  avatar: string;
  totalVisits: number;
  level: UserLevel;
  levelPercentile?: string;
  wishlist: string[];
  visited: string[];
}

export interface WishlistItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  distance: string;
  rating: number;
}

// ============================================
// Navigation Types
// ============================================
export type NavTab = "home" | "explore" | "profile";

export interface NavItem {
  id: NavTab;
  label: string;
  icon: string;
  path: string;
}

// ============================================
// Category Filter Types
// ============================================
export interface CategoryFilter {
  id: string;
  label: string;
  isActive?: boolean;
}

// ============================================
// Tab Types for Detail Page
// ============================================
export type DetailTab = "Overview" | "History" | "Accommodations";
