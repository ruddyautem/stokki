"use client";

import { SignIn, useStackApp } from "@stackframe/stack";
import { ArrowLeft, Blocks, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const SignInPage = () => {
  const app = useStackApp();
  const router = useRouter();

  const _copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type === "email" ? "Email" : "Mot de passe"} copié !`, {
      autoClose: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Header */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center space-x-3 mb-6 hover:opacity-80 transition-opacity"
          >
            <div className="bg-linear-to-br from-slate-700 to-slate-900 rounded-lg p-2 shadow-md">
              <Blocks className="h-5 w-5 text-white" />
            </div>
            <div className="text-left flex flex-col">
              <span className="text-xl font-bold text-slate-900 block">
                Stokki
              </span>
              <span className="text-xs text-slate-500">Inventaire</span>
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Content de vous revoir
          </h1>
          <p className="text-slate-600">
            Connectez-vous pour accéder à votre tableau de bord
          </p>
        </div>

        {/* Sign In Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 mb-4">
          <SignIn />
        </div>

        {/* Test Account Credentials */}
        <div className="bg-linear-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700 p-5 mb-6 shadow-lg">
          <div className="flex items-start gap-3 mb-4">
            <div className="bg-slate-700 rounded-lg p-2 mt-0.5">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white text-sm mb-1">
                Compte de démonstration
              </h3>
              <p className="text-xs text-slate-300">
                Copiez ces identifiants ou connectez-vous directement
              </p>
            </div>
          </div>

          <div className="mb-4">
            <button
              type="button"
              onClick={async () => {
                const toastId = toast.loading("Connexion en cours...");
                try {
                  const result = await app.signInWithCredential({
                    email: "test@test.com",
                    password: "test123456",
                  });
                  if (result.status === "error") {
                    toast.update(toastId, {
                      render: "Erreur de connexion",
                      type: "error",
                      isLoading: false,
                      autoClose: 3000,
                    });
                  } else {
                    toast.update(toastId, {
                      render: "Connexion réussie !",
                      type: "success",
                      isLoading: false,
                      autoClose: 2000,
                    });
                    router.push("/dashboard");
                  }
                } catch (_e) {
                  toast.update(toastId, {
                    render: "Erreur de connexion",
                    type: "error",
                    isLoading: false,
                    autoClose: 3000,
                  });
                }
              }}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-4 rounded-lg transition-colors cursor-pointer shadow-md"
            >
              Connexion en un clic
            </button>
          </div>
        </div>

        {/* Back to Home Link */}
        <div className="text-center mb-4">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-slate-600 hover:text-slate-900 font-medium transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour à l'accueil</span>
          </Link>
        </div>

        {/* Additional Info */}
        <div className="text-center">
          <p className="text-sm text-slate-600">
            Pas encore de compte ?{" "}
            <Link
              href="/sign-up"
              className="text-slate-900 font-semibold hover:underline"
            >
              Créer un compte
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
