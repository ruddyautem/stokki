interface DonutCenterProps {
  percentage: number;
}

/** Center label shared between loaded and skeleton states of the donut chart */
export default function DonutCenter({ percentage }: DonutCenterProps) {
  return (
    <div className='absolute inset-0 flex items-center justify-center'>
      <div className='text-center'>
        <div className='text-3xl font-bold text-slate-600 mb-0.5'>{percentage}%</div>
        <div className='text-xs font-medium text-slate-600 uppercase tracking-wide'>En stock</div>
      </div>
    </div>
  );
}
