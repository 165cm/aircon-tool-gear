import beginnerKitImage from "../assets/generated/beginner-kit.png";
import ctaToolsImage from "../assets/generated/cta-tools.png";
import heroToolsImage from "../assets/generated/hero-tools.png";
import intermediateToolsImage from "../assets/generated/intermediate-tools.png";
import proEquipmentImage from "../assets/generated/pro-equipment.png";
import productSheetImage from "../assets/generated/product-sheet.png";
import {
  affiliateDisclosure,
  categoryMeta,
  getAmazonUrl,
  getAmazonImageUrl,
  getAmazonImageUrls,
  getProductAsin,
  getCategory,
  getProduct,
  getProductsByCategory,
  products,
  site,
  starterKits,
  tierLabels,
} from "./productCatalog.js";

export {
  affiliateDisclosure,
  categoryMeta,
  getAmazonUrl,
  getAmazonImageUrl,
  getAmazonImageUrls,
  getProductAsin,
  getCategory,
  getProduct,
  getProductsByCategory,
  products,
  site,
  starterKits,
  tierLabels,
};

export const images = {
  beginnerKit: beginnerKitImage,
  ctaTools: ctaToolsImage,
  heroTools: heroToolsImage,
  intermediateTools: intermediateToolsImage,
  proEquipment: proEquipmentImage,
  productSheet: productSheetImage,
};

export const navItems = [
  { id: "beginner-kit", label: "初心者セット", path: "/beginner-kit/" },
  { id: "vacuum-pump", label: "真空ポンプ", path: "/categories/vacuum-pump/" },
  { id: "manifold-gauge", label: "ゲージ", path: "/categories/manifold-gauge/" },
  { id: "comparison", label: "比較表", path: "/comparison/" },
  { id: "guide", label: "選び方", path: "/posts/aircon-tool-beginner-guide/" },
];

export const categories = [
  {
    id: "beginner-kit",
    path: "/beginner-kit/",
    level: "初心者向け",
    title: "初心者が最初に揃える道具",
    image: beginnerKitImage,
    description: "家庭用エアコンの基本作業に必要な工具を、扱いやすさと価格のバランスで構成。",
    points: ["基本作業ができる一式を厳選", "5〜10万円コースを軸に提案", "買い直しを減らす定番工具中心"],
  },
  {
    id: "comparison",
    path: "/comparison/",
    level: "中級者向け",
    title: "中級者が精度を上げる道具",
    image: intermediateToolsImage,
    description: "作業時間の短縮と施工精度を高めるための、耐久性と測定性能を重視した構成。",
    points: ["TA150SW・700-DPCなど鉄板候補", "型番別に価格帯と性能を比較", "トラブルを減らす定番工具"],
  },
  {
    id: "professional",
    path: "/categories/recovery-machine/",
    level: "プロ向け",
    title: "プロ志向の現場装備",
    image: proEquipmentImage,
    description: "連続作業や厳しい現場で頼れる高耐久仕様。安全性と効率を重視した装備。",
    points: ["充電式・赤外線・回収機まで網羅", "フロン排出抑制法の注意点も明記", "独立投資として比較できる"],
  },
];

const recommendedSlugs = ["tasco-ta150sw", "tasco-ta122gb-1", "bbk-700-dpc", "tasco-ta771bh", "tasco-ta430d"];

export const tools = recommendedSlugs.map((slug, index) => {
  const product = getProduct(slug);
  return {
    id: product.slug,
    slug: product.slug,
    path: `/products/${product.slug}/`,
    name: product.model,
    category: getCategory(product.category)?.label,
    rank: index + 1,
    image: productSheetImage,
    imagePosition: product.imagePosition,
    price: product.priceRange,
    rating: product.rating,
    summary: product.summary,
    specs: product.specs.slice(0, 4),
    recommendedFor: [tierLabels[product.tier], product.targetUser],
    asin: getProductAsin(product),
    product,
  };
});

