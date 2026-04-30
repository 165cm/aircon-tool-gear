import Header from "../components/Header.jsx";
import Icon from "../components/Icon.jsx";
import { Button, PageShell, ProductImage } from "../components/Ui.jsx";
import { affiliateDisclosure, productComparisonRows } from "../data/siteData.js";
import { withBase } from "../utils/routes.js";

const headers = ["工具", "価格", "重量", "対応冷媒", "精度 / 性能", "初心者向け", "プロ向け", "総合評価"];

export default function ComparisonPage({ activePage = "comparison", onNavigate }) {
  return (
    <PageShell>
      <Header activePage={activePage} onNavigate={onNavigate} />
      <section className="px-5 py-8 md:py-10 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-lg border border-metal-300 bg-white p-5 shadow-metal md:p-8">
          <h1 className="text-center text-3xl font-black text-navy md:text-5xl">
            安さだけで選ばない工具比較
          </h1>
          <p className="mt-3 text-center text-sm font-bold text-metal">
            価格、性能、使いやすさを総合的に比較しました。
          </p>

          <div className="mt-8 overflow-hidden rounded-lg border border-metal-300 bg-white shadow-panel">
            <div className="overflow-x-auto">
              <table className="min-w-[980px] w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-navy text-white">
                    {headers.map((header) => (
                      <th className="border border-white/15 px-4 py-4 text-center font-black" key={header}>
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {productComparisonRows.map((row) => (
                    <tr
                      className={row.recommended ? "recommended-row bg-orange/10" : "odd:bg-white even:bg-paper"}
                      key={row.name}
                    >
                      <td className="relative border border-metal-200 px-3 py-3 font-black text-navy md:px-4 md:py-4">
                        {row.recommended ? (
                          <span className="absolute left-2 top-2 rounded bg-orange px-2 py-1 text-[10px] text-white">
                            おすすめ
                          </span>
                        ) : null}
                        <a className="flex items-center gap-3 pt-5 hover:text-orange" href={withBase(row.path)}>
                          <ProductImage
                            frameClassName="size-14 shrink-0"
                            image={row.image}
                            position={row.imagePosition}
                          />
                          {row.name}
                        </a>
                      </td>
                      <td className="border border-metal-200 px-4 py-4 text-center font-bold">{row.price}</td>
                      <td className="border border-metal-200 px-4 py-4 text-center font-bold">{row.weight}</td>
                      <td className="border border-metal-200 px-4 py-4 text-center font-bold leading-6">
                        {row.refrigerants}
                      </td>
                      <td className="border border-metal-200 px-4 py-4 text-center font-bold leading-6">
                        {row.performance}
                      </td>
                      <td className="border border-metal-200 px-4 py-4 text-center text-xl font-black text-navy">
                        {row.beginner}
                      </td>
                      <td className="border border-metal-200 px-4 py-4 text-center text-xl font-black text-navy">
                        {row.pro}
                      </td>
                      <td className="border border-metal-200 px-4 py-4 text-center">
                        <p className="text-2xl font-black text-navy">{row.rating}</p>
                        <p className="mt-1 inline-flex text-orange">
                          {[0, 1, 2, 3, 4].map((star) => (
                            <Icon key={star} name="star" size={15} />
                          ))}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-5 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <p className="text-sm font-bold leading-7 text-metal">
              ◎: 非常におすすめ　○: おすすめ　△: 用途による　×: おすすめしない
            </p>
            <Button className="min-w-72" icon="download" onClick={() => onNavigate?.("ranking")} variant="dark">
              比較表をダウンロード（PDF）
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
