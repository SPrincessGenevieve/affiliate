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
import "@/app/globals.css";
import { useState } from "react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import "@/app/globals.css";
import { useUserContext } from "@/app/context/UserContext";

const chartConfig = {
  vintage: {
    label: "Vintage",
    color: "#8466C5",
  },
  value: {
    label: "Value",
    color: "#8466C5",
  },
} satisfies ChartConfig;

export default function AUMGrowth() {
  const { user_profile } = useUserContext();
  const [monthRange, setMonthRange] = useState("6");
  const auth_growth = user_profile.aum_growth;
  const filteredData = auth_growth.slice(-Number(monthRange));

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
    <Card className="w-full h-full min-h-[400px] aum-cont">
      <CardHeader className=" border-b flex justify-between items-center py-1">
        <Label className="text-[16px]">AUM Growth</Label>
        <div className="flex gap-2 relative">
          <Select defaultValue="6" onValueChange={setMonthRange}>
            <SelectTrigger className="w-[120px] pl-2 m-0 absolute -top-4 -right-2">
              <SelectValue className="" />
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
                  tick={<CustomTick />}
                  minTickGap={16}
                  tickMargin={-3}
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
                  dataKey="value"
                  type="natural"
                  fill="url(#fillValue)"
                  fillOpacity={0.4}
                  stroke="var(--color-value)"
                  stackId="a"
                />
                {/* <Area
                  dataKey="vintage"
                  type="natural"
                  fill="url(#fillVintage)"
                  fillOpacity={0.4}
                  stroke="var(--color-vintage)"
                  stackId="a"
                /> */}
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
