"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Dot } from "lucide-react";
import React from "react";
import "@/app/globals.css";

export default function TrainingResources() {
  return (
    <Card className="p-0 m-0 w-full">
      <CardContent className="m-0 p-0">
        <Label className="text-[16px] px-4 p-5">Training & Resources</Label>
        <div className="px-4 flex flex-col gap-4">
          <div className="flex rounded-xl items-start p-4 gap-4 bg-[#F9FAFB]">
            <div className="w-[30px] ">
              <div className="bg-[#DBEAFE] w-4 h-4 rounded-[2px]"></div>
            </div>
            <div className="flex flex-col ">
              <Label className="text-gray-600 text-[16px]">
                New Advisor Onboarding
              </Label>
              <Label className="text-gray-400 text-[12px]">
                Learn the essentials of our platform and products
              </Label>
              <Label className="flex items-center text-[12px] ">
                <span className="text-[#10B981]">Certificate Available</span>{" "}
                <Dot></Dot> 45 min
              </Label>
            </div>
          </div>
          <div className="flex rounded-xl justify-baseline items-start p-4 gap-4 bg-[#F9FAFB]">
            <div className="w-[30px] ">
              <div className="bg-[#D1FAE5] w-4 h-4 rounded-[2px]"></div>
            </div>
            <div className="flex flex-col ">
              <Label className="text-gray-600 text-[16px]">
                2025 Product Guide
              </Label>
              <Label className="text-gray-400 text-[12px]">
                Complete overview of our investment products
              </Label>
              <Label className="flex items-center text-[12px] ">
                <span className="text-[#2563EB]">PDF Download</span> <Dot></Dot>{" "}
                Updated February 2025
              </Label>
            </div>
          </div>
          <div className="flex rounded-xl justify-baseline items-start p-4 gap-4 bg-[#F9FAFB]">
            <div className="w-[30px] ">
              <div className="bg-[#EDE9FE] w-4 h-4 rounded-[2px]"></div>
            </div>
            <div className="flex flex-col ">
              <Label className="text-gray-600 text-[16px]">
                Upcoming Webinar
              </Label>
              <Label className="text-gray-400 text-[12px]">
                Market Outlook Q2 2025
              </Label>
              <Label className="flex items-center text-[12px] ">
                <span className="text-[red]">Live Event</span> <Dot></Dot> March
                15, 2025
              </Label>
            </div>
          </div>
        </div>
        <div className="w-full p-4">
          <Button className="w-full hover:bg-[#2E5257] hover:text-white bg-transparent text-[#2E5257] border border-[#2E5257]">
            Browse All Resources
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
