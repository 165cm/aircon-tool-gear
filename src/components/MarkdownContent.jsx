import Icon from "./Icon.jsx";
import { withBase } from "../utils/routes.js";

export default function MarkdownContent({ source = "" }) {
  const blocks = parseMarkdown(source);

  return (
    <section className="mt-8 space-y-6 text-base font-bold leading-8 text-charcoal">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          const HeadingTag = block.level === 3 ? "h3" : "h2";
          const className =
            block.level === 3
              ? "pt-2 text-xl font-black leading-tight text-navy"
              : "pt-3 text-2xl font-black leading-tight text-navy";
          return (
            <HeadingTag className={className} key={`${block.type}-${index}`}>
              {block.text}
            </HeadingTag>
          );
        }

        if (block.type === "list") {
          return (
            <ul className="grid gap-3 md:grid-cols-3" key={`${block.type}-${index}`}>
              {block.items.map((item) => (
                <li className="flex gap-2 rounded-lg border border-metal-200 bg-paper p-3" key={item}>
                  <Icon className="mt-1 shrink-0 text-steel" name="check" size={16} />
                  <span>{renderInline(item)}</span>
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p className="text-base font-bold leading-8 text-charcoal" key={`${block.type}-${index}`}>
            {renderInline(block.text)}
          </p>
        );
      })}
    </section>
  );
}

function parseMarkdown(source) {
  const blocks = [];
  const lines = source.split("\n");
  let paragraph = [];
  let list = [];

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    blocks.push({ type: "paragraph", text: paragraph.join(" ") });
    paragraph = [];
  };

  const flushList = () => {
    if (list.length === 0) return;
    blocks.push({ type: "list", items: list });
    list = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    const heading = line.match(/^(#{2,3})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      blocks.push({ type: "heading", level: heading[1].length, text: heading[2] });
      continue;
    }

    const listItem = line.match(/^-\s+(.+)$/);
    if (listItem) {
      flushParagraph();
      list.push(listItem[1]);
      continue;
    }

    flushList();
    paragraph.push(line);
  }

  flushParagraph();
  flushList();
  return blocks;
}

function renderInline(text) {
  const parts = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <a className="text-steel underline decoration-steel/30 underline-offset-4 hover:text-orange" href={toHref(match[2])} key={`${match[1]}-${match.index}`}>
        {match[1]}
      </a>,
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

function toHref(href) {
  if (href.startsWith("/")) return withBase(href);
  return href;
}
