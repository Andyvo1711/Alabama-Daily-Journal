import Image from "next/image";
import Link from "next/link";
import CategoryLabel from "@/components/CategoryLabel";
import type { ArticleListItem } from "@/types/article";

interface BeautyWellnessSectionProps {
  main: ArticleListItem;
  secondary: ArticleListItem[];
}

export default function BeautyWellnessSection({ main, secondary }: BeautyWellnessSectionProps) {
  return (
    <section aria-label="Beauty and wellness" className="border-b border-border-gray">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-6 flex items-center justify-between border-b border-headline pb-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-headline">
            Beauty &amp; Wellness
          </h2>
          <Link
            href="/category/beauty-wellness"
            className="text-xs font-medium uppercase tracking-wide text-accent hover:underline"
          >
            More Wellness
          </Link>
        </div>

        <Link href={`/article/${main.slug}`} className="block">
          <div className="relative aspect-[21/9] w-full overflow-hidden bg-light-gray">
            <Image
              src={main.coverImage}
              alt={main.title}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </Link>
        <div className="mt-4">
          <CategoryLabel category={main.category} />
          <h3 className="mt-2 font-serif text-2xl font-bold leading-tight text-headline">
            <Link href={`/article/${main.slug}`} className="hover:underline">
              {main.title}
            </Link>
          </h3>
        </div>

        <ul className="mt-8 grid grid-cols-1 divide-y divide-border-gray border-t border-border-gray sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
          {secondary.map((story) => (
            <li key={story.slug} className="py-4 sm:px-6 sm:py-0 sm:pt-4 first:sm:pl-0">
              <h4 className="font-serif text-base font-semibold leading-snug text-headline">
                <Link href={`/article/${story.slug}`} className="hover:underline">
                  {story.title}
                </Link>
              </h4>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
