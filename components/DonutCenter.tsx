"use client";

import { useLanguage } from "@/context/LanguageContext";

interface DonutCenterProps {
  percentage: number;
}

/** Center label shared between loaded and skeleton states of the donut chart */
export default function DonutCenter({ percentage }: DonutCenterProps) {
  const { t } = useLanguage();
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center">
        <div className="text-3xl font-bold text-slate-700 dark:text-slate-100 mb-0.5">
          {percentage}%
        </div>
        <div className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
          {t.dashboard.inStock}
        </div>
      </div>
    </div>
  );
}
