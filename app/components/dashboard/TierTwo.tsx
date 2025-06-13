import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import React from "react";
import "@/app/globals.css";

export default function TierTwo() {
  return (
    <Card>
      <CardContent className="w-full flex flex-col gap-8">
        <Label className="text-[16px]">Tier Progress</Label>
        <div className="w-full h-auto relative flex justify-center items-center">
          <Progress value={40} className="w-full   absolute z-10"></Progress>
          <div className="w-full flex justify-between z-10 ">
            <div className="bg-gradient-to-r from-[#6C9EA0] to-[#165558] h-10 w-10 rounded-full flex items-center justify-center group hover:text-white">
              <Label className="group-hover:text-white text-white text-xl">
                1
              </Label>
            </div>
            <div className="bg-gradient-to-r from-[#BE382B] to-[#901D23] h-10 w-10 rounded-full flex items-center justify-center group hover:text-white">
              <Label className="group-hover:text-white text-white text-xl">
                2
              </Label>
            </div>
            <div className="hover:bg-gradient-to-r hover:from-[#CE919B] hover:to-[#C25ABD] bg-[#D1D1D1] h-10 w-10 rounded-full flex items-center justify-center group hover:text-white">
              <Label className="group-hover:text-white text-gray-500 text-xl">
                3
              </Label>
            </div>
            <div className="hover:bg-gradient-to-r hover:from-[#DDC4A9] hover:to-[#B7A088] bg-[#D1D1D1] h-10 w-10 rounded-full flex items-center justify-center group hover:text-white">
              <Label className="group-hover:text-white text-gray-500 text-xl">
                4
              </Label>
            </div>
            <div className="hover:bg-gradient-to-r hover:from-[#313435] hover:to-[#2A2C2D] bg-[#D1D1D1] h-10 w-10 rounded-full flex items-center justify-center group hover:text-white">
              <Label className="group-hover:text-white text-gray-500 text-xl">
                5
              </Label>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="w-10 flex flex-col items-center justify-center">
            <Label className="text-[11px]">Bronze</Label>
            <Label className="text-gray-600 text-[11px]">£500K</Label>
          </div>
          <div className="w-10 flex flex-col items-center justify-center">
            <Label className="text-[11px]">Silver</Label>
            <Label className="text-gray-600 text-[11px]">£1M</Label>
          </div>
          <div className="w-10 flex flex-col items-center justify-center">
            <Label className="text-[11px]">Gold</Label>
            <Label className="text-gray-600 text-[11px]">£3M</Label>
          </div>
          <div className="w-10 flex flex-col items-center justify-center">
            <Label className="text-[11px]">Platinum</Label>
            <Label className="text-gray-600 text-[11px]">£5M</Label>
          </div>
          <div className="w-10 flex flex-col items-center justify-center">
            <Label className="text-[11px]">Diamond</Label>
            <Label className="text-gray-600 text-[11px]">£10M</Label>
          </div>
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-2">
          <Label className="font-normal">Current AUM: £2.5M</Label>
          <Label className="text-green-600 font-normal">
            £500K more to reach Gold Tier
          </Label>
        </div>
      </CardContent>
    </Card>
  );
}
