import Image from "next/image";
import Link from "next/link";
import CategoryLabel from "@/components/CategoryLabel";
import type { ArticleListItem } from "@/types/article";

interface RelatedStoriesProps {
  articles: ArticleListItem[];
}

export default function RelatedStories({ articles }: RelatedStoriesProps) {
  if (articles.length === 0) {
    return null;
  }

  return (
    <section aria-label="Related stories" className="mt-12 border-t border-border-gray pt-8">
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-medium-gray">
        Related Stories
      </h2>
      <ul className="flex flex-col divide-y divide-border-gray">
        {articles.map((article) => (
          <li key={article.slug} className="flex items-center gap-4 py-4 first:pt-0">
            <Link href={`/article/${article.slug}`} className="block shrink-0">
              <div className="relative h-16 w-20 overflow-hidden bg-light-gray">
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
            </Link>
            <div>
              <CategoryLabel category={article.category} className="mb-1" />
              <h3 className="font-serif text-base font-semibold leading-snug text-headline">
                <Link href={`/article/${article.slug}`} className="hover:underline">
                  {article.title}
                </Link>
              </h3>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
