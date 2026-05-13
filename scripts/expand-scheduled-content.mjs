import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const contentDir = path.join(root, "content", "scheduled");

const files = (await readdir(contentDir)).filter((file) => file.endsWith(".md")).sort();

for (const file of files) {
  const filePath = path.join(contentDir, file);
  const source = await readFile(filePath, "utf8");
  const { frontmatter, data } = parseFrontmatter(source, file);
  const body = buildBody(data);
  await writeFile(filePath, `---\n${frontmatter}\n---\n\n${body}\n`, "utf8");
}

console.log(`Expanded ${files.length} scheduled articles.`);

function parseFrontmatter(source, file) {
  const match = source.match(/^---\n([\s\S]*?)\n---/);
  if (!match) {
    throw new Error(`${file}: frontmatter is missing.`);
  }

  const data = {};
  for (const line of match[1].split("\n")) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    data[line.slice(0, separator).trim()] = line.slice(separator + 1).trim();
  }

  return { frontmatter: match[1], data };
}

function buildBody(post) {
  const articleType = resolveType(post);
  const intro = [
    `# ${post.title}`,
    "",
    `${post.keyword}で調べている人が知りたいのは、単なる型番名や価格ではなく「自分の現場で失敗しにくいか」「買ったあとに使い続けられるか」です。エアコン工具は一度買うと数年使うものが多く、安さだけで選ぶと、精度不足、作業時間の増加、買い直しでかえって高くつくことがあります。`,
    "",
    `この記事では、${post.title}について、初心者が最初に確認すべき点と、中級者以上が現場効率を見るときの判断材料を整理します。価格や在庫は変動するため、購入前にはAmazonの商品ページとメーカー公式情報を必ず確認してください。`,
  ].join("\n");

  return [
    intro,
    typeSpecificSection(articleType, post),
    baselineSection(post),
    fieldMistakeSection(post),
    selectionSection(articleType, post),
    buyingChecklistSection(post),
    relatedSection(post),
  ].join("\n\n");
}

function resolveType(post) {
  const text = `${post.slug} ${post.title} ${post.keyword}`;
  if (/比較|違い|どちら|vs|VS/.test(text)) return "comparison";
  if (/レビュー|評判|使い方|狭所作業/.test(text)) return "review";
  if (/原因|戻る|見つからない|割れ|漏れ|トラブル|チェックリスト/.test(text)) return "trouble";
  if (/法律|資格|登録|外注/.test(text)) return "compliance";
  return "guide";
}

function typeSpecificSection(type, post) {
  if (type === "review") {
    return [
      "## この工具を見るときの前提",
      "",
      `${post.title}を検討するときは、まず「何台くらい施工する予定か」を決めると判断しやすくなります。年に数回のDIYや副業初期なら、扱いやすさと失敗しにくさが重要です。毎月のように現場で使うなら、精度の安定、作業スピード、消耗部品の入手性まで見ておきたいところです。`,
      "",
      "レビュー記事では、良い点だけを見ても判断を誤ります。工具は使う人の経験、施工台数、作業場所の狭さ、電源の取りやすさによって評価が変わります。特にエアコン工事では、少しの精度不足がガス漏れや再訪問につながるため、購入価格よりも作業品質への影響を優先して考えましょう。",
    ].join("\n");
  }

  if (type === "comparison") {
    return [
      "## 比較するときの軸",
      "",
      `${post.title}で迷っている場合は、スペック表の数字を横に並べるだけでは足りません。現場で差が出るのは、準備のしやすさ、作業中の確認しやすさ、失敗したときの切り分けやすさです。`,
      "",
      "比較では、価格、重量、対応冷媒、精度、耐久性、消耗品、保証、将来の買い替えやすさを分けて見ます。初心者は「今すぐ必要な性能」を優先し、中級者以上は「施工台数が増えたときに時間をどれだけ短縮できるか」まで含めて判断すると、後悔しにくくなります。",
    ].join("\n");
  }

  if (type === "trouble") {
    return [
      "## まず切り分けるべきこと",
      "",
      `${post.title}のような施工トラブルは、原因を一つに決めつけると遠回りになります。工具の不良、接続部のゆるみ、銅管加工、作業手順、確認不足のどれでも起こり得るため、順番に切り分けることが大切です。`,
      "",
      "最初に見るのは、直前に触った箇所、接続した箇所、締め付けた箇所です。次に、工具の設定や対応冷媒、ホースやアダプターの規格を確認します。原因を探すときほど、焦って作業を進めず、同じ条件で再確認することが結果的に早道になります。",
    ].join("\n");
  }

  if (type === "compliance") {
    return [
      "## 法令や資格を先に確認する",
      "",
      `${post.title}を考えるときは、工具の性能だけでなく、作業範囲と法令上の扱いを先に確認してください。冷媒回収や業務用空調に関わる作業は、資格、登録、記録、回収容器、処理ルートまで含めて準備が必要になる場合があります。`,
      "",
      "道具を買えばすぐに作業できるわけではありません。購入前に、どの作業を自分で行い、どこから専門業者に依頼するかを整理しておくと、無駄な投資や法令リスクを避けやすくなります。",
    ].join("\n");
  }

  return [
    "## 最初に決めるべき基準",
    "",
    `${post.title}でまず決めたいのは、用途と施工頻度です。DIYで数回使うのか、副業として継続的に使うのか、独立を見据えてプロ向け工具まで揃えるのかで、選ぶべき価格帯は変わります。`,
    "",
    "初心者は、扱いやすさ、説明の分かりやすさ、失敗しにくい構造を優先しましょう。中級者以上は、作業時間を短縮できるか、精度が安定するか、現場で壊れにくいかを見ます。同じ工具でも、使う場面が違えば最適解は変わります。",
  ].join("\n");
}

