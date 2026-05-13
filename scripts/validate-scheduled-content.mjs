import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { scheduledPosts } from "../src/data/scheduledPosts.js";

const root = process.cwd();
const contentDir = path.join(root, "content", "scheduled");
const expectedTotal = 76;
const expectedMayCount = Math.ceil(expectedTotal * 0.7);
const finalTargetDate = "2026-07-31";
const scheduledCompletionDate = "2026-07-20";

const markdownPosts = await readMarkdownPosts();
const errors = [];

assert(scheduledPosts.length === expectedTotal, `scheduledPosts.js has ${scheduledPosts.length} posts; expected ${expectedTotal}.`);
assert(markdownPosts.length === expectedTotal, `content/scheduled has ${markdownPosts.length} posts; expected ${expectedTotal}.`);
assert(countPublished(scheduledPosts, "2026-05-31") === expectedMayCount, `Expected ${expectedMayCount} posts by 2026-05-31.`);
assert(countPublished(scheduledPosts, finalTargetDate) === expectedTotal, `Expected all ${expectedTotal} posts by ${finalTargetDate}.`);

const maxPublishDate = scheduledPosts.reduce((latest, post) => (post.publishDate > latest ? post.publishDate : latest), "");
assert(maxPublishDate <= scheduledCompletionDate, `Last publishDate is ${maxPublishDate}; expected ${scheduledCompletionDate} or earlier.`);

const dataBySlug = new Map(scheduledPosts.map((post) => [post.slug, post]));
for (const markdownPost of markdownPosts) {
  const dataPost = dataBySlug.get(markdownPost.slug);
  assert(Boolean(dataPost), `${markdownPost.slug} exists in Markdown but not scheduledPosts.js.`);
  if (!dataPost) continue;
  for (const field of ["title", "keyword", "publishDate", "summary"]) {
    assert(
      dataPost[field] === markdownPost[field],
      `${markdownPost.slug}: ${field} differs between Markdown and scheduledPosts.js.`,
    );
  }
}

const markdownSlugs = new Set(markdownPosts.map((post) => post.slug));
for (const dataPost of scheduledPosts) {
  assert(markdownSlugs.has(dataPost.slug), `${dataPost.slug} exists in scheduledPosts.js but not Markdown.`);
}

if (errors.length > 0) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log(
  [
    `Validated ${expectedTotal} scheduled posts.`,
    `Published by 2026-05-31: ${countPublished(scheduledPosts, "2026-05-31")}.`,
    `Published by ${finalTargetDate}: ${countPublished(scheduledPosts, finalTargetDate)}.`,
    `Last publishDate: ${maxPublishDate}.`,
  ].join("\n"),
);

async function readMarkdownPosts() {
  const files = (await readdir(contentDir))
    .filter((file) => file.endsWith(".md"))
    .sort((a, b) => a.localeCompare(b));

  return Promise.all(
    files.map(async (file) => {
      const source = await readFile(path.join(contentDir, file), "utf8");
      const frontmatter = parseFrontmatter(source, file);
      return {
        slug: frontmatter.slug,
        title: frontmatter.title,
        keyword: frontmatter.keyword,
        publishDate: frontmatter.publishDate,
        summary: frontmatter.summary,
      };
    }),
  );
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

function countPublished(posts, date) {
  return posts.filter((post) => post.publishDate <= date).length;
}

function assert(condition, message) {
  if (!condition) {
    errors.push(message);
  }
}
