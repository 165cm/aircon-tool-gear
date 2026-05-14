import Icon from "./Icon.jsx";
import { navItems } from "../data/siteData.js";
import { withBase } from "../utils/routes.js";

export default function Header({ activePage = "home", onNavigate }) {
  const goTo = (event, pageId) => {
    if (!onNavigate) return;
    event.preventDefault();
    onNavigate(pageId);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy/95 text-white shadow-metal backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <a
          className="text-left text-2xl font-black tracking-normal text-white md:text-3xl"
          href={withBase("/")}
          onClick={(event) => goTo(event, "home")}
        >
          エアコン工具ギア
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="主要ナビゲーション">
          {navItems.map((item) => {
            const active = activePage === item.id;
            return (
              <a
                className={`rounded-md px-4 py-3 text-sm font-bold transition hover:bg-white/10 ${
                  active ? "bg-white/10 text-orange" : "text-white"
                }`}
                href={withBase(item.path)}
                key={item.id}
                onClick={(event) => goTo(event, item.id)}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <a
          className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-orange px-4 py-3 text-sm font-black text-white shadow-cta transition hover:-translate-y-0.5 hover:bg-orange-500 active:translate-y-0 md:px-5"
          href={withBase("/beginner-kit/")}
          onClick={(event) => goTo(event, "beginner-kit")}
        >
          <Icon name="trophy" size={18} />
          <span className="hidden sm:inline">初心者セットを見る</span>
          <span className="sm:hidden">セット</span>
        </a>
      </div>
    </header>
  );
}
