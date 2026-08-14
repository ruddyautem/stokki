import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  value: string;
  label: string;
  badge?: React.ReactNode;
}

/** Reusable stats card for the dashboard */
export default function StatCard({ icon: Icon, iconBg, iconColor, value, label, badge }: StatCardProps) {
  return (
    <div className='bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow text-center lg:text-left'>
      <div className='flex flex-col sm:flex-row items-center justify-between gap-3 mb-4'>
        <div className={`${iconBg} rounded-lg p-3`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        {badge && <div className="justify-center sm:justify-start">{badge}</div>}
      </div>
      <div className='text-3xl font-bold text-slate-900 mb-1'>{value}</div>
      <div className='text-sm text-slate-600'>{label}</div>
    </div>
  );
}
