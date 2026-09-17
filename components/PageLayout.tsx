import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";

interface PageLayoutProps {
  title: React.ReactNode;
  subtitle?: string;
  badge?: React.ReactNode;
  children: React.ReactNode;
}

/** Shared page shell for authenticated routes */
export default function PageLayout({
  title,
  subtitle,
  badge,
  children,
}: PageLayoutProps) {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-950 relative min-h-0 transition-colors duration-200">
      <div className="px-3 pt-3 pb-20 sm:px-6 sm:pt-8 sm:pb-20 lg:ml-64 lg:px-8 lg:pt-4 lg:pb-4 2xl:pt-6 2xl:pb-6 3xl:pt-8 3xl:pb-8 flex flex-col lg:flex-1 lg:min-h-0">
        {/* Header */}
        <div className="w-full max-w-7xl 2xl:max-w-[1680px] 3xl:max-w-[1760px] mx-auto mb-3 sm:mb-6 lg:mb-3 2xl:mb-5 3xl:mb-8 text-center shrink-0 relative px-1">
          <div className="hidden lg:flex items-center gap-2 absolute right-2 2xl:right-4 top-1/2 -translate-y-1/2 z-30">
            <ThemeToggle />
            <LanguageToggle />
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-2xl 2xl:text-3xl 3xl:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs sm:text-sm 3xl:text-base text-slate-600 dark:text-slate-400 mt-0.5 2xl:mt-1 max-w-md mx-auto">
              {subtitle}
            </p>
          )}
          {badge}
        </div>
        <div className="w-full max-w-7xl 2xl:max-w-[1680px] 3xl:max-w-[1760px] mx-auto lg:flex-1 lg:min-h-0 lg:flex lg:flex-col">
          {children}
        </div>
      </div>
    </div>
  );
}
