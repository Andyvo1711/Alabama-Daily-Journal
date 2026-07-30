import Image from "next/image";
import Link from "next/link";
import CategoryLabel from "@/components/CategoryLabel";
import type { ArticleListItem } from "@/types/article";

interface AlabamaBusinessProps {
  main: ArticleListItem;
  compact: ArticleListItem[];
}

export default function AlabamaBusiness({ main, compact }: AlabamaBusinessProps) {
  return (
    <section aria-label="Alabama business" className="border-b border-border-gray">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-6 flex items-center justify-between border-b border-headline pb-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-headline">
            Alabama Business
          </h2>
          <Link
            href="/category/business-leaders"
            className="text-xs font-medium uppercase tracking-wide text-accent hover:underline"
          >
            More Business Leaders
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          <Link href={`/article/${main.slug}`} className="block">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-light-gray">
              <Image
                src={main.coverImage}
                alt={main.title}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Link>
          <div className="flex flex-col justify-center">
            <CategoryLabel category={main.category} />
            <h3 className="mt-2 font-serif text-2xl font-bold leading-tight text-headline">
              <Link href={`/article/${main.slug}`} className="hover:underline">
                {main.title}
              </Link>
            </h3>
            <p className="mt-3 text-base leading-relaxed text-charcoal">{main.excerpt}</p>
          </div>
        </div>

        <ul className="mt-8 grid grid-cols-1 divide-y divide-border-gray border-t border-border-gray sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
          {compact.map((story) => (
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
