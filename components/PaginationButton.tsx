import Link from "next/link";

interface PaginationButtonProps {
  href?: string;
  disabled: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

/** Reusable prev/next pagination button */
function PaginationButton({
  href,
  disabled,
  onClick,
  children,
}: PaginationButtonProps) {
  const baseClasses =
    "h-9 sm:h-10 px-3 sm:px-4 flex items-center gap-1.5 text-sm font-medium rounded-xl transition-all shadow-2xs";

  if (disabled) {
    return (
      <span
        className={`${baseClasses} text-slate-300 dark:text-slate-600 bg-slate-50/80 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 cursor-not-allowed select-none`}
      >
        {children}
      </span>
    );
  }

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${baseClasses} text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 cursor-pointer active:scale-95`}
      >
        {children}
      </button>
    );
  }

  return (
    <Link
      href={href || "#"}
      className={`${baseClasses} text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600`}
    >
      {children}
    </Link>
  );
}

export default PaginationButton;
