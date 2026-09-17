"use client";

import { usePathname } from "next/navigation";

// ---------------------------------------------------------------------------
// Shared primitive
// ---------------------------------------------------------------------------
function Sk({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800 ${className}`}
    />
  );
}

// ---------------------------------------------------------------------------
// Shared page shell — matches PageLayout exactly
// ---------------------------------------------------------------------------
function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-950 relative min-h-0 transition-colors duration-200">
      <div className="px-3 pt-3 pb-20 sm:px-6 sm:pt-8 sm:pb-20 lg:ml-64 lg:px-8 lg:pt-4 lg:pb-4 2xl:pt-6 2xl:pb-6 flex flex-col lg:flex-1 lg:min-h-0">
        {/* Header */}
        <div className="w-full max-w-7xl mx-auto mb-3 sm:mb-6 lg:mb-3 2xl:mb-5 text-center shrink-0 px-1">
          <Sk className="h-7 sm:h-8 w-40 sm:w-52 mx-auto mb-1.5" />
          <Sk className="h-4 w-48 sm:w-64 mx-auto" />
        </div>
        {/* Content */}
        <div className="w-full max-w-7xl mx-auto lg:flex-1 lg:min-h-0 lg:flex lg:flex-col">
          {children}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Dashboard skeleton
// ---------------------------------------------------------------------------
function DashboardSkeleton() {
  return (
    <Shell>
      {/* 3 stat cards */}
      <div className="grid grid-cols-3 gap-2.5 lg:gap-3.5 xl:gap-5 mb-3 lg:mb-3.5 shrink-0">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2.5 lg:p-4 shadow-sm flex flex-col items-center lg:items-start gap-2"
          >
            <Sk className="w-full h-10 lg:w-11 lg:h-11 rounded-xl" />
            <Sk className="h-6 lg:h-8 w-16 lg:w-20" />
            <Sk className="h-3 w-20 lg:w-28" />
          </div>
        ))}
      </div>

      {/* Chart + Recent products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 lg:gap-3.5 xl:gap-5 mb-3 lg:mb-3.5">
        {/* Chart card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 sm:p-4 shadow-sm flex flex-col gap-2.5">
          <Sk className="h-5 w-40 sm:w-52" />
          <Sk className="h-36 sm:h-40 lg:h-38 xl:h-44 w-full rounded-xl" />
        </div>

        {/* Recent products card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 sm:p-4 shadow-sm flex flex-col gap-2.5">
          <Sk className="h-5 w-36 sm:w-44 mx-auto lg:mx-0" />
          <div className="space-y-1.5 flex-1 flex flex-col justify-center">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60"
              >
                <div className="flex items-center gap-2.5">
                  <Sk className="w-2.5 h-2.5 rounded-full shrink-0" />
                  <Sk className="h-3.5 w-24 sm:w-32" />
                </div>
                <Sk className="h-3.5 w-12 sm:w-16" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stock levels / donut */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 sm:p-4 shadow-sm mb-6 lg:mb-0">
        <Sk className="h-5 w-48 sm:w-64 mx-auto lg:mx-0 mb-2.5" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4 items-center">
          {/* Donut */}
          <div className="flex items-center justify-center py-1">
            <div className="relative w-36 h-36 sm:w-40 sm:h-40">
              <Sk className="w-full h-full rounded-full" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white dark:bg-slate-900 w-24 h-24 sm:w-28 sm:h-28 rounded-full flex flex-col items-center justify-center gap-1.5">
                  <Sk className="h-7 w-14" />
                  <Sk className="h-3 w-10" />
                </div>
              </div>
            </div>
          </div>
          {/* Legend */}
          <div className="flex flex-col gap-1.5 lg:gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-slate-50 dark:bg-slate-800/60"
              >
                <div className="flex items-center gap-3">
                  <Sk className="w-3.5 h-3.5 rounded-full shrink-0" />
                  <Sk className="h-3.5 w-20 sm:w-28" />
                </div>
                <Sk className="h-5 w-10 sm:w-12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}

// ---------------------------------------------------------------------------
// Inventory skeleton
// ---------------------------------------------------------------------------
function InventorySkeleton() {
  return (
    <Shell>
      {/* Filter bar + add button */}
      <div className="flex items-center justify-between gap-2 mb-3 shrink-0">
        <div className="flex items-center gap-2">
          <Sk className="h-9 w-9 rounded-xl" />
          <Sk className="h-9 w-24 rounded-xl" />
        </div>
        <Sk className="h-9 w-28 rounded-xl hidden lg:block" />
      </div>

      {/* Table header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        {/* Column headers */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100 dark:border-slate-800">
          <Sk className="w-4 h-4 rounded" />
          <Sk className="h-3.5 flex-1" />
          <Sk className="h-3.5 w-16 hidden sm:block" />
          <Sk className="h-3.5 w-16 hidden md:block" />
          <Sk className="h-3.5 w-20 hidden lg:block" />
          <Sk className="h-3.5 w-24" />
          <Sk className="h-3.5 w-8" />
        </div>

        {/* Rows */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-50 dark:border-slate-800/60 last:border-0"
          >
            <Sk className="w-4 h-4 rounded shrink-0" />
            <Sk className="h-4 flex-1 max-w-[140px] sm:max-w-[200px]" />
            <Sk className="h-4 w-16 hidden sm:block" />
            <Sk className="h-4 w-16 hidden md:block" />
            <div className="hidden lg:flex items-center gap-2">
              <Sk className="h-8 w-8 rounded-lg" />
              <Sk className="h-4 w-8" />
              <Sk className="h-8 w-8 rounded-lg" />
            </div>
            <Sk className="h-6 w-20 rounded-full" />
            <Sk className="h-7 w-7 rounded-lg" />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-3 shrink-0">
        <Sk className="h-4 w-32" />
        <div className="flex items-center gap-1.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <Sk key={i} className="h-9 w-9 rounded-lg" />
          ))}
        </div>
      </div>
    </Shell>
  );
}

// ---------------------------------------------------------------------------
// Add product skeleton
// ---------------------------------------------------------------------------
function AddProductSkeleton() {
  return (
    <Shell>
      <div className="max-w-lg mx-auto w-full">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col gap-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col gap-1.5">
              <Sk className="h-4 w-24" />
              <Sk className="h-10 w-full rounded-xl" />
            </div>
          ))}
          <Sk className="h-11 w-full rounded-xl mt-2" />
        </div>
      </div>
    </Shell>
  );
}

// ---------------------------------------------------------------------------
// Generic fallback skeleton
// ---------------------------------------------------------------------------
function GenericSkeleton() {
  return (
    <Shell>
      <div className="flex flex-col gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col gap-3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <Sk
              key={i}
              className={`h-4 ${i % 3 === 0 ? "w-3/4" : i % 3 === 1 ? "w-full" : "w-1/2"}`}
            />
          ))}
        </div>
      </div>
    </Shell>
  );
}

// ---------------------------------------------------------------------------
// Landing page skeleton (/)
// ---------------------------------------------------------------------------
function LandingSkeleton() {
  return (
    <div className="flex flex-col flex-1 bg-white dark:bg-slate-950 transition-colors duration-200">
      {/* Header */}
      <div className="sticky top-0 z-50 h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 px-6 flex items-center justify-between shrink-0">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Sk className="w-7 h-7 rounded-lg" />
          <Sk className="h-5 w-16" />
        </div>
        {/* Right: theme + lang + CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Sk className="w-9 h-9 rounded-xl" />
          <Sk className="w-16 h-9 rounded-xl" />
          <Sk className="w-24 h-9 rounded-xl" />
        </div>
      </div>

      <main className="flex-1 flex flex-col w-full pt-4 md:pt-6 pb-6 px-4 md:px-8">
        {/* Hero text */}
        <section className="w-full max-w-4xl mx-auto flex flex-col items-center text-center mb-8 md:mb-12 mt-2 md:mt-6 shrink-0">
          <Sk className="h-10 sm:h-14 md:h-16 w-72 sm:w-96 md:w-[480px] mb-2" />
          <Sk className="h-10 sm:h-14 md:h-16 w-48 sm:w-64 md:w-80 mb-6" />
          <Sk className="h-4 w-64 sm:w-80 mb-1" />
          <Sk className="h-4 w-48 sm:w-64 mb-6" />
          <Sk className="h-11 w-36 rounded-md" />
        </section>

        {/* Dashboard mockup preview */}
        <section className="w-full max-w-7xl mx-auto flex-1 min-h-[480px] flex flex-col">
          <div className="w-full h-full flex-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2.5 shadow-2xl shadow-slate-200/40 dark:shadow-slate-950/60 flex flex-col overflow-hidden">
            <div className="w-full h-full rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-col overflow-hidden flex-1">
              {/* Browser chrome */}
              <div className="relative h-10 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-4 shrink-0">
                <div className="flex gap-1.5 z-10">
                  <div className="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-700" />
                  <div className="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-700" />
                  <div className="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-700" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <Sk className="h-5 w-40 rounded-full" />
                </div>
              </div>
              {/* App shell */}
              <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className="hidden md:flex flex-col w-52 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 gap-3 shrink-0">
                  <div className="flex items-center gap-2 mb-4">
                    <Sk className="w-7 h-7 rounded-lg" />
                    <Sk className="h-5 w-16" />
                  </div>
                  <Sk className="h-9 w-full rounded-xl" />
                  {[0, 1, 2].map((i) => (
                    <Sk key={i} className="h-8 w-full rounded-xl" />
                  ))}
                  <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-800">
                    <Sk className="h-8 w-full rounded-lg" />
                  </div>
                </div>
                {/* Content */}
                <div className="flex-1 p-3 sm:p-5 flex flex-col gap-3 sm:gap-4 bg-slate-50 dark:bg-slate-950 overflow-hidden">
                  <div className="flex flex-col gap-1">
                    <Sk className="h-6 w-36 sm:w-44" />
                    <Sk className="h-3 w-48 sm:w-64" />
                  </div>

                  {/* 3 StatCards */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 sm:p-3 flex flex-col gap-2 shadow-sm"
                      >
                        <Sk className="w-8 h-8 rounded-lg" />
                        <Sk className="h-5 w-14 sm:w-20" />
                        <Sk className="h-3 w-12 sm:w-16" />
                      </div>
                    ))}
                  </div>

                  {/* Middle row: Chart + Recent list */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 flex flex-col gap-2 shadow-sm">
                      <Sk className="h-4 w-36" />
                      <Sk className="h-28 sm:h-36 w-full rounded-lg" />
                    </div>
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 flex flex-col gap-2 shadow-sm">
                      <Sk className="h-4 w-32" />
                      <div className="space-y-2">
                        {[0, 1, 2, 3].map((k) => (
                          <div
                            key={k}
                            className="flex items-center justify-between p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60"
                          >
                            <div className="flex items-center gap-2">
                              <Sk className="w-2 h-2 rounded-full" />
                              <Sk className="h-3 w-20 sm:w-24" />
                            </div>
                            <Sk className="h-3 w-8" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom row: Donut & Legend */}
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-sm flex flex-col gap-2">
                    <Sk className="h-4 w-40" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                      <div className="flex items-center justify-center py-2">
                        <Sk className="w-24 h-24 rounded-full" />
                      </div>
                      <div className="space-y-2">
                        {[0, 1, 2].map((k) => (
                          <Sk key={k} className="h-8 w-full rounded-lg" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sign in page skeleton (/sign-in)
// ---------------------------------------------------------------------------
function SignInSkeleton() {
  return (
    <div className="flex-1 flex flex-col min-h-dvh sm:min-h-0 justify-between relative bg-white dark:bg-slate-950 transition-colors duration-200">
      {/* Theme & Language Toggles in top right */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex items-center gap-2">
        <Sk className="w-9 h-9 rounded-xl" />
        <Sk className="w-9 h-9 rounded-xl" />
      </div>

      <div className="flex-1 flex items-center justify-center p-3 sm:p-6 bg-linear-to-br from-slate-100 via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors">
        <div className="w-full max-w-md my-auto flex flex-col items-center">
          {/* Logo Header */}
          <div className="text-center mb-3 sm:mb-6 flex flex-col items-center w-full">
            <div className="inline-flex items-center space-x-2 sm:space-x-3 mb-1 sm:mb-4">
              <Sk className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg" />
              <div className="flex flex-col gap-1 text-left">
                <Sk className="h-5 w-16" />
                <Sk className="h-3 w-14" />
              </div>
            </div>
            <Sk className="h-7 sm:h-8 w-48 mb-1.5" />
            <Sk className="h-4 w-64 max-w-xs" />
          </div>

          {/* Form Card Skeleton */}
          <div className="w-full bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl shadow-md sm:shadow-xl border border-slate-200 dark:border-slate-800 p-4 sm:p-8 mb-2.5 sm:mb-4 flex flex-col gap-4">
            {/* Google OAuth Button Skeleton */}
            <Sk className="h-9 w-full rounded-md" />

            {/* Separator Skeleton */}
            <div className="flex items-center justify-center my-1 gap-2">
              <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
              <Sk className="h-3 w-6" />
              <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
            </div>

            <div className="flex flex-col gap-1.5">
              <Sk className="h-3.5 w-16" />
              <Sk className="h-9 w-full rounded-md" />
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <Sk className="h-3.5 w-24" />
                <Sk className="h-3.5 w-28" />
              </div>
              <Sk className="h-9 w-full rounded-md" />
            </div>
            <Sk className="h-9 w-full rounded-md mt-2" />
          </div>

          {/* Demo Account Credentials Skeleton */}
          <div className="w-full bg-linear-to-br from-slate-800 to-slate-900 dark:from-slate-900 dark:to-slate-950 rounded-xl border border-slate-700 dark:border-slate-800 p-3 sm:p-5 mb-2.5 sm:mb-5 shadow-md flex flex-col gap-3">
            <div className="relative flex items-center justify-center min-h-[24px]">
              <div className="absolute left-0">
                <Sk className="w-6 h-6 rounded-md" />
              </div>
              <Sk className="h-4 w-36" />
            </div>
            <Sk className="h-9 w-full rounded-lg" />
          </div>

          {/* Footer links */}
          <div className="w-full flex items-center justify-between px-1">
            <Sk className="h-4 w-16" />
            <Sk className="h-4 w-36" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------
export default function Loading() {
  const pathname = usePathname();

  if (pathname === "/" || pathname === "") return <LandingSkeleton />;
  if (pathname?.includes("/sign-in") || pathname?.includes("/sign-up"))
    return <SignInSkeleton />;
  if (pathname?.includes("/dashboard")) return <DashboardSkeleton />;
  if (pathname?.includes("/inventory")) return <InventorySkeleton />;
  if (pathname?.includes("/add-product")) return <AddProductSkeleton />;
  return <GenericSkeleton />;
}
