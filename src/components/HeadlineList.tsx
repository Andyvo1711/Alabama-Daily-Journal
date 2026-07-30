import Link from "next/link";
import CategoryLabel from "@/components/CategoryLabel";
import type { ArticleListItem } from "@/types/article";

interface HeadlineListProps {
  articles: ArticleListItem[];
  showCategory?: boolean;
  className?: string;
}

export default function HeadlineList({
  articles,
  showCategory = true,
  className = "",
}: HeadlineListProps) {
  return (
    <ul className={`flex flex-col divide-y divide-border-gray ${className}`}>
      {articles.map((article) => (
        <li key={article.slug} className="py-3 first:pt-0">
          {showCategory && <CategoryLabel category={article.category} className="mb-1" />}
          <h3 className="font-serif text-base font-semibold leading-snug text-headline">
            <Link href={`/article/${article.slug}`} className="hover:underline">
              {article.title}
            </Link>
          </h3>
        </li>
      ))}
    </ul>
  );
}
