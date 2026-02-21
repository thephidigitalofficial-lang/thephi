import { getAllBlogs } from "../../../lib/blogUtils";
import caseStudies from "../../data/caseStudy.json";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://thephi.digital";

/**
 * Generates a dynamic XML sitemap for thephi.digital
 * Includes:
 *  - Static pages (home, about, services, blogs, recent work, contact)
 *  - Dynamic blog detail pages (fetched from Sanity CMS)
 *  - Dynamic case study / recent work detail pages (from local JSON)
 */
export default async function handler(req, res) {
    try {
        // ---- Static pages ----
        const staticPages = [
            { url: "/", changefreq: "weekly", priority: "1.0" },
            { url: "/about_us", changefreq: "monthly", priority: "0.8" },
            { url: "/services", changefreq: "monthly", priority: "0.8" },
            { url: "/blogs", changefreq: "weekly", priority: "0.9" },
            { url: "/recent_work", changefreq: "weekly", priority: "0.8" },
            { url: "/contact_us", changefreq: "monthly", priority: "0.7" },
        ];

        // ---- Dynamic blog pages from Sanity ----
        let blogEntries = [];
        try {
            const blogs = await getAllBlogs();
            blogEntries = blogs
                .filter((blog) => blog.slug?.current)
                .map((blog) => ({
                    url: `/blogs/details?slug=${blog.slug.current}`,
                    changefreq: "weekly",
                    priority: "0.7",
                    lastmod: blog.publishedAt
                        ? new Date(blog.publishedAt).toISOString().split("T")[0]
                        : undefined,
                }));
        } catch (err) {
            console.error("Sitemap: Error fetching blogs from Sanity:", err.message);
        }

        // ---- Dynamic case study pages ----
        const caseStudyEntries = caseStudies.map((project) => ({
            url: `/recent_work/details?id=${project.id}`,
            changefreq: "monthly",
            priority: "0.7",
        }));

        // ---- Combine all entries ----
        const allEntries = [...staticPages, ...blogEntries, ...caseStudyEntries];
        const today = new Date().toISOString().split("T")[0];

        // ---- Build XML ----
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${allEntries
                .map(
                    (entry) => `  <url>
    <loc>${SITE_URL}${entry.url}</loc>
    <lastmod>${entry.lastmod || today}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
                )
                .join("\n")}
</urlset>`;

        // ---- Send response ----
        res.setHeader("Content-Type", "application/xml; charset=utf-8");
        res.setHeader(
            "Cache-Control",
            "public, s-maxage=86400, stale-while-revalidate=43200"
        );
        res.status(200).send(sitemap);
    } catch (error) {
        console.error("Sitemap generation error:", error);
        res.status(500).json({ error: "Failed to generate sitemap" });
    }
}
