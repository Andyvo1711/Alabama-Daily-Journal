import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { categorySlugs } from "../src/config/categories";
import { isValidIsoDate } from "../src/lib/dates";

const CONTENT_DIR = path.join(process.cwd(), "content", "articles");
const REQUIRED_FIELDS = [
  "title",
  "slug",
  "excerpt",
  "category",
  "date",
  "coverImage",
  "featured",
  "imageCredit",
] as const;
const FORBIDDEN_FIELDS = ["description", "author"];
const ALLOWED_IMAGE_HOSTS = ["images.unsplash.com", "images.pexels.com"];

interface ValidationIssue {
  file: string;
  message: string;
}

function collectMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }

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

function isValidImageUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" && ALLOWED_IMAGE_HOSTS.includes(parsed.hostname);
  } catch {
    return false;
  }
}

function countMarkdownSubheadings(content: string): number {
  const matches = content.match(/^#{2,3}\s+.+$/gm);
  return matches ? matches.length : 0;
}

function validate(): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const files = collectMarkdownFiles(CONTENT_DIR);

  if (files.length === 0) {
    issues.push({ file: CONTENT_DIR, message: "No Markdown articles were found." });
    return issues;
  }

  const seenSlugs = new Map<string, string>();
  const seenImageUrls = new Map<string, string>();

  for (const filePath of files) {
    const relativePath = path.relative(process.cwd(), filePath);
    const filename = path.basename(filePath, ".md");
    const raw = fs.readFileSync(filePath, "utf8");

    let parsed: ReturnType<typeof matter>;
    try {
      parsed = matter(raw);
    } catch (error) {
      issues.push({ file: relativePath, message: `Failed to parse frontmatter: ${error}` });
      continue;
    }

    const { data, content } = parsed;

    for (const field of REQUIRED_FIELDS) {
      if (data[field] === undefined || data[field] === null || data[field] === "") {
        issues.push({ file: relativePath, message: `Missing required field "${field}".` });
      }
    }

    for (const field of FORBIDDEN_FIELDS) {
      if (field in data) {
        issues.push({ file: relativePath, message: `Forbidden field "${field}" is present.` });
      }
    }

    if (typeof data.slug === "string" && data.slug !== filename) {
      issues.push({
        file: relativePath,
        message: `Slug "${data.slug}" does not match filename "${filename}".`,
      });
    }

    if (typeof data.slug === "string") {
      if (seenSlugs.has(data.slug)) {
        issues.push({
          file: relativePath,
          message: `Duplicate slug "${data.slug}" also used in ${seenSlugs.get(data.slug)}.`,
        });
      } else {
        seenSlugs.set(data.slug, relativePath);
      }
    }

    if (typeof data.category === "string" && !categorySlugs.includes(data.category as never)) {
      issues.push({
        file: relativePath,
        message: `Unknown category "${data.category}".`,
      });
    }

    if (typeof data.date === "string" && !isValidIsoDate(data.date)) {
      issues.push({
        file: relativePath,
        message: `Invalid date "${data.date}". Expected a real calendar date in YYYY-MM-DD format.`,
      });
    }

    if (typeof data.coverImage === "string") {
      if (!isValidImageUrl(data.coverImage)) {
        issues.push({
          file: relativePath,
          message: `Cover image must be an https Unsplash or Pexels URL: "${data.coverImage}".`,
        });
      }

      if (seenImageUrls.has(data.coverImage)) {
        issues.push({
          file: relativePath,
          message: `Duplicate cover image also used in ${seenImageUrls.get(data.coverImage)}.`,
        });
      } else {
        seenImageUrls.set(data.coverImage, relativePath);
      }
    }

    if (typeof data.imageCredit !== "string" || data.imageCredit.trim() === "") {
      issues.push({ file: relativePath, message: "Missing image credit." });
    }

    if (typeof data.featured !== "boolean") {
      issues.push({
        file: relativePath,
        message: `"featured" must be a boolean, received "${typeof data.featured}".`,
      });
    }

    if (!content.trim()) {
      issues.push({ file: relativePath, message: "Article body is empty." });
    }

    if (countMarkdownSubheadings(content) < 2) {
      issues.push({
        file: relativePath,
        message: "Article must include at least two Markdown subheadings (## or ###).",
      });
    }
  }

  return issues;
}

const issues = validate();

if (issues.length > 0) {
  console.error(`\nContent validation failed with ${issues.length} issue(s):\n`);
  for (const issue of issues) {
    console.error(`  - [${issue.file}] ${issue.message}`);
  }
  console.error("");
  process.exit(1);
}

console.log("Content validation passed.");
