"use client";

import { useUser } from "@stackframe/stack";
import {
  Blocks,
  LogOut,
  Package,
  Plus,
  Settings,
  User as UserIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

import { useLanguage } from "@/context/LanguageContext";

function BottomNavUserButton() {
  const user = useUser();
  const { t } = useLanguage();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    }

    if (showUserMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserMenu]);

  return (
    <>
      {/* Mobile User Popover Menu */}
      {showUserMenu && (
        <div
          ref={menuRef}
          className="absolute bottom-full right-4 mb-3 w-64 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl p-3 z-50 animate-in fade-in slide-in-from-bottom-2 duration-150"
        >
          <div className="flex items-center gap-3 p-2 border-b border-slate-100 dark:border-slate-700 mb-2">
            <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-slate-700 dark:text-slate-200 text-xs uppercase shrink-0">
              {user?.primaryEmail?.charAt(0) || "U"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                {user?.displayName || t.nav.user}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                {user?.primaryEmail}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => user?.signOut()}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/40 active:bg-red-100 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {t.nav.logout}
          </button>
        </div>
      )}

      {/* User profile toggle button */}
      <button
        type="button"
        onClick={() => setShowUserMenu((prev) => !prev)}
        className={`flex flex-col items-center justify-center py-1 px-1 sm:px-2.5 rounded-xl transition-all min-w-[46px] sm:min-w-[54px] active:scale-95 cursor-pointer ${
          showUserMenu
            ? "text-slate-900 dark:text-slate-100 font-semibold"
            : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
        }`}
        aria-label={t.nav.profile}
      >
        <div
          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold uppercase transition-all ${
            showUserMenu
              ? "bg-slate-900 dark:bg-indigo-600 text-white ring-2 ring-slate-800 dark:ring-indigo-500"
              : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
          }`}
        >
          {user?.primaryEmail?.charAt(0) || (
            <UserIcon className="w-3.5 h-3.5" />
          )}
        </div>
        <span className="text-[11px] mt-0.5 tracking-tight font-medium">
          {t.nav.profile}
        </span>
      </button>
    </>
  );
}

export default function BottomNav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const navItems = [
    {
      name: t.nav.dashboard,
      href: "/dashboard",
      icon: Blocks,
    },
    {
      name: t.nav.inventory,
      href: "/inventory",
      icon: Package,
    },
    {
      name: t.nav.add,
      href: "/add-product",
      icon: Plus,
      isPrimary: true,
    },
    {
      name: t.nav.settings,
      href: "/settings",
      icon: Settings,
    },
  ];

  return (
    <nav
      aria-label="Navigation mobile"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 lg:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pb-[env(safe-area-inset-bottom,0px)] transition-colors"
    >
      <div className="flex items-center justify-around px-2 py-1 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          if (item.isPrimary) {
            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={true}
                className="flex flex-col items-center justify-center relative -top-2.5 group active:scale-95 transition-transform px-2"
                aria-label={item.name}
              >
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all ${
                    isActive
                      ? "bg-linear-to-br from-indigo-600 to-indigo-700 text-white ring-4 ring-indigo-100 dark:ring-indigo-950/60 shadow-indigo-600/40"
                      : "bg-linear-to-br from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white ring-2 ring-white dark:ring-slate-900 shadow-indigo-600/30"
                  }`}
                >
                  <item.icon className="w-5 h-5 stroke-[2.5]" />
                </div>
                <span
                  className={`text-[11px] font-semibold mt-0.5 transition-colors ${
                    isActive
                      ? "text-indigo-600 dark:text-indigo-400 font-bold"
                      : "text-slate-600 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              prefetch={true}
              className={`flex flex-col items-center justify-center py-1 px-1 sm:px-2.5 rounded-xl transition-all min-w-[46px] sm:min-w-[54px] active:scale-95 ${
                isActive
                  ? "text-slate-900 dark:text-slate-100 font-semibold"
                  : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
              }`}
            >
              <item.icon
                className={`w-4.5 h-4.5 sm:w-5 sm:h-5 transition-transform ${
                  isActive
                    ? "text-slate-900 dark:text-slate-100 scale-105"
                    : "text-slate-400 dark:text-slate-500"
                }`}
              />
              <span className="text-[10px] sm:text-[11px] mt-0.5 tracking-tight font-medium">
                {item.name}
              </span>
            </Link>
          );
        })}

        {/* User profile toggle button */}
        <Suspense
          fallback={
            <div className="flex flex-col items-center justify-center py-1 px-1 sm:px-2.5 min-w-[46px] sm:min-w-[54px]">
              <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700" />
              <span className="text-[11px] mt-0.5 tracking-tight font-medium text-slate-400 dark:text-slate-500">
                Profil
              </span>
            </div>
          }
        >
          <BottomNavUserButton />
        </Suspense>
      </div>
    </nav>
  );
}
