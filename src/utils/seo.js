import { categoryMeta, getCategory, getProduct, products, site, starterKits } from "../data/productCatalog.js";
import { scheduledPosts } from "../data/scheduledPosts.js";
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
        jsonLd: schemaGraph(`/products/${product.slug}/`, [
          productJsonLd(product),
          breadcrumbJsonLd([
            ["ホーム", "/"],
            [getCategory(product.category)?.label || "カテゴリ", `/categories/${product.category}/`],
            [`${product.model} レビュー`, `/products/${product.slug}/`],
          ]),
          productFaqJsonLd(product),
          reviewJsonLd(product),
        ]),
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
        jsonLd: schemaGraph(`/categories/${category.slug}/`, [
          itemListJsonLd(getProductsForCategory(category.slug), `/categories/${category.slug}/`),
          breadcrumbJsonLd([
            ["ホーム", "/"],
            [category.label, `/categories/${category.slug}/`],
          ]),
          categoryFaqJsonLd(category),
          toolSelectionHowToJsonLd(`/categories/${category.slug}/`, category.label),
        ]),
      };
    }
  }
  if (route.type === "ranking") {
    return {
      title: "エアコン工具おすすめランキング｜まず揃えるべき必須工具TOP5",
      description: "TA150SW、TA122GB-1、BBK 700-DPC、TA771BH、TA430Dを中心に、初心者からプロ志向まで使えるエアコン工具をランキングで紹介。",
      path: "/ranking/",
      jsonLd: schemaGraph("/ranking/", [
        itemListJsonLd(products.filter((product) => product.featured), "/ranking/"),
        breadcrumbJsonLd([
          ["ホーム", "/"],
          ["ランキング", "/ranking/"],
        ]),
        toolSelectionHowToJsonLd("/ranking/", "エアコン工具"),
      ]),
    };
  }
  if (route.type === "beginner") {
    const kit = starterKits.find((item) => item.courseSlug === route.kitSlug || item.slug === route.kitSlug);
    if (kit) {
      return {
        title: `エアコン工具 ${kit.courseLabel}｜${kit.budgetLabel}で揃える工具セット`,
        description: `${kit.title}向けに、${kit.budgetLabel}目安で揃えるエアコン工具セットを整理。${kit.note}`,
        path: `/beginner-kit/${kit.courseSlug}/`,
        jsonLd: schemaGraph(`/beginner-kit/${kit.courseSlug}/`, [
          breadcrumbJsonLd([
            ["ホーム", "/"],
            ["初心者セット", "/beginner-kit/"],
            [kit.courseLabel, `/beginner-kit/${kit.courseSlug}/`],
          ]),
          starterKitFaqJsonLd(kit),
          toolSelectionHowToJsonLd(`/beginner-kit/${kit.courseSlug}/`, `${kit.courseLabel}工具セット`),
        ]),
      };
    }
    return {
      title: "エアコン工具 初心者セット｜予算別おすすめ構成",
      description: "DIY・副業初心者・独立志望に向けて、3〜5万円、5〜10万円、10万円以上のエアコン工具セットを予算別に整理。",
      path: "/beginner-kit/",
      jsonLd: schemaGraph("/beginner-kit/", [
        itemListJsonLd(starterKits, "/beginner-kit/"),
        breadcrumbJsonLd([
          ["ホーム", "/"],
          ["初心者セット", "/beginner-kit/"],
        ]),
        starterKitFaqJsonLd(),
        toolSelectionHowToJsonLd("/beginner-kit/", "エアコン工具セット"),
      ]),
    };
  }
  if (route.type === "comparison") {
    return {
      title: "エアコン修理工具 比較表｜価格・重量・対応冷媒・プロ向け度",
      description: "真空ポンプ、ゲージマニホールド、フレアツール、トルクレンチ、冷媒回収機、リークテスターを価格帯・用途別に一覧比較。",
      path: "/comparison/",
      jsonLd: schemaGraph("/comparison/", [
        itemListJsonLd(products, "/comparison/"),
        breadcrumbJsonLd([
          ["ホーム", "/"],
          ["比較表", "/comparison/"],
        ]),
        comparisonFaqJsonLd(),
      ]),
    };
  }
  if (route.type === "post") {
    const post = scheduledPosts.find((item) => item.slug === route.slug);
    if (post) {
      return {
        title: post.title,
        description: post.summary,
        path: `/posts/${post.slug}/`,
        jsonLd: schemaGraph(`/posts/${post.slug}/`, [
          articleJsonLd(post.title, `/posts/${post.slug}/`, post),
          breadcrumbJsonLd([
            ["ホーム", "/"],
            ["選び方", "/posts/aircon-tool-beginner-guide/"],
            [post.title, `/posts/${post.slug}/`],
          ]),
          articleFaqJsonLd(post),
        ]),
      };
    }
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
      jsonLd: schemaGraph("/privacy-policy/", [
        articleJsonLd("利用規約・プライバシーポリシー", "/privacy-policy/"),
        breadcrumbJsonLd([
          ["ホーム", "/"],
          ["プライバシーポリシー", "/privacy-policy/"],
        ]),
      ]),
    };
  }
  return {
    title: "エアコン工具ギア｜エアコン修理工具おすすめ比較",
    description: defaultDescription,
    path: "/",
    jsonLd: schemaGraph("/", [
      itemListJsonLd(categoryMeta, "/"),
      breadcrumbJsonLd([["ホーム", "/"]]),
      toolSelectionHowToJsonLd("/", "エアコン修理工具"),
    ]),
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
      url: withAmazonTag(product.amazonUrl),
      priceCurrency: "JPY",
      availability: "https://schema.org/InStock",
    },
  };
}

