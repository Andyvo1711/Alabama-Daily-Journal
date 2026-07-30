export type CategorySlug =
  | "education"
  | "healthcare"
  | "business-leaders"
  | "finance-economy"
  | "community"
  | "beauty-wellness";

export interface ArticleFrontmatter {
  title: string;
  slug: string;
  excerpt: string;
  category: CategorySlug;
  date: string;
  coverImage: string;
  featured: boolean;
  imageCredit: string;
}

export interface ArticleListItem extends ArticleFrontmatter {
  readingBody: string;
}

export interface Article extends ArticleFrontmatter {
  contentHtml: string;
  rawBody: string;
}

export interface CategoryConfig {
  slug: CategorySlug;
  label: string;
  shortLabel: string;
  introduction: string;
  navigationOrder: number;
}

export interface PaginationResult<T> {
  items: T[];
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
