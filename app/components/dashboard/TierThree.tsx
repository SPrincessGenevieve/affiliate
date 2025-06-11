import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import React from "react";
import "@/app/globals.css"

export default function TierThree() {
  const filter = ["Monthly", "Quarterly", "Yearly"];
  return (
    <div className="w-full h-[400px] flex-wrap grid grid-cols-2 tier-three-cont justify-between gap-4">
      <Card className="w-full h-full">
        <CardContent className=" p-0 m-0 flex flex-col gap-4">
          <div className="flex justify-between px-4 filter-tier-three">
            <Label className="text-[16px]">Commission Trend</Label>
            <div className="flex gap-2">
              {filter.map((item, index) => (
                <Button
                  className={`h-7 rounded-full text-[12px] ${
                    item === "Quarterly"
                      ? "bg-[#F3E8E9] text-[#2E5257] "
                      : "bg-[#F3F4F6] text-gray-600 "
                  } hover:bg-gray-200`}
                  key={index}
                >
                  {item}
                </Button>
              ))}
            </div>
          </div>
          <Separator></Separator>
        </CardContent>
      </Card>
      <Card className="w-full h-full ">
        <CardContent className=" p-0 m-0 flex flex-col gap-2">
          <div className="flex justify-between px-4">
            <Label className="text-[16px]">AUM Growth</Label>
            <div className="flex gap-2">
              <Select defaultValue="12">
                <SelectTrigger>
                  <SelectValue></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12">Last 12 Months</SelectItem>
                  <SelectItem value="6">Last 6 Months</SelectItem>
                  <SelectItem value="3">Last 3 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Separator></Separator>
        </CardContent>
      </Card>
    </div>
  );
}
