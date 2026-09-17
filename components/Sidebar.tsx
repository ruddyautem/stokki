"use client";

import { useUser } from "@stackframe/stack";
import {
  Blocks,
  ChevronUp,
  LogOut,
  Package,
  Plus,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

import { useLanguage } from "@/context/LanguageContext";

function UserMenu() {
  const user = useUser();
  const { t } = useLanguage();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
    <div className="absolute bottom-0 left-0 right-0 px-4 py-1.5 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors">
      <div className="relative" ref={menuRef}>
        {showUserMenu && (
          <div className="absolute bottom-full left-0 mb-2 w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg py-1 z-50">
            <button
              type="button"
              onClick={() => user?.signOut()}
              className="w-full text-left px-4 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-slate-50 dark:hover:bg-slate-700/60 flex items-center gap-2 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              {t.nav.logout}
            </button>
          </div>
        )}
        <button
          type="button"
          onClick={() => setShowUserMenu(!showUserMenu)}
          className="flex items-center w-full gap-3 p-2 -mx-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left cursor-pointer"
        >
          <div className="shrink-0 w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden text-xs font-bold text-slate-600 dark:text-slate-300 uppercase">
            {user?.primaryEmail?.charAt(0) || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">
              {user?.displayName || t.nav.user}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {user?.primaryEmail}
            </p>
          </div>
          <ChevronUp
            className={`w-4 h-4 text-slate-400 dark:text-slate-500 transition-transform ${
              showUserMenu ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
    </div>
  );
}

const Sidebar = () => {
  const pathname = usePathname();
  const { t } = useLanguage();

  const navigation = [
    { name: t.nav.dashboard, href: "/dashboard", icon: Blocks },
    { name: t.nav.inventory, href: "/inventory", icon: Package },
    { name: t.nav.addProduct, href: "/add-product", icon: Plus },
    { name: t.nav.settings, href: "/settings", icon: Settings },
  ];

  return (
    <aside
      aria-label="Menu latéral"
      className="hidden lg:flex fixed left-0 top-0 h-dvh bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-30 flex-col w-64 p-4 pb-0 shadow-sm transition-colors"
    >
      <div className="mb-8 px-2">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-linear-to-br from-indigo-600 to-indigo-700 rounded-lg p-2 shadow-md">
            <Blocks className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-slate-900 dark:text-white block">
              Stokki
            </span>
          </div>
        </div>
      </div>

      <nav className="space-y-1">
        <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-3 mb-3">
          Menu
        </div>
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              href={item.href}
              key={item.href}
              prefetch={true}
              className={`flex items-center space-x-3 py-3 rounded-xl px-3 transition-all ${
                isActive
                  ? "bg-slate-900 dark:bg-indigo-600 text-white shadow-md dark:shadow-indigo-950/50"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80"
              }`}
            >
              <item.icon
                className={`w-5 h-5 ${
                  isActive ? "text-white" : "text-slate-400 dark:text-slate-400"
                }`}
              />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <Suspense
        fallback={
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 min-h-[73px]" />
        }
      >
        <UserMenu />
      </Suspense>
    </aside>
  );
};

export default Sidebar;
