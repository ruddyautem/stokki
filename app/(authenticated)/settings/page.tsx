import PageLayout from "@/components/PageLayout";
import getCurrentUser from "@/lib/auth";
import { AccountSettings } from "@stackframe/stack";
import { Settings as SettingsIcon } from "lucide-react";

const Settings = async () => {
  const user = await getCurrentUser();
  return (
    <PageLayout
      title={
        <div className="flex items-center justify-center gap-3">
          <div className="bg-linear-to-br from-slate-700 to-slate-900 rounded-lg p-3 shadow-md shrink-0">
            <SettingsIcon className="w-6 h-6 text-white" />
          </div>
          Paramètres
        </div>
      }
      subtitle="Gérez les paramètres de votre compte et vos préférences"
    >
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl border border-slate-200 p-3 sm:p-6 lg:p-10 shadow-sm overflow-x-auto">
          <AccountSettings fullPage />
        </div>
      </div>
    </PageLayout>
  );
};
export default Settings;
