"use client";

import { UserButton } from "@stackframe/stack";
import { Blocks, Menu, Package, Plus, Settings, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when sidebar is open on mobile
  useBodyScrollLock(isOpen);

  const navigation = [
    { name: "Tableau de bord", href: "/dashboard", icon: Blocks },
    { name: "Inventaire", href: "/inventory", icon: Package },
    { name: "Ajouter produit", href: "/add-product", icon: Plus },
    { name: "Paramètres", href: "/settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className='fixed top-3 left-3 z-[60] bg-white/90 backdrop-blur-md border border-slate-200 rounded-xl p-2.5 shadow-lg lg:hidden hover:bg-white hover:shadow-xl active:scale-95 transition-all cursor-pointer'
        aria-label='Ouvrir le menu'
      >
        <Menu className='w-5 h-5 text-slate-800' />
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden'
          onClick={() => setIsOpen(false)}
          aria-hidden='true'
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen bg-white border-r border-slate-200 z-40 transition-transform duration-300 ease-in-out shadow-sm ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 w-64 min-h-screen p-4`}
      >
        {/* Mobile close button */}
        <div className='flex justify-end lg:hidden mb-2'>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className='p-2 rounded-lg hover:bg-slate-100 transition-colors'
            aria-label='Fermer le menu'
          >
            <X className='w-5 h-5 text-slate-600' />
          </button>
        </div>

        <div className='mb-8 px-2'>
          <div className='flex items-center space-x-3 mb-6'>
            <div className='bg-linear-to-br from-slate-700 to-slate-900 rounded-lg p-2 shadow-md'>
              <Blocks className='h-5 w-5 text-white' />
            </div>
            <div className='flex flex-col'>
              <span className='text-xl font-bold text-slate-900 block'>
                Stokki
              </span>
            </div>
          </div>
        </div>

        <nav className='space-y-1'>
          <div className='text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 mb-3'>
            Menu
          </div>
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                href={item.href}
                key={item.href}
                className={`flex items-center space-x-3 py-3 rounded-xl px-3 transition-all ${
                  isActive
                    ? "bg-slate-900 text-white shadow-md"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <item.icon
                  className={`w-5 h-5 ${
                    isActive ? "text-white" : "text-slate-400"
                  }`}
                />
                <span className='text-sm font-medium'>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className='absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 bg-white'>
          <UserButton showUserInfo />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
