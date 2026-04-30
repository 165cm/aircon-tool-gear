import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const contentDir = path.join(root, "content", "scheduled");
const dataFile = path.join(root, "src", "data", "scheduledPosts.js");

const products = [
  ["tasco-ta150sw", "TA150SW レビュー", "真空ポンプ エアコン おすすめ"],
  ["tasco-ta150sv", "TA150SV TA150SW 違い", "真空ポンプ 入門"],
  ["asada-vp154", "VP154 コードレス真空ポンプ", "充電式真空ポンプ"],
  ["tasco-ta122gb-1", "TA122GB-1 使い方", "ゲージマニホールド R32"],
  ["bbk-700-dpc", "BBK 700-DPC レビュー", "フレアツール おすすめ"],
  ["tasco-ta771bh", "TA771BH レビュー", "トルクレンチ エアコン"],
  ["bbk-rtqs-41", "RTQS-41 狭所作業", "ラチェットトルクレンチ"],
  ["tasco-ta430d", "TA430D リークテスター 評判", "リークテスター エアコン"],
  ["tasco-ta430va", "TA430VA 半導体式リーク", "ガス漏れ検知器"],
  ["bbk-rm350", "BBK RM350 冷媒回収機", "冷媒回収機 おすすめ"],
  ["asada-es640", "アサダ ES640 比較", "フロン回収装置"],
  ["tasco-ta110xz", "TA110XZ ツインサンダー240", "フロン回収機"],
];

const monthlyThemes = [
  ["aircon-tool-beginner-guide", "エアコン工具の選び方｜初心者が失敗しない基準", "エアコン修理 工具"],
  ["beginner-kit-5-10man", "5〜10万円で揃えるエアコン工具セット", "エアコン取付 工具 セット"],
  ["vacuum-pump-first-choice", "最初の真空ポンプはどこを見るべきか", "真空ポンプ エアコン おすすめ"],
  ["manifold-r32-r410a", "R32/R410A対応ゲージマニホールドの見分け方", "ゲージマニホールド R32"],
  ["flare-tool-common-mistakes", "フレアツール選びで起きる失敗と対策", "フレアツール エアコン"],
  ["torque-wrench-safety", "R32時代にトルクレンチが必要な理由", "トルクレンチ エアコン"],
  ["leak-check-basic", "リークチェックを早く正確にする工具選び", "リークテスター エアコン"],
  ["recovery-machine-law", "冷媒回収機を買う前に知るべき法律と用途", "冷媒回収機"],
  ["summer-install-speed", "夏の繁忙期に作業時間を削る工具投資", "エアコン工事 繁忙期"],
  ["r32-vacuum-point", "R32施工で真空引きを軽く見ないための基準", "R32 真空引き"],
  ["pro-upgrade-path", "副業からプロへ工具をランクアップする順番", "エアコン職人 工具"],
  ["price-vs-durability", "安い工具とプロ工具の差が出るポイント", "エアコン工具 比較"],
];

