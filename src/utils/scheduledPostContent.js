const markdownFiles = import.meta.glob("../../content/scheduled/*.md", {
  eager: true,
  import: "default",
  query: "?raw",
});

export function getScheduledPostContent(slug, title) {
  const entry = Object.entries(markdownFiles).find(([file]) => file.endsWith(`/${slug}.md`));
  if (!entry) return "";

  const source = entry[1];
  const body = String(source).replace(/^---\n[\s\S]*?\n---\n?/, "").trim();
  const heading = `# ${title}`;
  return body.startsWith(heading) ? body.slice(heading.length).trim() : body;
}
