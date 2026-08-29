import type { MetadataRoute } from "next";

// El workflow de GitHub Pages compila con `output: export`, y ahí los route
// handlers tienen que declararse estáticos o el build falla.
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return {
    name: "Felipe Landinez · Desarrollo web para negocios",
    short_name: "Felipe Landinez",
    description:
      "Sitios que cargan rápido y aparecen en Google. Next.js, React y SEO local.",
    lang: "es",
    start_url: `${basePath}/`,
    display: "standalone",
    background_color: "#0B1116",
    theme_color: "#0B1116",
    icons: [
      {
        src: `${basePath}/icon-192.png`,
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: `${basePath}/icon-512.png`,
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: `${basePath}/icon-512.png`,
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
