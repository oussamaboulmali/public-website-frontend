import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const baseUrl = `${request.nextUrl.protocol}//${request.headers.get(
      "host"
    )}`;
    const urls = [];

    // PAGES STATIQUES
    const staticPages = [
      { url: "/a-propos-de-l-aps", priority: 0.5, changefreq: "monthly" },
      { url: "", priority: 1.0, changefreq: "daily" },
      { url: "/infographie", priority: 0.7, changefreq: "weekly" },
      { url: "/dossier", priority: 0.7, changefreq: "weekly" },
      { url: "/galeries-photos", priority: 0.8, changefreq: "weekly" },
      { url: "/video", priority: 0.8, changefreq: "weekly" },
      { url: "/cahier-multimedia", priority: 0.7, changefreq: "weekly" },
    ];

    staticPages.forEach((page) => {
      const fullUrl =
        page.url === ""
          ? `${baseUrl}/${process.env.NEXT_LAN}`
          : `${baseUrl}/${process.env.NEXT_LAN}${page.url}`;

      urls.push(`    <url>
  <loc>${fullUrl}</loc>
  <lastmod>${new Date().toISOString()}</lastmod>
  <changefreq>${page.changefreq}</changefreq>
  <priority>${page.priority}</priority>
</url>`);
    });

    // RÉCUPÉRATION DES CATÉGORIES ET SOUS-CATÉGORIES
    try {
      const res = await fetch(`${process.env.NEXT_BASE_URL}home/header`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Sitemap Generator",
        },
        signal: AbortSignal.timeout(10000),
      });

      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }

      const categoriesDataa = await res.json();
      const categoriesData = categoriesDataa?.data;

      // Vérifier que categoriesData existe et est un tableau
      if (categoriesData && Array.isArray(categoriesData)) {
        for (const cat of categoriesData) {
          // Vérifier que la catégorie a un alias valide
          if (!cat.alias) {
            //console.warn(`Catégorie sans alias ignorée:`, cat);
            continue;
          }

          // Vérifier si la catégorie a des sous-catégories
          if (
            cat.subCategorie &&
            Array.isArray(cat.subCategorie) &&
            cat.subCategorie.length > 0
          ) {
            // Si elle a des sous-catégories, ajouter seulement les sous-catégories
            for (const sub of cat.subCategorie) {
              if (sub.alias) {
                const subUrl = `${baseUrl}/${process.env.NEXT_LAN}/${cat.alias}/${sub.alias}`;

                urls.push(`    <url>
  <loc>${subUrl}</loc>
  <lastmod>${new Date().toISOString()}</lastmod>
  <changefreq>daily</changefreq>
  <priority>1</priority>
</url>`);
              }
            }
          } else {
            // Si elle n'a pas de sous-catégories (comme presidence-news), ajouter directement la catégorie
            const catUrl = `${baseUrl}/${process.env.NEXT_LAN}/${cat.alias}`;

            urls.push(`    <url>
  <loc>${catUrl}</loc>
  <lastmod>${new Date().toISOString()}</lastmod>
  <changefreq>daily</changefreq>
  <priority>1</priority>
</url>`);
          }
        }
      }
    } catch (err) {
      //console.warn("Erreur récupération des catégories:", err.message);
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600, s-maxage=7200",
      },
    });
  } catch (error) {
    //console.error("Erreur globale dans la génération du sitemap:", error);

    const baseUrl = `${request.nextUrl.protocol}//${request.headers.get(
      "host"
    )}`;
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/${process.env.NEXT_LAN}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

    return new NextResponse(fallbackSitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "no-cache",
      },
      status: 500,
    });
  }
}
