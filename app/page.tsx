"use client";

import { useUser } from "@stackframe/stack";
import { ArrowRight, Blocks } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-slate-900 selection:text-white text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-slate-900 p-1.5 rounded-md">
            <Blocks className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-lg tracking-tight">Stokki</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#demo"
            className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
          >
            Aperçu
          </a>
        </nav>

        <Link
          href="/sign-in"
          className="text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 transition-colors px-4 py-2 rounded-md"
        >
          Connexion
        </Link>
      </header>{" "}
      <main className="flex-1 flex flex-col items-center justify-center w-full h-full min-h-0 pt-8 pb-6 px-4 md:px-8">
        {/* Hero Text */}
        <section className="w-full max-w-4xl mx-auto flex flex-col items-center text-center shrink-0 mb-6 md:mb-10">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tighter text-slate-900 leading-[1.1] mb-4">
            Gérez vos stocks <br className="hidden sm:block" />
            <span className="text-slate-500">avec précision.</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-500 font-light max-w-2xl leading-relaxed mb-6">
            Une plateforme épurée, performante et sécurisée. Suivez vos
            inventaires en temps réel, anticipez les ruptures de stock et
            concentrez-vous sur le développement de votre activité.
          </p>

          <Link
            href="/sign-in"
            className="flex items-center justify-center gap-2 bg-slate-800 text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-slate-700 transition-colors shadow-sm"
          >
            Démarrer gratuitement
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        {/* Minimal Dashboard Preview (Fills remaining height) */}
        <section
          className="w-full max-w-[1400px] mx-auto flex-1 flex flex-col min-h-0 relative"
          id="demo"
        >
          <div className="w-full h-full rounded-xl border border-slate-200 bg-white p-2.5 shadow-2xl shadow-slate-200/40 flex flex-col overflow-hidden">
            <div className="w-full h-full rounded-lg border border-slate-100 bg-slate-50 flex flex-col overflow-hidden">
              {/* Browser Header */}
              <div className="h-10 xl:h-12 border-b border-slate-200 bg-white flex items-center px-4 xl:px-6 gap-3 xl:gap-4 shrink-0">
                <div className="flex gap-1.5 xl:gap-2">
                  <div className="w-3 h-3 xl:w-3.5 xl:h-3.5 rounded-full bg-slate-300" />
                  <div className="w-3 h-3 xl:w-3.5 xl:h-3.5 rounded-full bg-slate-300" />
                  <div className="w-3 h-3 xl:w-3.5 xl:h-3.5 rounded-full bg-slate-300" />
                </div>
                <div className="h-4 xl:h-5 w-28 xl:w-40 bg-slate-100 rounded-md" />
              </div>

              {/* App Body */}
              <div className="flex-1 flex overflow-hidden">
                {/* Sidebar */}
                <div className="hidden md:flex flex-col w-56 xl:w-72 border-r border-slate-200 bg-white pt-4 pb-4 px-3 xl:px-5 shrink-0">
                  {/* Logo */}
                  <div className="flex items-center gap-2 px-2 mb-6 xl:mb-10 shrink-0">
                    <div className="w-5 h-5 xl:w-7 xl:h-7 rounded bg-slate-200" />
                    <div className="w-16 xl:w-24 h-4 xl:h-5 rounded bg-slate-200" />
                  </div>

                  <div className="flex flex-col gap-1.5 xl:gap-2 overflow-y-auto min-h-0">
                    <div className="h-2 xl:h-2.5 w-8 xl:w-12 bg-slate-200 rounded-full mb-2 xl:mb-3 ml-2 shrink-0" />
                    {/* Nav Items */}
                    <div className="h-10 xl:h-12 w-full bg-slate-100 rounded-md flex items-center px-2.5 xl:px-4 gap-2 xl:gap-3 shrink-0">
                      <div className="w-4 h-4 xl:w-5 xl:h-5 rounded bg-slate-300 shrink-0" />
                      <div className="w-20 xl:w-32 h-2.5 xl:h-3 rounded bg-slate-400 shrink-0" />
                    </div>
                    <div className="h-10 xl:h-12 w-full rounded-md flex items-center px-2.5 xl:px-4 gap-2 xl:gap-3 shrink-0">
                      <div className="w-4 h-4 xl:w-5 xl:h-5 rounded bg-slate-200 shrink-0" />
                      <div className="w-16 xl:w-24 h-2.5 xl:h-3 rounded bg-slate-300 shrink-0" />
                    </div>
                    <div className="h-10 xl:h-12 w-full rounded-md flex items-center px-2.5 xl:px-4 gap-2 xl:gap-3 shrink-0">
                      <div className="w-4 h-4 xl:w-5 xl:h-5 rounded bg-slate-200 shrink-0" />
                      <div className="w-24 xl:w-40 h-2.5 xl:h-3 rounded bg-slate-300 shrink-0" />
                    </div>
                  </div>

                  {/* User Profile */}
                  <div className="mt-auto flex items-center gap-2 xl:gap-3 px-2 pt-4 xl:pt-6 border-t border-slate-100 shrink-0">
                    <div className="h-6 w-6 xl:h-8 xl:w-8 rounded-full bg-slate-200 shrink-0" />
                    <div className="h-2 xl:h-3 w-16 xl:w-24 rounded bg-slate-300 shrink-0" />
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col p-5 xl:p-8 gap-5 xl:gap-8 bg-[#f8fafc] overflow-y-auto overflow-x-hidden relative">
                  {/* Mobile Hamburger */}
                  <div className="md:hidden absolute top-4 left-4 w-8 h-8 rounded-md bg-white border border-slate-200 shadow-sm flex flex-col items-center justify-center gap-1 z-10">
                    <div className="w-4 h-0.5 bg-slate-400 rounded-full" />
                    <div className="w-4 h-0.5 bg-slate-400 rounded-full" />
                    <div className="w-4 h-0.5 bg-slate-400 rounded-full" />
                  </div>

                  {/* Page Header (Centered) */}
                  <div className="flex flex-col items-center gap-1.5 xl:gap-2.5 shrink-0 mt-3 md:mt-0">
                    <div className="h-6 xl:h-8 w-40 xl:w-56 bg-slate-400 rounded-md" />
                    <div className="h-3 xl:h-4 w-64 xl:w-96 bg-slate-300 rounded-md" />
                  </div>

                  {/* Stats Cards (2 cols mobile, 3 cols md, 4 cols xl) */}
                  <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 xl:gap-6 shrink-0 mt-2 xl:mt-4">
                    <div className="bg-white border border-slate-200 rounded-lg p-4 xl:p-6 shadow-sm flex flex-col gap-3 xl:gap-5">
                      <div className="flex justify-between items-start">
                        <div className="w-8 h-8 xl:w-12 xl:h-12 rounded-md bg-slate-100 shrink-0" />
                        <div className="w-12 xl:w-20 h-2.5 xl:h-3.5 rounded-full bg-emerald-100 shrink-0" />
                      </div>
                      <div className="mt-1 xl:mt-2">
                        <div className="h-6 xl:h-8 w-3/4 max-w-[5rem] xl:max-w-[8rem] bg-slate-400 rounded-md mb-1.5 xl:mb-2.5" />
                        <div className="h-2.5 xl:h-3.5 w-full max-w-[6rem] xl:max-w-[10rem] bg-slate-300 rounded-md" />
                      </div>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-lg p-4 xl:p-6 shadow-sm flex flex-col gap-3 xl:gap-5">
                      <div className="flex justify-between items-start">
                        <div className="w-8 h-8 xl:w-12 xl:h-12 rounded-md bg-emerald-50 shrink-0" />
                        <div className="w-14 xl:w-24 h-2.5 xl:h-3.5 rounded-full bg-emerald-100 shrink-0" />
                      </div>
                      <div className="mt-1 xl:mt-2">
                        <div className="h-6 xl:h-8 w-[85%] max-w-[6rem] xl:max-w-[9rem] bg-slate-400 rounded-md mb-1.5 xl:mb-2.5" />
                        <div className="h-2.5 xl:h-3.5 w-[70%] max-w-[5rem] xl:max-w-[8rem] bg-slate-300 rounded-md" />
                      </div>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-lg p-4 xl:p-6 shadow-sm flex flex-col gap-3 xl:gap-5 hidden md:flex">
                      <div className="flex justify-between items-start">
                        <div className="w-8 h-8 xl:w-12 xl:h-12 rounded-md bg-amber-50 shrink-0" />
                        <div className="w-12 xl:w-20 h-2.5 xl:h-3.5 rounded-full bg-slate-100 shrink-0" />
                      </div>
                      <div className="mt-1 xl:mt-2">
                        <div className="h-6 xl:h-8 w-1/2 max-w-[4rem] xl:max-w-[6rem] bg-slate-400 rounded-md mb-1.5 xl:mb-2.5" />
                        <div className="h-2.5 xl:h-3.5 w-[80%] max-w-[5rem] xl:max-w-[8rem] bg-slate-300 rounded-md" />
                      </div>
                    </div>
                    {/* 4th Card (Visible on mobile to fill 2-col, and xl to fill 4-col, hidden on md (3-col)) */}
                    <div className="bg-white border border-slate-200 rounded-lg p-4 xl:p-6 shadow-sm flex-col gap-3 xl:gap-5 flex md:hidden xl:flex">
                      <div className="flex justify-between items-start">
                        <div className="w-8 h-8 xl:w-12 xl:h-12 rounded-md bg-indigo-50 shrink-0" />
                        <div className="w-12 xl:w-20 h-2.5 xl:h-3.5 rounded-full bg-slate-100 shrink-0" />
                      </div>
                      <div className="mt-1 xl:mt-2">
                        <div className="h-6 xl:h-8 w-[60%] max-w-[5rem] xl:max-w-[7rem] bg-slate-400 rounded-md mb-1.5 xl:mb-2.5" />
                        <div className="h-2.5 xl:h-3.5 w-full max-w-[6rem] xl:max-w-[9rem] bg-slate-300 rounded-md" />
                      </div>
                    </div>
                  </div>

                  {/* Second Row (Chart & List) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:gap-6 shrink-0 flex-1 min-h-[150px]">
                    <div className="bg-white border border-slate-200 rounded-lg p-4 xl:p-6 shadow-sm flex flex-col h-full">
                      <div className="h-3 xl:h-4 w-1/2 max-w-[12rem] xl:max-w-[16rem] bg-slate-400 rounded-md mb-auto shrink-0" />
                      <div className="flex-1 w-full mt-4 xl:mt-6 relative flex items-end">
                        <div
                          className="w-full h-[85%] bg-linear-to-t from-emerald-50 to-transparent border-t-2 xl:border-t-4 border-emerald-400 rounded-t-sm"
                          style={{
                            clipPath:
                              "polygon(0 70%, 15% 70%, 30% 60%, 45% 45%, 60% 35%, 75% 40%, 85% 15%, 100% 70%, 100% 100%, 0 100%)",
                          }}
                        />
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-lg p-4 xl:p-6 shadow-sm flex flex-col h-full min-h-[180px]">
                      <div className="h-3 xl:h-4 w-[60%] max-w-[14rem] xl:max-w-[20rem] bg-slate-400 rounded-md mb-4 xl:mb-8 shrink-0" />
                      <div className="flex flex-col gap-4 xl:gap-6 flex-1 overflow-hidden">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center gap-2 xl:gap-3 w-[70%]">
                              <div
                                className={`w-2 h-2 xl:w-3 xl:h-3 rounded-full shrink-0 ${i <= 2 ? "bg-amber-400" : "bg-emerald-400"}`}
                              />
                              <div className="h-2 xl:h-3 w-full bg-slate-300 rounded-full" />
                            </div>
                            <div className="h-2 xl:h-3 w-[20%] max-w-[3rem] xl:max-w-[4rem] bg-slate-400 rounded-full" />
                          </div>
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
      <footer className="border-t border-slate-100 py-6 px-6 shrink-0 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-900">
            <Blocks className="w-4 h-4" />
            <span className="font-semibold text-sm">Stokki.</span>
          </div>
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} Stokki.autem.dev. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}
