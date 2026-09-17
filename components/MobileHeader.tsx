import { Blocks } from "lucide-react";
import Link from "next/link";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";

export default function MobileHeader() {
  return (
    <div className="lg:hidden px-4 pt-3 pb-2 flex items-center justify-between bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-sm border-b border-transparent dark:border-slate-850 transition-colors">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 active:opacity-75 transition-opacity"
        aria-label="Accueil Stokki"
      >
        <div className="bg-linear-to-br from-indigo-600 to-indigo-700 rounded-lg p-1.5 shadow-xs">
          <Blocks className="w-4 h-4 text-white" />
        </div>
        <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white">
          Stokki
        </span>
      </Link>
      <div className="flex items-center gap-1.5 relative z-30">
        <ThemeToggle />
        <LanguageToggle />
      </div>
    </div>
  );
}
