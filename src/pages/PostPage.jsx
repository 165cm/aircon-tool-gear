import Header from "../components/Header.jsx";
import MarkdownContent from "../components/MarkdownContent.jsx";
import { Button, PageShell } from "../components/Ui.jsx";
import {
  affiliateDisclosure,
  beginnerArticleAmazonItems,
  buildAmazonAffiliateUrl,
  buildAmazonSearchUrl,
  getAmazonItemImageUrl,
  getAmazonUrl,
  getAmazonImageUrl,
  getDisplayPriceBand,
  getProduct,
  seoTargets,
} from "../data/siteData.js";
import { scheduledPosts } from "../data/scheduledPosts.js";
import { trackAmazonClick } from "../utils/analytics.js";
import { getBeginnerArticleImages } from "../utils/articleImages.js";
import { isScheduledPostPublished, resolveBuildDate } from "../utils/publishing.js";
import { withBase } from "../utils/routes.js";
import { getScheduledPostContent } from "../utils/scheduledPostContent.js";

const symptomSearches = {
  冷えない: "エアコン フィルター掃除 ブラシ 洗浄スプレー",
  水漏れ: "エアコン ドレンホース クリーナー サクションポンプ",
  異音: "エアコン 室外機 防振ゴム 掃除ブラシ",
  臭い: "エアコン 洗浄スプレー フィルター掃除 ブラシ",
  リモコン: "エアコン 汎用リモコン 電池",
  効きが悪い: "エアコン フィルター掃除 サーキュレーター",
  室外機騒音: "室外機 防振ゴム エアコン",
  勝手に止まる: "エアコン リモコン 電池 汎用リモコン",
  ガス漏れ: "エアコン リークチェック 検知液",
  掃除: "エアコン 掃除 ブラシ 洗浄スプレー",
};

