"use client";

import { ChevronDown } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { type Language, useLanguage } from "@/context/LanguageContext";

/**
 * Universal vector flags (SVG) that display flawlessly on ALL browsers,
 * Windows, macOS, Android, iOS, Linux without relying on missing emoji fonts.
 */
export function FlagFR({ className = "w-5 h-3.5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 480"
      className={`rounded-[2px] shadow-xs shrink-0 object-cover ${className}`}
      aria-hidden="true"
    >
      <g fillRule="evenodd" strokeWidth="1pt">
        <path fill="#fff" d="M0 0h640v480H0z" />
        <path fill="#00267f" d="M0 0h213.3v480H0z" />
        <path fill="#f31830" d="M426.7 0H640v480H426.7z" />
      </g>
    </svg>
  );
}

export function FlagGB({ className = "w-5 h-3.5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 480"
      className={`rounded-[2px] shadow-xs shrink-0 object-cover ${className}`}
      aria-hidden="true"
    >
      <path fill="#012169" d="M0 0h640v480H0z" />
      <path
        fill="#FFF"
        d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-179L0 64V0h75z"
      />
      <path
        fill="#C8102E"
        d="m424 288 216 159v33h-44L380 320l44-32zM241 193 0 14v33l176 130h65l-44-32zM0 437l176-131 44 32L44 480H0v-43zm640-394L464 173l-44-32 176-131h44v32z"
      />
      <path fill="#FFF" d="M240 0h160v480H240zM0 160h640v160H0z" />
      <path fill="#C8102E" d="M280 0h80v480h-80zM0 200h640v80H0z" />
    </svg>
  );
}

interface LanguageToggleProps {
  className?: string;
}

export default function LanguageToggle({
  className = "",
}: LanguageToggleProps) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Position the portal dropdown below the button using fixed viewport coords
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownStyle({
        position: "fixed",
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
        zIndex: 9999,
      });
    }
  }, [isOpen]);

  // Close on outside click/touch
  useEffect(() => {
    if (!isOpen) return;

    function handleOutside(event: MouseEvent | TouchEvent) {
      const target = event.target as Node;
      if (
        buttonRef.current?.contains(target) ||
        dropdownRef.current?.contains(target)
      ) {
        return;
      }
      setIsOpen(false);
    }

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, [isOpen]);

  const handleSelect = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  const dropdown =
    isOpen && mounted
      ? ReactDOM.createPortal(
          <div
            ref={dropdownRef}
            style={dropdownStyle}
            className="w-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xl p-1.5 space-y-0.5"
          >
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSelect("fr")}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150 cursor-pointer ${
                language === "fr"
                  ? "bg-indigo-600 text-white font-semibold shadow-xs"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FlagFR className="w-4.5 h-3.5 rounded-xs" />
                <span>Français</span>
              </div>
              {language === "fr" && (
                <span className="text-xs font-bold text-white">✓</span>
              )}
            </button>

            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSelect("en")}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150 cursor-pointer ${
                language === "en"
                  ? "bg-indigo-600 text-white font-semibold shadow-xs"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FlagGB className="w-4.5 h-3.5 rounded-xs" />
                <span>English</span>
              </div>
              {language === "en" && (
                <span className="text-xs font-bold text-white">✓</span>
              )}
            </button>
          </div>,
          document.body,
        )
      : null;

  return (
    <div className={`relative inline-block text-left ${className}`}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Changer de langue / Change language"
        aria-expanded={isOpen}
        className="group flex items-center gap-2 h-9 px-3 rounded-xl bg-slate-100/90 dark:bg-slate-800/80 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 border border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white shadow-xs transition-all duration-200 active:scale-95 cursor-pointer text-xs font-semibold select-none backdrop-blur-md"
      >
        {language === "fr" ? (
          <>
            <FlagFR className="w-4 h-3 rounded-xs shadow-xs" />
            <span className="font-bold tracking-tight">FR</span>
          </>
        ) : (
          <>
            <FlagGB className="w-4 h-3 rounded-xs shadow-xs" />
            <span className="font-bold tracking-tight">EN</span>
          </>
        )}
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 dark:text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-indigo-600 dark:text-indigo-400" : ""
          }`}
        />
      </button>

      {dropdown}
    </div>
  );
}
