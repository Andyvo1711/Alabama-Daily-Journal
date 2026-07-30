import Link from "next/link";
import StoryRow from "@/components/StoryRow";
import type { ArticleListItem } from "@/types/article";

interface LatestNewsListProps {
  articles: ArticleListItem[];
}

export default function LatestNewsList({ articles }: LatestNewsListProps) {
  return (
    <section aria-label="Latest news" className="border-b border-border-gray">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-2 flex items-center justify-between border-b border-headline pb-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-headline">
            Latest News
          </h2>
          <Link
            href="/latest"
            className="text-xs font-medium uppercase tracking-wide text-accent hover:underline"
          >
            View All Latest
          </Link>
        </div>
        <ul className="flex flex-col divide-y divide-border-gray">
          {articles.map((article) => (
            <li key={article.slug}>
              <StoryRow article={article} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
