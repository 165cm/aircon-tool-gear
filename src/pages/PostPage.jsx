import Header from "../components/Header.jsx";
import Icon from "../components/Icon.jsx";
import { Button, PageShell } from "../components/Ui.jsx";
import { affiliateDisclosure, seoTargets } from "../data/siteData.js";
import { scheduledPosts } from "../data/scheduledPosts.js";
import { withBase } from "../utils/routes.js";

function isPublished(post) {
  const today = new Date().toISOString().slice(0, 10);
  return post.publishDate <= today;
}

export default function PostPage({ activePage = "guide", slug = "aircon-tool-beginner-guide", onNavigate }) {
  const post = scheduledPosts.find((item) => item.slug === slug) || scheduledPosts[0];
  const related = scheduledPosts.filter((item) => item.slug !== post.slug).slice(0, 6);

  return (
    <PageShell>
      <Header activePage={activePage} onNavigate={onNavigate} />
      <article className="px-5 py-8 md:py-10 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-lg border border-metal-300 bg-white p-5 shadow-metal md:p-8">
          <p className="text-sm font-black text-steel">{post.keyword}</p>
          <h1 className="mt-3 text-3xl font-black leading-tight text-navy md:text-5xl">{post.title}</h1>
          <div className="mt-4 flex flex-wrap gap-3 text-sm font-bold text-metal">
            <span>公開日: {post.publishDate}</span>
            <span>最終更新日: {post.updatedDate || post.publishDate}</span>
            <span>更新計画: 週3回 / 5ヶ月</span>
          </div>
          <p className="mt-6 text-base font-bold leading-8 text-charcoal">{post.summary}</p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {seoTargets.slice(0, 3).map((target) => (
              <div className="rounded-lg border border-metal-200 bg-paper p-4" key={target}>
                <p className="text-xs font-black text-steel">SEO TARGET</p>
                <p className="mt-2 font-black text-navy">{target}</p>
              </div>
            ))}
          </div>

          <section className="mt-8 space-y-5 text-base font-bold leading-8 text-charcoal">
            <h2 className="text-2xl font-black text-navy">まず見るべき基準</h2>
            <p>
              夏の繁忙期は、工具選びの小さな差が作業時間と再訪問リスクに直結します。型番、対応冷媒、精度、耐久性、安全性を先に確認し、価格だけで判断しないことが重要です。
            </p>
            <ul className="grid gap-3 md:grid-cols-3">
              {["型番と対応冷媒", "精度・耐久性", "時短効果"].map((item) => (
                <li className="flex gap-2 rounded-lg border border-metal-200 bg-paper p-3" key={item}>
                  <Icon className="mt-1 shrink-0 text-steel" name="check" size={16} />
                  {item}
                </li>
              ))}
            </ul>
            <h2 className="text-2xl font-black text-navy">現場で失敗しやすいポイント</h2>
            <p>
              安い工具は魅力的ですが、真空到達度、ホース径、校正証明、センサー方式などで後から差が出ます。初心者は扱いやすさを、中級者以上は施工品質と時短効果を重視しましょう。
            </p>
          </section>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <a className="rounded-lg bg-navy px-4 py-3 text-center text-sm font-black text-white" href={withBase("/ranking/")}>
              工具ランキング
            </a>
            <a className="rounded-lg bg-steel px-4 py-3 text-center text-sm font-black text-white" href={withBase("/beginner-kit/")}>
              初心者セット
            </a>
            <a className="rounded-lg bg-orange px-4 py-3 text-center text-sm font-black text-white" href={withBase("/comparison/")}>
              全商品比較
            </a>
          </div>

          <p className="mt-8 rounded-lg border border-orange/30 bg-orange/5 p-4 text-sm font-bold leading-7 text-charcoal">
            {affiliateDisclosure}
          </p>
        </div>
      </article>

      <section className="px-5 pb-10 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-lg border border-metal-300 bg-white p-5 shadow-panel md:p-8">
          <h2 className="text-2xl font-black text-navy">公開予定コンテンツ</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {related.map((item) => (
              <a
                className={`rounded-lg border border-metal-200 p-4 transition hover:border-orange ${
                  isPublished(item) ? "bg-white" : "bg-paper"
                }`}
                href={withBase(`/posts/${item.slug}/`)}
                key={item.slug}
              >
                <p className="text-xs font-black text-steel">{item.publishDate}</p>
                <p className="mt-1 font-black text-navy">{item.title}</p>
                <p className="mt-1 text-xs font-bold text-metal">{item.keyword}</p>
              </a>
            ))}
          </div>
          <Button className="mt-5" onClick={() => onNavigate?.("ranking")} variant="dark">
            ランキングへ戻る
          </Button>
        </div>
      </section>
    </PageShell>
  );
}
