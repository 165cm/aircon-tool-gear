import Header from "../components/Header.jsx";
import {
  Button,
  ComparisonTable,
  LevelCard,
  PageShell,
  RankingCard,
  SectionTitle,
  TrustStrip,
} from "../components/Ui.jsx";
import Icon from "../components/Icon.jsx";
import { categories, comparisonRows, images, rankings } from "../data/siteData.js";

export default function HomePage({ activePage = "home", onNavigate }) {
  const topRankings = rankings.slice(0, 5);

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
              現場で信頼される職人へ。
              <br />
              エアコン修理工具の選び方
            </h1>
            <p className="mt-6 max-w-2xl text-base font-bold leading-8 text-white/90 md:text-xl md:leading-9">
              初心者の最初の一式から、プロ志向の買い替えまで。失敗しない工具選びを現場目線で解説。
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Button className="cta-sheen min-w-64 text-base" onClick={() => onNavigate?.("ranking")}>
                おすすめ工具を見る
              </Button>
              <Button
                className="min-w-56 text-base"
                onClick={() => onNavigate?.("beginner")}
                variant="outline"
              >
                レベル別に選ぶ
              </Button>
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />

      <section className="border-b border-metal-100 bg-paper px-5 py-10 md:py-12 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
          {categories.map((category) => (
            <LevelCard category={category} key={category.id} onNavigate={onNavigate} />
          ))}
        </div>
      </section>

      <section className="bg-white px-5 py-10 md:py-14 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle title="まず揃えるべき 必須工具 TOP5" />
          <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {topRankings.map((tool) => (
              <RankingCard key={tool.id} onNavigate={onNavigate} tool={tool} />
            ))}
          </div>
          <p className="mt-5 text-center text-sm font-bold leading-7 text-metal">
            ※ランキングは用途の汎用性・信頼性・コストパフォーマンスを総合的に評価しています。
          </p>
        </div>
      </section>

      <section className="border-y border-metal-100 bg-paper px-5 py-12 md:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle title="安さだけで選ばない。現場で見るべき比較ポイント" />
          <div className="mt-8">
            <ComparisonTable rows={comparisonRows} />
          </div>
          <div className="mx-auto mt-5 flex max-w-4xl items-start justify-center gap-3 text-sm font-bold leading-7 text-metal">
            <Icon className="mt-1 shrink-0 text-steel" name="info" size={18} />
            <p>
              工具は「安さ」よりも「精度・耐久性・安全性」で選ぶことが、結果的にトラブルを減らし信頼につながります。
            </p>
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
              道具選びは、作業の精度と信頼を変える。
            </h2>
            <p className="mt-4 max-w-2xl text-base font-bold leading-8 text-white/85">
              正しい道具は、作業効率を上げ、トラブルを減らし、お客様の信頼にもつながります。現場目線で本当に使える工具を厳選して紹介します。
            </p>
            <Button className="cta-sheen mt-8 min-w-72 text-base" onClick={() => onNavigate?.("ranking")}>
              道具ランキングを見る
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
