import type { Metadata } from "next";
import { searchArticles } from "@/lib/articles";
import SearchForm from "@/components/SearchForm";
import StoryRow from "@/components/StoryRow";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export const metadata: Metadata = {
  title: "Search",
  description: "Search Alabama Daily Journal for stories across every category.",
  alternates: { canonical: "/search" },
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();
  const results = query ? searchArticles(query) : [];

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <header className="border-b border-border-gray pb-6">
        <h1 className="font-serif text-3xl font-bold uppercase tracking-wide text-headline sm:text-4xl">
          Search
        </h1>
        <div className="mt-6">
          <SearchForm defaultValue={query} />
        </div>
      </header>

      <div className="py-8">
        {!query && (
          <p className="text-base text-medium-gray">Enter a keyword to search Alabama news.</p>
        )}

        {query && results.length === 0 && (
          <p className="text-base text-medium-gray">No stories matched your search.</p>
        )}

        {query && results.length > 0 && (
          <ul className="flex flex-col divide-y divide-border-gray">
            {results.map((article) => (
              <li key={article.slug}>
                <StoryRow article={article} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
