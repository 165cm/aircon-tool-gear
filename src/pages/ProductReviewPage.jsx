import Header from "../components/Header.jsx";
import Icon from "../components/Icon.jsx";
import { Button, PageShell, ProductImage, SpecChip } from "../components/Ui.jsx";
import {
  affiliateDisclosure,
  getAmazonUrl,
  getCategory,
  getProduct,
  images,
  reviews,
  tierLabels,
} from "../data/siteData.js";
import { withBase } from "../utils/routes.js";

function RatingBar({ label, value }) {
  return (
    <div className="grid grid-cols-[92px_1fr_32px] items-center gap-3 text-sm font-bold">
      <span className="text-charcoal">{label}</span>
      <span className="h-3 overflow-hidden rounded bg-metal-100">
        <span className="block h-full bg-orange" style={{ width: `${(value / 5) * 100}%` }} />
      </span>
      <span className="text-right text-navy">{value.toFixed(1)}</span>
    </div>
  );
}

export default function ProductReviewPage({ activePage = "products", productSlug = "tasco-ta150sw", onNavigate }) {
  const product = getProduct(productSlug) || getProduct("tasco-ta150sw");
  const category = getCategory(product.category);
  const review = reviews.find((item) => item.toolId === product.slug);

  return (
    <PageShell>
      <Header activePage={activePage} onNavigate={onNavigate} />
      <section className="px-5 py-8 md:py-10 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-lg border border-metal-300 bg-white p-5 shadow-metal md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-black text-steel">
                {category?.label} / {tierLabels[product.tier]}
              </p>
              <h1 className="mt-2 text-2xl font-black leading-tight text-navy sm:text-3xl md:text-5xl">
                {product.model} レビュー
              </h1>
              <p className="mt-3 text-base font-bold leading-8 text-metal">
                {product.brand}「{product.name}」の価格目安、スペック、向いている人、注意点を整理します。
              </p>
            </div>
            <a
              className="cta-sheen inline-flex min-h-12 items-center justify-center rounded-lg bg-orange px-6 py-3 text-sm font-black text-white shadow-cta"
              href={getAmazonUrl(product)}
              rel="sponsored nofollow noopener"
              target="_blank"
            >
              Amazonで価格を確認
            </a>
          </div>

          <div className="mt-7 grid gap-6 lg:grid-cols-[1.05fr_1fr]">
            <div>
              <ProductImage
                alt={`${product.brand} ${product.model} Amazon商品画像`}
                frameClassName="aspect-[4/3] w-full rounded-lg border-metal-200"
                image={images.productSheet}
                position={product.imagePosition}
                product={product}
              />
              <div className="mt-4 grid grid-cols-3 gap-3">
                {[0, 1, 2].map((index) => (
                  <ProductImage
                    alt={`${product.brand} ${product.model} Amazon商品画像 ${index + 1}`}
                    frameClassName="aspect-[4/3] rounded-md border-metal-200"
                    image={images.productSheet}
                    key={`${product.slug}-amazon-image-${index}`}
                    position={product.imagePosition}
                    product={product}
                  />
                ))}
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-[1fr_240px]">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-black text-navy">総合評価</span>
                  <span className="flex text-orange">
                    {[0, 1, 2, 3, 4].map((star) => (
                      <Icon key={star} name="star" size={18} />
                    ))}
                  </span>
                  <span className="text-lg font-black text-navy">{product.rating.toFixed(1)}</span>
                  {product.reviewCount ? (
                    <span className="text-xs font-bold text-metal">レビュー目安 {product.reviewCount}件</span>
                  ) : null}
                </div>
                <div className="mt-4 space-y-3">
                  {Object.entries(review.scores).map(([label, value]) => (
                    <RatingBar key={label} label={label} value={value} />
                  ))}
                </div>
                <div className="mt-5 grid grid-cols-2 gap-2">
                  {product.specs.slice(0, 6).map((spec) => (
                    <SpecChip key={spec} value={spec} />
                  ))}
                </div>
              </div>

              <table className="w-full border-collapse text-sm">
                <tbody>
                  {[
                    ["ブランド", product.brand],
                    ["型番", product.model],
                    ["価格目安", product.priceRange],
                    ["希望小売", product.listPrice],
                    ["カテゴリ", category?.label || "-"],
                    ["向く人", product.targetUser],
                  ].map(([label, value]) => (
                    <tr key={label}>
                      <th className="border border-metal-200 bg-paper px-3 py-2 text-left font-black text-navy">
                        {label}
                      </th>
                      <td className="border border-metal-200 px-3 py-2 font-bold text-charcoal">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-metal-200 bg-paper p-4">
            <p className="font-black text-navy">レビュー要約</p>
            <p className="mt-2 text-sm font-bold leading-7 text-charcoal">{product.reviewSummary}</p>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <ReviewList title="購入メリット" items={product.benefits} mark="check" />
            <ReviewList title="注意点" items={product.cautions} mark="info" />
            <ReviewList title="代替候補" items={product.alternatives} mark="arrow" />
          </div>

          <div className="mt-6 grid gap-4 border-t border-metal-200 pt-5 md:grid-cols-[1fr_360px]">
            <div className="rounded-lg border border-orange/40 bg-orange/5 p-4 text-sm font-bold leading-7 text-charcoal">
              {affiliateDisclosure}
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <a
                className="cta-sheen inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-orange px-6 py-3 text-base font-black text-white shadow-cta"
                href={getAmazonUrl(product)}
                rel="sponsored nofollow noopener"
                target="_blank"
              >
                Amazonで最新価格を見る
              </a>
              <a
                className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-navy px-6 py-3 text-base font-black text-white shadow-metal"
                href={withBase(`/categories/${product.category}/`)}
                onClick={(event) => {
                  if (!onNavigate) return;
                  event.preventDefault();
                  onNavigate(`/categories/${product.category}/`);
                }}
              >
                同カテゴリを比較する
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function ReviewList({ title, items, mark }) {
  return (
    <div className="rounded-lg border border-metal-200 bg-paper p-4">
      <p className="font-black text-navy">{title}</p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li className="flex gap-2 text-sm font-bold leading-6 text-charcoal" key={item}>
            <Icon className="mt-1 shrink-0 text-steel" name={mark} size={15} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
