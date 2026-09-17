import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import StackClientProvider from "@/components/StackClientProvider";
import ThemedToaster from "@/components/ThemedToaster";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stokki - Ruddy Autem",
  description: "Votre gestionnaire d'inventaire!",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      data-lang="fr"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('stokki_theme');var isDark=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(isDark){document.documentElement.classList.add('dark');document.documentElement.setAttribute('data-theme','dark');}else{document.documentElement.classList.remove('dark');document.documentElement.setAttribute('data-theme','light');}var el=document.getElementById('--stack-theme-mode');if(!el){el=document.createElement('style');el.id='--stack-theme-mode';document.head.appendChild(el);}el.setAttribute('data-stack-theme',isDark?'dark':'light');var l=localStorage.getItem('stokki_lang')||'fr';document.documentElement.lang=l==='en'?'en-GB':'fr-FR';document.documentElement.setAttribute('data-lang',l);}catch(e){}})()`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans selection:bg-slate-900 selection:text-white dark:selection:bg-slate-100 dark:selection:text-slate-900 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-950 transition-colors duration-200`}
      >
        <ThemeProvider>
          <LanguageProvider>
            <StackClientProvider>
              <div className="flex flex-col min-h-screen w-full">
                <div className="flex-1 flex flex-col w-full">{children}</div>
              </div>
            </StackClientProvider>
          </LanguageProvider>
          <ThemedToaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
