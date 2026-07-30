# Alabama Daily Journal

Clear Reporting from Across Alabama.

## Overview

Alabama Daily Journal is a statewide, editorial news publication covering education,
healthcare, business leadership, finance and economy, community life, and beauty and
wellness across Alabama — from Birmingham and Huntsville to the Gulf Coast and the
Black Belt. Content is authored entirely as local Markdown files; there is no database
or CMS.

## Design Direction

The site follows a restrained, disciplined daily-newspaper aesthetic:

- White, bright, and minimal — mostly black, white, and neutral gray
- One restrained accent color (Accent Blue) used sparingly for links, labels, and active states
- Strong typographic hierarchy instead of color or decoration to organize content
- Thin one-pixel rules and borders rather than cards, shadows, or rounded panels
- Image-led but not crowded — every section relies on whitespace and alignment
- No colorful category bands, gradients, or decorative visual overload

## Technology Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- Markdown content parsed with `gray-matter`
- Markdown-to-HTML rendering with `remark` + `remark-html`
- `next/font` (Source Serif 4 for headlines/body, Inter for interface text)
- `next/image` for all article and section imagery
- Next.js Metadata API for SEO
- No database, CMS, or external content backend

## Folder Structure

```text
alabama-daily-journal/
├── content/
│   └── articles/
│       ├── education/
│       ├── healthcare/
│       ├── business-leaders/
│       ├── finance-economy/
│       ├── community/
│       └── beauty-wellness/
├── public/
├── scripts/
│   └── validate-content.ts
├── src/
│   ├── app/
│   │   ├── article/[slug]/page.tsx
│   │   ├── category/[slug]/page.tsx
│   │   ├── latest/page.tsx
│   │   ├── search/page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   └── page.tsx
│   ├── components/
│   ├── config/
│   │   ├── categories.ts
│   │   └── site.ts
│   ├── lib/
│   │   ├── articles.ts
│   │   ├── dates.ts
│   │   └── pagination.ts
│   └── types/
│       └── article.ts
├── next.config.ts
└── package.json
```

Article subfolders exist for editorial organization only — every article still needs a
globally unique `slug` regardless of which folder it lives in.

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Content Validation

Run before committing new articles or opening a pull request:

```bash
npm run validate:content
```

This checks every Markdown file recursively for required frontmatter fields, filename/slug
matching, global slug uniqueness, valid categories, valid calendar dates, unique
Unsplash/Pexels image URLs, non-empty bodies, at least two subheadings per article, and the
absence of forbidden fields (`description`, `author`).

## Production Build

```bash
npm run validate:content
npm run lint
npm run build
npm start
```

## Adding a Markdown Article

1. Choose the correct category folder under `content/articles/<category-slug>/`.
2. Create a new file named exactly `<slug>.md`, where `<slug>` matches the `slug` field below.
3. Add frontmatter in this exact shape:

```yaml
---
title: "Article Title"
slug: "article-title"
excerpt: "A concise summary of the article."
category: "education"
date: "2026-07-15"
coverImage: "https://images.unsplash.com/photo-XXXXXXX?auto=format&fit=crop&w=1600&q=80"
featured: false
imageCredit: "Photo: Unsplash/Photographer Name"
---
```

4. Write the article body in Markdown below the frontmatter (headings, paragraphs, bold,
   italics, lists, blockquotes, and links are all supported). Include at least two `##`/`###`
   subheadings.
5. Run `npm run validate:content` to confirm the article is valid.

### Required Frontmatter Fields

| Field         | Type    | Notes                                                        |
| ------------- | ------- | ------------------------------------------------------------- |
| `title`       | string  | Article headline                                              |
| `slug`        | string  | Must exactly match the filename (without `.md`)               |
| `excerpt`     | string  | Concise summary shown in listings                              |
| `category`    | string  | One of the six category slugs below                           |
| `date`        | string  | `YYYY-MM-DD`, a real calendar date                             |
| `coverImage`  | string  | Unique `https://images.unsplash.com/...` or `https://images.pexels.com/...` URL |
| `featured`    | boolean | `true`/`false`                                                 |
| `imageCredit` | string  | e.g. `"Photo: Unsplash/Photographer Name"`                     |

Do not add `description` or `author` fields — they are intentionally not part of this
content model.

### Category Slugs

| Order | Label             | Slug              |
| ----- | ----------------- | ------------------ |
| 1     | Education         | `education`         |
| 2     | Healthcare        | `healthcare`         |
| 3     | Business Leaders  | `business-leaders`   |
| 4     | Finance & Economy | `finance-economy`    |
| 5     | Community         | `community`          |
| 6     | Beauty & Wellness | `beauty-wellness`     |

### Image Requirements

- Only `https://images.unsplash.com/...` or `https://images.pexels.com/...` URLs are allowed.
- Every article must use a unique cover image URL — no reuse across articles.
- No placeholder image services, base64 images, or empty files.

## Unlimited Article Architecture

There is no fixed article count anywhere in the system. Categories may hold any number of
articles — one, twelve, or several hundred — and the homepage, category pages, latest page,
and search all read the Markdown directory recursively at request time. Adding or removing
`.md` files requires no code changes.

## Pagination Behavior

- `/latest` paginates 12 articles per page via `/latest?page=2`.
- `/category/[slug]` shows one featured story and two secondary stories, then paginates the
  remaining articles 10 per page via `/category/<slug>?page=2`.
- Pagination adapts automatically to however many articles currently exist.

## Date Display Rule

Article publication dates are shown **only** on the individual article page
(`/article/[slug]`). The homepage, category pages, latest page, search results, and related
stories intentionally omit publication dates. The date shown in the site header is the
current edition date, not an article's publication date.

## Article Count Rule

The public site never displays article totals, category counts, or "showing X of Y" text.
Counts are used internally only to compute pagination.
