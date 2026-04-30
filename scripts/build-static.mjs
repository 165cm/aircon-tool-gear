import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { categoryMeta, products, site } from "../src/data/productCatalog.js";
import { scheduledPosts } from "../src/data/scheduledPosts.js";

const root = process.cwd();
const dist = path.join(root, "dist");
const template = await readFile(path.join(dist, "index.html"), "utf8");
const buildDate = process.env.BUILD_DATE || new Date().toISOString().slice(0, 10);
const publishedPosts = scheduledPosts.filter((post) => post.publishDate <= buildDate);

const routes = [
  meta("/", "エアコン工具ギア｜エアコン修理工具おすすめ比較", "エアコン修理・取付に必要な専門工具を、初心者セットからプロ向け装備まで現場目線で比較。"),
  meta("/ranking/", "エアコン工具おすすめランキング｜必須工具TOP5", "TA150SW、TA122GB-1、BBK 700-DPC、TA771BH、TA430Dを中心に、まず揃えたい工具を紹介。"),
  meta("/beginner-kit/", "エアコン工具 初心者セット｜予算別おすすめ構成", "DIY・副業初心者・独立志望に向けて、エアコン工具セットを予算別に整理。"),
  meta("/comparison/", "エアコン修理工具 比較表｜価格・重量・対応冷媒", "18商品の価格帯、重量、対応冷媒、性能、初心者向け度、プロ向け度を一覧比較。"),
  meta("/privacy-policy/", "利用規約・プライバシーポリシー", "エアコン工具ギアの広告、アフィリエイト、個人情報、Cookie、免責事項に関する基本方針。"),
  ...categoryMeta.map((category) =>
    meta(`/categories/${category.slug}/`, `${category.label}おすすめ比較｜エアコン修理工具`, `${category.keyword}で探す人向けに、3価格帯の工具を比較。${category.summary}`),
  ),
  ...products.map((product) =>
    meta(`/products/${product.slug}/`, `${product.model} レビュー｜${product.brand}`, `${product.model}の価格目安、スペック、レビュー要約、向いている人、注意点を現場目線で整理。`, productJsonLd(product)),
  ),
  ...publishedPosts.map((post) =>
    meta(`/posts/${post.slug}/`, `${post.title}｜エアコン工具ギア`, post.summary, articleJsonLd(post)),
  ),
];

for (const route of routes) {
  await writeRoute(route);
}

await writeFile(path.join(dist, "sitemap.xml"), sitemap(routes), "utf8");
await writeFile(path.join(dist, "robots.txt"), robots(), "utf8");
await writeFile(path.join(dist, "rss.xml"), rss(publishedPosts), "utf8");

async function writeRoute(route) {
  const html = injectMeta(template, route);
  const dir = route.path === "/" ? dist : path.join(dist, route.path);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, "index.html"), html, "utf8");
}

function meta(pathname, title, description, jsonLd = itemListJsonLd(pathname)) {
  return {
    path: pathname,
    title,
    description,
    canonical: `${site.url}${pathname === "/" ? "/" : pathname}`,
    jsonLd,
  };
}

function injectMeta(html, route) {
  const title = `${route.title} | ${site.name}`;
  const tags = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(route.description)}" />`,
    `<link rel="canonical" href="${route.canonical}" />`,
    `<meta property="og:title" content="${escapeHtml(route.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(route.description)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${route.canonical}" />`,
    `<script type="application/ld+json">${JSON.stringify(route.jsonLd)}</script>`,
  ].join("\n    ");

  return html
    .replace(/<title>.*?<\/title>/s, "")
    .replace(/<meta\s+name="description"[\s\S]*?\/>/, "")
    .replace("</head>", `    ${tags}\n  </head>`);
}

function itemListJsonLd(pathname) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: site.name,
    url: `${site.url}${pathname === "/" ? "/" : pathname}`,
  };
}

function productJsonLd(product) {
  const offerUrl = withAmazonTag(product.amazonUrl);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.brand} ${product.model}`,
    description: product.summary,
    brand: { "@type": "Brand", name: product.brand },
    sku: product.model,
    aggregateRating: product.reviewCount
      ? { "@type": "AggregateRating", ratingValue: product.rating, reviewCount: product.reviewCount }
      : undefined,
    offers: {
      "@type": "Offer",
      url: offerUrl,
      priceCurrency: "JPY",
      availability: "https://schema.org/InStock",
    },
  };
}

function withAmazonTag(rawUrl) {
  const tag = process.env.VITE_AMAZON_TAG || site.amazonTag;
  if (!tag || !rawUrl) return rawUrl;
  try {
    const url = new URL(rawUrl);
    url.searchParams.set("tag", tag);
    return url.toString();
  } catch {
    return rawUrl;
  }
}

function articleJsonLd(post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.summary,
    datePublished: post.publishDate,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${site.url}/posts/${post.slug}/`,
  };
}

function sitemap(routeList) {
  const urls = routeList
    .map(
      (route) =>
        `  <url><loc>${route.canonical}</loc><lastmod>${buildDate}</lastmod><changefreq>${route.path.startsWith("/posts/") ? "weekly" : "monthly"}</changefreq></url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function robots() {
  return `User-agent: *\nAllow: /\nSitemap: ${site.url}/sitemap.xml\n`;
}

function rss(posts) {
  const items = posts
    .map(
      (post) => `<item>
  <title>${escapeXml(post.title)}</title>
  <link>${site.url}/posts/${post.slug}/</link>
  <guid>${site.url}/posts/${post.slug}/</guid>
  <pubDate>${new Date(`${post.publishDate}T00:00:00Z`).toUTCString()}</pubDate>
  <description>${escapeXml(post.summary)}</description>
</item>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel><title>${site.name}</title><link>${site.url}/</link><description>${site.description}</description>${items}</channel></rss>\n`;
}

function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function escapeXml(value) {
  return escapeHtml(value).replaceAll("'", "&apos;");
}
