import { site } from "../data/productCatalog.js";

export function normalizePath(pathname = "/") {
  let path = pathname;
  if (path.startsWith(site.basePath)) {
    path = path.slice(site.basePath.length - 1);
  }
  if (!path.startsWith("/")) path = `/${path}`;
  return path.replace(/\/+$/, "/");
}

export function withBase(path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const base = import.meta.env.BASE_URL || site.basePath;
  if (base === "/") return normalized;
  return `${base.replace(/\/$/, "")}${normalized}`;
}

export function routeToPage(pathname = "/") {
  const path = normalizePath(pathname);
  if (path === "/") return { type: "home", activePage: "home" };
  if (path === "/ranking/") return { type: "ranking", activePage: "ranking" };
  if (path === "/beginner-kit/") return { type: "beginner", activePage: "beginner-kit" };
  if (path === "/comparison/") return { type: "comparison", activePage: "comparison" };
  if (path === "/privacy-policy/") return { type: "privacy", activePage: "privacy" };

  const categoryMatch = path.match(/^\/categories\/([^/]+)\/$/);
  if (categoryMatch) {
    return { type: "category", activePage: categoryMatch[1], slug: categoryMatch[1] };
  }

  const productMatch = path.match(/^\/products\/([^/]+)\/$/);
  if (productMatch) {
    return { type: "product", activePage: "products", slug: productMatch[1] };
  }

  const postMatch = path.match(/^\/posts\/([^/]+)\/$/);
  if (postMatch) {
    return { type: "post", activePage: "guide", slug: postMatch[1] };
  }

  return { type: "not-found", activePage: "not-found" };
}

export function pageIdToPath(pageId = "home") {
  const direct = {
    home: "/",
    ranking: "/ranking/",
    "beginner-kit": "/beginner-kit/",
    beginner: "/beginner-kit/",
    comparison: "/comparison/",
    privacy: "/privacy-policy/",
    guide: "/posts/aircon-tool-beginner-guide/",
    professional: "/categories/recovery-machine/",
  };
  if (direct[pageId]) return direct[pageId];
  if (pageId.startsWith("/")) return pageId;
  if (["vacuum-pump", "manifold-gauge", "flare-tool", "torque-wrench", "recovery-machine", "leak-tester"].includes(pageId)) {
    return `/categories/${pageId}/`;
  }
  return `/products/${pageId}/`;
}

export function buildCanonical(path = "/") {
  const normalized = normalizePath(path);
  return `${site.url}${normalized === "/" ? "/" : normalized}`;
}
