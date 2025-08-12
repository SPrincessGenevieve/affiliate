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
import { useState } from "react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { useUserContext } from "@/app/context/UserContext";
import { Button } from "@/components/ui/button";

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
  const { aum_growth, commission_growth } = useUserContext();
  const [monthRange, setMonthRange] = useState("6");

  // Safely access aum_growth with a fallback to an empty array if undefined

  // Check if aum_growth is not empty before performing the slice operation
  const filteredData =
    aum_growth.length > 0 ? aum_growth.slice(-Number(monthRange)) : [];

  const filteredCommissionData =
    commission_growth.length > 0
      ? commission_growth.slice(-Number(monthRange))
      : [];

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

  const [isAUM, setIsAUM] = useState(true);

  return (
    <div>
      <Card className="w-full h-full min-h-[400px] aum-cont">
        <CardHeader className="flex-wrap border-b flex justify-between items-center py-1">
          <div className="flex gap-1 flex-wrap bg-gray-200 p-1 rounded-4xl">
            <Button
              variant={isAUM ? "default" : "ghost"}
              className="h-7 rounded-full"
              onClick={() => setIsAUM(true)}
            >
              <Label className="text-[12px]">AUM Growth</Label>
            </Button>
            <Button
              variant={!isAUM ? "default" : "ghost"}
              onClick={() => setIsAUM(false)}
              className="h-7 rounded-full"
            >
              <Label className="text-[12px]">Total Commission Growth</Label>
            </Button>
          </div>
          <div className="flex gap-2 relative">
            <Select defaultValue="6" onValueChange={setMonthRange}>
              <SelectTrigger className="w-[120px] pl-2 m-0">
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
              {isAUM ? (
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
                      dataKey="created_at"
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
                    <defs>
                      <linearGradient
                        id="fillVintage"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
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
                      <linearGradient
                        id="fillValue"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
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
                      dataKey="total_aum"
                      type="natural"
                      fill="url(#fillValue)"
                      fillOpacity={0.4}
                      stroke="var(--color-value)"
                      stackId="a"
                    />
                  </AreaChart>
                </ChartContainer>
              ) : (
                <>
                  <ChartContainer
                    config={chartConfig}
                    className="w-full h-[250px]  flex"
                  >
                    <AreaChart
                      data={filteredCommissionData}
                      margin={{
                        left: 12,
                        right: 12,
                      }}
                    >
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="created_at"
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
                              return new Date(value).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                }
                              );
                            }}
                            indicator="dot"
                          />
                        }
                      />
                      <defs>
                        <linearGradient
                          id="fillVintage"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
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
                        <linearGradient
                          id="fillValue"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
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
                        dataKey="total_commission"
                        type="natural"
                        fill="url(#fillValue)"
                        fillOpacity={0.4}
                        stroke="var(--color-value)"
                        stackId="a"
                      />
                    </AreaChart>
                  </ChartContainer>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
