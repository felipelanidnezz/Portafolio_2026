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

// El sitio se publica en dos lados a la vez: Vercel y GitHub Pages.
//
// canonicalUrl es la que quieres que Google indexe, siempre la misma, para que
// las dos copias no compitan entre ellas. Cuando compres un dominio propio,
// define NEXT_PUBLIC_SITE_URL en Vercel y no hace falta tocar este archivo.
//
// deployUrl es el ORIGEN del deploy que se está compilando, sin basePath:
// en GitHub Pages la imagen de Open Graph tiene que resolverse contra
// github.io y no contra vercel.app. Next le antepone /Portafolio_2026 solo,
// así que incluirlo aquí lo duplicaría.
const canonicalUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://portafolio-2026-felipe-landinez-s-projects.vercel.app";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const deployUrl = basePath
  ? "https://felipelanidnezz.github.io"
  : canonicalUrl;

const title = "Felipe Landinez · Desarrollo web para negocios";
const description =
  "Desarrollo sitios web para negocios que necesitan que los encuentren en Google. Next.js, React y SEO local. Tres proyectos en producción.";

export const metadata: Metadata = {
  // Base contra la que se resuelven las rutas relativas (og:image, íconos).
  metadataBase: new URL(deployUrl),
  title,
  description,
  applicationName: "Felipe Landinez",
  authors: [{ name: "Felipe Landinez", url: canonicalUrl }],
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
    // Absoluta a propósito: las dos copias del sitio apuntan a la misma URL
    // canónica para no pelearse el posicionamiento.
    canonical: canonicalUrl,
  },
  // og:image, su ancho, alto y alt los genera Next a partir de
  // opengraph-image.png y opengraph-image.alt.txt, que viven en esta carpeta.
  openGraph: {
    type: "website",
    siteName: "Felipe Landinez",
    url: canonicalUrl,
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
