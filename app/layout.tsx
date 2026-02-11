import type { Metadata } from "next";
import { Amiri, Cinzel, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./(components)/Navbar";
import { Providers } from "./(components)/Providers";

const cinzel = Cinzel({
  variable: "--font-display",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const amiri = Amiri({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "700"]
});

export const metadata: Metadata = {
  title: {
    default: "Masjid Umer - Prayer Times, Events & Community",
    template: "%s - Masjid Umer",
  },

  description:
    "Masjid Umer provides daily prayer times, Jumuah schedule, Islamic events, announcements, and community services in the UK.",

  keywords: [
    "Masjid Umer",
    "Mosque in UK",
    "Prayer times",
    "Jumuah prayer",
    "Islamic events",
    "Masjid near me",
    "Mosque prayer timetable",
  ],

  metadataBase: new URL("https://www.masjidumer.web.app"),

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Masjid Umer",
    description:
      "View prayer times, Jumuah schedule, announcements, and events at Masjid Umer.",
    url: "https://www.masjidumer.web.app",
    siteName: "Masjid Umer",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Masjid Umer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Masjid Umer",
    description:
      "Prayer times, events, and announcements from Masjid Umer.",
    images: ["/logo.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body
          className={`antialiased ${cinzel.variable} ${inter.variable} ${amiri.variable}`}
        >
          <Navbar />
          {children}
        </body>
      </Providers>
    </html>
  );
}
