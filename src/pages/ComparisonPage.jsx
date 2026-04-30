import Header from "../components/Header.jsx";
import Icon from "../components/Icon.jsx";
import { Button, PageShell, ProductImage } from "../components/Ui.jsx";
import { affiliateDisclosure, categoryMeta, productComparisonRows } from "../data/siteData.js";
import { withBase } from "../utils/routes.js";

const headers = ["工具", "価格", "重量", "対応冷媒", "精度 / 性能", "初心者向け", "プロ向け", "総合評価"];

function RatingStars({ value, size = 15 }) {
  const rating = Number(value) || 0;
  const width = `${Math.max(0, Math.min(5, rating)) * 20}%`;
  const stars = [0, 1, 2, 3, 4];

  return (
    <span aria-label={`総合評価 ${rating.toFixed(1)}`} className="relative inline-flex">
      <span className="flex text-metal-200">
        {stars.map((star) => (
          <Icon className="shrink-0" fill="currentColor" key={`base-${star}`} name="star" size={size} strokeWidth={1.4} />
        ))}
      </span>
      <span className="absolute inset-y-0 left-0 flex overflow-hidden text-orange" style={{ width }}>
        {stars.map((star) => (
          <Icon className="shrink-0" fill="currentColor" key={`filled-${star}`} name="star" size={size} strokeWidth={1.4} />
        ))}
      </span>
    </span>
  );
}

export default function ComparisonPage({ activePage = "comparison", onNavigate }) {
  const groupedRows = categoryMeta
    .map((category) => ({
      ...category,
      rows: productComparisonRows.filter((row) => row.product.category === category.slug),
    }))
    .filter((category) => category.rows.length);

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

          <div className="mt-8 space-y-8">
            {groupedRows.map((category) => (
              <section className="overflow-hidden rounded-lg border border-metal-300 bg-white shadow-panel" key={category.slug}>
                <div className="border-b border-metal-200 bg-paper px-5 py-4 md:px-6">
                  <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.14em] text-steel">Category</p>
                      <h2 className="mt-1 text-2xl font-black text-navy">{category.label}</h2>
                    </div>
                    <p className="max-w-2xl text-sm font-bold leading-7 text-metal">{category.summary}</p>
                  </div>
                </div>
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
                      {category.rows.map((row) => (
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
                            <div className="flex items-center gap-3 pt-5">
                              <ProductImage
                                frameClassName="size-14 shrink-0"
                                image={row.image}
                                linkImage={false}
                                noImageCompact
                                position={row.imagePosition}
                                product={row.product}
                              />
                              <a
                                className="transition hover:text-orange hover:underline"
                                href={withBase(row.path)}
                                onClick={(event) => {
                                  if (!onNavigate) return;
                                  event.preventDefault();
                                  onNavigate(row.path);
                                }}
                              >
                                {row.name}
                              </a>
                            </div>
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
                            <p className="mt-1 inline-flex">
                              <RatingStars value={row.rating} />
                            </p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            ))}
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
