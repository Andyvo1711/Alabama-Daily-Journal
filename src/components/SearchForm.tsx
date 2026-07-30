interface SearchFormProps {
  defaultValue?: string;
}

export default function SearchForm({ defaultValue = "" }: SearchFormProps) {
  return (
    <form action="/search" method="get" role="search" className="flex gap-2">
      <label htmlFor="site-search-input" className="sr-only">
        Search Alabama news
      </label>
      <input
        id="site-search-input"
        type="search"
        name="q"
        defaultValue={defaultValue}
        placeholder="Search Alabama news"
        className="w-full border border-border-gray bg-paper px-4 py-2.5 text-sm text-headline placeholder:text-medium-gray focus:border-accent"
      />
      <button
        type="submit"
        className="border border-charcoal px-5 py-2.5 text-sm font-medium uppercase tracking-wide text-charcoal hover:bg-charcoal hover:text-paper"
      >
        Search
      </button>
    </form>
  );
}
