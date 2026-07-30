import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function SiteMasthead() {
  return (
    <div className="border-b border-border-gray bg-paper py-8 text-center">
      <Link href="/" className="inline-block">
        <span className="font-serif text-4xl font-bold uppercase tracking-[0.08em] text-headline sm:text-5xl">
          {siteConfig.name}
        </span>
      </Link>
      <p className="mt-3 text-sm uppercase tracking-[0.2em] text-medium-gray">
        {siteConfig.tagline}
      </p>
    </div>
  );
}
