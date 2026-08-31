import Footer from "@/components/Footer";
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
        <main className="flex-1 overflow-auto bg-slate-50">{children}</main>
        <div className="lg:ml-64">
          <Footer />
        </div>
      </div>
    </div>
  );
}
