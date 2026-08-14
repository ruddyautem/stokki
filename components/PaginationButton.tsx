import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationButtonProps {
  href?: string;
  disabled: boolean;
  children: React.ReactNode;
}

/** Reusable prev/next pagination button */
function PaginationButton({ href, disabled, children }: PaginationButtonProps) {
  const baseClasses =
    "flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg";

  if (disabled) {
    return <span className={`${baseClasses} text-slate-400 bg-slate-100 cursor-not-allowed select-none`}>{children}</span>;
  }

  return (
    <Link href={href!} className={`${baseClasses} text-slate-700 hover:bg-slate-100 bg-white border border-slate-200 transition-colors hover:border-slate-300`}>
      {children}
    </Link>
  );
}

export default PaginationButton;
