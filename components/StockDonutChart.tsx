"use client";

import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

interface StockData {
  name: string;
  value: number;
  percentage: number;
  [key: string]: string | number;
}

interface StockDonutChartProps {
  data: StockData[];
  inStockPercentage: number;
}

const StockDonutChart = ({ data, inStockPercentage }: StockDonutChartProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Color-coded for meaning: green (good), amber (warning), red (danger)
  const COLORS = [
    "#10b981", // emerald-500 - En stock (good)
    "#f59e0b", // amber-500 - Stock faible (warning)
    "#ef4444", // red-500 - Rupture de stock (danger)
  ];

  if (!isMounted) {
    return (
      <div className='relative' style={{ width: '192px', height: '192px' }}>
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='text-center'>
            <div className='text-3xl font-bold text-slate-600 mb-0.5'>
              {inStockPercentage}%
            </div>
            <div className='text-xs font-medium text-slate-600 uppercase tracking-wide'>
              En stock
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='relative' style={{ width: '192px', height: '192px' }}>
      <ResponsiveContainer width='100%' height='100%'>
        <PieChart>
          <Pie
            data={data}
            cx='50%'
            cy='50%'
            innerRadius={70}
            outerRadius={90}
            paddingAngle={3}
            dataKey='value'
            strokeWidth={0}
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={COLORS[data.indexOf(entry)]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className='absolute inset-0 flex items-center justify-center'>
        <div className='text-center'>
          <div className='text-3xl font-bold text-slate-600 mb-0.5'>
            {inStockPercentage}%
          </div>
          <div className='text-xs font-medium text-slate-600 uppercase tracking-wide'>
            En stock
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockDonutChart;