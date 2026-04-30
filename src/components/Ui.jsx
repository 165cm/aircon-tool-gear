import Icon from "./Icon.jsx";
import { getAmazonImageUrl, trustItems } from "../data/siteData.js";
import { withBase } from "../utils/routes.js";

export function Button({ children, icon = "arrow", variant = "primary", className = "", ...props }) {
  const variants = {
    primary: "bg-orange text-white shadow-cta hover:bg-orange-500",
    dark: "bg-navy text-white shadow-metal hover:bg-navy-800",
    outline: "border border-white/70 bg-transparent text-white hover:bg-white/10",
    steel: "bg-steel text-white shadow-steel hover:bg-steel-700",
  };

  return (
    <button
      className={`inline-flex min-h-12 items-center justify-center gap-3 rounded-lg px-5 py-3 text-sm font-black transition duration-300 hover:-translate-y-0.5 active:translate-y-0 sm:px-6 ${variants[variant]} ${className}`}
      type="button"
      {...props}
    >
      {children}
      {icon ? <Icon name={icon} size={18} /> : null}
    </button>
  );
}

export function SectionTitle({ eyebrow, title, description, align = "center" }) {
  return (
    <div className={align === "left" ? "text-left" : "text-center"}>
      {eyebrow ? (
        <p className="text-sm font-black uppercase tracking-[0.14em] text-steel">{eyebrow}</p>
      ) : null}
      <h2 className="mt-2 text-3xl font-black tracking-normal text-navy md:text-5xl">{title}</h2>
      {description ? (
        <p className="mx-auto mt-3 max-w-3xl text-base leading-8 text-metal">{description}</p>
      ) : null}
    </div>
  );
}

