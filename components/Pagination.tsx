import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  searchParams: Record<string, string>;
}

const Pagination = ({
  currentPage,
  totalPages,
  baseUrl,
  searchParams,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const getPageUrl = (page: number) => {
    const params = new URLSearchParams({ ...searchParams, page: String(page) });
    return `${baseUrl}?${params.toString()}`;
  };

  const getVisiblePages = () => {
    const delta = 2;
    const range: (number | string)[] = [];
    const output: (number | string)[] = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      output.push(1, "...");
    } else {
      output.push(1);
    }

    output.push(...range);

    if (currentPage + delta < totalPages - 1) {
      output.push("...", totalPages);
    } else if (totalPages > 1) {
      output.push(totalPages);
    }

    return output;
  };

  const visiblePages = getVisiblePages();

  return (
    <nav className='flex items-center justify-center gap-2'>
      {/* Previous */}
      {currentPage <= 1 ? (
        <span
          className='flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg
          text-slate-400 bg-slate-100 cursor-not-allowed select-none'
        >
          <ChevronLeft className='w-4 h-4' /> Précédent
        </span>
      ) : (
        <Link
          href={getPageUrl(currentPage - 1)}
          className='flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg
          text-slate-700 hover:bg-slate-100 bg-white border border-slate-200 transition-colors hover:border-slate-300'
        >
          <ChevronLeft className='w-4 h-4' /> Précédent
        </Link>
      )}

      {/* Middle pages */}
      <div className='flex items-center gap-1'>
        {visiblePages.map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`dots-${index}`}
                className='px-3 py-2 text-sm text-slate-500 select-none'
              >
                ...
              </span>
            );
          }

          const pageNumber = page as number;
          const isCurrent = pageNumber === currentPage;

          return isCurrent ? (
            <span
              key={pageNumber}
              className='min-w-10 px-3 py-2 text-sm font-semibold rounded-lg bg-slate-800 text-white shadow-sm text-center'
            >
              {pageNumber}
            </span>
          ) : (
            <Link
              key={pageNumber}
              href={getPageUrl(pageNumber)}
              className='min-w-10 px-3 py-2 text-sm font-medium rounded-lg text-center
              text-slate-700 hover:bg-slate-100 bg-white border border-slate-200 transition-colors hover:border-slate-300'
            >
              {pageNumber}
            </Link>
          );
        })}
      </div>

      {/* Next */}
      {currentPage >= totalPages ? (
        <span
          className='flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg
          text-slate-400 bg-slate-100 cursor-not-allowed select-none'
        >
          Suivant <ChevronRight className='w-4 h-4' />
        </span>
      ) : (
        <Link
          href={getPageUrl(currentPage + 1)}
          className='flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg
          text-slate-700 hover:bg-slate-100 bg-white border border-slate-200 transition-colors hover:border-slate-300'
        >
          Suivant <ChevronRight className='w-4 h-4' />
        </Link>
      )}
    </nav>
  );
};

export default Pagination;
