"use client";

import { Toaster } from "sonner";
import { useTheme } from "@/context/ThemeContext";

export default function ThemedToaster() {
  const { theme } = useTheme();

  return (
    <Toaster
      position="top-center"
      theme={theme}
      closeButton
      duration={2500}
      offset="20px"
      toastOptions={{
        className:
          "!rounded-2xl !font-sans !text-sm transition-colors duration-150 " +
          (theme === "dark"
            ? "!bg-slate-900 !text-slate-100 !border-slate-800 !shadow-2xl !shadow-slate-950/80"
            : "!bg-white !text-slate-900 !border-slate-200/90 !shadow-lg"),
        descriptionClassName:
          theme === "dark"
            ? "!text-slate-400 !text-xs"
            : "!text-slate-500 !text-xs",
        classNames: {
          success:
            "[&_[data-icon]]:!text-emerald-500 dark:[&_[data-icon]]:!text-emerald-400",
          error:
            "[&_[data-icon]]:!text-red-500 dark:[&_[data-icon]]:!text-red-400",
          warning:
            "[&_[data-icon]]:!text-amber-500 dark:[&_[data-icon]]:!text-amber-400",
          info: "[&_[data-icon]]:!text-blue-500 dark:[&_[data-icon]]:!text-blue-400",
        },
      }}
    />
  );
}
