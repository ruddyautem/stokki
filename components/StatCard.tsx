import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  iconBg?: string;
  iconColor?: string;
  accentBg?: string;
  borderColor?: string;
  value: string;
  label: string;
}

/** Reusable stats card for the dashboard: centered on mobile, classic left-aligned on large screens */
export default function StatCard({
  icon: Icon,
  iconBg = "bg-blue-50",
  iconColor = "text-blue-600",
  accentBg = "bg-white",
  borderColor = "border-slate-200/80",
  value,
  label,
}: StatCardProps) {
  return (
    <div
      className={`${accentBg} dark:bg-slate-900 dark:from-slate-900 dark:to-slate-900 border ${borderColor} dark:border-slate-800 rounded-2xl p-2.5 lg:p-4 xl:p-4.5 2xl:p-5 3xl:p-7 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-none hover:shadow-lg transition-all duration-200 flex flex-col justify-between items-center lg:items-start text-center lg:text-left group min-w-0 hover:-translate-y-0.5`}
    >
      {/* Mobile: Centered full-width container | Desktop: Left-aligned large icon */}
      <div className="w-full lg:w-auto mb-2 lg:mb-2.5 2xl:mb-3 3xl:mb-5">
        <div
          className={`w-full lg:w-11 lg:h-11 xl:w-12 xl:h-12 2xl:w-12 2xl:h-12 3xl:w-14 3xl:h-14 h-10 rounded-xl lg:rounded-xl 2xl:rounded-xl 3xl:rounded-2xl ${iconBg} flex items-center justify-center transition-transform duration-200 group-hover:scale-105 shadow-xs`}
        >
          <Icon
            className={`w-5 h-5 lg:w-6 lg:h-6 2xl:w-6.5 2xl:h-6.5 3xl:w-7.5 3xl:h-7.5 ${iconColor}`}
          />
        </div>
      </div>

      {/* Prominent Value & Label */}
      <div className="w-full flex flex-col items-center lg:items-start space-y-0.5 lg:space-y-1 min-w-0">
        <div className="w-full text-base lg:text-2xl xl:text-3xl 2xl:text-3xl 3xl:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight lg:leading-none truncate">
          {value}
        </div>
        <div className="w-full text-[11px] lg:text-xs xl:text-sm 2xl:text-sm 3xl:text-base font-semibold text-slate-500 dark:text-slate-400 tracking-normal truncate">
          {label}
        </div>
      </div>
    </div>
  );
}
