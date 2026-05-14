import Header from "../components/Header.jsx";
import { Button, PageShell, RankingCard, SectionTitle } from "../components/Ui.jsx";
import { affiliateDisclosure, rankings } from "../data/siteData.js";

export default function RankingPage({ activePage = "ranking", onNavigate }) {
  return (
    <PageShell>
      <Header activePage={activePage} onNavigate={onNavigate} />
      <section className="px-5 py-8 md:py-10 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-lg border border-metal-300 bg-white p-5 shadow-metal md:p-8">
          <SectionTitle
            description="家庭用1台のDIYや不調確認で、買いすぎを避けながら最初に検討しやすい工具を並べました。"
            title="初心者がまず見る工具 TOP5"
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {rankings.map((tool) => (
              <RankingCard key={tool.id} onNavigate={onNavigate} tool={tool} />
            ))}
          </div>
          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-metal-200 pt-6 md:flex-row">
            <p className="max-w-2xl text-sm font-bold leading-7 text-metal">
              価格だけでなく、扱いやすさ、作業範囲、資格者へ任せる境界線を基準にすると、初心者の買いすぎと危険作業を避けやすくなります。
            </p>
            <Button className="min-w-60" onClick={() => onNavigate?.("comparison")} variant="dark">
              比較表を見る
            </Button>
          </div>
          <p className="mt-5 rounded-lg border border-orange/30 bg-orange/5 p-4 text-sm font-bold leading-7 text-charcoal">
            {affiliateDisclosure}
          </p>
        </div>
      </section>
    </PageShell>
  );
}
