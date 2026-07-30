import Link from "next/link";
import StoryRow from "@/components/StoryRow";
import type { ArticleListItem } from "@/types/article";

interface CommunityReportProps {
  articles: ArticleListItem[];
  locationLabels?: Record<string, string>;
}

export default function CommunityReport({ articles, locationLabels = {} }: CommunityReportProps) {
  return (
    <section aria-label="Community report" className="border-b border-border-gray">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-2 flex items-center justify-between border-b border-headline pb-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-headline">
            Community Report
          </h2>
          <Link
            href="/category/community"
            className="text-xs font-medium uppercase tracking-wide text-accent hover:underline"
          >
            More Community
          </Link>
        </div>
        <ul className="flex flex-col divide-y divide-border-gray">
          {articles.map((article, index) => (
            <li key={article.slug}>
              <StoryRow
                article={article}
                showThumbnail={index % 2 === 0}
                locationLabel={locationLabels[article.slug]}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
