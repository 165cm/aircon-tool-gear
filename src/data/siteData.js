import beginnerKitImage from "../assets/generated/beginner-kit.webp";
import ctaToolsImage from "../assets/generated/cta-tools.webp";
import heroToolsImage from "../assets/generated/hero-tools.webp";
import intermediateToolsImage from "../assets/generated/intermediate-tools.webp";
import proEquipmentImage from "../assets/generated/pro-equipment.webp";
import productSheetImage from "../assets/generated/product-sheet.webp";
import {
  affiliateDisclosure,
  categoryMeta,
  getAmazonUrl,
  getAmazonImageUrl,
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
  { id: "guide", label: "症状から探す", path: "/posts/" },
  { id: "beginner-kit", label: "初心者セット", path: "/beginner-kit/" },
  { id: "vacuum-pump", label: "真空ポンプ", path: "/categories/vacuum-pump/" },
  { id: "comparison", label: "比較表", path: "/comparison/" },
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

const recommendedSlugs = ["tasco-ta150sv", "weimall-manifold-r32", "tasco-ta550a", "tasco-ta771st-2", "elitech-ld-100-plus"];

export const beginnerFitLabels = {
  best: "最初の1台に最適",
  good: "慣れたら候補",
  caution: "条件付きで候補",
  overkill: "初心者には過剰",
};

export const productBeginnerMeta = {
  "tasco-ta150sv": {
    beginnerUseCase: "家庭用エアコン1台の真空引き",
    beginnerFit: "best",
    riskNote: "真空ポンプオイル、ホース接続、ゲージの戻り確認までセットで練習してから本番に入る。",
    serviceBoundary: "電源工事、冷媒漏れ修理、壁穴あけに不安がある場合は資格者・業者へ依頼。",
    priceBand: "2万円台",
  },
  "tasco-ta150sw": {
    beginnerUseCase: "DIYを複数回やる予定の真空引き",
    beginnerFit: "good",
    riskNote: "性能は余裕があるが、最初の1台だけなら入門機との差額を回収しにくい。",
    serviceBoundary: "真空保持で針が戻る場合は配管漏れの可能性があるため無理に運転しない。",
    priceBand: "2万円台後半",
  },
  "asada-vp154": {
    beginnerUseCase: "電源が取りにくい現場の真空引き",
    beginnerFit: "overkill",
    riskNote: "バッテリー運用に慣れていない初心者には管理項目が増える。",
    serviceBoundary: "高所や屋根上での作業は転落リスクが高いため業者へ依頼。",
    priceBand: "3万円台",
  },
  "weimall-manifold-r32": {
    beginnerUseCase: "圧力確認と真空引きの練習",
    beginnerFit: "caution",
    riskNote: "対応冷媒、接続口径、ホース品質を購入前に必ず確認する。",
    serviceBoundary: "冷媒充填や漏れ修理は法令・資格・実務知識が絡むため安易に行わない。",
    priceBand: "1万円未満",
  },
  "tasco-ta122gb-1": {
    beginnerUseCase: "失敗を減らしたい真空引き・圧力確認",
    beginnerFit: "good",
    riskNote: "入門用より価格は上がるが、接続部の安心感と操作性で迷いにくい。",
    serviceBoundary: "異常圧力や冷媒漏れが疑われる場合は運転を止めて業者へ相談。",
    priceBand: "2万円台",
  },
  "tasco-ta122g-2": {
    beginnerUseCase: "ロングホースが必要な業務寄り作業",
    beginnerFit: "overkill",
    riskNote: "家庭用1台のDIYでは機能を持て余しやすい。",
    serviceBoundary: "天カセ・業務用エアコンは施工難度が高く、初心者DIYの対象外。",
    priceBand: "3〜4万円台",
  },
  "tasco-ta550a": {
    beginnerUseCase: "銅管のフレア加工を基礎から練習",
    beginnerFit: "best",
    riskNote: "バリ取り不足と締め過ぎが漏れの原因になりやすい。練習用銅管で仕上がりを確認する。",
    serviceBoundary: "フレア部から油汚れや霜が出る場合は漏れ点検を業者へ依頼。",
    priceBand: "1万円台",
  },
  "bbk-700-dpc": {
    beginnerUseCase: "副業前提でフレア加工の疲労を減らす",
    beginnerFit: "good",
    riskNote: "インパクトドライバー不可。工具の指定通りに低速で使う。",
    serviceBoundary: "大量施工や保証が絡む作業は経験者の確認を受ける。",
    priceBand: "1万円台後半",
  },
  "rex-rf20s2": {
    beginnerUseCase: "1日複数台のプロ施工",
    beginnerFit: "overkill",
    riskNote: "家庭用1台では投資回収しにくく、メンテ管理も必要。",
    serviceBoundary: "業務施工向け。初心者は手動フレアで基礎を覚えてから検討。",
    priceBand: "6万円台以上",
  },
  "tasco-ta771st-2": {
    beginnerUseCase: "フレアナットの締め過ぎ防止",
    beginnerFit: "best",
    riskNote: "サイズ別の締付トルクを確認し、クリック後に増し締めしない。",
    serviceBoundary: "電気工事や専用回路の増設は第二種電気工事士など資格者のみ。",
    priceBand: "1万円台",
  },
  "tasco-ta771bh": {
    beginnerUseCase: "狭所でも扱いやすいトルク管理",
    beginnerFit: "good",
    riskNote: "価格は上がるため、まずは作業頻度と配管サイズを確認する。",
    serviceBoundary: "漏れが止まらない場合は締め増しで粘らず業者へ相談。",
    priceBand: "1〜2万円台",
  },
  "bbk-rtqs-41": {
    beginnerUseCase: "狭い室外機まわりの締付作業",
    beginnerFit: "caution",
    riskNote: "ラチェット式に慣れるまで締め過ぎに注意する。",
    serviceBoundary: "配管再利用や移設は漏れリスクが上がるため無理をしない。",
    priceBand: "1万円台",
  },
  "tasco-ta110xz": {
    beginnerUseCase: "冷媒回収の学習用知識",
    beginnerFit: "overkill",
    riskNote: "冷媒回収は法令と登録が絡むため、初心者DIYの購入対象ではない。",
    serviceBoundary: "冷媒回収・廃棄は登録業者へ依頼。",
    priceBand: "10万円台",
  },
  "asada-es640": {
    beginnerUseCase: "業務用の冷媒回収",
    beginnerFit: "overkill",
    riskNote: "初心者向けではなく、登録・回収容器・記録管理が必要。",
    serviceBoundary: "フロン類の回収は登録業者・有資格者の業務範囲。",
    priceBand: "10万円台以上",
  },
  "bbk-rm350": {
    beginnerUseCase: "プロ現場の冷媒回収",
    beginnerFit: "overkill",
    riskNote: "家庭用DIYの範囲を超える業務機材。",
    serviceBoundary: "撤去や移設時の冷媒処理は業者へ依頼。",
    priceBand: "10万円台以上",
  },
  "elitech-ld-100-plus": {
    beginnerUseCase: "ガス漏れの可能性を早めに疑う",
    beginnerFit: "caution",
    riskNote: "検知結果だけで修理判断せず、霜・油汚れ・効きの悪さと合わせて見る。",
    serviceBoundary: "漏れが疑われる場合の修理・充填は業者へ依頼。",
    priceBand: "1万円未満",
  },
  "tasco-ta430va": {
    beginnerUseCase: "漏れ点検を少し本格的に行う",
    beginnerFit: "overkill",
    riskNote: "家庭用の一時確認には高機能すぎる場合が多い。",
    serviceBoundary: "冷媒漏れ修理は資格・設備・経験が必要なため業者へ相談。",
    priceBand: "2万円台",
  },
  "tasco-ta430d": {
    beginnerUseCase: "プロ寄りの微量漏れ検知",
    beginnerFit: "overkill",
    riskNote: "初心者が最初に買うより、施工台数が増えてから検討する。",
    serviceBoundary: "漏れ箇所の修理や冷媒再充填は業者へ依頼。",
    priceBand: "4万円台以上",
  },
};

export function getBeginnerMeta(product) {
  return productBeginnerMeta[product?.slug] || {
    beginnerUseCase: product?.targetUser || "初心者の用途確認",
    beginnerFit: product?.tier === "entry" ? "good" : product?.tier === "middle" ? "caution" : "overkill",
    riskNote: "購入前に型番、対応冷媒、付属品、販売元を確認してください。",
    serviceBoundary: "危険を伴う作業や資格が必要な作業は業者へ依頼してください。",
    priceBand: product?.priceRange || "Amazonで確認",
  };
}

export function getDisplayPriceBand(product) {
  return getBeginnerMeta(product).priceBand;
}

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
    price: getDisplayPriceBand(product),
    priceBand: getDisplayPriceBand(product),
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

export const beginnerBestBuys = [
  {
    id: "starter-kit",
    label: "初心者工具セット",
    title: "最初の1台に必要な基本工具",
    priceBand: "3〜5万円台",
    text: "真空ポンプ、ゲージ、トルクレンチ、フレア工具を個別に確認しながら揃える入口。",
    path: "/beginner-kit/",
    cta: "初心者セットを見る",
  },
  {
    id: "tasco-ta150sv",
    label: "真空ポンプ入門",
    title: "TASCO TA150SV",
    priceBand: getDisplayPriceBand(getProduct("tasco-ta150sv")),
    text: "家庭用1台のDIYで真空引きを覚えたい人向けの入門候補。",
    product: getProduct("tasco-ta150sv"),
    path: "/products/tasco-ta150sv/",
    cta: "価格・在庫を確認",
  },
  {
    id: "drain-cleaning",
    label: "水漏れ対策",
    title: "ドレン詰まり確認用品",
    priceBand: "1,000〜4,000円台",
    text: "室内機からの水漏れで最初に疑うドレン詰まりの確認に使う用品。",
    amazonSearch: "エアコン ドレンホース クリーナー サクションポンプ",
    cta: "Amazonで用品を見る",
  },
];

export const beginnerSymptoms = [
  {
    id: "not-cooling",
    title: "冷えない・効きが悪い",
    text: "フィルター、室外機、設定、ガス漏れサインの順に確認。",
    path: "/posts/aircon-not-cooling-checklist/",
    items: ["業者前チェック", "掃除用品", "ガス漏れ境界"],
  },
  {
    id: "water-leak",
    title: "水漏れする",
    text: "ドレン詰まり、傾き、内部汚れを見分ける。",
    path: "/posts/aircon-water-leak-causes/",
    items: ["ドレン確認", "サクションポンプ", "業者判断"],
  },
  {
    id: "smell",
    title: "臭い・カビが気になる",
    text: "送風、フィルター、洗浄スプレーで済む範囲を整理。",
    path: "/posts/aircon-smell-mold-check/",
    items: ["カビ臭", "洗浄用品", "清掃境界"],
  },
  {
    id: "remote",
    title: "リモコンが効かない",
    text: "電池、受光部、応急運転、汎用リモコンを確認。",
    path: "/posts/aircon-remote-not-working/",
    items: ["電池確認", "応急運転", "汎用リモコン"],
  },
];

export const beginnerComparisonRows = [
  {
    useCase: "家庭用1台で真空引きまでやる",
    recommendation: "TASCO TA150SV",
    priceBand: getDisplayPriceBand(getProduct("tasco-ta150sv")),
    ease: "軽量で扱いやすい",
    safety: "真空保持確認まで練習すれば失敗を減らせる",
    product: getProduct("tasco-ta150sv"),
    path: "/products/tasco-ta150sv/",
    tier: "beginner",
  },
  {
    useCase: "フレアナットを締め過ぎたくない",
    recommendation: "TASCO TA771ST-2",
    priceBand: getDisplayPriceBand(getProduct("tasco-ta771st-2")),
    ease: "クリック式で基準を掴みやすい",
    safety: "締め不足・締め過ぎの漏れリスクを下げる",
    product: getProduct("tasco-ta771st-2"),
    path: "/products/tasco-ta771st-2/",
    tier: "beginner",
  },
  {
    useCase: "銅管のフレア加工を練習する",
    recommendation: "TASCO TA550A",
    priceBand: getDisplayPriceBand(getProduct("tasco-ta550a")),
    ease: "手動で基礎を覚えやすい",
    safety: "練習用銅管で仕上がり確認が必要",
    product: getProduct("tasco-ta550a"),
    path: "/products/tasco-ta550a/",
    tier: "beginner",
  },
  {
    useCase: "水漏れのドレン詰まりを確認する",
    recommendation: "ドレンホース用サクションポンプ",
    priceBand: "1,000〜4,000円台",
    ease: "掃除用品として始めやすい",
    safety: "室内機分解が必要なら業者へ",
    amazonSearch: "エアコン ドレンホース クリーナー サクションポンプ",
    tier: "beginner",
  },
  {
    useCase: "掃除だけ自分で試す",
    recommendation: "フィルター掃除用品・洗浄スプレー",
    priceBand: "1,000〜3,000円台",
    ease: "工具不要で始めやすい",
    safety: "電装部に洗浄剤をかけない",
    amazonSearch: "エアコン 洗浄スプレー フィルター掃除 ブラシ",
    tier: "beginner",
  },
  {
    useCase: "副業以上になったら検討",
    recommendation: "TA150SW / 700-DPC / TA122GB-1",
    priceBand: "2万円台〜",
    ease: "作業頻度が増えると効く",
    safety: "保証や責任が発生する作業は経験者確認が必要",
    path: "/comparison/",
    tier: "next",
  },
];

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
  price: getDisplayPriceBand(product),
  priceBand: getDisplayPriceBand(product),
  weight: product.specs.find((spec) => spec.includes("kg") || spec.includes("g")) || "-",
  refrigerants: product.specs.find((spec) => spec.includes("R32") || spec.includes("R410A")) || "商品ページ確認",
  performance: product.specs.slice(0, 2).join(" / "),
  beginner: product.tier === "entry" ? "◎" : product.tier === "middle" ? "○" : "△",
  pro: product.tier === "pro" ? "◎" : product.tier === "middle" ? "○" : "△",
  rating: product.rating.toFixed(1),
  recommended: product.featured,
  beginner: beginnerFitLabels[getBeginnerMeta(product).beginnerFit],
  beginnerUseCase: getBeginnerMeta(product).beginnerUseCase,
  riskNote: getBeginnerMeta(product).riskNote,
  serviceBoundary: getBeginnerMeta(product).serviceBoundary,
}));

