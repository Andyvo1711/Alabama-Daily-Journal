import Image from "next/image";
import Link from "next/link";
import CategoryLabel from "@/components/CategoryLabel";
import type { ArticleListItem } from "@/types/article";

interface StoryRowProps {
  article: ArticleListItem;
  showThumbnail?: boolean;
  locationLabel?: string;
}

export default function StoryRow({
  article,
  showThumbnail = true,
  locationLabel,
}: StoryRowProps) {
  return (
    <article className="flex flex-col gap-4 py-5 sm:flex-row sm:items-start">
      {showThumbnail && (
        <Link
          href={`/article/${article.slug}`}
          className="block shrink-0 sm:order-2"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-light-gray sm:h-24 sm:w-32">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              sizes="128px"
              className="object-cover"
            />
          </div>
        </Link>
      )}
      <div className="flex-1 sm:order-1">
        <div className="flex items-center gap-3">
          <CategoryLabel category={article.category} />
          {locationLabel && (
            <span className="text-xs uppercase tracking-wide text-medium-gray">
              {locationLabel}
            </span>
          )}
        </div>
        <h3 className="mt-1.5 font-serif text-lg font-bold leading-snug text-headline">
          <Link href={`/article/${article.slug}`} className="hover:underline">
            {article.title}
          </Link>
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-charcoal">{article.excerpt}</p>
        <Link
          href={`/article/${article.slug}`}
          className="mt-1.5 inline-block text-xs font-semibold uppercase tracking-wide text-accent hover:underline"
        >
          Read
        </Link>
      </div>
    </article>
  );
}
