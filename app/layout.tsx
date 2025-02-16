import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { Toaster } from "@/components/ui/toaster";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cineverse",
  description: "Discover and explore your favorite movies and TV shows in one place",
  openGraph: {
    title: "Cineverse - Your Ultimate Movie Discovery Platform",
    description: "Discover and explore your favorite movies and TV shows in one place. Get personalized recommendations, track your watchlist, and more.",
    url: "https://cineverse-rho.vercel.app",
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: "Cineverse - Movie Discovery Platform",
      },
    ],
    type: "website",
  },
  icons: {
    icon: { url: '/logo.svg', type: 'image/svg+xml' }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link href="https://cdn.jsdelivr.net/npm/remixicon@3.6.0/fonts/remixicon.css" rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
