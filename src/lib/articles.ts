import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import { categorySlugs } from "@/config/categories";
import { isValidIsoDate } from "@/lib/dates";
import type { Article, ArticleFrontmatter, ArticleListItem, CategorySlug } from "@/types/article";

const CONTENT_DIR = path.join(process.cwd(), "content", "articles");

interface LoadedArticle extends ArticleListItem {
  rawBody: string;
}

let articleCache: LoadedArticle[] | null = null;

function collectMarkdownFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectMarkdownFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(fullPath);
    }
  }

  return files;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function validateFrontmatter(
  data: Record<string, unknown>,
  filePath: string
): ArticleFrontmatter | null {
  const filename = path.basename(filePath, ".md");

  if (
    !isNonEmptyString(data.title) ||
    !isNonEmptyString(data.slug) ||
    !isNonEmptyString(data.excerpt) ||
    !isNonEmptyString(data.category) ||
    !isNonEmptyString(data.date) ||
    !isNonEmptyString(data.coverImage) ||
    !isNonEmptyString(data.imageCredit) ||
    typeof data.featured !== "boolean"
  ) {
    console.warn(`[articles] Skipping "${filePath}": missing or invalid required field.`);
    return null;
  }

  if (data.slug !== filename) {
    console.warn(
      `[articles] Skipping "${filePath}": slug "${data.slug}" does not match filename "${filename}".`
    );
    return null;
  }

  if (!categorySlugs.includes(data.category as CategorySlug)) {
    console.warn(`[articles] Skipping "${filePath}": unknown category "${data.category}".`);
    return null;
  }

  if (!isValidIsoDate(data.date)) {
    console.warn(`[articles] Skipping "${filePath}": invalid date "${data.date}".`);
    return null;
  }

  return {
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    category: data.category as CategorySlug,
    date: data.date,
    coverImage: data.coverImage,
    featured: data.featured,
    imageCredit: data.imageCredit,
  };
}

function loadArticles(): LoadedArticle[] {
  if (articleCache) {
    return articleCache;
  }

  const files = fs.existsSync(CONTENT_DIR) ? collectMarkdownFiles(CONTENT_DIR) : [];
  const seenSlugs = new Set<string>();
  const loaded: LoadedArticle[] = [];

  for (const filePath of files) {
    try {
      const raw = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(raw);
      const frontmatter = validateFrontmatter(data, filePath);

      if (!frontmatter) {
        continue;
      }

      if (seenSlugs.has(frontmatter.slug)) {
        console.warn(`[articles] Skipping "${filePath}": duplicate slug "${frontmatter.slug}".`);
        continue;
      }

      if (!content.trim()) {
        console.warn(`[articles] Skipping "${filePath}": empty body.`);
        continue;
      }

      seenSlugs.add(frontmatter.slug);
      loaded.push({
        ...frontmatter,
        rawBody: content,
        readingBody: content,
      });
    } catch (error) {
      console.warn(`[articles] Failed to parse "${filePath}":`, error);
    }
  }

  loaded.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

  articleCache = loaded;
  return articleCache;
}

export function getAllArticles(): ArticleListItem[] {
  return loadArticles();
}

export function getArticleBySlug(slug: string): Article | null {
  const files = fs.existsSync(CONTENT_DIR) ? collectMarkdownFiles(CONTENT_DIR) : [];
  const match = loadArticles().find((article) => article.slug === slug);

  if (!match) {
    return null;
  }

  const filePath = files.find((file) => path.basename(file, ".md") === slug);
  if (!filePath) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const { content } = matter(raw);
  const processed = remark().use(remarkHtml).processSync(content);

  return {
    title: match.title,
    slug: match.slug,
    excerpt: match.excerpt,
    category: match.category,
    date: match.date,
    coverImage: match.coverImage,
    featured: match.featured,
    imageCredit: match.imageCredit,
    contentHtml: processed.toString(),
    rawBody: match.rawBody,
  };
}

export function getArticlesByCategory(category: CategorySlug): ArticleListItem[] {
  return loadArticles().filter((article) => article.category === category);
}

export function getFeaturedArticles(limit?: number): ArticleListItem[] {
  const featured = loadArticles().filter((article) => article.featured);
  return typeof limit === "number" ? featured.slice(0, limit) : featured;
}

export function getLatestArticles(limit?: number): ArticleListItem[] {
  const all = loadArticles();
  return typeof limit === "number" ? all.slice(0, limit) : all;
}

export function getRelatedArticles(
  article: Pick<ArticleFrontmatter, "slug" | "category">,
  limit = 4
): ArticleListItem[] {
  const all = loadArticles().filter((item) => item.slug !== article.slug);
  const sameCategory = all.filter((item) => item.category === article.category);
  const others = all.filter((item) => item.category !== article.category);
  return [...sameCategory, ...others].slice(0, limit);
}

export function searchArticles(query: string): ArticleListItem[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) {
    return [];
  }

  return loadArticles().filter((article) => {
    const categoryLabel = article.category.replace(/-/g, " ");
    const haystack = `${article.title} ${article.excerpt} ${article.rawBody} ${categoryLabel}`.toLowerCase();
    return haystack.includes(trimmed);
  });
}