export function TrustStrip({ items = trustItems }) {
  return (
    <div className="bg-navy text-white">
      <div className="mx-auto grid max-w-7xl divide-y divide-white/15 px-5 md:grid-cols-3 md:divide-x md:divide-y-0 lg:px-8">
        {items.map((item) => (
          <div className="animate-fade-up flex items-center justify-center gap-5 py-7" key={item.title}>
            <Icon className="shrink-0 text-white" name={item.icon} size={46} strokeWidth={1.8} />
            <div>
              <p className="text-xl font-black">{item.title}</p>
              <p className="mt-1 text-sm font-bold text-white/70">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LevelCard({ category, onNavigate }) {
  const go = (event) => {
    if (!onNavigate) return;
    event.preventDefault();
    onNavigate(category.id);
  };

  return (
    <article className="animate-fade-up group rounded-lg border border-metal-200 bg-white p-4 shadow-panel transition duration-300 hover:-translate-y-1 hover:shadow-metal">
      <div className="p-2 text-center">
        <span className="inline-flex rounded bg-steel px-3 py-1 text-xs font-black text-white">
          {category.level}
        </span>
        <h3 className="mt-3 text-2xl font-black leading-tight text-navy">{category.title}</h3>
      </div>
      <img
        alt=""
        className="mt-4 aspect-[4/2.5] w-full rounded-md border border-metal-100 object-cover transition duration-500 group-hover:scale-[1.015]"
        src={category.image}
      />
      <ul className="mt-5 space-y-3">
        {category.points.map((point) => (
          <li className="flex gap-2 text-sm font-bold leading-6 text-charcoal" key={point}>
            <Icon className="mt-1 shrink-0 text-steel" name="check" size={16} strokeWidth={3} />
            <span>{point}</span>
          </li>
        ))}
      </ul>
      <a
        className="mt-6 flex w-full items-center justify-center gap-2 border-t border-metal-100 pt-5 text-sm font-black text-steel transition group-hover:text-orange"
        href={withBase(category.path)}
        onClick={go}
      >
        {category.level.replace("向け", "")}工具を見る
        <Icon name="arrow" size={16} />
      </a>
    </article>
  );
}

export function SpecChip({ label, value }) {
  return (
    <span className="inline-flex min-h-10 items-center justify-center rounded border border-metal-300 bg-white px-3 py-2 text-center text-xs font-black text-navy">
      {label ? <span className="mr-1 text-metal">{label}</span> : null}
      {value}
    </span>
  );
}

export function ProductImage({
  alt = "",
  className = "",
  frameClassName = "",
  image,
  position = "center",
  product,
  useAmazonImage = true,
}) {
  const amazonImageUrl = useAmazonImage ? getAmazonImageUrl(product) : "";

  if (amazonImageUrl) {
    return (
      <div
        className={`product-image-frame overflow-hidden rounded-md border border-metal-100 bg-white ${frameClassName} ${className}`}
      >
        <iframe
          className="h-full w-full bg-white"
          loading="lazy"
          sandbox="allow-popups allow-scripts allow-same-origin"
          scrolling="no"
          src={amazonImageUrl}
          title={alt || `${product.brand} ${product.model} Amazon商品画像`}
        />
      </div>
    );
  }

  return (
    <div
      aria-label={alt || undefined}
      className={`product-image-frame overflow-hidden rounded-md border border-metal-100 bg-white bg-no-repeat ${frameClassName} ${className}`}
      role={alt ? "img" : undefined}
      style={{
        backgroundImage: `url(${image})`,
        backgroundPosition: position,
        backgroundSize: "520% auto",
      }}
    />
  );
}

export function RankingCard({ tool, onNavigate }) {
  const go = (event) => {
    if (!onNavigate) return;
    event.preventDefault();
    onNavigate(tool.path || tool.id);
  };

  return (
    <article className="animate-fade-up group relative rounded-lg border border-metal-200 bg-white p-3 shadow-panel transition duration-300 hover:-translate-y-1 hover:shadow-metal sm:p-4 lg:p-3 xl:p-4">
      <div className="absolute left-0 top-0 z-10 rounded-br-lg rounded-tl-lg bg-orange px-3 py-2 text-lg font-black text-white">
        {tool.badge}
      </div>
      <ProductImage
        frameClassName="mx-auto mt-3 aspect-square w-32 sm:w-36 lg:w-full"
        image={tool.image}
        position={tool.imagePosition}
        product={tool.product}
      />
      <h3 className="mt-3 text-center text-lg font-black leading-tight text-navy xl:text-xl">{tool.name}</h3>
      <p className="mt-2 min-h-20 text-sm font-bold leading-7 text-charcoal lg:min-h-24 xl:min-h-20">{tool.summary}</p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {tool.specs.slice(0, 4).map((spec) => (
          <SpecChip key={spec} value={spec} />
        ))}
      </div>
      <a
        className="mt-3 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-lg bg-navy px-3 py-3 text-sm font-black text-white shadow-metal transition duration-300 hover:-translate-y-0.5 hover:bg-navy-800 active:translate-y-0"
        href={withBase(tool.path || `/products/${tool.id}/`)}
        onClick={go}
      >
        詳細を見る
        <Icon name="arrow" size={18} />
      </a>
    </article>
  );
}

export function ComparisonTable({ rows, headers = ["工具", "見るべき基準", "初心者向け", "プロ向け"] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-metal-300 bg-white shadow-panel">
      <div className="overflow-x-auto">
        <table className="min-w-[720px] w-full border-collapse text-sm">
          <thead>
            <tr className="bg-steel text-white shadow-inner">
              {headers.map((header) => (
                <th className="border border-white/20 px-3 py-3 text-center font-black md:px-4 md:py-4" key={header}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr className="odd:bg-white even:bg-paper/70" key={row[0]}>
                {row.map((cell, index) => (
                  <td
                    className={`border border-metal-200 px-3 py-3 align-middle leading-7 md:px-4 md:py-4 ${
                      index === 0 ? "font-black text-navy" : "font-bold text-charcoal"
                    }`}
                    key={`${row[0]}-${index}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function PageShell({ children, className = "" }) {
  return (
    <main className={`min-h-screen bg-paper text-charcoal ${className}`}>
      {children}
      <footer className="border-t border-metal-200 bg-navy px-5 py-8 text-white lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm font-bold text-white/70 md:flex-row md:items-center md:justify-between">
          <p>© 2026 エアコン工具ギア</p>
          <div className="flex flex-wrap gap-4">
            <a className="transition hover:text-orange" href={withBase("/privacy-policy/")}>
              利用規約・プライバシーポリシー
            </a>
            <a className="transition hover:text-orange" href={withBase("/rss.xml")}>
              RSS
            </a>
            <a className="transition hover:text-orange" href="https://github.com/165cm/aircon-tool-gear" rel="noopener" target="_blank">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
