import type { Metadata } from "next";
import { getAllArticles } from "@/lib/articles";
import { paginateArticles, parsePageParam } from "@/lib/pagination";
import { siteConfig } from "@/config/site";
import StoryRow from "@/components/StoryRow";
import Pagination from "@/components/Pagination";

interface LatestPageProps {
  searchParams: Promise<{ page?: string }>;
}

export const metadata: Metadata = {
  title: "Latest News",
  description: "The most recent stories from every Alabama Daily Journal desk.",
  alternates: { canonical: "/latest" },
};

export default async function LatestPage({ searchParams }: LatestPageProps) {
  const { page } = await searchParams;
  const currentPage = parsePageParam(page);

  const all = getAllArticles();
  const pagination = paginateArticles(all, currentPage, siteConfig.articlesPerPage.latest);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="border-b border-border-gray pb-6">
        <h1 className="font-serif text-3xl font-bold uppercase tracking-wide text-headline sm:text-4xl">
          Latest News
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-charcoal">
          Recent reporting from across Alabama, updated as new stories are published.
        </p>
      </header>

      {pagination.items.length > 0 ? (
        <ul className="flex flex-col divide-y divide-border-gray">
          {pagination.items.map((article) => (
            <li key={article.slug}>
              <StoryRow article={article} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="py-10 text-base text-medium-gray">No stories are available yet.</p>
      )}

      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        basePath="/latest"
      />
    </div>
  );
}
