import { StackProvider, StackTheme } from "@stackframe/stack";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Bounce, ToastContainer } from "react-toastify";
import { stackClientApp } from "../stack/client";
import "react-toastify/dist/ReactToastify.css";
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans selection:bg-slate-900 selection:text-white text-slate-900`}
      >
        <StackProvider app={stackClientApp} lang="fr-FR">
          <StackTheme>
            <div className="flex flex-col min-h-screen w-full">
              <div className="flex-1 flex flex-col w-full">{children}</div>
            </div>
          </StackTheme>
        </StackProvider>
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </body>
    </html>
  );
}
