import { Metadata } from "next";

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