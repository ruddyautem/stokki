import getCurrentUser from "@/lib/auth";
import { AccountSettings } from "@stackframe/stack";
import { Settings as SettingsIcon } from "lucide-react";

const Settings = async () => {
  const user = await getCurrentUser();
  return (
    <div className="min-h-screen bg-slate-50">
      <main className="p-4 pt-16 lg:ml-64 lg:p-8">
        <div className="mb-6 lg:mb-8 text-center w-full">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="bg-linear-to-br from-slate-700 to-slate-900 rounded-lg p-3 shadow-md shrink-0">
              <SettingsIcon className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Paramètres</h1>
          </div>
          <p className="text-slate-600">
            Gérez les paramètres de votre compte et vos préférences
          </p>
        </div>
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl border border-slate-200 p-3 sm:p-6 lg:p-10 shadow-sm overflow-x-auto">
            <AccountSettings fullPage />
          </div>
        </div>
      </main>
    </div>
  );
};
export default Settings;