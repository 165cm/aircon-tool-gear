import Header from "../components/Header.jsx";
import { Button, ComparisonTable, LevelCard, PageShell, SectionTitle, TrustStrip } from "../components/Ui.jsx";
import Icon from "../components/Icon.jsx";
import {
  beginnerBestBuys,
  beginnerComparisonRows,
  beginnerSymptoms,
  buildAmazonSearchUrl,
  categories,
  images,
} from "../data/siteData.js";
import { trackAmazonClick } from "../utils/analytics.js";
import { withBase } from "../utils/routes.js";

export default function HomePage({ activePage = "home", onNavigate }) {
  return (
    <PageShell>
      <Header activePage={activePage} onNavigate={onNavigate} />

      <section className="relative isolate min-h-[590px] overflow-hidden bg-navy text-white md:min-h-[640px] lg:min-h-[620px]">
        <img
          alt=""
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
          decoding="async"
          fetchPriority="high"
          loading="eager"
          src={images.heroTools}
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(3,13,22,0.94)_0%,rgba(5,18,29,0.82)_36%,rgba(7,20,31,0.34)_68%,rgba(7,20,31,0.18)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-navy/85 to-transparent" />

        <div className="mx-auto flex min-h-[calc(590px-80px)] max-w-7xl items-center px-5 py-16 md:min-h-[calc(640px-80px)] lg:min-h-[calc(620px-80px)] lg:px-8">
          <div className="max-w-3xl animate-fade-up">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-orange md:text-base">
              Aircon Tool Gear
            </p>
            <h1 className="mt-5 text-4xl font-black leading-tight tracking-normal md:text-6xl lg:text-[4.15rem]">
              業者を呼ぶ前に確認。
              <br />
              初心者のエアコン工具選び
            </h1>
            <p className="mt-6 max-w-2xl text-base font-bold leading-8 text-white/90 md:text-xl md:leading-9">
              冷えない、水漏れ、臭い、リモコン不調。まず自分で確認できる範囲を切り分け、必要な用品と最初の1台に必要な道具だけを選べます。
            </p>
            <div className="mt-9 grid gap-3 sm:grid-cols-3">
              <a
                className="cta-sheen inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-orange px-5 py-3 text-sm font-black text-white shadow-cta transition hover:-translate-y-0.5"
                href="#symptoms"
              >
                症状から探す
                <Icon name="arrow" size={18} />
              </a>
              <Button className="min-w-0 text-sm" onClick={() => onNavigate?.("beginner-kit")} variant="steel">
                初心者工具セット
              </Button>
              <Button
                className="min-w-0 text-sm"
                onClick={() => onNavigate?.("/posts/vacuum-pump-first-choice/")}
                variant="outline"
              >
                真空引きの基礎
              </Button>
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />

      <section id="symptoms" className="border-b border-metal-100 bg-paper px-5 py-10 md:py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            description="いきなり工具を買う前に、まずは症状から原因候補と自分で見られる範囲を確認します。"
            title="症状から探す"
          />
          <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {beginnerSymptoms.map((symptom) => (
              <a
                className="group rounded-lg border border-metal-200 bg-white p-5 shadow-panel transition duration-300 hover:-translate-y-1 hover:border-orange hover:shadow-metal"
                href={withBase(symptom.path)}
                key={symptom.id}
                onClick={(event) => {
                  if (!onNavigate) return;
                  event.preventDefault();
                  onNavigate(symptom.path);
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-xl font-black leading-tight text-navy">{symptom.title}</h2>
                  <Icon className="shrink-0 text-metal transition group-hover:text-orange" name="arrow" size={18} />
                </div>
                <p className="mt-3 text-sm font-bold leading-7 text-charcoal">{symptom.text}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {symptom.items.map((item) => (
                    <span className="rounded bg-paper px-2 py-1 text-xs font-black text-steel" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-10 md:py-14 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            description="最初に買うなら、作業範囲がはっきりしていて無駄になりにくいものから。価格は変動するため購入前にAmazonで確認してください。"
            title="初心者向け 今月のベストバイ"
          />
          <div className="mt-7 grid gap-4 lg:grid-cols-3">
            {beginnerBestBuys.map((item) => (
              <article className="rounded-lg border border-metal-200 bg-white p-5 shadow-panel" key={item.id}>
                <span className="rounded bg-steel px-3 py-1 text-xs font-black text-white">{item.label}</span>
                <h2 className="mt-3 text-2xl font-black leading-tight text-navy">{item.title}</h2>
                <p className="mt-2 text-sm font-black text-orange">{item.priceBand}</p>
                <p className="mt-3 min-h-20 text-sm font-bold leading-7 text-charcoal">{item.text}</p>
                {item.amazonSearch ? (
                  <a
                    className="cta-sheen mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-orange px-4 py-3 text-sm font-black text-white shadow-cta"
                    href={buildAmazonSearchUrl(item.amazonSearch)}
                    onClick={() =>
                      trackAmazonClick({
                        itemId: item.id,
                        itemName: item.title,
                        pageType: "home",
                        linkPosition: "best_buy",
                      })
                    }
                    rel="sponsored nofollow noopener"
                    target="_blank"
                  >
                    {item.cta}
                  </a>
                ) : (
                  <a
                    className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-navy px-4 py-3 text-sm font-black text-white shadow-metal transition hover:-translate-y-0.5"
                    href={withBase(item.path)}
                    onClick={(event) => {
                      if (!onNavigate) return;
                      event.preventDefault();
                      onNavigate(item.path);
                    }}
                  >
                    {item.cta}
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-metal-100 bg-paper px-5 py-12 md:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            description="工具名からではなく、やりたい作業から選ぶと買いすぎを防げます。"
            title="初心者は用途から選ぶ"
          />
          <div className="mt-8">
            <ComparisonTable
              headers={["用途", "おすすめ", "価格帯", "注意点"]}
              rows={beginnerComparisonRows.slice(0, 4).map((row) => [row.useCase, row.recommendation, row.priceBand, row.safety])}
            />
          </div>
          <div className="mx-auto mt-5 flex max-w-4xl items-start justify-center gap-3 text-sm font-bold leading-7 text-metal">
            <Icon className="mt-1 shrink-0 text-steel" name="info" size={18} />
            <p>
              電気工事、冷媒充填、冷媒回収、高所作業は初心者のDIY範囲から外してください。無理な場合は業者へ相談する判断も、失敗しない工具選びの一部です。
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-10 md:py-14 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            description="DIYを続ける、副業にする、プロ装備へ進む場合の追加候補です。初回は必要になってからで十分です。"
            title="副業・プロ志向の次ステップ"
          />
          <div className="mt-7 grid gap-6 lg:grid-cols-3">
            {categories.map((category) => (
              <LevelCard category={category} key={category.id} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-metal-100 bg-paper px-5 py-12 md:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <SectionTitle title="初心者のよくある不安" />
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {[
              ["真空引きしないとどうなる?", "水分や空気が残ると効きの悪さや故障リスクにつながります。自分で取付するなら真空ポンプとゲージの基礎を先に確認します。"],
              ["資格は必要?", "コンセント増設、専用回路、電気工事は資格者のみです。掃除やドレン出口確認など、無資格でできる範囲から切り分けます。"],
              ["価格はどこを見ればいい?", "Amazon価格は変動するため、サイトでは価格帯で判断し、購入直前に価格・在庫・販売元を確認します。"],
              ["プロ工具は最初から必要?", "家庭用1台なら過剰な工具も多いです。まずは初心者向け工具で作業範囲を絞り、施工台数が増えたら更新します。"],
            ].map(([question, answer]) => (
              <div className="rounded-lg border border-metal-200 bg-white p-5 shadow-panel" key={question}>
                <h2 className="text-lg font-black text-navy">{question}</h2>
                <p className="mt-2 text-sm font-bold leading-7 text-charcoal">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-navy px-5 py-12 text-white md:py-16 lg:px-8">
        <img
          alt=""
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-70"
          decoding="async"
          loading="lazy"
          src={images.ctaTools}
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(3,13,22,0.96)_0%,rgba(5,18,29,0.9)_42%,rgba(7,20,31,0.38)_100%)]" />
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-black leading-tight md:text-5xl">
              まずは「自分で見ていい範囲」を決める。
            </h2>
            <p className="mt-4 max-w-2xl text-base font-bold leading-8 text-white/85">
              掃除で済む不調もあれば、冷媒や電気工事のように業者へ任せるべき作業もあります。症状から切り分けて、必要な用品だけを選びましょう。
            </p>
            <Button className="cta-sheen mt-8 min-w-72 text-base" onClick={() => onNavigate?.("guide")}>
              症状別の記事を見る
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
