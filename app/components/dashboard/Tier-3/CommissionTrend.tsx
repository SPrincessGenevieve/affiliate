"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CommissionChart } from "./CommissionChart";

export default function CommissionTrend() {
  const filter = ["Monthly", "Quarterly", "Yearly"];
  const [selected, setSelected] = useState<string>("Quarterly");

  return (
    <Card className="w-full min-h-[400px]">
      <CardHeader className="border-b flex justify-between items-center flex-wrap">
        <Label className="text-[16px]">Commission Trend</Label>
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
        <div className="w-full h-full relative flex overflow-x-auto ">
          <div className="absolute w-full h-full flex">
            <CommissionChart></CommissionChart>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
