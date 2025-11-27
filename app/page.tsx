"use client";

import { useUser } from "@stackframe/stack";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import {
  Blocks,
  Package,
  BarChart3,
  Shield,
  Zap,
  Bell,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

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

  const features = [
    {
      icon: Package,
      title: "Suivi en temps réel",
      description:
        "Surveillez vos stocks instantanément avec des mises à jour automatiques",
    },
    {
      icon: BarChart3,
      title: "Analyses avancées",
      description:
        "Prenez des décisions éclairées grâce à des rapports détaillés",
    },
    {
      icon: Bell,
      title: "Alertes intelligentes",
      description:
        "Recevez des notifications avant les ruptures de stock",
    },
    {
      icon: Shield,
      title: "Sécurité renforcée",
      description:
        "Protection de données conforme aux standards internationaux",
    },
    {
      icon: Zap,
      title: "Performance optimale",
      description:
        "Interface rapide et réactive pour une productivité maximale",
    },
    {
      icon: TrendingUp,
      title: "Évolution continue",
      description:
        "Nouvelles fonctionnalités ajoutées régulièrement",
    },
  ];

  const benefits = [
    "Réduction des coûts de stockage",
    "Gain de temps considérable",
    "Meilleure visibilité sur les stocks",
    "Diminution des erreurs manuelles",
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-linear-to-br from-slate-700 to-slate-900 rounded-lg p-2 shadow-md">
                <Blocks className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-slate-900">Stokki</span>
                <span className="text-xs text-slate-500 ml-2">Inventaire</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/sign-in"
                className="bg-slate-800 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-slate-900 transition-all shadow-sm hover:shadow-md"
              >
                Se connecter
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-b from-white to-slate-100">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-slate-100 mask-[linear-linear(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
        
        <div className="container mx-auto px-6 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-full text-sm font-medium mb-8 shadow-lg">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              Plateforme de gestion d'inventaire
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
              L'inventaire intelligent
              <br />
              <span className="bg-linear-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                pour votre entreprise
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
              Optimisez votre gestion de stock avec une solution puissante, 
              intuitive et conçue pour les entreprises modernes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/sign-in"
                className="group bg-slate-800 text-white px-8 py-4 rounded-xl font-semibold hover:bg-slate-900 transition-all shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2"
              >
                Démarrer gratuitement
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#features"
                className="bg-white text-slate-800 px-8 py-4 rounded-xl font-semibold border-2 border-slate-200 hover:border-slate-300 transition-all inline-flex items-center justify-center gap-2"
              >
                Fonctionnalités
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Bar */}
      <section className="bg-slate-800 text-white py-6 border-y border-slate-700">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-sm font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <span className="text-slate-600 font-semibold uppercase tracking-wider text-sm">
            Fonctionnalités
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4 mb-4">
            Tout pour gérer votre stock
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Des outils professionnels pour une gestion d'inventaire sans compromis
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 border border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all"
            >
              <div className="bg-slate-100 rounded-xl p-3 w-fit mb-5 group-hover:bg-slate-800 transition-colors">
                <feature.icon className="h-6 w-6 text-slate-700 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto text-center">
            <div>
              <div className="text-5xl font-bold mb-2 bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                15K+
              </div>
              <div className="text-slate-400 text-lg">Entreprises actives</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2 bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                2M+
              </div>
              <div className="text-slate-400 text-lg">Produits suivis</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2 bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                99.99%
              </div>
              <div className="text-slate-400 text-lg">Temps de disponibilité</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="bg-linear-to-br from-slate-800 to-slate-900 rounded-3xl p-12 md:p-16 text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/5 mask-[linear-linear(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0))]"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Prêt à transformer votre gestion ?
            </h2>
            <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto">
              Rejoignez les milliers d'entreprises qui optimisent leur inventaire avec Stokki
            </p>
            <Link
              href="/sign-in"
              className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-xl font-semibold hover:bg-slate-100 transition-all shadow-lg hover:shadow-xl"
            >
              Commencer maintenant
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-20">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="bg-linear-to-br from-slate-700 to-slate-900 rounded-lg p-2">
                <Blocks className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-slate-900">Stokki</span>
                <span className="text-xs text-slate-500 ml-2">Inventaire</span>
              </div>
            </div>
            <p className="text-slate-600 text-sm">
              © 2024 Stokki. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}