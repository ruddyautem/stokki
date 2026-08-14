"use client";

import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import DonutCenter from "./DonutCenter";

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

const COLORS = ["#10b981", "#f59e0b", "#ef4444"];

const StockDonutChart = ({ data, inStockPercentage }: StockDonutChartProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className='relative w-[160px] h-[160px] sm:w-[192px] sm:h-[192px]'>
        <DonutCenter percentage={inStockPercentage} />
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
      <DonutCenter percentage={inStockPercentage} />
    </div>
  );
};

export default StockDonutChart;
