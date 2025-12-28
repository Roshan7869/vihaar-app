import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Dancing_Script } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const dancingScript = Dancing_Script({
  variable: "--font-cursive",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Vihaar - Explore Chhattisgarh",
  description: "Discover the hidden gems of Chhattisgarh - waterfalls, temples, tribal art, and local cuisine.",
  keywords: ["Chhattisgarh", "Tourism", "Travel", "Waterfalls", "Temples", "Tribal Art"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Material Symbols */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${plusJakarta.variable} ${dancingScript.variable} font-display bg-[#201612] text-white antialiased selection:bg-primary selection:text-black`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
