const publishTimeZone = "Asia/Tokyo";

export function todayIsoDate(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: publishTimeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function resolveBuildDate(explicitDate) {
  return explicitDate || import.meta.env?.VITE_BUILD_DATE || todayIsoDate();
}

export function isScheduledPostPublished(post, buildDate = resolveBuildDate()) {
  return Boolean(post?.publishDate) && post.publishDate <= buildDate;
}

export function getPublishedScheduledPosts(posts, buildDate = resolveBuildDate()) {
  return posts.filter((post) => isScheduledPostPublished(post, buildDate));
}
