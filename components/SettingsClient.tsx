"use client";

import { AccountSettings } from "@stackframe/stack";
import PageLayout from "@/components/PageLayout";
import { useLanguage } from "@/context/LanguageContext";

export default function SettingsClient() {
  const { t } = useLanguage();

  return (
    <PageLayout
      title={
        <div className="flex items-center justify-center gap-3">
          {t.settings.title}
        </div>
      }
      subtitle={t.settings.subtitle}
    >
      <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden p-2 sm:p-4 lg:p-6 stack-settings-container transition-colors">
        <AccountSettings />
      </div>
    </PageLayout>
  );
}
