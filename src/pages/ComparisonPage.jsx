import Header from "../components/Header.jsx";
import Icon from "../components/Icon.jsx";
import { Button, PageShell } from "../components/Ui.jsx";
import { affiliateDisclosure, beginnerComparisonRows, buildAmazonSearchUrl, getAmazonUrl } from "../data/siteData.js";
import { trackAmazonClick } from "../utils/analytics.js";
import { withBase } from "../utils/routes.js";

const headers = ["用途", "おすすめ", "価格帯", "初心者の扱いやすさ", "失敗しにくさ", "Amazon確認"];

export default function ComparisonPage({ activePage = "comparison", onNavigate }) {
  const beginnerRows = beginnerComparisonRows.filter((row) => row.tier === "beginner");
  const nextRows = beginnerComparisonRows.filter((row) => row.tier === "next");

  return (
    <PageShell>
      <Header activePage={activePage} onNavigate={onNavigate} />
      <section className="px-5 py-8 md:py-10 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-lg border border-metal-300 bg-white p-5 shadow-metal md:p-8">
          <h1 className="text-center text-3xl font-black text-navy md:text-5xl">
            初心者のための用途別比較表
          </h1>
          <p className="mx-auto mt-3 max-w-3xl text-center text-sm font-bold leading-7 text-metal">
            型番スペックの前に、まず「何をしたいか」で選びます。家庭用1台、掃除だけ、水漏れ確認、真空引きまでの範囲を分けると買いすぎを防げます。
          </p>

          <BeginnerTable rows={beginnerRows} onNavigate={onNavigate} />

          <section className="mt-8 rounded-lg border border-metal-200 bg-paper p-5">
            <div className="flex items-start gap-3">
              <Icon className="mt-1 shrink-0 text-orange" name="shield" size={22} />
              <div>
                <h2 className="text-xl font-black text-navy">初心者が触らない方がいい作業</h2>
                <p className="mt-2 text-sm font-bold leading-7 text-charcoal">
                  専用回路やコンセントの電気工事、冷媒充填、冷媒回収、屋根上・壁面架台の高所作業は業者へ依頼してください。工具を買う前に、作業範囲を安全側に区切ることが大切です。
                </p>
              </div>
            </div>
          </section>

          <section className="mt-8 overflow-hidden rounded-lg border border-metal-300 bg-white shadow-panel">
            <div className="border-b border-metal-200 bg-navy px-5 py-4 text-white">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-orange">Next Step</p>
              <h2 className="mt-1 text-2xl font-black">副業以上になったら検討</h2>
            </div>
            <div className="p-5">
              {nextRows.map((row) => (
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between" key={row.useCase}>
                  <div>
                    <p className="font-black text-navy">{row.useCase}</p>
                    <p className="mt-1 text-sm font-bold leading-7 text-charcoal">
                      {row.recommendation}。{row.safety}
                    </p>
                  </div>
                  <a
                    className="inline-flex min-h-12 items-center justify-center rounded-lg bg-navy px-5 py-3 text-sm font-black text-white shadow-metal"
                    href={withBase(row.path)}
                    onClick={(event) => {
                      if (!onNavigate) return;
                      event.preventDefault();
                      onNavigate(row.path);
                    }}
                  >
                    詳しく比較する
                  </a>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-5 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <p className="text-sm font-bold leading-7 text-metal">
              価格は固定表示ではなく価格帯の目安です。購入前にAmazonで価格・在庫・販売元・対応型番を確認してください。
            </p>
            <Button className="min-w-64" onClick={() => onNavigate?.("beginner-kit")} variant="dark">
              初心者セットを見る
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

function BeginnerTable({ rows, onNavigate }) {
  return (
    <div className="mt-8 overflow-hidden rounded-lg border border-metal-300 bg-white shadow-panel">
      <div className="overflow-x-auto">
        <table className="min-w-[980px] w-full border-collapse text-sm">
          <thead>
            <tr className="bg-steel text-white">
              {headers.map((header) => (
                <th className="border border-white/15 px-4 py-4 text-center font-black" key={header}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const href = row.product ? getAmazonUrl(row.product) : buildAmazonSearchUrl(row.amazonSearch);
              return (
                <tr className="odd:bg-white even:bg-paper" key={row.useCase}>
                  <td className="border border-metal-200 px-4 py-4 font-black leading-7 text-navy">{row.useCase}</td>
                  <td className="border border-metal-200 px-4 py-4 font-bold leading-7">
                    {row.path ? (
                      <a
                        className="text-steel underline-offset-4 hover:text-orange hover:underline"
                        href={withBase(row.path)}
                        onClick={(event) => {
                          if (!onNavigate) return;
                          event.preventDefault();
                          onNavigate(row.path);
                        }}
                      >
                        {row.recommendation}
                      </a>
                    ) : (
                      row.recommendation
                    )}
                  </td>
                  <td className="border border-metal-200 px-4 py-4 text-center font-black text-orange">
                    {row.priceBand}
                  </td>
                  <td className="border border-metal-200 px-4 py-4 font-bold leading-7 text-charcoal">{row.ease}</td>
                  <td className="border border-metal-200 px-4 py-4 font-bold leading-7 text-charcoal">{row.safety}</td>
                  <td className="border border-metal-200 px-4 py-4 text-center">
                    <a
                      className="cta-sheen inline-flex min-h-11 items-center justify-center rounded-lg bg-orange px-4 py-2 text-xs font-black text-white shadow-cta"
                      href={href}
                      onClick={() =>
                        trackAmazonClick({
                          itemId: row.product?.slug || row.useCase,
                          itemName: row.recommendation,
                          pageType: "comparison",
                          linkPosition: "beginner_table",
                        })
                      }
                      rel="sponsored nofollow noopener"
                      target="_blank"
                    >
                      価格・在庫を確認
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
