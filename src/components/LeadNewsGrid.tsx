import Image from "next/image";
import Link from "next/link";
import CategoryLabel from "@/components/CategoryLabel";
import type { ArticleListItem } from "@/types/article";

interface LeadNewsGridProps {
  main: ArticleListItem;
  secondary: ArticleListItem[];
  latest: ArticleListItem[];
}

export default function LeadNewsGrid({ main, secondary, latest }: LeadNewsGridProps) {
  return (
    <section
      aria-label="Top stories"
      className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-8 sm:px-6 md:grid-cols-2 lg:grid-cols-[50%_27%_23%] lg:gap-6"
    >
      <article className="md:col-span-2 lg:col-span-1 lg:pr-6 lg:border-r lg:border-border-gray">
        <Link href={`/article/${main.slug}`} className="block">
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-light-gray">
            <Image
              src={main.coverImage}
              alt={main.title}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </Link>
        <div className="mt-4">
          <CategoryLabel category={main.category} />
          <h1 className="mt-2 font-serif text-3xl font-bold leading-tight text-headline sm:text-4xl">
            <Link href={`/article/${main.slug}`} className="hover:underline">
              {main.title}
            </Link>
          </h1>
          <p className="mt-3 text-base leading-relaxed text-charcoal">{main.excerpt}</p>
          <Link
            href={`/article/${main.slug}`}
            className="mt-3 inline-block text-sm font-semibold text-accent hover:underline"
          >
            Read the full story
          </Link>
        </div>
      </article>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:flex lg:flex-col lg:pr-6 lg:border-r lg:border-border-gray">
        {secondary.map((story) => (
          <article key={story.slug}>
            <Link href={`/article/${story.slug}`} className="block">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-light-gray">
                <Image
                  src={story.coverImage}
                  alt={story.title}
                  fill
                  sizes="(min-width: 1024px) 27vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Link>
            <div className="mt-3">
              <CategoryLabel category={story.category} />
              <h2 className="mt-1.5 font-serif text-xl font-bold leading-snug text-headline">
                <Link href={`/article/${story.slug}`} className="hover:underline">
                  {story.title}
                </Link>
              </h2>
            </div>
          </article>
        ))}
      </div>

      <div className="md:col-span-2 lg:col-span-1">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-medium-gray">
          Latest
        </h2>
        <ul className="flex flex-col divide-y divide-border-gray">
          {latest.map((story) => (
            <li key={story.slug} className="py-3 first:pt-0">
              <CategoryLabel category={story.category} className="mb-1" />
              <h3 className="font-serif text-base font-semibold leading-snug text-headline">
                <Link href={`/article/${story.slug}`} className="hover:underline">
                  {story.title}
                </Link>
              </h3>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
