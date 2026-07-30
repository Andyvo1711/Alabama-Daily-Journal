import Image from "next/image";
import Link from "next/link";
import { getCategory } from "@/config/categories";
import type { ArticleListItem, CategorySlug } from "@/types/article";

interface DeskColumnProps {
  categorySlug: CategorySlug;
  main: ArticleListItem;
  secondary: ArticleListItem[];
}

function DeskColumn({ categorySlug, main, secondary }: DeskColumnProps) {
  const config = getCategory(categorySlug);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between border-b border-headline pb-2">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-headline">
          {config?.label ?? categorySlug}
        </h2>
        <Link
          href={`/category/${categorySlug}`}
          className="text-xs font-medium uppercase tracking-wide text-accent hover:underline"
        >
          More
        </Link>
      </div>

      <Link href={`/article/${main.slug}`} className="block">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-light-gray">
          <Image
            src={main.coverImage}
            alt={main.title}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </Link>
      <h3 className="mt-3 font-serif text-xl font-bold leading-snug text-headline">
        <Link href={`/article/${main.slug}`} className="hover:underline">
          {main.title}
        </Link>
      </h3>

      <ul className="mt-4 flex flex-col divide-y divide-border-gray">
        {secondary.map((story) => (
          <li key={story.slug} className="py-3 first:pt-0">
            <h4 className="font-serif text-base font-semibold leading-snug text-headline">
              <Link href={`/article/${story.slug}`} className="hover:underline">
                {story.title}
              </Link>
            </h4>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface SplitDeskProps {
  education: { main: ArticleListItem; secondary: ArticleListItem[] };
  healthcare: { main: ArticleListItem; secondary: ArticleListItem[] };
}

export default function SplitDesk({ education, healthcare }: SplitDeskProps) {
  return (
    <section
      aria-label="Education and healthcare"
      className="border-b border-border-gray"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-10 sm:px-6 md:grid-cols-2 md:gap-8">
        <DeskColumn
          categorySlug="education"
          main={education.main}
          secondary={education.secondary}
        />
        <DeskColumn
          categorySlug="healthcare"
          main={healthcare.main}
          secondary={healthcare.secondary}
        />
      </div>
    </section>
  );
}
