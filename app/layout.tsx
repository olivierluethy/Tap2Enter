import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import ScrollDepthTracker from "./components/ScrollDepthTracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://tap2enter.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tap2Enter — Stop filling out the same form. Every. Single. Time.",
    template: "%s · Tap2Enter",
  },
  icons: {
    icon: "/logo.png", // Pfad zu deiner Datei
    shortcut: "/logo.png",
    apple: "/logo.png", // Optional für iOS
  },
  description:
    "Tap2Enter replaces paper forms at events with a single QR scan. Scan once. Enter once. Done. Built for giveaways, contests, and lead capture at real-world events.",
  keywords: [
    "QR forms",
    "event giveaways",
    "lead capture",
    "paperless events",
    "QR code signup",
    "event marketing",
    "Tap2Enter",
  ],
  applicationName: "Tap2Enter",
  authors: [{ name: "Tap2Enter" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Tap2Enter",
    title: "Tap2Enter — Scan once. Enter once. Done.",
    description:
      "Replace paper forms at events with one tap. No repetition, no handwriting errors, no manual data entry.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tap2Enter — Scan once. Enter once. Done.",
    description:
      "Replace paper forms at events with one tap. No repetition, no handwriting errors, no manual data entry.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  themeColor: "#050509",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <ScrollDepthTracker />
        {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
        <Analytics />
      </body>
    </html>
  );
}
