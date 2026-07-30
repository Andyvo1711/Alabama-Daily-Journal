import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategory, isCategorySlug } from "@/config/categories";
import { getArticlesByCategory } from "@/lib/articles";
import { paginateArticles, parsePageParam } from "@/lib/pagination";
import { siteConfig } from "@/config/site";
import FeatureStory from "@/components/FeatureStory";
import StoryColumn from "@/components/StoryColumn";
import StoryRow from "@/components/StoryRow";
import Pagination from "@/components/Pagination";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);

  if (!category) {
    return { title: "Category Not Found" };
  }

  return {
    title: category.label,
    description: category.introduction,
    alternates: { canonical: `/category/${category.slug}` },
    openGraph: {
      title: `${category.label} | ${siteConfig.name}`,
      description: category.introduction,
    },
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params;

  if (!isCategorySlug(slug)) {
    notFound();
  }

  const category = getCategory(slug);
  if (!category) {
    notFound();
  }

  const { page } = await searchParams;
  const currentPage = parsePageParam(page);

  const articles = getArticlesByCategory(category.slug);
  const featured = articles[0];
  const secondary = articles.slice(1, 3);
  const remaining = articles.slice(3);

  const pagination = paginateArticles(remaining, currentPage, siteConfig.articlesPerPage.category);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="border-b border-border-gray pb-6">
        <h1 className="font-serif text-3xl font-bold uppercase tracking-wide text-headline sm:text-4xl">
          {category.label}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-charcoal">
          {category.introduction}
        </p>
      </header>

      {featured && (
        <div className="border-b border-border-gray py-10">
          <FeatureStory article={featured} />
        </div>
      )}

      {secondary.length > 0 && (
        <div className="grid grid-cols-1 gap-8 border-b border-border-gray py-10 md:grid-cols-2 md:gap-8">
          {secondary.map((article) => (
            <StoryColumn key={article.slug} article={article} />
          ))}
        </div>
      )}

      {pagination.items.length > 0 ? (
        <ul className="flex flex-col divide-y divide-border-gray">
          {pagination.items.map((article) => (
            <li key={article.slug}>
              <StoryRow article={article} />
            </li>
          ))}
        </ul>
      ) : (
        !featured && (
          <p className="py-10 text-base text-medium-gray">
            No stories are available in this category yet.
          </p>
        )
      )}

      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        basePath={`/category/${category.slug}`}
      />
    </div>
  );
}
