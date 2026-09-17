"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-slate-100 dark:border-slate-800 py-2.5 px-6 shrink-0 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-2 justify-center">
        <p className="text-[11px] text-slate-400 dark:text-slate-500">
          © {new Date().getFullYear()} Stokki.autem.dev.{" "}
          {t.landing.allRightsReserved}
        </p>
      </div>
    </footer>
  );
}