export const categoryTools = categoryMeta.map((category) => {
  const categoryProducts = getProductsByCategory(category.slug);
  const middle = categoryProducts.find((product) => product.tier === "middle") || categoryProducts[0];
  return {
    id: category.slug,
    title: category.label,
    path: `/categories/${category.slug}/`,
    image: productSheetImage,
    imagePosition: category.visualPosition,
    description: category.summary,
    tags: [tierLabels[middle.tier], middle.model, category.keyword],
    specs: middle.specs.slice(0, 2).map((spec, index) => ({
      label: index === 0 ? "基準" : "注目",
      value: spec,
    })),
  };
});

export const rankings = tools.map((tool) => ({
  ...tool,
  badge: `${tool.rank}位`,
}));

export const comparisonRows = [
  ["真空ポンプ", "到達真空度・排気速度・オイル逆流防止", "TA150SVで開始可能", "TA150SWまたはVP154を検討"],
  ["ゲージマニホールド", "対応冷媒・ゲージの見やすさ・気密性", "練習用はWEIMALLも可", "TA122GB-1以上を推奨"],
  ["フレアツール", "加工精度・対応サイズ・電動対応", "TA550Aで基本を習得", "700-DPC以上で時短"],
  ["トルクレンチ", "校正証明・対応サイズ・狭所作業性", "TA771ST-2で最低限", "TA771BHまたはRTQS-41"],
  ["冷媒回収機", "回収速度・JRECO自己認証・冷却能力", "DIYでは原則購入不要", "ES640/RM350を比較"],
  ["リークテスター", "検知方式・感度・誤反応の少なさ", "LD-100+で入門", "TA430Dで微量漏れ対応"],
];

export const reviews = products.map((product) => ({
  id: `review-${product.slug}`,
  toolId: product.slug,
  title: `${product.model} 実用レビュー`,
  score: product.rating,
  scores: {
    現場適性: Math.min(5, product.rating + (product.tier === "pro" ? 0.2 : 0)),
    コスパ: product.tier === "entry" ? 4.5 : product.tier === "middle" ? 4.3 : 3.8,
    使いやすさ: product.tier === "pro" ? 4.1 : 4.4,
    信頼性: product.brand.includes("TASCO") || product.brand.includes("BBK") || product.brand.includes("アサダ") ? 4.5 : 3.6,
    将来性: product.tier === "pro" ? 4.7 : 4.1,
  },
  pros: product.benefits,
  cons: product.cautions,
  notes: [
    "価格・在庫は購入前にAmazonで確認してください",
    "型番と対応冷媒をメーカー公式情報で確認してください",
    "本ページはリサーチ情報を元にした比較であり、実機レビュー断定ではありません",
  ],
}));

export const productComparisonRows = products.map((product) => ({
  name: product.model,
  path: `/products/${product.slug}/`,
  image: productSheetImage,
  imagePosition: product.imagePosition,
  product,
  price: product.priceRange,
  weight: product.specs.find((spec) => spec.includes("kg") || spec.includes("g")) || "-",
  refrigerants: product.specs.find((spec) => spec.includes("R32") || spec.includes("R410A")) || "商品ページ確認",
  performance: product.specs.slice(0, 2).join(" / "),
  beginner: product.tier === "entry" ? "◎" : product.tier === "middle" ? "○" : "△",
  pro: product.tier === "pro" ? "◎" : product.tier === "middle" ? "○" : "△",
  rating: product.rating.toFixed(1),
  recommended: product.featured,
}));

export const trustItems = [
  { icon: "scale", title: "用途別に比較", text: "作業に合った工具を比較できる" },
  { icon: "shield", title: "失敗しない基準", text: "価格より精度・耐久性を重視" },
  { icon: "worker", title: "プロ仕様も解説", text: "独立投資まで段階別に紹介" },
];

export const seoTargets = [
  "エアコン修理 工具",
  "エアコン取付 工具 セット",
  "エアコン工具 おすすめ",
  "真空ポンプ エアコン おすすめ",
  "フレアツール エアコン おすすめ",
  "トルクレンチ エアコン おすすめ",
];
