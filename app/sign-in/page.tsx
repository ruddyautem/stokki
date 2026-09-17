"use client";

import { SignIn, useStackApp } from "@stackframe/stack";
import { ArrowLeft, Blocks } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import Footer from "@/components/Footer";
import LanguageToggle from "@/components/LanguageToggle";
import ThemeToggle from "@/components/ThemeToggle";
import { useLanguage } from "@/context/LanguageContext";

const SignInPage = () => {
  const app = useStackApp();
  const router = useRouter();
  const { t, language } = useLanguage();

  // Localize Stack Auth's hardcoded "last" badge in OAuth buttons
  useEffect(() => {
    const updateLastBadge = () => {
      const badges = document.querySelectorAll(
        ".stack-scope button span.absolute",
      );
      badges.forEach((el) => {
        const text = el.textContent?.trim().toLowerCase();
        if (
          text === "last" ||
          text === "last used" ||
          text === "dernier" ||
          text === "dernier utilisé" ||
          el.hasAttribute("data-last-badge")
        ) {
          el.setAttribute("data-last-badge", "true");
          const targetText = language === "fr" ? t.auth.lastUsed : "Last used";
          if (el.textContent !== targetText) {
            el.textContent = targetText;
          }
          el.setAttribute("aria-label", targetText);
        }
      });
    };

    updateLastBadge();
    const observer = new MutationObserver(updateLastBadge);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [language, t.auth.lastUsed]);

  return (
    <div className="flex-1 flex flex-col min-h-dvh sm:min-h-0 justify-between relative">
      {/* Theme & Language Toggles in top right */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex items-center gap-2">
        <ThemeToggle />
        <LanguageToggle />
      </div>

      <div className="flex-1 flex items-center justify-center p-3 sm:p-6 bg-linear-to-br from-slate-100 via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors">
        <div className="w-full max-w-md my-auto">
          {/* Logo Header */}
          <div className="text-center mb-3 sm:mb-6">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 sm:space-x-3 mb-1 sm:mb-4 hover:opacity-80 transition-opacity"
            >
              <div className="bg-linear-to-br from-indigo-600 to-indigo-700 rounded-lg p-1.5 sm:p-2 shadow-md">
                <Blocks className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="text-left flex flex-col">
                <span className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white block leading-tight">
                  Stokki
                </span>
                <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">
                  {t.nav.inventory}
                </span>
              </div>
            </Link>
            <h1 className="text-xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-0.5 sm:mb-1">
              {t.auth.welcomeBack}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              {t.auth.signInSubtitle}
            </p>
          </div>

          {/* Sign In Form Card */}
          <div className="bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl shadow-md sm:shadow-xl border border-slate-200 dark:border-slate-800 p-4 sm:p-8 mb-2.5 sm:mb-4 transition-colors">
            <SignIn />
          </div>

          {/* Test Account Credentials */}
          <div className="bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl shadow-md sm:shadow-xl border border-slate-200 dark:border-slate-800 p-4 sm:p-8 mb-2.5 sm:mb-4 transition-colors">
            <div className="w-full max-w-[380px] mx-auto">
              <div className="flex items-center justify-center mb-3 sm:mb-4">
                <div className="inline-flex items-center justify-center px-3 py-1 sm:py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
                  <h3 className="font-semibold text-slate-700 dark:text-slate-200 text-xs sm:text-sm text-center">
                    {t.auth.demoAccount}
                  </h3>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={async () => {
                    const toastId = toast.loading(t.auth.loggingIn);
                    try {
                      const result = await app.signInWithCredential({
                        email: "test@test.com",
                        password: "test123456",
                      });
                      if (result.status === "error") {
                        toast.error(t.auth.loginError, { id: toastId });
                      } else {
                        toast.success(t.auth.loginSuccess, { id: toastId });
                        router.push("/dashboard");
                      }
                    } catch (_e) {
                      toast.error(t.auth.loginError, { id: toastId });
                    }
                  }}
                  className="relative w-full h-9 sm:h-9.5 flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-medium px-4 rounded-lg text-xs sm:text-sm transition-all cursor-pointer shadow-sm hover:shadow-md hover:shadow-indigo-500/20 active:scale-[0.99]"
                >
                  <div className="absolute left-3.5 sm:left-4 flex items-center pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span>{t.auth.oneClickLogin}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Back to Home & Sign Up */}
          <div className="flex items-center justify-between text-xs sm:text-sm text-slate-600 dark:text-slate-400 px-1">
            <Link
              href="/"
              className="inline-flex items-center gap-1 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t.auth.home}</span>
            </Link>

            <div>
              {t.auth.noAccount}{" "}
              <Link
                href="/sign-up"
                className="text-slate-900 dark:text-indigo-400 font-semibold hover:underline"
              >
                {t.auth.createAccount}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden sm:block">
        <Footer />
      </div>
    </div>
  );
};

export default SignInPage;
