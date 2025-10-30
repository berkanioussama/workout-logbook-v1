import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "@/components/footer";
import ReactQueryProvider from "@/components/providers/react-query-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Workout Logbook",
  description: "Workout Logbook, Track your workouts and progress",
  keywords: ["workout", "logbook", "fitness", "exercise", "training"],
  authors: [{ name: "Workout Logbook" }],
  openGraph: {
    title: "Workout Logbook",
    description: "Workout Logbook, Track your workouts and progress",
    type: "website",
    locale: "en_US",
    siteName: "Workout Logbook",
  },
  twitter: {
    title: "Workout Logbook",
    description: "Workout Logbook, Track your workouts and progress",
    card: "summary_large_image",
    site: "@WorkoutLogbook",
    creator: "@WorkoutLogbook",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-main-darker text-white`}
      >
        <ReactQueryProvider>
            {children}
          <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
