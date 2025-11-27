"use client";

import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ChartData {
  week: string;
  products: number;
}

// Function to get the number of days in a specific month
const getDaysInMonth = (
  month: number,
  year: number = new Date().getFullYear(),
) => {
  return new Date(year, month, 0).getDate();
};

// Function to validate and fix invalid dates
const fixInvalidDate = (dateStr: string) => {
  const [monthStr, dayStr] = dateStr.split("/");
  let month = parseInt(monthStr);
  let day = parseInt(dayStr);
  const year = new Date().getFullYear();

  // Check if day exceeds the month's maximum days
  while (day > getDaysInMonth(month, year)) {
    const maxDays = getDaysInMonth(month, year);
    day = day - maxDays;
    month = month + 1;

    // Handle year rollover
    if (month > 12) {
      month = 1;
    }
  }

  // Format back to MM/DD
  const formattedMonth = month.toString().padStart(2, "0");
  const formattedDay = day.toString().padStart(2, "0");

  return `${formattedMonth}/${formattedDay}`;
};

// Reusable date formatter for French display (DD/MM)
const formatDateToFrench = (dateStr: string) => {
  const [month, day] = dateStr.split("/");
  return `${day}/${month}`;
};

const ProductsChart = ({ data }: { data: ChartData[] }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Clean the data to fix any invalid dates
  const cleanedData = data.map((item) => ({
    ...item,
    week: fixInvalidDate(item.week),
  }));

  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-3">
          <p className="text-slate-900 font-semibold text-sm mb-1">
            {formatDateToFrench(label)}
          </p>
          <p className="text-emerald-600 text-sm font-medium">
            <span className="font-semibold">Produits:</span> {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  if (!isMounted) {
    return <div className="w-full h-full" />;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={cleanedData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <defs>
          <linearGradient id="colorProducts" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis
          dataKey="week"
          stroke="#64748b"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={formatDateToFrench}
          style={{ fontWeight: 500 }}
        />
        <YAxis
          stroke="#64748b"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          allowDecimals={false}
          style={{ fontWeight: 500 }}
        />
        <Area
          type="monotone"
          dataKey="products"
          stroke="#059669"
          fill="url(#colorProducts)"
          strokeWidth={2.5}
          dot={{ fill: "#059669", strokeWidth: 2, r: 3 }}
          activeDot={{ fill: "#059669", stroke: "#fff", strokeWidth: 2, r: 5 }}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#94a3b8", strokeWidth: 1 }} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ProductsChart;