export const trustItems = [
  { icon: "scale", title: "用途別に比較", text: "作業に合った工具を比較できる" },
  { icon: "shield", title: "失敗しない基準", text: "価格より精度・耐久性を重視" },
  { icon: "worker", title: "プロ仕様も解説", text: "独立投資まで段階別に紹介" },
];

export const seoTargets = [
  "エアコン 冷えない 原因",
  "エアコン 水漏れ 自分で直す",
  "エアコン 掃除 自分で",
  "エアコン工具 初心者セット",
  "真空ポンプ エアコン 初心者",
  "トルクレンチ エアコン 必要",
];

export function buildAmazonSearchUrl(keyword) {
  const url = new URL("https://www.amazon.co.jp/s");
  url.searchParams.set("k", keyword);
  if (site.amazonTag) url.searchParams.set("tag", site.amazonTag);
  return url.toString();
}

export function buildAmazonAffiliateUrl(rawUrl) {
  if (!rawUrl) return "#";
  try {
    const url = new URL(rawUrl);
    if (site.amazonTag) url.searchParams.set("tag", site.amazonTag);
    return url.toString();
  } catch {
    return rawUrl;
  }
}

export function getAmazonAsinFromUrl(rawUrl) {
  if (!rawUrl) return "";
  try {
    const url = new URL(rawUrl);
    const match = url.pathname.match(/\/(?:dp|gp\/product)\/([A-Z0-9]{10})/i);
    return match?.[1]?.toUpperCase() || "";
  } catch {
    return "";
  }
}

