import Image from "next/image";
import Link from "next/link";
import CategoryLabel from "@/components/CategoryLabel";
import type { ArticleListItem } from "@/types/article";

interface StoryColumnProps {
  article: ArticleListItem;
}

export default function StoryColumn({ article }: StoryColumnProps) {
  return (
    <article>
      <Link href={`/article/${article.slug}`} className="block">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-light-gray">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </Link>
      <div className="mt-3">
        <CategoryLabel category={article.category} />
        <h3 className="mt-1.5 font-serif text-lg font-bold leading-snug text-headline">
          <Link href={`/article/${article.slug}`} className="hover:underline">
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-charcoal">{article.excerpt}</p>
      </div>
    </article>
  );
}
