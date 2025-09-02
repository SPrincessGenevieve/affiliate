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
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useUserContext } from "@/app/context/UserContext";
import { Button } from "@/components/ui/button";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

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
  const { aum_growth = [], commission_growth = [] } = useUserContext();
  const [monthRange, setMonthRange] = useState("3");
  // Safely access aum_growth with a fallback to an empty array if undefined

  // Check if aum_growth is not empty before performing the slice operation
  const filteredData =
    Array.isArray(aum_growth) && aum_growth.length > 0
      ? aum_growth
          .filter(
            (d): d is { created_at: string; total_aum: number } =>
              d != null &&
              typeof d.created_at === "string" &&
              typeof d.total_aum === "string"
          )
          .slice(-Number(monthRange))
      : [];

  const filteredCommissionData =
    Array.isArray(commission_growth) && commission_growth.length > 0
      ? commission_growth
          .filter(
            (d): d is { created_at: string; total_commission: string } =>
              d != null &&
              typeof d.created_at === "string" &&
              typeof d.total_commission === "string"
          )
          .map((d) => ({
            ...d,
            total_commission: Number(d.total_commission), // ✅ convert to number
          }))
          .slice(-Number(monthRange))
      : [];

  const CustomTick = ({ x, y, payload }: any) => {
    return (
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
  };

  const [isAUM, setIsAUM] = useState(true);

  const data = isAUM ? filteredData.length : filteredCommissionData.length;

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
            <Select defaultValue="3" onValueChange={setMonthRange}>
              <SelectTrigger className="w-[120px] pl-2 m-0">
                <SelectValue className="" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3 Months</SelectItem>
                <SelectItem value="6">6 Months</SelectItem>
                <SelectItem value="12">12 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0 m-0 flex flex-col gap-2 w-full h-full">
          {data > 0 && (
            <>
              <div className="w-full h-full relative flex overflow-x-auto ">
                <div className="absolute w-full h-full flex">
                  {isAUM ? (
                    filteredData.length > 0 ? (
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
                          <YAxis
                            tickLine={false}
                            axisLine={false}
                            width={70}
                            tick={{ fontSize: 10 }}
                            domain={[
                              0,
                              (dataMax: number) => {
                                const order = Math.pow(
                                  10,
                                  Math.floor(Math.log10(dataMax))
                                );
                                const step = order / 2;
                                return Math.ceil(dataMax / step) * step;
                              },
                            ]}
                            ticks={(function () {
                              return (dataMax: number) => {
                                const order = Math.pow(
                                  10,
                                  Math.floor(Math.log10(dataMax))
                                );
                                const step = order / 2;
                                const max = Math.ceil(dataMax / step) * step;
                                const interval = max / 4; // 4 intervals = 5 ticks
                                return Array.from(
                                  { length: 5 },
                                  (_, i) => i * interval
                                );
                              };
                            })()(
                              (isAUM
                                ? Math.max(
                                    ...filteredData.map((d) => d.total_aum)
                                  )
                                : Math.max(
                                    ...filteredCommissionData.map(
                                      (d) => d.total_commission
                                    )
                                  )) || 0
                            )}
                            tickFormatter={(value) =>
                              "£" +
                              new Intl.NumberFormat("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }).format(value)
                            }
                          />

                          <ChartTooltip
                            cursor={false}
                            content={
                              <ChartTooltipContent
                                labelFormatter={(value) =>
                                  new Date(value).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                  })
                                }
                                formatter={(value, name) => {
                                  // Ensure it's a number before formatting
                                  const num =
                                    typeof value === "number"
                                      ? value
                                      : parseFloat(value as string);

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
                      <div className="h-full w-full flex flex-col items-center justify-center">
                        <DotLottieReact
                          src="/empty.lottie"
                          loop
                          autoplay
                          className="h-50"
                        ></DotLottieReact>
                        <Label>There are currently no records.</Label>
                      </div>
                    )
                  ) : filteredCommissionData.length > 0 ? (
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
                          tickMargin={7}
                        />
                        <YAxis
                          tickLine={false}
                          axisLine={false}
                          width={70}
                          tick={{ fontSize: 10 }}
                          domain={[
                            0,
                            (dataMax: number) => {
                              const order = Math.pow(
                                10,
                                Math.floor(Math.log10(dataMax))
                              );
                              const step = order / 2;
                              return Math.ceil(dataMax / step) * step;
                            },
                          ]}
                          ticks={(function () {
                            return (dataMax: number) => {
                              const order = Math.pow(
                                10,
                                Math.floor(Math.log10(dataMax))
                              );
                              const step = order / 2;
                              const max = Math.ceil(dataMax / step) * step;
                              const interval = max / 4; // 4 intervals = 5 ticks
                              return Array.from(
                                { length: 5 },
                                (_, i) => i * interval
                              );
                            };
                          })()(
                            (isAUM
                              ? Math.max(
                                  ...filteredData.map((d) => d.total_aum)
                                )
                              : Math.max(
                                  ...filteredCommissionData.map(
                                    (d) => d.total_commission
                                  )
                                )) || 0
                          )}
                          tickFormatter={(value) =>
                            "£" +
                            new Intl.NumberFormat("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }).format(value)
                          }
                        />

                        <ChartTooltip
                          cursor={false}
                          content={
                            <ChartTooltipContent
                              labelFormatter={(value) =>
                                new Date(value).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                })
                              }
                              formatter={(value, name) => {
                                // Ensure it's a number before formatting
                                const num =
                                  typeof value === "number"
                                    ? value
                                    : parseFloat(value as string);

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
                  ) : (
                    <div className="h-full w-full flex flex-col items-center justify-center">
                      <DotLottieReact
                        src="/empty.lottie"
                        loop
                        autoplay
                        className="h-50"
                      ></DotLottieReact>
                      <Label>There are currently no records.</Label>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
