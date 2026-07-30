import Image from "next/image";
import Link from "next/link";
import CategoryLabel from "@/components/CategoryLabel";
import type { ArticleListItem } from "@/types/article";

interface FinanceLedgerProps {
  articles: ArticleListItem[];
}

export default function FinanceLedger({ articles }: FinanceLedgerProps) {
  return (
    <section aria-label="Finance and economy" className="border-b border-border-gray">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-6 flex items-center justify-between border-b border-headline pb-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-headline">
            Finance &amp; Economy Ledger
          </h2>
          <Link
            href="/category/finance-economy"
            className="text-xs font-medium uppercase tracking-wide text-accent hover:underline"
          >
            More Finance
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 divide-y divide-border-gray sm:grid-cols-2 sm:gap-6 sm:divide-y-0 lg:grid-cols-4">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="pt-8 first:pt-0 sm:pt-0 sm:border-l sm:border-border-gray sm:pl-6 sm:first:border-l-0 sm:first:pl-0"
            >
              <Link href={`/article/${article.slug}`} className="block">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-light-gray">
                  <Image
                    src={article.coverImage}
                    alt={article.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
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
          ))}
        </div>
      </div>
    </section>
  );
}
