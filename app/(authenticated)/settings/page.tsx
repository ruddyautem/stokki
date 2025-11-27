import getCurrentUser from "@/lib/auth";
import { AccountSettings } from "@stackframe/stack";
import { Settings as SettingsIcon } from "lucide-react";

const Settings = async () => {
  const user = await getCurrentUser();
  return (
    <div className="min-h-screen bg-slate-50">
      <main className="ml-64 p-8">
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-linear-to-br from-slate-700 to-slate-900 rounded-lg p-3 shadow-md">
              <SettingsIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Paramètres</h1>
              <p className="text-slate-600 mt-1">
                Gérez les paramètres de votre compte et vos préférences
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-6xl">
          <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
            <AccountSettings fullPage />
          </div>
        </div>
      </main>
    </div>
  );
};
export default Settings;