export default function PostPage({ activePage = "guide", slug = "aircon-tool-beginner-guide", onNavigate }) {
  const buildDate = resolveBuildDate();
  const post = scheduledPosts.find((item) => item.slug === slug) || scheduledPosts[0];
  const related = scheduledPosts
    .filter((item) => item.slug !== post.slug && isScheduledPostPublished(item, buildDate))
    .slice(0, 6);
  const nextPosts = (post.nextBeginnerPostSlugs || [])
    .map((nextSlug) => scheduledPosts.find((item) => item.slug === nextSlug))
    .filter(Boolean);
  const recommendedProducts = (post.recommendedProductSlugs || []).map((productSlug) => getProduct(productSlug)).filter(Boolean);
  const symptomSearch = symptomSearches[post.symptomCategory];
  const amazonItems = beginnerArticleAmazonItems[post.slug] || [];
  const articleImages = getBeginnerArticleImages(post.slug);
  const content = stripMarkdownSection(getScheduledPostContent(post.slug, post.title), "買うならこの用品");

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

          {articleImages.header ? (
            <img
              alt={`${post.title}の初心者向けヘッダー画像`}
              className="mt-6 w-full rounded-lg border border-metal-200 object-cover shadow-panel"
              decoding="async"
              fetchPriority="high"
              src={articleImages.header}
            />
          ) : null}

          {post.intentLevel === "L1" ? (
            <div className="mt-6 rounded-lg border border-orange/40 bg-orange/5 p-4">
              <p className="text-sm font-black text-orange">初心者向けチェック</p>
              <p className="mt-2 text-sm font-bold leading-7 text-charcoal">
                この記事は、業者へ連絡する前に自分で確認できる範囲を整理する記事です。電気工事、冷媒充填、冷媒回収、高所作業は無理に進めないでください。
              </p>
            </div>
          ) : null}

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {seoTargets.slice(0, 3).map((target) => (
              <div className="rounded-lg border border-metal-200 bg-paper p-4" key={target}>
                <p className="text-xs font-black text-steel">SEO TARGET</p>
                <p className="mt-2 font-black text-navy">{target}</p>
              </div>
            ))}
          </div>

          <MarkdownContent source={content} />

          {articleImages.explain ? (
            <figure className="mt-8 rounded-lg border border-metal-200 bg-paper p-3 shadow-panel">
              <img
                alt={`${post.title}の確認ポイント図解`}
                className="w-full rounded-md border border-metal-100 bg-white object-cover"
                decoding="async"
                loading="lazy"
                src={articleImages.explain}
              />
              <figcaption className="mt-3 text-sm font-bold leading-7 text-metal">
                初心者が安全に確認できる範囲を、視覚的に整理した図解です。
              </figcaption>
            </figure>
          ) : null}

          {post.safetyWarningRequired ? (
            <div className="mt-8 rounded-lg border border-orange/40 bg-orange/5 p-4 text-sm font-bold leading-7 text-charcoal">
              <span className="font-black text-orange">安全メモ: </span>
              資格が必要な作業や、冷媒・電気・高所が絡む作業は業者へ依頼してください。掃除や目視確認で切り分ける範囲に留めるのが安全です。
            </div>
          ) : null}

          {recommendedProducts.length || symptomSearch || amazonItems.length ? (
            <section className="mt-8 rounded-lg border border-metal-200 bg-paper p-5">
              <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="text-2xl font-black text-navy">症状別おすすめ用品</h2>
                  <p className="mt-2 text-sm font-bold leading-7 text-metal">
                    まずは掃除・確認で済む範囲から。Amazonタグ付きの商品リンクに、商品画像と用途メモを添えています。
                  </p>
                </div>
                <p className="text-xs font-bold text-metal">価格・在庫・レビュー数はAmazonで確認</p>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {amazonItems.map((item) => {
                  const href = item.url ? buildAmazonAffiliateUrl(item.url) : buildAmazonSearchUrl(item.search);
                  const imageUrl = getAmazonItemImageUrl(item);
                  return (
                    <a
                      className="group flex min-h-72 flex-col overflow-hidden rounded-lg border border-metal-200 bg-white transition hover:-translate-y-0.5 hover:border-orange hover:shadow-panel"
                      href={href}
                      key={item.id}
                      onClick={() =>
                        trackAmazonClick({
                          itemId: item.id,
                          itemName: item.title,
                          pageType: "post",
                          linkPosition: "amazon_popular_item",
                        })
                      }
                      rel="sponsored nofollow noopener"
                      target="_blank"
                    >
                      <div className="flex h-36 items-center justify-center border-b border-metal-100 bg-white p-3">
                        {imageUrl ? (
                          <img
                            alt={`${item.title}のAmazon商品画像`}
                            className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.04]"
                            decoding="async"
                            loading="lazy"
                            onError={(event) => {
                              event.currentTarget.style.display = "none";
                            }}
                            src={imageUrl}
                          />
                        ) : (
                          <div className="flex h-full w-full flex-col items-center justify-center rounded bg-paper text-center">
                            <span className="text-xs font-black text-steel">Amazon</span>
                            <span className="mt-1 px-3 text-xs font-bold leading-5 text-metal">人気候補一覧</span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col p-4">
                        <span className="w-fit rounded bg-orange/10 px-2 py-1 text-xs font-black text-orange">
                          {item.label}
                        </span>
                        <p className="mt-3 flex-1 font-black leading-6 text-navy transition group-hover:text-orange">
                          {item.title}
                        </p>
                        <p className="mt-2 text-xs font-bold leading-6 text-metal">{item.note}</p>
                        <span className="mt-3 inline-flex min-h-10 items-center justify-center rounded-lg bg-orange px-3 py-2 text-xs font-black text-white">
                          Amazonで価格・在庫を確認
                        </span>
                      </div>
                    </a>
                  );
                })}
                {recommendedProducts.map((product) => (
                  <a
                    className="group flex min-h-72 flex-col overflow-hidden rounded-lg border border-metal-200 bg-white transition hover:-translate-y-0.5 hover:border-orange hover:shadow-panel"
                    href={getAmazonUrl(product)}
                    key={product.slug}
                    onClick={() =>
                      trackAmazonClick({
                        itemId: product.slug,
                        itemName: product.model,
                        pageType: "post",
                        linkPosition: "recommended_product",
                      })
                    }
                    rel="sponsored nofollow noopener"
                    target="_blank"
                  >
                    <div className="flex h-36 items-center justify-center border-b border-metal-100 bg-white p-3">
                      {getAmazonImageUrl(product) ? (
                        <img
                          alt={`${product.model}のAmazon商品画像`}
                          className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.04]"
                          decoding="async"
                          loading="lazy"
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                          }}
                          src={getAmazonImageUrl(product)}
                        />
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center rounded bg-paper text-center">
                          <span className="text-xs font-black text-steel">Amazon</span>
                          <span className="mt-1 px-3 text-xs font-bold leading-5 text-metal">商品画像確認中</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <p className="text-xs font-black text-steel">Amazonで確認</p>
                      <p className="mt-2 flex-1 font-black text-navy transition group-hover:text-orange">{product.model}</p>
                      <p className="mt-1 text-sm font-bold text-orange">{getDisplayPriceBand(product)}</p>
                      <span className="mt-3 inline-flex min-h-10 items-center justify-center rounded-lg bg-orange px-3 py-2 text-xs font-black text-white">
                        Amazonで価格・在庫を確認
                      </span>
                    </div>
                  </a>
                ))}
                {symptomSearch && amazonItems.length === 0 ? (
                  <a
                    className="rounded-lg border border-orange bg-white p-4 transition hover:bg-orange/5"
                    href={buildAmazonSearchUrl(symptomSearch)}
                    onClick={() =>
                      trackAmazonClick({
                        itemId: post.slug,
                        itemName: symptomSearch,
                        pageType: "post",
                        linkPosition: "symptom_search",
                      })
                    }
                    rel="sponsored nofollow noopener"
                    target="_blank"
                  >
                    <p className="text-xs font-black text-orange">症状別用品</p>
                    <p className="mt-2 font-black text-navy">Amazonで価格・在庫を確認</p>
                    <p className="mt-1 text-sm font-bold leading-6 text-metal">{post.symptomCategory}向けの用品を探す</p>
                  </a>
                ) : null}
              </div>
            </section>
          ) : null}

          {nextPosts.length ? (
            <section className="mt-8 rounded-lg border border-metal-200 bg-white p-5 shadow-panel">
              <h2 className="text-2xl font-black text-navy">次に読む初心者ガイド</h2>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {nextPosts.map((item) => (
                  <a
                    className="rounded-lg border border-metal-200 bg-paper p-4 transition hover:border-orange"
                    href={withBase(`/posts/${item.slug}/`)}
                    key={item.slug}
                    onClick={(event) => {
                      if (!onNavigate) return;
                      event.preventDefault();
                      onNavigate(`/posts/${item.slug}/`);
                    }}
                  >
                    <p className="text-xs font-black text-steel">{item.keyword}</p>
                    <p className="mt-1 font-black text-navy">{item.title}</p>
                  </a>
                ))}
              </div>
            </section>
          ) : null}

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

function stripMarkdownSection(source, headingText) {
  const lines = source.split("\n");
  const result = [];
  let skipping = false;

  for (const line of lines) {
    const heading = line.match(/^(#{2,3})\s+(.+)$/);
    if (heading) {
      if (heading[2].trim() === headingText) {
        skipping = true;
        continue;
      }
      skipping = false;
    }
    if (!skipping) result.push(line);
  }

  return result.join("\n").trim();
}
