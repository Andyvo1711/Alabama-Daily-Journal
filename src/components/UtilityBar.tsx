import Link from "next/link";
import { formatEditionDate } from "@/lib/dates";
import { siteConfig } from "@/config/site";

export default function UtilityBar() {
  const edition = formatEditionDate();

  return (
    <div className="border-b border-border-gray bg-paper">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2 text-xs uppercase tracking-wide text-medium-gray sm:px-6">
        <span>{edition}</span>
        <div className="hidden items-center gap-4 sm:flex">
          <span className="normal-case tracking-normal text-medium-gray">
            {siteConfig.supportingLine}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/latest" className="hover:text-accent hover:underline">
            Latest
          </Link>
          <Link href="/search" className="hover:text-accent hover:underline">
            Search
          </Link>
        </div>
      </div>
    </div>
  );
}
