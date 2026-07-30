import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

function pageHref(basePath: string, page: number): string {
  return page <= 1 ? basePath : `${basePath}?page=${page}`;
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <nav
      aria-label="Pagination"
      className="mt-8 flex items-center justify-between border-t border-border-gray pt-6"
    >
      {hasPrevious ? (
        <Link
          href={pageHref(basePath, currentPage - 1)}
          className="text-sm font-semibold uppercase tracking-wide text-accent hover:underline"
        >
          Previous
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}

      <span className="text-xs uppercase tracking-wide text-medium-gray">
        Page {currentPage} of {totalPages}
      </span>

      {hasNext ? (
        <Link
          href={pageHref(basePath, currentPage + 1)}
          className="text-sm font-semibold uppercase tracking-wide text-accent hover:underline"
        >
          Next
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}
    </nav>
  );
}
