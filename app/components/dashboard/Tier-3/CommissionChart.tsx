"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  vintage: { label: "Vintage", color: "#8466C5" },
  value: { label: "Value", color: "#8466C5" },
} satisfies ChartConfig;

interface CommissionChartProps {
  data: { total_clients: number; created_at: string }[];
}

export function CommissionChart({ data }: CommissionChartProps) {
  const CustomTick = ({ x, y, payload }: any) => (
    <text x={x} y={y} transform={`rotate(-30, ${x}, ${y})`} textAnchor="end" fontSize={10}>
      {payload.value}
    </text>
  );

  const getTicks = (arr: number[], tickCount = 5) => {
    if (!arr || arr.length === 0) return [0, 1];
    const max = Math.max(...arr);
    const step = max / tickCount;
    return Array.from({ length: tickCount + 1 }, (_, i) => Number((i * step).toFixed(6)));
  };

  const ticks = Array.from(new Set(getTicks(data.map(d => d.total_clients), 4)));


  return (
    <ChartContainer config={chartConfig} className="w-full h-[250px]">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="fillValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-value)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--color-value)" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="created_at" tick={<CustomTick />} axisLine={false} tickLine={false} minTickGap={16} />
        <YAxis tickLine={false} axisLine={false} width={40} ticks={ticks} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent labelFormatter={(val) => val} indicator="dot" />}
        />
        <Area dataKey="total_clients" type="natural" fill="url(#fillValue)" stroke="var(--color-value)" stackId="a" />
      </AreaChart>
    </ChartContainer>
  );
}
