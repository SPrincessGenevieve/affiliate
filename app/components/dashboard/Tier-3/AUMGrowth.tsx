"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useUserContext } from "@/app/context/UserContext";
import { Button } from "@/components/ui/button";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const chartConfig = {
  vintage: { label: "Vintage", color: "#C4AD93" },
  value: { label: "Value", color: "#C4AD93" },
} satisfies ChartConfig;

export default function AUMGrowth() {
  const { aum_growth = [], commission_growth = [] } = useUserContext();
  const [monthRange, setMonthRange] = useState("3");
  const [isAUM, setIsAUM] = useState(true);

  // Filter AUM data safely
  const filteredData = Array.isArray(aum_growth)
    ? aum_growth
        .filter(
          (d): d is { created_at: string; total_aum: number } =>
            d != null &&
            typeof d.created_at === "string" &&
            typeof d.total_aum === "number"
        )
        .slice(-Number(monthRange))
    : [];

  // Filter Commission data safely and convert to number
  const filteredCommissionData = Array.isArray(commission_growth)
    ? commission_growth
        .filter(
          (d): d is { created_at: string; total_commission: string } =>
            d != null &&
            typeof d.created_at === "string" &&
            typeof d.total_commission === "string"
        )
        .map((d) => {
          const num = parseFloat(d.total_commission);
          return { ...d, total_commission: isNaN(num) ? 0 : num };
        })
        .slice(-Number(monthRange))
    : [];

  const dataAvailable = isAUM
    ? filteredData.length > 0
    : filteredCommissionData.length > 0;

  const CustomTick = ({ x, y, payload }: any) => (
    <text
      x={x}
      y={y}
      transform={`rotate(-25, ${x}, ${y})`}
      textAnchor="end"
      fontSize={10}
      dy={1}
    >
      {new Date(payload.value).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })}
    </text>
  );

  const getMaxValue = () => {
    const dataArray = isAUM
      ? filteredData.map((d) => d.total_aum)
      : filteredCommissionData.map((d) => d.total_commission);
    return dataArray.length > 0 ? Math.max(...dataArray) : 0;
  };

  const generateTicks = (max: number) => {
    if (max === 0) return [0, 1]; // Prevent NaN
    const order = Math.pow(10, Math.floor(Math.log10(max)));
    const step = order / 2;
    const ceiling = Math.ceil(max / step) * step;
    const interval = ceiling / 4;
    return Array.from({ length: 5 }, (_, i) => i * interval);
  };

  return (
    <Card className="w-full h-full min-h-[400px] aum-cont">
      <CardHeader className="flex-wrap border-b border-white/30 flex justify-between items-center py-1">
        <div className="flex gap-1 flex-wrap bg-[#121416] p-1 rounded-4xl">
          <Button
            variant={isAUM ? "default" : "ghost"}
            className="h-7  transition-all rounded-full"
            onClick={() => setIsAUM(true)}
          >
            AUM Growth
          </Button>
          <Button
            variant={!isAUM ? "default" : "ghost"}
            className="h-7 rounded-full "
            onClick={() => setIsAUM(false)}
          >
            Total Commission Growth
          </Button>
        </div>
        <Select defaultValue="3" onValueChange={setMonthRange}>
          <SelectTrigger className="w-[120px] pl-2 m-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3">3 Months</SelectItem>
            <SelectItem value="6">6 Months</SelectItem>
            <SelectItem value="12">12 Months</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="p-0 m-0 flex flex-col gap-2 w-full h-full">
        {dataAvailable ? (
          <ChartContainer
            className="w-full h-[250px] flex"
            config={chartConfig}
          >
            <AreaChart
              data={isAUM ? filteredData : filteredCommissionData}
              margin={{ left: 12, right: 12 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="created_at"
                tick={<CustomTick />}
                axisLine={false}
                tickLine={false}
                minTickGap={16}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                width={70}
                tick={{ fontSize: 10 }}
                domain={[0, (dataMax: any) => dataMax || 0]}
                ticks={generateTicks(getMaxValue())}
                tickFormatter={(v) =>
                  "£" +
                  new Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(v)
                }
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(val) =>
                      new Date(val).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    }
                    formatter={(val) => {
                      const num =
                        typeof val === "number"
                          ? val
                          : parseFloat(val as string) || 0;
                      return (
                        "£" +
                        new Intl.NumberFormat("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }).format(num)
                      );
                    }}
                    indicator="dot"
                  />
                }
              />
              <defs>
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
              <Area
                dataKey={isAUM ? "total_aum" : "total_commission"}
                type="natural"
                fill="url(#fillValue)"
                stroke="var(--color-value)"
                fillOpacity={0.4}
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        ) : (
          <div className="h-full w-full flex flex-col items-center justify-center">
            <DotLottieReact
              src="/empty.lottie"
              loop
              autoplay
              className="h-50"
            />
            <Label>There are currently no records.</Label>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
