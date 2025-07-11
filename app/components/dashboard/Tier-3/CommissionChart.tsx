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
import { useUserContext } from "@/app/context/UserContext";

export const description = "An interactive area chart";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  vintage: {
    label: "Vintage",
    color: "#8466C5",
  },
  value: {
    label: "Value",
    color: "#8466C5",
  },
} satisfies ChartConfig;

interface CommissionChartProps {
  timeRange: string;
}

export function CommissionChart({ timeRange }: CommissionChartProps) {
  const { user_profile } = useUserContext();
  const commission_trend = user_profile.commission_trend;

  function filterCommissionData(data: any[], timeRange: string) {
    const referenceDate = new Date("2024-06-30"); // Or use `new Date()` for real-time

    let daysToSubtract = 90;
    if (timeRange === "Monthly") {
      daysToSubtract = 30;
    } else if (timeRange === "Yearly") {
      daysToSubtract = 365;
    }

    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);

    return data.filter((item) => new Date(item.date) >= startDate);
  }

  const filteredData = filterCommissionData(commission_trend, timeRange);

  const CustomTick = ({ x, y, payload }: any) => {
    return (
      <text
        x={x}
        y={y}
        transform={`rotate(-30, ${x}, ${y})`}
        textAnchor="end"
        fontSize={10}
        dy={1}
      >
        {new Date(payload.value).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </text>
    );
  };

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
            <linearGradient id="fillValue" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-value)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-value)"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tick={<CustomTick />}
            minTickGap={16}
            tickMargin={-3}
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
            dataKey="value"
            type="natural"
            fill="url(#fillValue)"
            stroke="var(--color-value)"
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
