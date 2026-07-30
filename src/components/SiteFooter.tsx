import Link from "next/link";
import { categories } from "@/config/categories";
import { siteConfig } from "@/config/site";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-gray bg-paper">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <span className="font-serif text-xl font-bold uppercase tracking-wide text-headline">
          {siteConfig.name}
        </span>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-charcoal">
          {siteConfig.supportingLine}
        </p>

        <nav aria-label="Footer categories" className="mt-6">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium uppercase tracking-wide text-charcoal">
            {categories
              .slice()
              .sort((a, b) => a.navigationOrder - b.navigationOrder)
              .map((category) => (
                <li key={category.slug}>
                  <Link href={`/category/${category.slug}`} className="hover:text-accent">
                    {category.label}
                  </Link>
                </li>
              ))}
            <li>
              <Link href="/latest" className="hover:text-accent">
                Latest
              </Link>
            </li>
            <li>
              <Link href="/search" className="hover:text-accent">
                Search
              </Link>
            </li>
          </ul>
        </nav>

        <div className="mt-8 border-t border-border-gray pt-6 text-xs leading-relaxed text-medium-gray">
          <p>&copy; {year} {siteConfig.name}. All rights reserved.</p>
          <p className="mt-2 max-w-2xl">
            Alabama Daily Journal presents editorial content for informational purposes.
            Business Leaders profiles use fictional individuals and businesses unless a
            broader public trend is described. Coverage of named institutions reflects
            general reporting and does not include fabricated statements or statistics.
          </p>
        </div>
      </div>
    </footer>
  );
}