function addDays(date, days) {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

function nextPublishDates(count) {
  const dates = ["2026-04-30"];
  let cursor = new Date("2026-05-01T00:00:00.000Z");
  while (dates.length < count) {
    const day = cursor.getUTCDay();
    if ([1, 3, 5].includes(day)) dates.push(formatDate(cursor));
    cursor = addDays(cursor, 1);
  }
  return dates;
}

function makeTopics() {
  const topics = [...monthlyThemes];
  for (const [slug, title, keyword] of products) {
    topics.push([`${slug}-review`, `${title}｜現場目線レビュー`, keyword]);
  }
  const comparisonSeeds = [
    ["ta150sv-vs-ta150sw", "TA150SVとTA150SWの違いを比較", "TA150SV TA150SW 違い"],
    ["ta122gb-1-vs-fullkit", "TA122GB-1とフルキットの違い", "TA122GB-1 比較"],
    ["700-dpc-vs-rex-rf20s", "BBK 700-DPCとREX RF20SⅡの違い", "700-DPC REX RF20S"],
    ["ta771bh-vs-rtqs41", "TA771BHとRTQS-41はどちらを選ぶべきか", "TA771BH RTQS-41"],
    ["ta430va-vs-ta430d", "TA430VAとTA430Dの違い", "TA430VA TA430D 違い"],
    ["es640-vs-rm350", "ES640とRM350の冷媒回収機比較", "ES640 RM350 比較"],
  ];
  topics.push(...comparisonSeeds);
  const seasonal = [
    "真空引きが遅い時に疑うポイント",
    "夏場の室外機作業で準備したい工具",
    "ゲージホースのねじ径で失敗しない方法",
    "フレア加工で漏れを減らすチェックリスト",
    "トルク管理を新人に教える時の要点",
    "リークテスターと検知液を併用する手順",
    "冷媒回収を外注する判断基準",
    "独立前に揃える工具と後回しでよい工具",
    "Amazonで工具を買う前の型番確認",
    "工具バッグに入れるべき小物リスト",
    "パイプカッターとリーマーを軽視しない理由",
    "R410AとR32工具の互換で見るべき点",
    "量販店下請けで最低限見られる装備",
    "プロ工具への買い替えタイミング",
    "真空ポンプオイル管理の基本",
    "ゲージマニホールドのサイトグラス活用",
    "電動フレアのメンテで避けるべきこと",
    "校正証明書付き工具の考え方",
    "微量漏れ検知で時間を失わない手順",
    "繁忙期後に見直す工具メンテナンス",
    "初心者が中華OEMを選ぶ時の注意",
    "冷媒回収機を買う前の資格と登録",
    "ルームエアコン専門なら何を優先するか",
    "業務用エアコンへ広げる時の追加工具",
    "工具ランキングを夏前に見直すポイント",
    "5万円追加投資するなら何を買うべきか",
    "10万円追加投資で現場効率を上げる順番",
    "工具レビュー記事の読み方",
    "施工トラブルを減らす購入前チェック",
    "繁忙期の工具在庫切れに備える方法",
    "エアコン工具をAmazonで買うメリットと注意",
    "現場で信頼される工具選びの考え方",
    "新人が最初に覚える工具の役割",
    "独立志望者の工具投資ロードマップ",
    "夏の終わりに買い替えたい消耗品",
    "次シーズンへ残す工具改善メモ",
  ].map((title, index) => [`seasonal-${String(index + 1).padStart(2, "0")}`, title, "エアコン工具 おすすめ"]);
  topics.push(...seasonal);
  return topics.slice(0, 66);
}

function markdown({ slug, title, keyword, publishDate, index }) {
  return `---\nslug: ${slug}\ntitle: ${title}\npublishDate: ${publishDate}\nkeyword: ${keyword}\nsummary: ${title}について、初心者にも分かる基準と中級者が納得できる比較ポイントを整理します。\n---\n\n# ${title}\n\n夏の繁忙期は、工具選びの小さな差が作業時間と再訪問リスクに直結します。この記事では「${keyword}」で探している人向けに、購入前に見るべき基準を短く整理します。\n\n## まず見るべき基準\n\n- 型番と対応冷媒を確認する\n- 価格だけでなく、精度・耐久性・安全性を見る\n- 初心者は扱いやすさ、中級者以上は時短効果を重視する\n\n## 現場で失敗しやすいポイント\n\n安い工具は魅力的ですが、真空到達度、ホース径、校正証明、センサー方式などで後から差が出ます。特にR32施工では、漏れ・締付け・真空引きの品質を軽く見ないことが重要です。\n\n## 関連ページ\n\n- [工具ランキング](/ranking/)\n- [初心者セット](/beginner-kit/)\n- [全商品比較](/comparison/)\n\n更新メモ: ${index + 1}/66。価格と在庫は変動するため、購入前にAmazonとメーカー公式情報を確認してください。\n`;
}

await mkdir(contentDir, { recursive: true });
const dates = nextPublishDates(66);
const posts = makeTopics().map(([slug, title, keyword], index) => ({
  slug,
  title,
  keyword,
  publishDate: dates[index],
  summary: `${title}について、初心者にも分かる基準と中級者が納得できる比較ポイントを整理します。`,
}));

for (const [index, post] of posts.entries()) {
  await writeFile(path.join(contentDir, `${post.slug}.md`), markdown({ ...post, index }), "utf8");
}

await writeFile(
  dataFile,
  `export const scheduledPosts = ${JSON.stringify(posts, null, 2)};\n`,
  "utf8",
);
