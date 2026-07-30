import Link from "next/link";
import CategoryLabel from "@/components/CategoryLabel";
import type { ArticleListItem } from "@/types/article";

interface DailyBriefProps {
  articles: ArticleListItem[];
}

export default function DailyBrief({ articles }: DailyBriefProps) {
  return (
    <section
      aria-label="Daily brief"
      className="border-y border-border-gray bg-newsprint"
    >
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-medium-gray">
          Daily Brief
        </h2>
        <ul className="flex flex-col divide-y divide-border-gray sm:grid sm:grid-cols-2 sm:divide-y-0 sm:gap-x-6 lg:grid-cols-5">
          {articles.map((article) => (
            <li
              key={article.slug}
              className="py-3 first:pt-0 sm:border-t sm:border-border-gray sm:py-0 sm:pt-3 lg:border-t-0 lg:border-l lg:pl-6 lg:pt-0 lg:first:border-l-0 lg:first:pl-0"
            >
              <CategoryLabel category={article.category} className="mb-1" />
              <h3 className="font-serif text-sm font-semibold leading-snug text-headline">
                <Link href={`/article/${article.slug}`} className="hover:underline">
                  {article.title}
                </Link>
              </h3>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
