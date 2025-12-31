import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Dancing_Script, Inter } from "next/font/google";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import "./globals.css";

// Optimize font loading with display swap and preload
const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const dancingScript = Dancing_Script({
  variable: "--font-cursive",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Vihaar - Explore Chhattisgarh",
  description: "Discover the hidden gems of Chhattisgarh - waterfalls, temples, tribal art, and local cuisine.",
  keywords: ["Chhattisgarh", "Tourism", "Travel", "Waterfalls", "Temples", "Tribal Art", "Bhilai"],
  authors: [{ name: "Vihaar Team" }],
  robots: "index, follow",
  openGraph: {
    title: "Vihaar - Explore Chhattisgarh",
    description: "Discover the hidden gems of Chhattisgarh",
    type: "website",
    locale: "en_IN",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#201612",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ========== DNS PREFETCH (Lowest Priority) ========== */}
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://lh3.googleusercontent.com" />

        {/* ========== PRECONNECT (High Priority for Critical Resources) ========== */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* ========== MATERIAL SYMBOLS (Optimized) ========== */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0..1,0&display=swap"
          rel="stylesheet"
        />

        {/* ========== PRELOAD CRITICAL RESOURCES ========== */}
        {/* Preload LCP image for home page - uncomment if you have a static hero */}
        {/* <link rel="preload" as="image" href="/hero.webp" type="image/webp" /> */}
      </head>
      <body
        className={`${plusJakarta.variable} ${inter.variable} ${dancingScript.variable} font-sans bg-background text-foreground antialiased selection:bg-primary selection:text-white`}
        suppressHydrationWarning
      >
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
