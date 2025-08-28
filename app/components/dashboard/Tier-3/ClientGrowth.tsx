"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CommissionChart } from "./CommissionChart";
import { useUserContext } from "@/app/context/UserContext";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function ClientGrowth() {
  const filter = ["Monthly", "Quarterly", "Yearly"];
  const [selected, setSelected] = useState<string>("Quarterly");
  const { client_growth } = useUserContext();

  // Aggregate data dynamically based on filter
  function aggregateData(
    data: { total_clients: number; created_at: string }[],
    timeRange: string
  ) {
    const result: Record<string, number> = {};

    data.forEach((item) => {
      const date = new Date(item.created_at);
      let key = "";

      if (timeRange === "Monthly") {
        const month = date.toLocaleString("default", { month: "short" });
        const year = date.getFullYear().toString().slice(-2);
        key = `${month}-${year}`; // e.g., Jan-24
      } else if (timeRange === "Quarterly") {
        const quarter = Math.floor(date.getMonth() / 3) + 1;
        key = `Q${quarter}`; // e.g., Q1, Q2, Q3, Q4
      } else if (timeRange === "Yearly") {
        key = date.getFullYear().toString(); // e.g., 2020, 2021
      }

      result[key] = (result[key] || 0) + item.total_clients;
    });

    // Convert to array for Recharts
    return Object.entries(result).map(([key, value]) => ({
      created_at: key,
      total_clients: value,
    }));
  }

  const aggregatedData = aggregateData(client_growth, selected);

  return (
    <Card className="w-full min-h-[400px]">
      <CardHeader className="relative border-b flex justify-between items-center flex-wrap">
        <Label className="text-[16px]">Client Growth</Label>
        <div className="flex gap-2 flex-wrap">
          {filter.map((item, index) => (
            <Button
              key={index}
              onClick={() => setSelected(item)}
              className={`h-7 rounded-full text-[12px] transition-colors ${
                selected === item
                  ? "bg-[#2E5257] text-white"
                  : "bg-[#F3F4F6] text-gray-600 hover:bg-gray-200"
              }`}
            >
              {item}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="relative p-0 m-0 flex flex-col gap-4 w-full h-full">
        <div className="w-full h-full relative flex overflow-x-auto">
          <div className="absolute w-full h-full flex">
            {aggregatedData.length > 0 ? (
              <CommissionChart timeRange={selected} data={aggregatedData} />
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
