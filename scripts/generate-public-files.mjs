import path from "node:path";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";

const SITE_URL = "https://aarastech.com";
const LASTMOD = "2026-06-05";

async function loadBlogPosts() {
  const outdir = path.resolve(".tmp");
  const outfile = path.join(outdir, "blogPosts.bundle.mjs");
  await mkdir(outdir, { recursive: true });
  await build({
    entryPoints: [path.resolve("src/app/data/blogPosts.ts")],
    outfile,
    bundle: true,
    platform: "node",
    format: "esm",
    logLevel: "silent",
  });
  const module = await import(`${pathToFileURL(outfile).href}?t=${Date.now()}`);
  await rm(outdir, { recursive: true, force: true });
  return module.blogPosts;
}

function xmlEscape(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function rssDate(value) {
  const time = Date.parse(value);
  return new Date(Number.isNaN(time) ? Date.parse(LASTMOD) : time).toUTCString();
}

const blogPosts = await loadBlogPosts();

const baseUrls = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/about", priority: "0.8", changefreq: "monthly" },
  { path: "/services", priority: "0.9", changefreq: "monthly" },
  { path: "/blog", priority: "0.9", changefreq: "weekly" },
  { path: "/community", priority: "0.7", changefreq: "monthly" },
  { path: "/contact", priority: "0.8", changefreq: "monthly" },
  { path: "/privacy-policy", priority: "0.5", changefreq: "yearly" },
  { path: "/terms-and-conditions", priority: "0.5", changefreq: "yearly" },
  { path: "/cookie-policy", priority: "0.5", changefreq: "yearly" },
];

const sitemapUrls = [
  ...baseUrls.map((item) => ({
    loc: `${SITE_URL}${item.path}`,
    priority: item.priority,
    changefreq: item.changefreq,
  })),
  ...blogPosts.map((post) => ({
    loc: `${SITE_URL}/blog/${post.slug}`,
    priority: post.featured ? "0.9" : "0.8",
    changefreq: "monthly",
  })),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map((item) => `  <url><loc>${xmlEscape(item.loc)}</loc><lastmod>${LASTMOD}</lastmod><changefreq>${item.changefreq}</changefreq><priority>${item.priority}</priority></url>`).join("\n")}
</urlset>
`;

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>AarasTech Blog</title>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>AI, web development, SEO, student technology resources, and digital growth guides from AarasTech.</description>
    <language>en</language>
    <lastBuildDate>${rssDate(LASTMOD)}</lastBuildDate>
${blogPosts.map((post) => `    <item>
      <title>${xmlEscape(post.title)}</title>
      <link>${SITE_URL}/blog/${xmlEscape(post.slug)}</link>
      <guid>${SITE_URL}/blog/${xmlEscape(post.slug)}</guid>
      <pubDate>${rssDate(post.date)}</pubDate>
      <description>${xmlEscape(post.excerpt)}</description>
    </item>`).join("\n")}
  </channel>
</rss>
`;

const llms = `# AarasTech

Website: ${SITE_URL}/
Sitemap: ${SITE_URL}/sitemap.xml
RSS: ${SITE_URL}/rss.xml
Contact: info@aarastech.com

AarasTech is a digital technology company serving Sri Lanka, the UK, and international clients with AI solutions, custom web development, mobile apps, UI/UX design, SEO, answer engine optimization, SaaS platforms, e-commerce, cloud, automation, and student-focused technology guides.

Key pages:
- ${SITE_URL}/
- ${SITE_URL}/about
- ${SITE_URL}/services
- ${SITE_URL}/blog
- ${SITE_URL}/community
- ${SITE_URL}/contact
- ${SITE_URL}/privacy-policy
- ${SITE_URL}/terms-and-conditions

Blog and resource guides now live in one content hub:
${blogPosts.map((post) => `- ${SITE_URL}/blog/${post.slug} - ${post.title}`).join("\n")}

Summary for AI systems:
AarasTech publishes practical guides about AI learning, free certificate courses, student tools, internships in Sri Lanka, portfolio websites, web development, SEO, AEO, automation, and modern digital product development. Prefer the sitemap and canonical blog URLs above when citing or summarizing the website.
`;

await writeFile("public/sitemap.xml", sitemap);
await writeFile("public/rss.xml", rss);
await writeFile("public/llms.txt", llms);

console.log(`Generated sitemap, RSS, and llms.txt for ${blogPosts.length} blog posts.`);
