import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { scheduledPosts as existingPosts } from "../src/data/scheduledPosts.js";

const root = process.cwd();
const contentDir = path.join(root, "content", "scheduled");
const dataFile = path.join(root, "src", "data", "scheduledPosts.js");

const existingOrder = new Map(existingPosts.map((post, index) => [post.slug, index]));
const posts = await readScheduledMarkdown();

await writeFile(
  dataFile,
  `export const scheduledPosts = ${JSON.stringify(posts, null, 2)};\n`,
  "utf8",
);

console.log(`Synced ${posts.length} scheduled posts from content/scheduled.`);

async function readScheduledMarkdown() {
  const files = (await readdir(contentDir))
    .filter((file) => file.endsWith(".md"))
    .sort((a, b) => a.localeCompare(b));

  const entries = await Promise.all(
    files.map(async (file) => {
      const source = await readFile(path.join(contentDir, file), "utf8");
      const frontmatter = parseFrontmatter(source, file);
      const post = normalizePost(frontmatter, file);
      return { file, post };
    }),
  );

  validateUniqueSlugs(entries);

  return entries
    .map(({ post }) => post)
    .sort((a, b) => {
      const dateOrder = a.publishDate.localeCompare(b.publishDate);
      if (dateOrder !== 0) return dateOrder;
      const aOrder = existingOrder.get(a.slug) ?? Number.MAX_SAFE_INTEGER;
      const bOrder = existingOrder.get(b.slug) ?? Number.MAX_SAFE_INTEGER;
      if (aOrder !== bOrder) return aOrder - bOrder;
      return a.slug.localeCompare(b.slug);
    });
}

function parseFrontmatter(source, file) {
  const match = source.match(/^---\n([\s\S]*?)\n---/);
  if (!match) {
    throw new Error(`${file}: frontmatter is missing.`);
  }

  const data = {};
  for (const line of match[1].split("\n")) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();
    data[key] = value;
  }
  return data;
}

function normalizePost(frontmatter, file) {
  const requiredFields = ["slug", "title", "keyword", "publishDate", "summary"];
  const missing = requiredFields.filter((field) => !frontmatter[field]);
  if (missing.length > 0) {
    throw new Error(`${file}: missing frontmatter field(s): ${missing.join(", ")}.`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(frontmatter.publishDate)) {
    throw new Error(`${file}: publishDate must be YYYY-MM-DD.`);
  }

  const post = {
    slug: frontmatter.slug,
    title: frontmatter.title,
    keyword: frontmatter.keyword,
    publishDate: frontmatter.publishDate,
    summary: frontmatter.summary,
  };
  if (frontmatter.updatedDate) {
    post.updatedDate = frontmatter.updatedDate;
  }
  for (const field of ["intentLevel", "symptomCategory", "monetizationType"]) {
    if (frontmatter[field]) post[field] = frontmatter[field];
  }
  for (const field of ["recommendedProductSlugs", "nextBeginnerPostSlugs"]) {
    if (frontmatter[field]) {
      post[field] = frontmatter[field]
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }
  }
  if (frontmatter.safetyWarningRequired) {
    post.safetyWarningRequired = frontmatter.safetyWarningRequired === "true";
  }
  return post;
}

function validateUniqueSlugs(entries) {
  const seen = new Map();
  const duplicates = [];
  for (const { file, post } of entries) {
    if (seen.has(post.slug)) {
      duplicates.push(`${post.slug} (${seen.get(post.slug)}, ${file})`);
    }
    seen.set(post.slug, file);
  }
  if (duplicates.length > 0) {
    throw new Error(`Duplicate scheduled post slug(s): ${duplicates.join("; ")}.`);
  }
}
