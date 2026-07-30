"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { categories } from "@/config/categories";

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const menuId = useId();
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  function handleSearchSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    setIsOpen(false);
    router.push(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : "/search");
  }

  return (
    <div className="border-b border-border-gray bg-paper sm:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-sm font-semibold uppercase tracking-wide text-charcoal">
          Menu
        </span>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={menuId}
          onClick={() => setIsOpen((prev) => !prev)}
          className="border border-border-gray px-3 py-1.5 text-sm font-medium uppercase tracking-wide text-charcoal"
        >
          {isOpen ? "Close" : "Menu"}
        </button>
      </div>

      {isOpen && (
        <div id={menuId} className="border-t border-border-gray px-4 py-4">
          <form onSubmit={handleSearchSubmit} className="mb-4 flex gap-2" role="search">
            <label htmlFor="mobile-search-input" className="sr-only">
              Search Alabama news
            </label>
            <input
              id="mobile-search-input"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search Alabama news"
              className="w-full border border-border-gray px-3 py-2 text-sm text-headline placeholder:text-medium-gray"
            />
            <button
              type="submit"
              className="border border-charcoal px-3 py-2 text-sm font-medium uppercase tracking-wide text-charcoal"
            >
              Go
            </button>
          </form>
          <ul className="flex flex-col divide-y divide-border-gray">
            {categories
              .slice()
              .sort((a, b) => a.navigationOrder - b.navigationOrder)
              .map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/category/${category.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="block py-3 text-sm font-medium uppercase tracking-wide text-charcoal hover:text-accent"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            <li>
              <Link
                href="/latest"
                onClick={() => setIsOpen(false)}
                className="block py-3 text-sm font-medium uppercase tracking-wide text-charcoal hover:text-accent"
              >
                Latest
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
