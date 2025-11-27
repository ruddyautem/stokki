"use client";

import { UserButton } from "@stackframe/stack";
import { Blocks, Package, Plus, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const navigation = [
    { name: "Tableau de bord", href: "/dashboard", icon: Blocks },
    { name: "Inventaire", href: "/inventory", icon: Package },
    { name: "Ajouter produit", href: "/add-product", icon: Plus },
    { name: "Paramètres", href: "/settings", icon: Settings },
  ];

  return (
    <div className='fixed left-0 top-0 bg-white border-r border-slate-200 w-64 min-h-screen p-4 z-10 shadow-sm'>
      <div className='mb-8 px-2'>
        <div className='flex items-center space-x-3 mb-6'>
          <div className='bg-linear-to-br from-slate-700 to-slate-900 rounded-lg p-2 shadow-md'>
            <Blocks className='h-5 w-5 text-white' />
          </div>
          <div className='flex flex-col'>
            <span className='text-xl font-bold text-slate-900 block'>
              Stokki
            </span>
            <span className='text-xs text-slate-500'>Inventaire</span>
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
  );
};

export default Sidebar;
