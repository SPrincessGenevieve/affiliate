"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { commission_trend } from "@/lib/mock-data/commission_trend";

export const description = "An interactive area chart";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  vintage: {
    label: "Vintage",
    color: "#8466C5",
  },
  rare: {
    label: "Rare",
    color: "#8466C5",
  },
} satisfies ChartConfig;

export function CommissionChart() {
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = commission_trend.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <div className="w-full">
      <ChartContainer
        config={chartConfig}
        className="aspect-auto h-[250px] w-full"
      >
        <AreaChart data={filteredData}>
          <defs>
            <linearGradient id="fillVintage" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-vintage)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-vintage)"
                stopOpacity={0.1}
              />
            </linearGradient>
            <linearGradient id="fillRare" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-rare)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-rare)"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={32}
            tickFormatter={(value) => {
              const date = new Date(value);
              return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });
            }}
          />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                labelFormatter={(value) => {
                  return new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
                indicator="dot"
              />
            }
          />
          <Area
            dataKey="rare"
            type="natural"
            fill="url(#fillRare)"
            stroke="var(--color-rare)"
            stackId="a"
          />
         
          <ChartLegend content={<ChartLegendContent />} />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
