import Header from "../components/Header.jsx";
import MarkdownContent from "../components/MarkdownContent.jsx";
import { Button, PageShell } from "../components/Ui.jsx";
import { affiliateDisclosure, seoTargets } from "../data/siteData.js";
import { scheduledPosts } from "../data/scheduledPosts.js";
import { isScheduledPostPublished, resolveBuildDate } from "../utils/publishing.js";
import { withBase } from "../utils/routes.js";
import { getScheduledPostContent } from "../utils/scheduledPostContent.js";

export default function PostPage({ activePage = "guide", slug = "aircon-tool-beginner-guide", onNavigate }) {
  const buildDate = resolveBuildDate();
  const post = scheduledPosts.find((item) => item.slug === slug) || scheduledPosts[0];
  const related = scheduledPosts
    .filter((item) => item.slug !== post.slug && isScheduledPostPublished(item, buildDate))
    .slice(0, 6);
  const content = getScheduledPostContent(post.slug, post.title);

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

          <MarkdownContent source={content} />

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
          <h2 className="text-2xl font-black text-navy">関連コンテンツ</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {related.map((item) => (
              <a
                className="rounded-lg border border-metal-200 bg-white p-4 transition hover:border-orange"
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
