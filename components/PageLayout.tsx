interface PageLayoutProps {
  title: React.ReactNode;
  subtitle?: string;
  badge?: React.ReactNode;
  children: React.ReactNode;
}

/** Shared page shell for authenticated routes */
export default function PageLayout({ title, subtitle, badge, children }: PageLayoutProps) {
  return (
    <div className='min-h-screen bg-slate-50'>
      <main className='p-4 pt-16 lg:ml-64 lg:p-8'>
        {/* Header */}
        <div className='mb-6 lg:mb-8 text-center w-full'>
          <h1 className='text-2xl sm:text-3xl font-bold text-slate-900'>{title}</h1>
          {subtitle && <p className='text-slate-600 mt-1'>{subtitle}</p>}
          {badge}
        </div>
        {children}
      </main>
    </div>
  );
}
