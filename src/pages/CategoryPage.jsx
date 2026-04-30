import Header from "../components/Header.jsx";
import Icon from "../components/Icon.jsx";
import { Button, PageShell, ProductImage, SectionTitle, SpecChip } from "../components/Ui.jsx";
import { categoryMeta, getAmazonUrl, getCategory, getProductsByCategory, images, tierLabels } from "../data/siteData.js";
import { withBase } from "../utils/routes.js";

export default function CategoryPage({ activePage = "vacuum-pump", categorySlug = "vacuum-pump", onNavigate }) {
  const category = getCategory(categorySlug) || categoryMeta[0];
  const products = getProductsByCategory(category.slug);

  return (
    <PageShell>
      <Header activePage={activePage} onNavigate={onNavigate} />
      <section className="px-5 py-8 md:py-10 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-lg border border-metal-300 bg-white p-5 shadow-metal md:p-8">
          <SectionTitle
            description={`${category.summary} エントリー・ミドル・プロの3価格帯を、型番と現場用途で比較します。`}
            title={`${category.label}おすすめ比較`}
          />

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {products.map((product) => (
              <article
                className="animate-fade-up group rounded-lg border border-metal-200 bg-white p-4 shadow-panel transition duration-300 hover:-translate-y-1 hover:shadow-metal"
                key={product.slug}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="rounded bg-steel px-3 py-1 text-xs font-black text-white">
                      {tierLabels[product.tier]}
                    </span>
                    <h2 className="mt-3 text-xl font-black leading-tight text-navy">{product.model}</h2>
                    <p className="mt-1 text-sm font-bold text-metal">{product.brand}</p>
                  </div>
                  <p className="text-right text-sm font-black text-orange">{product.priceRange}</p>
                </div>
                <ProductImage
                  frameClassName="mx-auto mt-4 aspect-[4/2.7] w-full"
                  image={images.productSheet}
                  position={product.imagePosition}
                />
                <p className="mt-4 min-h-24 text-sm font-bold leading-7 text-charcoal">{product.summary}</p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {product.specs.slice(0, 4).map((spec) => (
                    <SpecChip key={spec} value={spec} />
                  ))}
                </div>
                <div className="mt-4 rounded-md bg-paper p-3 text-xs font-bold leading-6 text-metal">
                  向いている人: {product.targetUser}
                </div>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  <a
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-navy px-4 py-2 text-sm font-black text-white transition hover:-translate-y-0.5"
                    href={withBase(`/products/${product.slug}/`)}
                    onClick={(event) => {
                      if (!onNavigate) return;
                      event.preventDefault();
                      onNavigate(`/products/${product.slug}/`);
                    }}
                  >
                    詳細レビュー
                    <Icon name="arrow" size={16} />
                  </a>
                  <a
                    className="inline-flex min-h-11 items-center justify-center rounded-lg border border-orange px-4 py-2 text-sm font-black text-orange transition hover:bg-orange hover:text-white"
                    href={getAmazonUrl(product)}
                    rel="sponsored nofollow noopener"
                    target="_blank"
                  >
                    Amazonで確認
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-lg border border-metal-200 bg-paper p-5 md:flex-row md:items-center">
            <p className="text-sm font-bold leading-7 text-metal">
              価格は調査時点の目安です。購入前に型番、対応冷媒、在庫、販売元をAmazonとメーカー公式情報で確認してください。
            </p>
            <Button className="min-w-64" onClick={() => onNavigate?.("comparison")} variant="dark">
              全商品比較表を見る
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