function baselineSection(post) {
  return [
    "## 購入前に見るべき基本項目",
    "",
    "- 型番が検索している商品や用途と一致しているか",
    "- R32、R410Aなど、使う冷媒や作業範囲に対応しているか",
    "- 付属品だけで作業できるのか、ホースやアダプターが別途必要か",
    "- 重量、サイズ、収納性が自分の現場に合うか",
    "- 消耗品、校正、交換部品、保証の情報が確認できるか",
    "",
    `${post.keyword}で探す場合、検索結果には似た型番や周辺部品も混ざります。購入前には商品名だけでなく、型番、付属品、販売元、レビューの内容を確認してください。特にAmazonではセット内容や販売ページの仕様が変わることがあるため、メーカー公式情報と照らし合わせると安全です。`,
  ].join("\n");
}

function fieldMistakeSection(post) {
  return [
    "## 現場で失敗しやすいポイント",
    "",
    "現場で多い失敗は、工具そのものの性能不足よりも、用途とのミスマッチです。安い工具でも作業できる場合はありますが、精度確認がしにくい、作業が遅い、狭い場所で扱いにくい、部品が合わないといった小さな不満が積み重なると、施工品質に影響します。",
    "",
    `また、${post.title}のようなテーマでは、初心者ほど「とりあえず安いもの」で済ませがちです。しかしエアコン工事では、フレア加工、締付トルク、真空引き、リークチェックのどこかが甘いと、あとからガス漏れや再訪問につながります。工具選びは、作業のやり直しを減らす投資として考えるのがおすすめです。`,
  ].join("\n");
}

function selectionSection(type, post) {
  if (type === "comparison") {
    return [
      "## どちらを選ぶべきか",
      "",
      "迷ったときは、安い方ではなく「今の作業量で元が取れる方」を選びます。施工台数が少ないうちは、必要十分な性能と扱いやすさを優先しても問題ありません。反対に、現場数が増えているなら、多少高くても時短効果や耐久性の高い工具を選ぶ方が結果的に安くなることがあります。",
      "",
      "比較対象のどちらか一方が絶対に正解というより、自分の作業範囲との相性が重要です。今後もエアコン工事を続ける予定があるなら、買い替え前提ではなく、しばらく使い続けられる構成を選びましょう。",
    ].join("\n");
  }

  if (type === "review") {
    return [
      "## 向いている人と向いていない人",
      "",
      `${post.title}は、${post.keyword}の用途を明確にしてから検討すると選びやすくなります。向いているのは、作業品質を安定させたい人、施工時間を短くしたい人、買い直しを減らしたい人です。`,
      "",
      "一方で、年に一度だけ使う程度なら、いきなり高額な工具を選ばなくてもよい場合があります。まずは最低限必要なカテゴリを揃え、施工頻度が増えてからプロ向けへ更新する方法も現実的です。",
    ].join("\n");
  }

  return [
    "## 初心者と中級者で見るところを変える",
    "",
    "初心者は、細かいスペックよりも、作業手順が分かりやすく、失敗したときに原因を追いやすい工具を選ぶと安心です。最初から高級機を買っても、使い方が分からなければ性能を活かせません。",
    "",
    "中級者以上は、精度、耐久性、時短効果、現場での取り回しを重視しましょう。作業台数が増えるほど、工具の準備時間や確認時間の差が積み上がります。安定して使える工具は、仕上がりだけでなく体力面の負担も減らします。",
  ].join("\n");
}

function buyingChecklistSection(post) {
  return [
    "## 購入前チェックリスト",
    "",
    "- 自分の作業範囲に必要な工具か",
    "- 似た型番と間違えていないか",
    "- 付属品と別売品を確認したか",
    "- メーカー公式情報で仕様を確認したか",
    "- 価格だけでなく、耐久性と失敗時の損失まで考えたか",
    "",
    `最後に、${post.keyword}は価格差だけで判断しないことが大切です。工具は現場で使って初めて良し悪しが分かります。購入前に用途を整理し、必要な性能を満たすものから選ぶと、無駄な買い替えを避けやすくなります。`,
  ].join("\n");
}

function relatedSection() {
  return [
    "## 関連ページ",
    "",
    "- [工具ランキング](/ranking/)",
    "- [初心者セット](/beginner-kit/)",
    "- [全商品比較](/comparison/)",
    "",
    "更新メモ: 価格と在庫は変動するため、購入前にAmazonとメーカー公式情報を確認してください。",
  ].join("\n");
}
