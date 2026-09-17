import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import MobileHeader from "@/components/MobileHeader";
import Sidebar from "@/components/Sidebar";
import getCurrentUser from "@/lib/auth";

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await getCurrentUser();
  return (
    <div className="flex h-dvh w-full overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-0">
        <MobileHeader />
        <main className="flex-1 overflow-auto bg-slate-50 dark:bg-slate-950 flex flex-col min-h-0 transition-colors duration-200">
          {children}
        </main>
        <div className="lg:ml-64 hidden lg:block">
          <Footer />
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
