import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import PaginationButton from "./PaginationButton";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl?: string;
  searchParams?: Record<string, string>;
  onPageChange?: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  baseUrl = "",
  searchParams = {},
  onPageChange,
}: PaginationProps) => {
  const { t } = useLanguage();
  if (totalPages <= 1) return null;

  const getPageUrl = (page: number) => {
    if (onPageChange) return undefined;
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
    <nav className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
      {/* Previous */}
      <PaginationButton
        href={
          !onPageChange && currentPage > 1
            ? getPageUrl(currentPage - 1)
            : undefined
        }
        onClick={
          onPageChange && currentPage > 1
            ? () => onPageChange(currentPage - 1)
            : undefined
        }
        disabled={currentPage <= 1}
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">
          {" "}
          {t.inventory.paginationPrevious}
        </span>
      </PaginationButton>

      {/* Middle pages */}
      <div className="flex items-center gap-1">
        {visiblePages.map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`dots-${index}`}
                className="w-8 h-9 sm:w-8 sm:h-10 flex items-center justify-center text-sm font-bold text-slate-400 select-none tracking-widest"
              >
                …
              </span>
            );
          }

          const pageNumber = page as number;
          const isCurrent = pageNumber === currentPage;

          if (isCurrent) {
            return (
              <span
                key={pageNumber}
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-sm font-semibold rounded-xl bg-indigo-600 text-white shadow-xs border border-indigo-500/30 select-none"
              >
                {pageNumber}
              </span>
            );
          }

          if (onPageChange) {
            return (
              <button
                type="button"
                key={pageNumber}
                onClick={() => onPageChange(pageNumber)}
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-sm font-medium rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 transition-all hover:border-slate-300 dark:hover:border-slate-600 cursor-pointer active:scale-95 shadow-2xs"
              >
                {pageNumber}
              </button>
            );
          }

          return (
            <Link
              key={pageNumber}
              href={getPageUrl(pageNumber) || "#"}
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-sm font-medium rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 transition-all hover:border-slate-300 dark:hover:border-slate-600 shadow-2xs"
            >
              {pageNumber}
            </Link>
          );
        })}
      </div>

      {/* Next */}
      <PaginationButton
        href={
          !onPageChange && currentPage < totalPages
            ? getPageUrl(currentPage + 1)
            : undefined
        }
        onClick={
          onPageChange && currentPage < totalPages
            ? () => onPageChange(currentPage + 1)
            : undefined
        }
        disabled={currentPage >= totalPages}
      >
        <span className="hidden sm:inline">{t.inventory.paginationNext} </span>
        <ChevronRight className="w-4 h-4" />
      </PaginationButton>
    </nav>
  );
};

export default Pagination;
