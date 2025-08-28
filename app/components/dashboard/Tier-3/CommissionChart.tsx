"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  visitors: { label: "Visitors" },
  vintage: { label: "Vintage", color: "#8466C5" },
  value: { label: "Value", color: "#8466C5" },
} satisfies ChartConfig;

interface CommissionChartProps {
  timeRange: string;
  data: { total_clients: number; created_at: string }[];
}

export function CommissionChart({ data }: CommissionChartProps) {
  // Display labels directly from aggregated data
  const CustomTick = ({ x, y, payload }: any) => (
    <text
      x={x}
      y={y}
      transform={`rotate(-30, ${x}, ${y})`}
      textAnchor="end"
      fontSize={10}
      dy={1}
    >
      {payload.value}
    </text>
  );

  return (
    <div className="w-full">
      <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="fillValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-value)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="var(--color-value)" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="created_at"
            tickLine={false}
            axisLine={false}
            tick={<CustomTick />}
            minTickGap={16}
            tickMargin={12}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent labelFormatter={(value) => value} indicator="dot" />}
          />
          <Area dataKey="total_clients" type="natural" fill="url(#fillValue)" stroke="var(--color-value)" stackId="a" />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
