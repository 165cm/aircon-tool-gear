import { categoryMeta, getCategory, getProduct, products, site } from "../data/productCatalog.js";
import { buildCanonical } from "./routes.js";

const defaultDescription =
  "エアコン修理・取付に必要な専門工具を、初心者セットからプロ向け装備まで現場目線で比較。真空ポンプ、ゲージ、フレアツール、トルクレンチ、冷媒回収機、リークテスターを型番別に解説。";

export function getPageSeo(route) {
  if (route.type === "product") {
    const product = getProduct(route.slug);
    if (product) {
      return {
        title: `${product.model} レビュー｜${product.brand} ${product.name}の選び方`,
        description: `${product.model}の価格目安、スペック、レビュー要約、向いている人、注意点を現場目線で整理。${product.category}カテゴリの比較にも使えます。`,
        path: `/products/${product.slug}/`,
        jsonLd: productJsonLd(product),
      };
    }
  }
  if (route.type === "category") {
    const category = getCategory(route.slug);
    if (category) {
      return {
        title: `${category.label}おすすめ比較｜エアコン修理工具`,
        description: `${category.keyword}で探す人向けに、エントリー・ミドル・プロの価格帯別おすすめ工具を比較。${category.summary}`,
        path: `/categories/${category.slug}/`,
        jsonLd: itemListJsonLd(getProductsForCategory(category.slug), `/categories/${category.slug}/`),
      };
    }
  }
  if (route.type === "ranking") {
    return {
      title: "エアコン工具おすすめランキング｜まず揃えるべき必須工具TOP5",
      description: "TA150SW、TA122GB-1、BBK 700-DPC、TA771BH、TA430Dを中心に、初心者からプロ志向まで使えるエアコン工具をランキングで紹介。",
      path: "/ranking/",
      jsonLd: itemListJsonLd(products.filter((product) => product.featured), "/ranking/"),
    };
  }
  if (route.type === "beginner") {
    return {
      title: "エアコン工具 初心者セット｜予算別おすすめ構成",
      description: "DIY・副業初心者・独立志望に向けて、3〜5万円、5〜10万円、10万円以上のエアコン工具セットを予算別に整理。",
      path: "/beginner-kit/",
    };
  }
  if (route.type === "comparison") {
    return {
      title: "エアコン修理工具 比較表｜価格・重量・対応冷媒・プロ向け度",
      description: "真空ポンプ、ゲージマニホールド、フレアツール、トルクレンチ、冷媒回収機、リークテスターを価格帯・用途別に一覧比較。",
      path: "/comparison/",
      jsonLd: itemListJsonLd(products, "/comparison/"),
    };
  }
  if (route.type === "post") {
    return {
      title: "エアコン工具の選び方｜初心者が失敗しない基準",
      description: "エアコン修理工具を初めて揃える人向けに、真空ポンプ、ゲージ、フレア、トルク、リーク確認の選び方を解説。",
      path: `/posts/${route.slug}/`,
      jsonLd: articleJsonLd("エアコン工具の選び方", `/posts/${route.slug}/`),
    };
  }
  if (route.type === "privacy") {
    return {
      title: "利用規約・プライバシーポリシー",
      description: "エアコン工具ギアの広告、アフィリエイト、個人情報、Cookie、免責事項に関する基本方針です。",
      path: "/privacy-policy/",
      jsonLd: articleJsonLd("利用規約・プライバシーポリシー", "/privacy-policy/"),
    };
  }
  return {
    title: "エアコン工具ギア｜エアコン修理工具おすすめ比較",
    description: defaultDescription,
    path: "/",
    jsonLd: itemListJsonLd(categoryMeta, "/"),
  };
}

function getProductsForCategory(slug) {
  return products.filter((product) => product.category === slug);
}

function productJsonLd(product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.brand} ${product.model}`,
    description: product.summary,
    brand: { "@type": "Brand", name: product.brand },
    sku: product.model,
    aggregateRating: product.reviewCount
      ? {
          "@type": "AggregateRating",
          ratingValue: product.rating,
          reviewCount: product.reviewCount,
        }
      : undefined,
    offers: {
      "@type": "Offer",
      url: product.amazonUrl,
      priceCurrency: "JPY",
      availability: "https://schema.org/InStock",
    },
  };
}

function itemListJsonLd(items, path) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "エアコン修理工具リスト",
    url: buildCanonical(path),
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.model || item.label || item.name,
      url: buildCanonical(item.slug ? `/products/${item.slug}/` : path),
    })),
  };
}

function articleJsonLd(title, path) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: buildCanonical(path),
  };
}

export function applySeo(route) {
  if (typeof document === "undefined") return;
  const seo = getPageSeo(route);
  document.title = `${seo.title} | ${site.name}`;
  setMeta("description", seo.description);
  setLink("canonical", buildCanonical(seo.path));
  setMeta("og:title", seo.title, "property");
  setMeta("og:description", seo.description, "property");
  setMeta("og:type", "website", "property");
  setMeta("og:url", buildCanonical(seo.path), "property");
}

function setMeta(name, content, key = "name") {
  let tag = document.querySelector(`meta[${key}="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(key, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function setLink(rel, href) {
  let tag = document.querySelector(`link[rel="${rel}"]`);
  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", rel);
    document.head.appendChild(tag);
  }
  tag.setAttribute("href", href);
}
