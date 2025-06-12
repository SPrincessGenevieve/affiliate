"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import "@/app/globals.css";
import { AUMGrowthChart } from "./AUMGrowthChart";
import { useState } from "react";
import { commission_trend } from "@/lib/mock-data/commission_trend";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { TrendingUp } from "lucide-react";
import "@/app/globals.css";

const chartConfig = {
  vintage: {
    label: "Vintage",
    color: "#8B1D24",
  },
  rare: {
    label: "Rare",
    color: "#8B1D24",
  },
} satisfies ChartConfig;

export default function AUMGrowth() {
  const [monthRange, setMonthRange] = useState("6");
  const filteredData = commission_trend.slice(-Number(monthRange));

  return (
    <Card className="w-full h-full min-h-[400px] aum-cont">
      <CardHeader className="border-b flex justify-between items-center">
        <Label>AUM Growth</Label>
        <div className="flex gap-2">
          <Select defaultValue="6" onValueChange={setMonthRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="12">Last 12 Months</SelectItem>
              <SelectItem value="6">Last 6 Months</SelectItem>
              <SelectItem value="3">Last 3 Months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="p-0 m-0 flex flex-col gap-2 w-full h-full">
        <div className="w-full h-full relative flex overflow-x-auto ">
          <div className="absolute w-full h-full flex">
            <ChartContainer
              config={chartConfig}
              className="w-full h-[250px]  flex"
            >
              <AreaChart
                data={filteredData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
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
                <Area
                  dataKey="rare"
                  type="natural"
                  fill="url(#fillRare)"
                  fillOpacity={0.4}
                  stroke="var(--color-rare)"
                  stackId="a"
                />
                <Area
                  dataKey="vintage"
                  type="natural"
                  fill="url(#fillVintage)"
                  fillOpacity={0.4}
                  stroke="var(--color-vintage)"
                  stackId="a"
                />
              </AreaChart>
            </ChartContainer>
          </div>
        </div>

        {/* <div className="w-full h-auto flex">
          
        </div> */}
      </CardContent>
    </Card>
  );
}
