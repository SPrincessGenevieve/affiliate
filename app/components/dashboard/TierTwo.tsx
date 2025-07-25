"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import React from "react";
import "@/app/globals.css";
import { useUserContext } from "@/app/context/UserContext";

export default function TierTwo() {
  const { user_profile } = useUserContext();
  const level = user_profile.current_level || 0;
  const levelGradient = [
    "", // 0
    "bg-gradient-to-r from-[#6C9EA0] to-[#165558]",
    "bg-gradient-to-r from-[#BE382B] to-[#901D23]",
    "bg-gradient-to-r from-[#CE919B] to-[#C25ABD]",
    "bg-gradient-to-r from-[#DDC4A9] to-[#B7A088]",
    "bg-gradient-to-r from-[#313435] to-[#2A2C2D]",
  ];

  const progress_level =
    level === 1
      ? 0
      : level === 2
      ? 25
      : level === 3
      ? 50
      : level === 4
      ? 75
      : 100;

  const formatPrice = (value: number) => {
    if (value >= 1_000_000) {
      return `${(value / 1_000_000).toFixed(value % 1_000_000 === 0 ? 0 : 1)}M`;
    } else if (value >= 1_000) {
      return `${(value / 1_000).toFixed(value % 1_000 === 0 ? 0 : 1)}K`;
    }
    return value.toString();
  };

  return (
    <Card>
      <CardContent className="w-full flex flex-col gap-4">
        <Label className="text-[16px]">Tier Progress</Label>
        <div className="w-full h-auto relative flex justify-center items-center">
          <Progress
            value={progress_level}
            className="w-full   absolute z-10"
          ></Progress>
          <div className="w-full flex justify-between z-10 ">
            <div
              className={`bg-gradient-to-r ${
                level >= 1 ? levelGradient[1] : "bg-[#D1D1D1]"
              } h-10 w-10 rounded-full flex items-center justify-center group hover:text-white`}
            >
              <Label
                className={`group-hover:text-white text-white ${
                  level >= 1 ? "text-white" : "text-gray-500"
                } text-xl`}
              >
                1
              </Label>
            </div>
            <div
              className={`hover:bg-gradient-to-r hover:from-[#BE382B] hover:to-[#901D23] ${
                level >= 2 ? levelGradient[2] : "bg-[#D1D1D1]"
              }  h-10 w-10 rounded-full flex items-center justify-center group hover:text-white`}
            >
              <Label
                className={`group-hover:text-white  ${
                  level >= 2 ? "text-white" : "text-gray-500"
                } text-xl`}
              >
                2
              </Label>
            </div>
            <div
              className={`hover:bg-gradient-to-r hover:from-[#CE919B] hover:to-[#C25ABD] ${
                level >= 3 ? levelGradient[3] : "bg-[#D1D1D1]"
              }  h-10 w-10 rounded-full flex items-center justify-center group hover:text-white`}
            >
              <Label
                className={`group-hover:text-white ${
                  level >= 3 ? "text-white" : "text-gray-500"
                }  text-xl`}
              >
                3
              </Label>
            </div>
            <div
              className={`hover:bg-gradient-to-r hover:from-[#DDC4A9] hover:to-[#B7A088] ${
                level >= 4 ? levelGradient[4] : "bg-[#D1D1D1]"
              } h-10 w-10 rounded-full flex items-center justify-center group hover:text-white`}
            >
              <Label
                className={`group-hover:text-white ${
                  level >= 4 ? "text-white" : "text-gray-500"
                } text-xl`}
              >
                4
              </Label>
            </div>
            <div
              className={`hover:bg-gradient-to-r hover:from-[#313435] hover:to-[#2A2C2D] ${
                level >= 5 ? levelGradient[5] : "bg-[#D1D1D1]"
              } h-10 w-10 rounded-full flex items-center justify-center group hover:text-white`}
            >
              <Label
                className={`group-hover:text-white ${
                  level >= 5 ? "text-white" : "text-gray-500"
                } text-xl`}
              >
                5
              </Label>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          {user_profile.levels_list.map((item, index) => (
            <div className="w-10 flex flex-col items-center justify-center">
              <Label className="text-[11px]">{item.name}</Label>
              <Label className="text-gray-600 text-[11px]">
                £{formatPrice(Number(user_profile.levels_list[index].max_price))}
              </Label>
            </div>
          ))}
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-2">
          <Label className="font-normal">Current AUM: £111</Label>
          <Label className="text-green-600 font-normal">
            £500K more to reach Gold Tier
          </Label>
        </div>
      </CardContent>
    </Card>
  );
}
