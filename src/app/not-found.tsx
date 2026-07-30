import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl border-t border-border-gray px-4 py-20 text-center sm:px-6">
      <h1 className="font-serif text-3xl font-bold text-headline sm:text-4xl">
        Page Not Found
      </h1>
      <p className="mt-4 text-base leading-relaxed text-charcoal">
        The story or page you requested may have moved or is no longer available.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block text-sm font-semibold uppercase tracking-wide text-accent hover:underline"
      >
        Return to Alabama Daily Journal
      </Link>
    </div>
  );
}
