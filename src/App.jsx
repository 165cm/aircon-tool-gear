import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import BeginnerPage from "./pages/BeginnerPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import ComparisonPage from "./pages/ComparisonPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import PostPage from "./pages/PostPage.jsx";
import ProductReviewPage from "./pages/ProductReviewPage.jsx";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage.jsx";
import RankingPage from "./pages/RankingPage.jsx";
import { applySeo } from "./utils/seo.js";
import { pageIdToPath, routeToPage, withBase } from "./utils/routes.js";

function PlaceholderPage({ activePage, onNavigate }) {
  return (
    <main className="min-h-screen bg-paper text-charcoal">
      <Header activePage={activePage} onNavigate={onNavigate} />
      <section className="mx-auto flex min-h-[calc(100vh-80px)] max-w-6xl flex-col justify-center px-6 py-16">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-steel">404</p>
        <h1 className="mt-4 text-4xl font-black text-navy md:text-6xl">ページが見つかりません</h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-metal md:text-lg">
          URLを確認するか、トップページから工具カテゴリを選び直してください。
        </p>
        <button
          className="mt-10 inline-flex w-fit min-h-12 items-center rounded-lg bg-orange px-6 py-3 text-sm font-black text-white shadow-cta transition hover:-translate-y-0.5 hover:bg-orange-600"
          onClick={() => onNavigate("home")}
          type="button"
        >
          トップへ戻る
        </button>
      </section>
    </main>
  );
}

export default function App() {
  const [route, setRoute] = useState(() => routeToPage(window.location.pathname));

  useEffect(() => {
    applySeo(route);
  }, [route]);

  useEffect(() => {
    const handlePopState = () => setRoute(routeToPage(window.location.pathname));
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleNavigate = (pageId) => {
    const nextPath = pageIdToPath(pageId || "home");
    window.history.pushState({}, "", withBase(nextPath));
    setRoute(routeToPage(nextPath));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (route.type === "home") {
    return <HomePage activePage="home" onNavigate={handleNavigate} />;
  }

  if (route.type === "beginner") {
    return <BeginnerPage activePage="beginner-kit" kitSlug={route.kitSlug} onNavigate={handleNavigate} />;
  }

  if (route.type === "product") {
    return <ProductReviewPage activePage="products" onNavigate={handleNavigate} productSlug={route.slug} />;
  }

  if (route.type === "ranking") {
    return <RankingPage activePage="ranking" onNavigate={handleNavigate} />;
  }

  if (route.type === "category") {
    return <CategoryPage activePage={route.slug} categorySlug={route.slug} onNavigate={handleNavigate} />;
  }

  if (route.type === "comparison") {
    return <ComparisonPage activePage="comparison" onNavigate={handleNavigate} />;
  }

  if (route.type === "post") {
    return <PostPage activePage="guide" onNavigate={handleNavigate} slug={route.slug} />;
  }

  if (route.type === "privacy") {
    return <PrivacyPolicyPage activePage="privacy" onNavigate={handleNavigate} />;
  }

  return <PlaceholderPage activePage={route.activePage} onNavigate={handleNavigate} />;
}
