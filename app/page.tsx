"use client";

import { useUser } from "@stackframe/stack";
import { ArrowRight, Blocks } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Footer from "@/components/Footer";
import HeroDashboardMockup from "@/components/HeroDashboardMockup";
import LanguageToggle from "@/components/LanguageToggle";
import ThemeToggle from "@/components/ThemeToggle";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const user = useUser();
  const router = useRouter();
  const { t } = useLanguage();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  if (user) {
    return null;
  }

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 h-14 sm:h-15 flex items-center justify-between shrink-0 transition-colors">
        <div className="flex items-center gap-2">
          <div className="bg-linear-to-br from-indigo-600 to-indigo-700 rounded-lg p-1.5 shadow-xs">
            <Blocks className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white">
            Stokki
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <LanguageToggle />
          <Link
            href="/sign-in"
            className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
          >
            {t.nav.login}
          </Link>
        </div>
      </header>
      <main className="flex-1 flex flex-col justify-center items-center w-full pt-2 sm:pt-3 2xl:pt-4 pb-2 sm:pb-3 px-3 sm:px-6 lg:px-8 max-w-[1600px] mx-auto min-h-0">
        {/* Hero Text */}
        <section className="w-full max-w-3xl mx-auto flex flex-col items-center text-center shrink-0 mb-6 sm:mb-8 2xl:mb-10">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight mb-1 sm:mb-1.5">
            {t.landing.title1} <br className="hidden sm:block" />
            <span className="text-slate-500 dark:text-slate-400">
              {t.landing.title2}
            </span>
          </h1>

          <p className="text-xs sm:text-sm 2xl:text-base text-slate-600 dark:text-slate-300 font-normal max-w-lg mx-auto leading-normal mb-2 sm:mb-2.5">
            {t.landing.subtitle}
          </p>

          <Link
            href="/sign-in"
            className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-1.5 sm:px-5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-600/20"
          >
            <span>{t.landing.getStarted}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        {/* Dashboard Preview Section */}
        <section className="w-full max-w-6xl xl:max-w-7xl 2xl:max-w-[1440px] mx-auto flex flex-col min-h-0 shrink-0">
          <HeroDashboardMockup />
        </section>
      </main>
      <Footer />
    </>
  );
}
