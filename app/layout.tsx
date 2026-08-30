import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/json-ld";
import { buildGraph, serviceNode, SITE_URL } from "@/lib/schema";

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
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
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
    url: "/",
    siteName: "FITNEXUS",
    images: [{ url: "/logo-icon.png", width: 512, height: 512, alt: "FITNEXUS" }],
    title: "FITNEXUS – Finde deinen perfekten Coach",
    description:
      "Die All-in-One Fitness Coaching Plattform. Trainer finden, buchen und trainieren – alles in einem System.",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/logo-icon.png"],
    title: "FITNEXUS – Finde deinen perfekten Coach",
    description:
      "Die All-in-One Fitness Coaching Plattform für Trainer und Kunden.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: {
    icon: [{ url: "/logo-icon.png", type: "image/png" }],
    apple: [{ url: "/logo-icon.png" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Kein maximumScale: das Sperren des Zooms nimmt Nutzern mit
  // Sehschwaeche die einzige Vergroesserungsmoeglichkeit.
  themeColor: "#0B0F1A",
  colorScheme: "dark",
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
        <a
          href="#inhalt"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-[#00A8FF] focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-[#0B0F1A]"
        >
          Zum Inhalt springen
        </a>
        {children}
        <JsonLd data={buildGraph(serviceNode)} />
      </body>
    </html>
  );
}
