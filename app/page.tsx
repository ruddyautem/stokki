"use client";

import { useUser } from "@stackframe/stack";
import { ArrowRight, Blocks } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Footer from "@/components/Footer";
import HeroDashboardSkeleton from "@/components/HeroDashboardSkeleton";

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
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 h-16 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Blocks className="w-5 h-5 text-slate-900" />
          <span className="font-semibold text-lg tracking-tight text-slate-900">
            Stokki.
          </span>
        </div>

        <Link
          href="/sign-in"
          className="flex items-center justify-center gap-2 bg-slate-800 text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-slate-700 transition-colors shadow-sm"
        >
          Connexion
        </Link>
      </header>
      <main className="flex-1 flex flex-col w-full min-h-0 pt-4 md:pt-6 pb-6 px-4 md:px-8">
        {/* Hero Text */}
        <section className="w-full max-w-4xl mx-auto flex flex-col items-center text-center shrink-0 mb-2 md:mb-8 mt-2 md:mt-6">
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
          className="w-full max-w-7xl mx-auto flex-1 flex flex-col min-h-0 relative mt-4 md:mt-0"
          id="demo"
        >
          <HeroDashboardSkeleton />
        </section>
      </main>
      <Footer />
    </>
  );
}
