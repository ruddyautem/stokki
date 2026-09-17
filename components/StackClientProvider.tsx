"use client";

import { StackProvider, StackTheme } from "@stackframe/stack";
import type React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { stackClientApp } from "../stack/client";

export default function StackClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { language } = useLanguage();
  // Map "fr" -> "fr-FR" and "en" -> "en-US" for Stack Auth components
  const stackLang = language === "en" ? "en-US" : "fr-FR";

  return (
    <StackProvider app={stackClientApp} lang={stackLang}>
      <StackTheme
        theme={{
          light: {
            primary: "#4f46e5",
            primaryForeground: "#ffffff",
          },
          dark: {
            primary: "#4f46e5",
            primaryForeground: "#ffffff",
          },
        }}
      >
        {children}
      </StackTheme>
    </StackProvider>
  );
}