export function getAmazonItemImageUrl(item) {
  const asin = item.asin || getAmazonAsinFromUrl(item.url);
  return asin ? `https://m.media-amazon.com/images/P/${asin}.jpg` : "";
}

export const beginnerArticleAmazonItems = {
  "aircon-not-cooling-checklist": [
    {
      id: "rakuhapi-cleaning-spray",
      title: "らくハピ エアコン洗浄スプレー Nextplus",
      label: "フィン掃除の定番",
      url: "https://www.amazon.co.jp/dp/B084RV3S23",
      note: "フィルター掃除後も風が弱い時の候補。電装部にかけない注意が必要です。",
    },
    {
      id: "iris-circulator",
      title: "アイリスオーヤマ サーキュレーター",
      label: "部屋の空気循環",
      url: "https://www.amazon.co.jp/dp/B0CTTFRQ3V",
      note: "冷房の風を部屋全体へ回したい時の補助に向きます。",
    },
    {
      id: "filter-cleaning-brush",
      title: "エアコン フィルター掃除ブラシ",
      label: "まず試す低予算用品",
      search: "エアコン フィルター 掃除 ブラシ",
      note: "ホコリ詰まり確認から始めたい人向けです。",
    },
  ],
  "aircon-water-leak-causes": [
    {
      id: "drain-suction-pump",
      title: "ドレンホース用サクションポンプ",
      label: "水漏れ対策の第一候補",
      search: "エアコン ドレンホース クリーナー サクションポンプ",
      note: "室外側のドレン出口詰まりを確認する用品です。",
    },
    {
      id: "drain-insect-cap",
      title: "ドレンホース防虫キャップ",
      label: "再詰まり予防",
      search: "エアコン ドレンホース 防虫キャップ",
      note: "虫やゴミの侵入を抑えたい時の候補です。",
    },
    {
      id: "aircon-cleaning-cover",
      title: "エアコン掃除用 養生カバー",
      label: "掃除時の水はね対策",
      search: "エアコン 掃除 養生カバー",
      note: "室内機まわりを濡らしたくない時に確認します。",
    },
  ],
  "aircon-rattle-noise-check": [
    {
      id: "tokyo-bouon-pad",
      title: "東京防音 防振ゴム ニューしずか",
      label: "振動音対策の定番",
      url: "https://www.amazon.co.jp/dp/B08CCNSSS4",
      note: "室外機や架台の振動が床に響く時の候補です。",
    },
    {
      id: "outdoor-cleaning-brush",
      title: "室外機まわり掃除ブラシ",
      label: "落ち葉・ホコリ確認",
      search: "エアコン 室外機 掃除 ブラシ",
      note: "見える範囲のゴミ取りに留めて使います。",
    },
    {
      id: "drain-insect-cap-noise",
      title: "ドレンホース防虫キャップ",
      label: "ポコポコ音対策候補",
      search: "エアコン ドレンホース 防虫キャップ",
      note: "虫や外気の影響を減らしたい時に確認します。",
    },
  ],
  "aircon-smell-mold-check": [
    {
      id: "rakuhapi-cleaning-spray-forest",
      title: "らくハピ エアコン洗浄スプレー フレッシュフォレスト",
      label: "臭い対策の定番",
      url: "https://www.amazon.co.jp/dp/B084RVSN9Y",
      note: "見える範囲とフィン掃除の候補。電装部には噴射しません。",
    },
    {
      id: "rakuhapi-gap-wiper",
      title: "らくハピ エアコン 防カビ スキマワイパー",
      label: "吹き出し口まわり",
      search: "らくハピ エアコン 防カビ スキマワイパー",
      note: "吹き出し口の見える範囲を拭きたい時の候補です。",
    },
    {
      id: "aircon-cleaning-cover-smell",
      title: "エアコン掃除用 養生カバー",
      label: "洗浄前の養生",
      search: "エアコン 掃除 養生カバー",
      note: "洗浄スプレーや拭き掃除の水はね対策に確認します。",
    },
  ],
  "aircon-remote-not-working": [
    {
      id: "universal-remote-k1028e",
      title: "エアコンリモコン 汎用 K-1028E",
      label: "汎用リモコン",
      url: "https://www.amazon.co.jp/dp/B0CT8Z2B7F",
      note: "メーカー対応と型番を確認してから選びます。",
    },
    {
      id: "elpa-rc-ac38",
      title: "ELPA エアコンリモコン RC-AC38",
      label: "国内メーカー対応候補",
      search: "ELPA RC-AC38 エアコンリモコン",
      note: "設定方式と対応メーカーを購入前に確認します。",
    },
    {
      id: "aa-aaa-battery",
      title: "単3・単4アルカリ乾電池",
      label: "まず交換",
      search: "単3 単4 アルカリ乾電池 Amazonベーシック",
      note: "リモコン故障判断の前に新品電池で試します。",
    },
  ],
  "aircon-weak-airflow-fix": [
    {
      id: "iris-circulator-weak",
      title: "アイリスオーヤマ サーキュレーター",
      label: "空気循環の人気候補",
      url: "https://www.amazon.co.jp/dp/B0CTTFRQ3V",
      note: "冷暖房のムラを減らしたい時に確認します。",
    },
    {
      id: "rakuhapi-cleaning-spray-weak",
      title: "らくハピ エアコン洗浄スプレー Nextplus",
      label: "フィン掃除",
      url: "https://www.amazon.co.jp/dp/B084RV3S23",
      note: "風量低下が汚れ由来か確認したい時の候補です。",
    },
    {
      id: "filter-brush-weak",
      title: "エアコン フィルター掃除ブラシ",
      label: "フィルター詰まり対策",
      search: "エアコン フィルター 掃除 ブラシ",
      note: "まず低予算で試す掃除用品です。",
    },
  ],
  "outdoor-unit-noise-check": [
    {
      id: "tokyo-bouon-pad-outdoor",
      title: "東京防音 防振ゴム ニューしずか",
      label: "室外機の振動対策",
      url: "https://www.amazon.co.jp/dp/B08CCNSSS4",
      note: "ベランダや架台の振動音が気になる時の候補です。",
    },
    {
      id: "outdoor-cleaning-brush-noise",
      title: "室外機まわり掃除ブラシ",
      label: "落ち葉・ゴミ取り",
      search: "エアコン 室外機 掃除 ブラシ",
      note: "ファン内部には触らず、周囲の掃除に使います。",
    },
    {
      id: "outdoor-cover",
      title: "室外機カバー",
      label: "直射日光・汚れ対策",
      search: "エアコン 室外機 カバー",
      note: "排熱を妨げない形状か確認して選びます。",
    },
  ],
  "aircon-stops-by-itself": [
    {
      id: "universal-remote-stops",
      title: "エアコンリモコン 汎用 K-1028E",
      label: "タイマー誤設定確認",
      url: "https://www.amazon.co.jp/dp/B0CT8Z2B7F",
      note: "リモコン不調や表示不良が疑われる時の候補です。",
    },
    {
      id: "aa-aaa-battery-stops",
      title: "単3・単4アルカリ乾電池",
      label: "まず交換",
      search: "単3 単4 アルカリ乾電池 Amazonベーシック",
      note: "タイマーや設定不良を疑う前に新品電池で試します。",
    },
    {
      id: "filter-brush-stops",
      title: "エアコン フィルター掃除ブラシ",
      label: "風量低下対策",
      search: "エアコン フィルター 掃除 ブラシ",
      note: "フィルター詰まりによる停止を疑う時に確認します。",
    },
  ],
  "aircon-gas-leak-self-check": [
    {
      id: "leak-check-liquid",
      title: "エアコン用 リークチェック液",
      label: "漏れ確認の入門",
      search: "エアコン リークチェック液 冷媒",
      note: "疑う材料集めまで。修理や充填は業者へ依頼します。",
    },
    {
      id: "elitech-ld100",
      title: "Elitech LD-100+ リークテスター",
      label: "検知器入門",
      url: "https://www.amazon.co.jp/s?k=Elitech+LD-100%2B+%E3%83%AA%E3%83%BC%E3%82%AF%E3%83%86%E3%82%B9%E3%82%BF%E3%83%BC",
      note: "検知結果だけで修理判断しない前提で確認します。",
    },
    {
      id: "tasco-ta150sv-leak",
      title: "TASCO TA150SV 真空ポンプ",
      label: "DIY取付の基礎工具",
      url: "https://www.amazon.co.jp/dp/B003B3H5LU",
      note: "自分で取付を学ぶ人向け。冷媒充填は別の話です。",
    },
  ],
  "aircon-cleaning-diy-steps": [
    {
      id: "rakuhapi-cleaning-spray-cleaning",
      title: "らくハピ エアコン洗浄スプレー Nextplus",
      label: "掃除用品の人気候補",
      url: "https://www.amazon.co.jp/dp/B084RV3S23",
      note: "フィン掃除の候補。説明書通りに使い、電装部を避けます。",
    },
    {
      id: "rakuhapi-gap-wiper-cleaning",
      title: "らくハピ エアコン 防カビ スキマワイパー",
      label: "吹き出し口掃除",
      search: "らくハピ エアコン 防カビ スキマワイパー",
      note: "見える範囲の汚れを拭きたい時に確認します。",
    },
    {
      id: "aircon-cleaning-cover-cleaning",
      title: "エアコン掃除用 養生カバー",
      label: "水はね対策",
      search: "エアコン 掃除 養生カバー",
      note: "室内機まわりを濡らしたくない時の候補です。",
    },
  ],
};
