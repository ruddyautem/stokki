interface StockLegendItemProps {
  color: string;
  label: string;
  value: string;
}

export default function StockLegendItem({
  color,
  label,
  value,
}: StockLegendItemProps) {
  return (
    <div className="w-full flex items-center justify-between p-3 sm:p-4 rounded-lg bg-slate-50 dark:bg-slate-800/60 text-center sm:text-left transition-colors">
      <div className="flex items-center space-x-3">
        <div className={`w-4 h-4 rounded-full ${color}`} />
        <span className="text-sm font-medium text-slate-900 dark:text-slate-200">
          {label}
        </span>
      </div>
      <span className="text-lg font-bold text-slate-900 dark:text-white">
        {value}
      </span>
    </div>
  );
}
