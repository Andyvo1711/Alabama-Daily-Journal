import Link from "next/link";
import { categories } from "@/config/categories";

export default function PrimaryNavigation() {
  return (
    <nav
      aria-label="Primary"
      className="hidden border-b border-border-gray bg-paper sm:block"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-8 px-6 py-3 text-sm font-medium uppercase tracking-wide">
        {categories
          .slice()
          .sort((a, b) => a.navigationOrder - b.navigationOrder)
          .map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="text-charcoal hover:text-accent"
            >
              {category.label}
            </Link>
          ))}
        <form action="/search" method="get" role="search" className="flex gap-1">
          <label htmlFor="header-search-input" className="sr-only">
            Search Alabama news
          </label>
          <input
            id="header-search-input"
            type="search"
            name="q"
            placeholder="Search"
            className="w-36 border border-border-gray bg-paper px-3 py-1.5 text-sm normal-case tracking-normal text-headline placeholder:text-medium-gray focus:border-accent"
          />
          <button
            type="submit"
            className="border border-charcoal px-3 py-1.5 text-sm font-medium uppercase tracking-wide text-charcoal hover:bg-charcoal hover:text-paper"
          >
            Go
          </button>
        </form>
      </div>
    </nav>
  );
}
