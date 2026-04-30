import Header from "../components/Header.jsx";
import Icon from "../components/Icon.jsx";
import { Button, PageShell, SpecChip } from "../components/Ui.jsx";
import { affiliateDisclosure, getProduct, images, starterKits } from "../data/siteData.js";
import { withBase } from "../utils/routes.js";

const checklist = [
  "真空ポンプ",
  "ゲージマニホールド",
  "トルクレンチ",
  "フレアツール",
  "チャージホース",
  "パイプカッター",
  "バリ取りリーマー",
  "リーク確認用品",
];

export default function BeginnerPage({ activePage = "beginner-kit", kitSlug, onNavigate }) {
  const selectedKit =
    starterKits.find((kit) => kit.courseSlug === kitSlug || kit.slug === kitSlug) ||
    starterKits.find((kit) => kit.recommended) ||
    starterKits[0];
  const selectedProducts = selectedKit.productSlugs.map(getProduct).filter(Boolean);
  const pageTitle = kitSlug
    ? `${selectedKit.courseLabel}で揃えるエアコン工具`
    : "最初の一式は、失敗しない基準で選ぶ。";

  return (
    <PageShell>
      <Header activePage={activePage} onNavigate={onNavigate} />
      <section className="px-5 py-8 md:py-10 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-lg border border-metal-300 bg-white shadow-metal">
          <div className="border-b border-metal-200 px-5 py-5 md:px-8">
            <span className="inline-flex rounded-md bg-steel px-4 py-2 text-sm font-black text-white">
              初心者セット
            </span>
            <h1 className="mt-4 text-3xl font-black leading-tight text-navy md:text-5xl">
              {pageTitle}
            </h1>
            <p className="mt-3 max-w-4xl text-sm font-bold leading-7 text-metal md:text-base">
              添付ラインナップを元に、DIY・副業継続・独立志望の3段階で必要工具を整理しました。最初から完璧を狙うより、買い直しが少ないミドル構成を軸に考えるのがおすすめです。
            </p>
          </div>

          <div className="grid gap-6 p-5 md:p-8 lg:grid-cols-[340px_1fr]">
            <aside>
              <div className="grid overflow-hidden rounded-lg border border-metal-300">
                {starterKits.map((kit) => (
                  <a
                    className={`border-b border-metal-200 p-4 transition last:border-b-0 hover:bg-steel/10 ${
                      kit.slug === selectedKit.slug ? "bg-steel text-white" : "bg-white text-navy"
                    }`}
                    href={withBase(`/beginner-kit/${kit.courseSlug}/`)}
                    key={kit.slug}
                    onClick={(event) => {
                      if (!onNavigate) return;
                      event.preventDefault();
                      onNavigate(`/beginner-kit/${kit.courseSlug}/`);
                    }}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-black">{kit.courseLabel}</p>
                      <span className={`rounded px-2 py-0.5 text-[10px] font-black ${
                        kit.slug === selectedKit.slug ? "bg-white/15 text-white" : "bg-paper text-steel"
                      }`}>
                        {kit.budgetLabel}
                      </span>
                    </div>
                    <p className={`mt-1 text-xs font-bold ${kit.slug === selectedKit.slug ? "text-white/75" : "text-metal"}`}>
                      {kit.title}
                    </p>
                    <p className={`mt-2 text-lg font-black ${kit.slug === selectedKit.slug ? "text-white" : "text-orange"}`}>
                      {kit.price}
                    </p>
                  </a>
                ))}
              </div>

              <div className="mt-5 rounded-lg border border-metal-200 bg-paper p-4">
                <p className="text-sm font-black text-steel">最低限チェックする工具</p>
                <ul className="mt-4 space-y-3">
                  {checklist.map((item) => (
                    <li className="flex items-center gap-2 text-sm font-bold text-charcoal" key={item}>
                      <span className="inline-flex size-5 items-center justify-center rounded-full bg-steel text-white">
                        <Icon name="check" size={13} strokeWidth={3} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <article className="rounded-lg border border-metal-200 bg-white p-4 shadow-panel">
              <div className="grid gap-5 lg:grid-cols-[1fr_280px]">
                <div>
                  <p className="text-sm font-black text-navy">
                    選択中: {selectedKit.courseLabel} / {selectedKit.budgetLabel}
                  </p>
                  <img
                    alt=""
                    className="mt-4 aspect-[16/9] w-full rounded-md border border-metal-200 object-cover"
                    src={images.beginnerKit}
                  />
                </div>
                <div className="flex flex-col justify-end">
                  <div className="grid grid-cols-2 gap-2">
                    {selectedProducts.slice(0, 4).map((product) => (
                      <SpecChip key={product.slug} label={product.model} value={product.priceRange} />
                    ))}
                  </div>
                  <div className="mt-5 border-t border-metal-200 pt-4">
                    <p className="text-xs font-black text-metal">セット価格の目安</p>
                    <p className="mt-1 text-3xl font-black text-navy">{selectedKit.price}</p>
                    <p className="mt-2 text-sm font-bold leading-6 text-metal">{selectedKit.note}</p>
                    <Button className="cta-sheen mt-4 w-full" onClick={() => onNavigate?.("ranking")}>
                      セットの詳細を見る
                    </Button>
                  </div>
                </div>
              </div>
            </article>
          </div>

          <div className="grid border-t border-metal-200 md:grid-cols-3">
            {starterKits.map((kit) => (
              <div className="border-metal-200 p-5 md:border-l first:md:border-l-0" key={kit.slug}>
                <p className="font-black text-navy">{kit.courseLabel}</p>
                <p className="mt-1 text-xs font-black text-orange">{kit.budgetLabel}</p>
                <p className="mt-1 text-sm font-bold leading-6 text-metal">{kit.title}</p>
                <ul className="mt-3 space-y-2">
                  {kit.productSlugs.slice(0, 4).map((slug) => {
                    const product = getProduct(slug);
                    return (
                      <li className="flex gap-2 text-xs font-bold leading-5 text-charcoal" key={slug}>
                        <Icon className="mt-0.5 shrink-0 text-steel" name="check" size={13} />
                        {product?.model}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
          <p className="border-t border-metal-200 bg-orange/5 p-5 text-sm font-bold leading-7 text-charcoal">
            {affiliateDisclosure}
          </p>
        </div>
      </section>
    </PageShell>
  );
}
