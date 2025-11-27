"use client";

import { SignIn } from "@stackframe/stack";
import Link from "next/link";
import { Blocks, ArrowLeft, User, Copy } from "lucide-react";
import { toast } from "react-toastify";

const SignInPage = () => {
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type === "email" ? "Email" : "Mot de passe"} copié !`, {
      autoClose: 2000,
    });
  };

  return (
    <div className='min-h-screen bg-linear-to-br from-slate-100 via-slate-50 to-slate-100 flex items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        {/* Logo Header */}
        <div className='text-center mb-8'>
          <Link
            href='/'
            className='inline-flex items-center space-x-3 mb-6 hover:opacity-80 transition-opacity'
          >
            <div className='bg-linear-to-br from-slate-700 to-slate-900 rounded-lg p-2 shadow-md'>
              <Blocks className='h-5 w-5 text-white' />
            </div>
            <div className='text-left'>
              <span className='text-xl font-bold text-slate-900 block'>
                Stokki
              </span>
              <span className='text-xs text-slate-500'>Pro</span>
            </div>
          </Link>
          <h1 className='text-3xl font-bold text-slate-900 mb-2'>
            Content de vous revoir
          </h1>
          <p className='text-slate-600'>
            Connectez-vous pour accéder à votre tableau de bord
          </p>
        </div>

        {/* Sign In Form Card */}
        <div className='bg-white rounded-2xl shadow-xl border border-slate-200 p-8 mb-4'>
          <SignIn />
        </div>

        {/* Test Account Credentials */}
        <div className='bg-linear-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700 p-5 mb-6 shadow-lg'>
          <div className='flex items-start gap-3 mb-4'>
            <div className='bg-slate-700 rounded-lg p-2 mt-0.5'>
              <User className='w-4 h-4 text-white' />
            </div>
            <div className='flex-1'>
              <h3 className='font-semibold text-white text-sm mb-1'>
                Compte de démonstration
              </h3>
              <p className='text-xs text-slate-300'>
                Copiez ces identifiants pour tester l'application
              </p>
            </div>
          </div>

          <div className='space-y-3'>
            <div className='bg-slate-700/50 rounded-lg p-3'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-xs text-slate-400 mb-1'>Email</p>
                  <p className='text-sm font-mono text-white'>test@test.com</p>
                </div>
                <button
                  type='button'
                  onClick={() => copyToClipboard("test@test.com", "email")}
                  className='p-2 hover:bg-slate-600 rounded-lg transition-colors cursor-pointer'
                  title="Copier l'email"
                >
                  <Copy className='w-4 h-4 text-slate-300' />
                </button>
              </div>
            </div>

            <div className='bg-slate-700/50 rounded-lg p-3'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-xs text-slate-400 mb-1'>Mot de passe</p>
                  <p className='text-sm font-mono text-white'>test123456</p>
                </div>
                <button
                  type='button'
                  onClick={() => copyToClipboard("test123456", "password")}
                  className='p-2 hover:bg-slate-600 rounded-lg transition-colors cursor-pointer'
                  title='Copier le mot de passe'
                >
                  <Copy className='w-4 h-4 text-slate-300' />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Home Link */}
        <div className='text-center mb-4'>
          <Link
            href='/'
            className='inline-flex items-center space-x-2 text-slate-600 hover:text-slate-900 font-medium transition-colors text-sm'
          >
            <ArrowLeft className='w-4 h-4' />
            <span>Retour à l'accueil</span>
          </Link>
        </div>

        {/* Additional Info */}
        <div className='text-center'>
          <p className='text-sm text-slate-600'>
            Pas encore de compte ?{" "}
            <Link
              href='/sign-up'
              className='text-slate-900 font-semibold hover:underline'
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
