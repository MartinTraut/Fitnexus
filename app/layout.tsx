import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "FITNEXUS – Finde deinen perfekten Coach",
    template: "%s | FITNEXUS",
  },
  description:
    "Die All-in-One Fitness Coaching Plattform. Finde Personal Trainer in deiner Nähe, buche Kennenlerngespräche, erstelle Trainingspläne und tracke deinen Fortschritt.",
  keywords: [
    "Personal Trainer",
    "Fitness Coach",
    "Trainingsplan",
    "Ernährungsplan",
    "Personal Training",
    "Online Coaching",
    "Fitness Plattform",
  ],
  authors: [{ name: "FITNEXUS" }],
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "FITNEXUS",
    title: "FITNEXUS – Finde deinen perfekten Coach",
    description:
      "Die All-in-One Fitness Coaching Plattform. Trainer finden, buchen und trainieren – alles in einem System.",
  },
  twitter: {
    card: "summary_large_image",
    title: "FITNEXUS – Finde deinen perfekten Coach",
    description:
      "Die All-in-One Fitness Coaching Plattform für Trainer und Kunden.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0B0F1A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="dark">
      <body
        className={`${inter.variable} ${manrope.variable} font-sans antialiased noise-overlay`}
      >
        {children}
      </body>
    </html>
  );
}
