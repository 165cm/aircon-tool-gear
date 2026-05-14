import Header from "../components/Header.jsx";
import Icon from "../components/Icon.jsx";
import { Button, PageShell, SectionTitle } from "../components/Ui.jsx";
import { scheduledPosts } from "../data/scheduledPosts.js";
import { getBeginnerArticleImages } from "../utils/articleImages.js";
import { getPublishedScheduledPosts, resolveBuildDate } from "../utils/publishing.js";
import { withBase } from "../utils/routes.js";

export default function PostsPage({ activePage = "guide", onNavigate }) {
  const buildDate = resolveBuildDate();
  const posts = getPublishedScheduledPosts(scheduledPosts, buildDate)
    .toReversed()
    .sort((a, b) => {
      const aScore = a.intentLevel === "L1" ? 0 : a.intentLevel === "L2" ? 1 : 2;
      const bScore = b.intentLevel === "L1" ? 0 : b.intentLevel === "L2" ? 1 : 2;
      return aScore - bScore;
    });

  return (
    <PageShell>
      <Header activePage={activePage} onNavigate={onNavigate} />
      <section className="px-5 py-8 md:py-10 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-lg border border-metal-300 bg-white p-5 shadow-metal md:p-8">
          <SectionTitle
            description="冷えない、水漏れ、臭い、リモコン不調など、業者を呼ぶ前に自分で確認できる範囲から読めます。"
            title="症状別・初心者ガイド"
          />

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => {
              const articleImages = getBeginnerArticleImages(post.slug);
              return (
                <a
                  className="group flex min-h-56 flex-col overflow-hidden rounded-lg border border-metal-200 bg-white shadow-panel transition duration-300 hover:-translate-y-1 hover:border-orange hover:shadow-metal"
                  href={withBase(`/posts/${post.slug}/`)}
                  key={post.slug}
                  onClick={(event) => {
                    if (!onNavigate) return;
                    event.preventDefault();
                    onNavigate(`/posts/${post.slug}/`);
                  }}
                >
                  {articleImages.header ? (
                    <img
                      alt={`${post.title}のサムネイル`}
                      className="h-28 w-full border-b border-metal-100 object-cover transition duration-500 group-hover:scale-[1.02]"
                      decoding="async"
                      loading="lazy"
                      src={articleImages.header}
                    />
                  ) : null}
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-start justify-between gap-3">
                      <span className="rounded bg-steel px-3 py-1 text-xs font-black text-white">
                        {post.intentLevel || post.publishDate}
                      </span>
                      <Icon className="shrink-0 text-metal transition group-hover:text-orange" name="arrow" size={18} />
                    </div>
                    <p className="mt-4 text-xs font-black text-steel">{post.symptomCategory || post.keyword}</p>
                    <h2 className="mt-2 text-xl font-black leading-tight text-navy">{post.title}</h2>
                    <p className="mt-3 flex-1 text-sm font-bold leading-7 text-charcoal">{post.summary}</p>
                    <span className="mt-4 text-sm font-black text-orange">記事を読む</span>
                  </div>
                </a>
              );
            })}
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
