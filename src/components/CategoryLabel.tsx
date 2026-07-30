import Link from "next/link";
import { getCategory } from "@/config/categories";
import type { CategorySlug } from "@/types/article";

interface CategoryLabelProps {
  category: CategorySlug;
  className?: string;
}

export default function CategoryLabel({ category, className = "" }: CategoryLabelProps) {
  const config = getCategory(category);
  const label = config ? config.shortLabel : category;

  return (
    <Link
      href={`/category/${category}`}
      className={`inline-block text-xs font-sans font-semibold uppercase tracking-wider text-accent hover:underline ${className}`}
    >
      {label}
    </Link>
  );
}
