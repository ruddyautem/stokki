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

  return (
    <div className="h-screen w-screen overflow-hidden bg-white flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 shrink-0">
        <div className="flex items-center gap-2">
          <Blocks className="h-5 w-5 text-slate-900" />
          <span className="font-semibold text-slate-900 tracking-tight">
            stokki
          </span>
        </div>
        <Link
          href="/sign-in"
          className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
        >
          Se connecter
        </Link>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 relative">
        {/* Faint grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Accent blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-slate-100 blur-3xl opacity-60 pointer-events-none" />

        <div className="relative z-10 max-w-2xl w-full text-center flex flex-col items-center gap-8">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 border border-slate-200 rounded-full px-4 py-1.5 bg-white shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span className="text-xs text-slate-500 tracking-wide">
              Gestion d'inventaire
            </span>
          </div>

          {/* Headline */}
          <div className="flex flex-col gap-3">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-[1.05] tracking-tight">
              Vos stocks,
              <br />
              sous contrôle.
            </h1>
            <p className="text-slate-400 text-lg max-w-md mx-auto leading-relaxed">
              Suivez, analysez et anticipez vos inventaires — sans la
              complexité.
            </p>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Link
              href="/sign-in"
              className="group inline-flex items-center gap-2 bg-slate-900 text-white text-sm font-medium px-6 py-3 rounded-xl hover:bg-slate-700 transition-colors shadow-md"
            >
              Commencer
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            <Link
              href="/sign-in"
              className="inline-flex items-center text-sm text-slate-500 hover:text-slate-800 transition-colors px-4 py-3"
            >
              En savoir plus
            </Link>
          </div>

          {/* Pill stats */}
          <div className="flex items-center gap-3 flex-wrap justify-center mt-2">
            {[
              { label: "Entreprises", value: "15 000+" },
              { label: "Produits suivis", value: "2M+" },
              { label: "Disponibilité", value: "99.99%" },
            ].map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 rounded-full px-5 py-2"
              >
                <span className="text-sm font-semibold text-slate-900">
                  {s.value}
                </span>
                <span className="text-xs text-slate-500">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="shrink-0 px-8 py-5 flex items-center justify-between border-t border-slate-100">
        <p className="text-xs text-slate-400">© 2024 Stokki</p>
        <div className="flex items-center gap-6">
          {["Sécurité", "Confidentialité", "Contact"].map((item) => (
            <span
              key={item}
              className="text-xs text-slate-400 hover:text-slate-700 cursor-pointer transition-colors"
            >
              {item}
            </span>
          ))}
        </div>
      </footer>
    </div>
  );
}