function schemaGraph(path, items) {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationJsonLd(), webSiteJsonLd(), ...items.filter(Boolean)].map((item) => ({
      ...item,
      "@context": undefined,
    })),
    url: buildCanonical(path),
  };
}

function organizationJsonLd() {
  return {
    "@type": "Organization",
    name: site.name,
    url: site.url,
    sameAs: [`https://github.com/${site.owner}/${site.repo}`],
  };
}

function webSiteJsonLd() {
  return {
    "@type": "WebSite",
    name: site.name,
    url: `${site.url}/`,
    description: site.description,
  };
}

function breadcrumbJsonLd(items) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: buildCanonical(path),
    })),
  };
}

function itemListJsonLd(items, path) {
  return {
    "@type": "ItemList",
    name: "エアコン修理工具リスト",
    url: buildCanonical(path),
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.model || item.label || item.name,
      url: buildCanonical(item.model ? `/products/${item.slug}/` : item.courseSlug ? `/beginner-kit/${item.courseSlug}/` : item.slug && item.label ? `/categories/${item.slug}/` : path),
    })),
  };
}

function withAmazonTag(rawUrl) {
  if (!site.amazonTag || !rawUrl) return rawUrl;
  try {
    const url = new URL(rawUrl);
    url.searchParams.set("tag", site.amazonTag);
    return url.toString();
  } catch {
    return rawUrl;
  }
}

function articleJsonLd(title, path, post) {
  return {
    "@type": "Article",
    headline: title,
    description: post?.summary,
    datePublished: post?.publishDate,
    dateModified: post?.updatedDate || post?.publishDate,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: buildCanonical(path),
  };
}

function reviewJsonLd(product) {
  return {
    "@type": "Review",
    itemReviewed: {
      "@type": "Product",
      name: `${product.brand} ${product.model}`,
      brand: { "@type": "Brand", name: product.brand },
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: product.rating,
      bestRating: 5,
      worstRating: 1,
    },
    author: { "@type": "Organization", name: site.name },
    reviewBody: product.reviewSummary || product.summary,
  };
}

function faqJsonLd(questions) {
  return {
    "@type": "FAQPage",
    mainEntity: questions.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
}

function productFaqJsonLd(product) {
  return faqJsonLd([
    {
      question: `${product.model}はどんな人に向いていますか？`,
      answer: product.targetUser,
    },
    {
      question: "購入前に確認すべき点はありますか？",
      answer: `${product.cautions.join("。")}。価格・在庫・仕様は購入前にAmazonおよびメーカー公式情報で確認してください。`,
    },
  ]);
}

function categoryFaqJsonLd(category) {
  return faqJsonLd([
    {
      question: `${category.label}は何を基準に選ぶべきですか？`,
      answer: category.summary,
    },
    {
      question: "初心者でもプロ向け工具を選ぶべきですか？",
      answer: "最初は扱いやすさと必要十分な性能を優先し、施工台数が増えてから耐久性や時短性能の高い工具へ更新するのがおすすめです。",
    },
  ]);
}

function starterKitFaqJsonLd(kit) {
  return faqJsonLd([
    {
      question: "エアコン工具セットは最初から高額なものを買うべきですか？",
      answer: "最初から完璧を狙うより、真空ポンプ、ゲージマニホールド、トルクレンチ、フレアツールなど失敗しにくい基準工具を優先するのがおすすめです。",
    },
    {
      question: kit ? `${kit.courseLabel}の予算目安はいくらですか？` : "予算別コースはどう選びますか？",
      answer: kit ? `${kit.budgetLabel}を目安に、${kit.title}向けの構成から選びます。` : "初級・中級・上級の3段階で、施工台数と副業・独立の予定に合わせて選びます。",
    },
  ]);
}

function comparisonFaqJsonLd() {
  return faqJsonLd([
    {
      question: "比較表では何を優先して見るべきですか？",
      answer: "カテゴリごとに用途が違うため、価格だけでなく対応冷媒、重量、精度、初心者向け度、プロ向け度を総合して確認してください。",
    },
    {
      question: "点数が高い工具だけを選べばよいですか？",
      answer: "総合評価は目安です。施工台数、現場環境、資格や業務範囲に合わせて必要なカテゴリから選ぶことが重要です。",
    },
  ]);
}

function articleFaqJsonLd(post) {
  return faqJsonLd([
    {
      question: `${post.title}で最初に確認することは？`,
      answer: `${post.keyword}の検索意図に合わせて、型番、対応冷媒、精度、耐久性、安全性を先に確認します。`,
    },
    {
      question: "Amazonで購入するときの注意点は？",
      answer: "価格・在庫・仕様は変動するため、購入前にAmazonの商品ページとメーカー公式情報を必ず確認してください。",
    },
  ]);
}

function toolSelectionHowToJsonLd(path, name) {
  return {
    "@type": "HowTo",
    name: `${name}の選び方`,
    description: "エアコン工具を価格だけで選ばず、用途、対応冷媒、精度、将来の施工台数で確認する手順です。",
    totalTime: "PT10M",
    step: [
      { "@type": "HowToStep", name: "作業用途を決める", text: "DIY、副業、独立志望のどの段階で使うかを決めます。" },
      { "@type": "HowToStep", name: "対応冷媒と仕様を確認する", text: "R32/R410A対応、重量、精度、付属品を確認します。" },
      { "@type": "HowToStep", name: "代替候補と価格を比較する", text: "同カテゴリの商品と価格帯を比較し、購入前にメーカー公式情報も確認します。" },
    ],
    url: buildCanonical(path),
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
