import Header from "../components/Header.jsx";
import Icon from "../components/Icon.jsx";
import { Button, PageShell, SectionTitle } from "../components/Ui.jsx";
import { scheduledPosts } from "../data/scheduledPosts.js";
import { getPublishedScheduledPosts, resolveBuildDate } from "../utils/publishing.js";
import { withBase } from "../utils/routes.js";

export default function PostsPage({ activePage = "guide", onNavigate }) {
  const buildDate = resolveBuildDate();
  const posts = getPublishedScheduledPosts(scheduledPosts, buildDate).toReversed();

  return (
    <PageShell>
      <Header activePage={activePage} onNavigate={onNavigate} />
      <section className="px-5 py-8 md:py-10 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-lg border border-metal-300 bg-white p-5 shadow-metal md:p-8">
          <SectionTitle
            description="公開済みの工具選び記事、型番比較、施工トラブル対策を新しい順に確認できます。"
            title="エアコン工具の選び方記事"
          />

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <a
                className="group flex min-h-56 flex-col rounded-lg border border-metal-200 bg-white p-5 shadow-panel transition duration-300 hover:-translate-y-1 hover:border-orange hover:shadow-metal"
                href={withBase(`/posts/${post.slug}/`)}
                key={post.slug}
                onClick={(event) => {
                  if (!onNavigate) return;
                  event.preventDefault();
                  onNavigate(`/posts/${post.slug}/`);
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="rounded bg-steel px-3 py-1 text-xs font-black text-white">
                    {post.publishDate}
                  </span>
                  <Icon className="shrink-0 text-metal transition group-hover:text-orange" name="arrow" size={18} />
                </div>
                <p className="mt-4 text-xs font-black text-steel">{post.keyword}</p>
                <h2 className="mt-2 text-xl font-black leading-tight text-navy">{post.title}</h2>
                <p className="mt-3 flex-1 text-sm font-bold leading-7 text-charcoal">{post.summary}</p>
                <span className="mt-4 text-sm font-black text-orange">記事を読む</span>
              </a>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-lg border border-metal-200 bg-paper p-5 md:flex-row md:items-center">
            <p className="text-sm font-bold leading-7 text-metal">
              公開日は日本時間基準です。新しい記事は予約公開後に一覧、サイトマップ、RSSへ反映されます。
            </p>
            <Button className="min-w-64" onClick={() => onNavigate?.("ranking")} variant="dark">
              工具ランキングを見る
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
