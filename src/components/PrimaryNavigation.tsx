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
        <Link href="/search" className="text-charcoal hover:text-accent">
          Search
        </Link>
      </div>
    </nav>
  );
}
