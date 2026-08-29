import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import MagneticCursor from "@/components/MagneticCursor";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Dominio público del sitio. Cuando compres un dominio propio, define
// NEXT_PUBLIC_SITE_URL en Vercel (Settings -> Environment Variables) y no
// hace falta volver a tocar este archivo.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://portafolio-2026-felipe-landinez-s-projects.vercel.app";

const title = "Felipe Landinez · Desarrollo web para negocios";
const description =
  "Desarrollo sitios web para negocios que necesitan que los encuentren en Google. Next.js, React y SEO local. Tres proyectos en producción.";

export const metadata: Metadata = {
  // Base para resolver las rutas relativas de canonical y Open Graph.
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "Felipe Landinez",
  authors: [{ name: "Felipe Landinez", url: siteUrl }],
  creator: "Felipe Landinez",
  keywords: [
    "desarrollo web",
    "desarrollador frontend",
    "Next.js",
    "React",
    "Astro",
    "SEO local",
    "Colombia",
    "Felipe Landinez",
  ],
  alternates: {
    canonical: "/",
  },
  // og:image, su ancho, alto y alt los genera Next a partir de
  // opengraph-image.png y opengraph-image.alt.txt, que viven en esta carpeta.
  openGraph: {
    type: "website",
    siteName: "Felipe Landinez",
    url: "/",
    title,
    description,
    locale: "es_CO",
    alternateLocale: ["en_US"],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
  themeColor: "#0B1116",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          <MagneticCursor />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
