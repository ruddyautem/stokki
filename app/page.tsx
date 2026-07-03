"use client";

import { useUser } from "@stackframe/stack";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Blocks, ArrowUpRight } from "lucide-react";

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

  const stats = [
    { label: "Entreprises", value: "15 000+" },
    { label: "Produits suivis", value: "2M+" },
    { label: "Disponibilité", value: "100%" },
  ];

  return (
    <div className='min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-50 flex flex-col'>
      {/* Header */}
      <header className='sticky top-0 z-50 shrink-0 px-4 sm:px-6 lg:px-12 py-4 border-b border-slate-200/80 bg-white/80 backdrop-blur-md'>
        <div className='max-w-7xl mx-auto flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='bg-linear-to-br from-slate-800 to-slate-950 rounded-xl p-2 shadow-md'>
              <Blocks className='h-5 w-5 text-white' />
            </div>
            <span className='font-bold text-lg text-slate-900 tracking-tight'>
              stokki
            </span>
          </div>

          <nav className='hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2'>
            {["Fonctionnalités", "Tarifs", "À propos"].map((item) => (
              <span
                key={item}
                className='text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors px-4 py-2 rounded-lg cursor-pointer font-medium'
              >
                {item}
              </span>
            ))}
          </nav>

          <Link
            href='/sign-in'
            className='group inline-flex items-center gap-1.5 bg-linear-to-br from-slate-800 to-slate-950 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:from-slate-700 hover:to-slate-900 transition-all shadow-md hover:shadow-lg'
          >
            <span className='hidden sm:inline'>Se connecter</span>
            <span className='sm:hidden'>Connexion</span>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className='flex-1 flex flex-col'>
        <section className='flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-12 py-16 sm:py-24 lg:py-32 relative overflow-hidden'>
          {/* Grid background */}
          <div
            className='absolute inset-0 pointer-events-none opacity-60'
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />

          {/* Blobs */}
          <div className='absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-linear-to-br from-slate-200 to-slate-100 blur-3xl opacity-60 pointer-events-none' />
          <div className='absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-linear-to-br from-blue-100 to-slate-50 blur-3xl opacity-50 pointer-events-none' />
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-linear-to-r from-slate-100 to-slate-50 blur-3xl opacity-80 pointer-events-none' />

          <div className='relative z-10 max-w-5xl w-full mx-auto flex flex-col items-center gap-10 sm:gap-14'>
            {/* Headline block */}
            <div className='text-center flex flex-col gap-6 sm:gap-8'>
              <div className='flex flex-col gap-1'>
                <h1 className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-slate-900 leading-[1.02] tracking-tight'>
                  Vos stocks,
                </h1>
                <h1 className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.02] tracking-tight bg-linear-to-br from-emerald-500 to-emerald-700 bg-clip-text text-transparent'>
                  sous contrôle.
                </h1>
              </div>

              <div className='flex flex-col gap-1'>
                <p className='text-xl sm:text-2xl md:text-3xl text-slate-500 font-medium leading-snug tracking-tight'>
                  Suivez, analysez et anticipez vos inventaires.
                </p>
                <p className='text-xl sm:text-2xl md:text-3xl font-semibold leading-snug tracking-tight text-slate-800'>
                  En toute simplicité.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className='flex flex-col sm:flex-row items-center gap-4'>
              <Link
                href='/sign-in'
                className='group inline-flex items-center justify-center gap-2 bg-linear-to-br from-slate-800 to-slate-950 text-white text-sm sm:text-base font-semibold px-8 py-4 rounded-xl hover:from-slate-700 hover:to-slate-900 transition-all shadow-xl hover:shadow-2xl'
              >
                Commencer gratuitement
                <ArrowUpRight className='w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform' />
              </Link>
              <Link
                href='/sign-in'
                className='inline-flex items-center justify-center text-sm sm:text-base text-slate-600 hover:text-slate-900 transition-colors px-6 py-4 font-medium border border-slate-200 rounded-xl bg-white/70 hover:bg-white hover:border-slate-300 hover:shadow-md'
              >
                En savoir plus
              </Link>
            </div>

            {/* Stats */}
            <div className='flex flex-wrap items-center justify-center gap-3 sm:gap-4'>
              {stats.map((s) => (
                <div
                  key={s.label}
                  className='flex items-baseline gap-2 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl px-5 sm:px-6 py-3 sm:py-4 shadow-sm hover:shadow-md transition-shadow'
                >
                  <span className='text-xl sm:text-2xl font-bold text-slate-900'>
                    {s.value}
                  </span>
                  <span className='text-xs sm:text-sm text-slate-500 font-medium'>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className='shrink-0 px-4 sm:px-6 lg:px-12 py-6 flex items-center justify-center border-t border-slate-200/80 bg-white/50 backdrop-blur-sm'>
        <p className='text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest text-center font-medium'>
          © 2026 Stokki.autem.dev. Tous droits réservés.
        </p>
      </footer>
    </div>
  );
}
