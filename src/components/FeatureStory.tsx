import Image from "next/image";
import Link from "next/link";
import CategoryLabel from "@/components/CategoryLabel";
import type { ArticleListItem } from "@/types/article";

interface FeatureStoryProps {
  article: ArticleListItem;
}

export default function FeatureStory({ article }: FeatureStoryProps) {
  return (
    <article className="grid grid-cols-1 gap-6 md:grid-cols-[55%_45%] md:gap-8">
      <Link href={`/article/${article.slug}`} className="block">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-light-gray">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            priority
            sizes="(min-width: 768px) 55vw, 100vw"
            className="object-cover"
          />
        </div>
      </Link>
      <div className="flex flex-col justify-center">
        <CategoryLabel category={article.category} />
        <h2 className="mt-2 font-serif text-2xl font-bold leading-tight text-headline sm:text-3xl">
          <Link href={`/article/${article.slug}`} className="hover:underline">
            {article.title}
          </Link>
        </h2>
        <p className="mt-3 text-base leading-relaxed text-charcoal">{article.excerpt}</p>
        <Link
          href={`/article/${article.slug}`}
          className="mt-3 inline-block text-sm font-semibold text-accent hover:underline"
        >
          Read the full story
        </Link>
      </div>
    </article>
  );
}
