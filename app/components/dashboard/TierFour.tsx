"use client";

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
import "@/app/globals.css";
import TierFiveTable from "./tier-five-table";

export default function TierFour() {
  return (
    <Card className="m-0 p-0 w-full h-full flex ">
      <CardContent className="p-0 m-0 flex flex-col  justify-between h-full w-full">
        <div className="h-[90%] w-full  ">
          <div className="flex w-full justify-between p-4">
            <Label className="text-[16px]">Affiliated Leaderboard</Label>
            <Select defaultValue="q1">
              <SelectTrigger>
                <SelectValue></SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="q1">Q1 2025</SelectItem>
                <SelectItem value="q4">Q4 2024</SelectItem>
                <SelectItem value="q3">Q3 2024</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full h-[80%] relative flex overflow-x-auto ">
            <div className="absolute w-full h-full flex">
              <TierFiveTable />
            </div>
          </div>
        </div>
        <Separator></Separator>
        <div className="h-[10%] w-full flex items-center justify-center">
          <Button
            variant={"ghost"}
            className="text-[#2E5257] font-normal w-full h-10 hover:underline cursor-pointer"
          >
            View Full Leaderboard
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
