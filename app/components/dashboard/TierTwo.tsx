"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import React from "react";
import "@/app/globals.css";
import { useUserContext } from "@/app/context/UserContext";
import Decimal from "decimal.js";
import { CheckCheck } from "lucide-react";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function TierTwo() {
  const { user_profile, aum_growth } = useUserContext();
  // const sortedLevels = [...user_profile.levels_list].sort(
  //   (a, b) => a.level - b.level
  // );

  const total_investment = user_profile.total_monthly_aum;
  const level = user_profile.current_level || 0;
  const levelGradient = [
    "", // 0
    "bg-gradient-to-r from-[#145356] to-[#145356]",
    "bg-gradient-to-r from-[#8D1B22] to-[#8D1B22]",
    "bg-gradient-to-r from-[#F4F6F8] to-[#F4F6F8]",
    "bg-gradient-to-r from-[#C4AD93] to-[#C4AD93]",
    "bg-gradient-to-r from-[#121416] to-[#121416]",
  ];

  const milestones = [
    { amount: 25_000, percent: 10 },
    { amount: 250_000, percent: 30 },
    { amount: 500_000, percent: 50 },
    { amount: 1_000_000, percent: 75 },
    { amount: 2_500_000, percent: 100 },
  ];

  function getProgress(amount: number) {
    if (amount <= milestones[0].amount) {
      return (amount / milestones[0].amount) * milestones[0].percent;
    }

    for (let i = 0; i < milestones.length - 1; i++) {
      const curr = milestones[i];
      const next = milestones[i + 1];
      if (amount <= next.amount) {
        const rangeAmount = next.amount - curr.amount;
        const rangePercent = next.percent - curr.percent;
        const progressInRange =
          ((amount - curr.amount) / rangeAmount) * rangePercent;
        return curr.percent + progressInRange;
      }
    }

    return 100; // cap
  }

  const progress_level = getProgress(total_investment);
  const currentPosition = progress_level;
  // const progress_level = (total_investment / 5000000) * 100;

  // console.log("TOTAL INVESTMENT: ", sortedLevels);

  const formatNumber = (value: number, digits = 1) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: digits,
    }).format(value);
  };

  const formatPrice = (value: number): string => {
    const trillions = value / 1_000_000_000_000;
    const billions = value / 1_000_000_000;
    const millions = value / 1_000_000;
    const thousands = value / 1_000;

    if (trillions >= 0.9995) {
      return `${formatNumber(trillions)}T`;
    } else if (billions >= 1) {
      return `${formatNumber(billions)}B`;
    } else if (millions >= 1) {
      return `${formatNumber(millions)}M`;
    } else if (thousands >= 1) {
      return `${formatNumber(thousands)}K`;
    }
    return formatNumber(value);
  };

  // const price = new Decimal(sortedLevels[4]?.min_price ?? 0);
  // const goldTierProgressLabel = user_profile.next_tier.next_tier_to_go;

  // console.log("currentPosition: ", currentPosition);
  return (
    <Card>
      <CardContent className="w-full flex flex-col gap-4">
        <Label className="text-[16px]">Tier Progress</Label>
        <div className="w-full h-auto relative flex flex-col  justify-center items-center">
          <div className="relative w-full my-8">
            <Progress value={progress_level} className="w-full" />

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="absolute top-0 -translate-y-2 w-4 h-4 rounded-full bg-transparent shadow-lg cursor-pointer"
                    style={{
                      left: `${currentPosition}%`,
                      transform: "translateX(-50%)",
                    }}
                  />
                </TooltipTrigger>

                <TooltipContent side="top" sideOffset={-5}>
                  <p>You are here: £{formatPrice(total_investment)}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="w-full flex justify-between z-10 ">
            <div
              className={`bg-gradient-to-r ${
                level >= 1 ? levelGradient[1] : "bg-[#145356]"
              } h-10 w-10 rounded-full flex items-center justify-center group hover:text-white`}
            >
              <Label
                className={`group-hover:text-white text-white ${
                  level >= 1 ? "text-white" : "text-gray-500"
                } text-xl`}
              >
                {level >= 1 ? (
                  <Image
                    src={"checkWhite.svg"}
                    width={20}
                    height={20}
                    alt="check"
                  ></Image>
                ) : (
                  1
                )}
              </Label>
            </div>
            <div
              className={`hover:bg-gradient-to-r hover:from-[#8D1B22] hover:to-[#8D1B22] ${
                level >= 2 ? levelGradient[2] : "bg-[#D1D1D1]"
              }  h-10 w-10 rounded-full flex items-center justify-center group hover:text-white`}
            >
              <Label
                className={`group-hover:text-white  ${
                  level >= 2 ? "text-white" : "text-gray-500"
                } text-xl`}
              >
                {level >= 2 ? (
                  <Image
                    className=""
                    src={"checkWhite.svg"}
                    width={20}
                    height={20}
                    alt="check"
                  ></Image>
                ) : (
                  2
                )}
              </Label>
            </div>
            <div
              className={`hover:bg-gradient-to-r border border-gray-300 hover:from-[#F4F6F8] hover:to-[#F4F6F8] ${
                level >= 3 ? levelGradient[3] : "bg-[#D1D1D1]"
              } 
                h-10 w-10 rounded-full flex items-center justify-center group hover:text-white`}
            >
              <Label
                className={` group-hover:text-gray-500 ${
                  level >= 3 ? "text-white" : "text-gray-500"
                }  text-xl`}
              >
                {level >= 3 ? (
                  <Image
                    className="drop-shadow-[0_0px_0px_rgba(0,0,0,1)]"
                    src="/checkWhite.svg"
                    width={20}
                    height={20}
                    alt="check"
                  />
                ) : (
                  3
                )}
              </Label>
            </div>
            <div
              className={`hover:bg-gradient-to-r hover:from-[#C4AD93] hover:to-[#C4AD93] ${
                level >= 4 ? levelGradient[4] : "bg-[#D1D1D1]"
              } h-10 w-10 rounded-full flex items-center justify-center group hover:text-white`}
            >
              <Label
                className={`group-hover:text-white ${
                  level >= 4 ? "text-white" : "text-gray-500"
                } text-xl`}
              >
                {level >= 4 ? (
                  <Image
                    src={"checkWhite.svg"}
                    width={20}
                    height={20}
                    alt="check"
                  ></Image>
                ) : (
                  4
                )}
              </Label>
            </div>
            <div
              className={`hover:bg-gradient-to-r hover:from-[#121416] hover:to-[#121416] ${
                level >= 5 ? levelGradient[5] : "bg-[#D1D1D1]"
              } h-10 w-10 rounded-full flex items-center justify-center group hover:text-white`}
            >
              <Label
                className={`group-hover:text-white ${
                  level >= 5 ? "text-white" : "text-gray-500"
                } text-xl`}
              >
                {level >= 5 ? (
                  <Image
                    src={"checkWhite.svg"}
                    width={20}
                    height={20}
                    alt="check"
                  ></Image>
                ) : (
                  5
                )}
              </Label>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          {/* {sortedLevels.map((item, index) => (
            <div className="w-10 flex flex-col items-center justify-center">
              <Label className="text-[11px] text-center">{item.name}</Label>
              <Label className="text-gray-600 text-[11px]">
                £
                {formatPrice(
                  Math.round(Number(sortedLevels[index].min_price) * 100) / 100
                )}
              </Label>
              <Label className="text-[10px] text-center">
                {item.level === 1
                  ? "0.4"
                  : item.level === 3
                  ? "0.55"
                  : Number(item.fee)}
                %
              </Label>
            </div>
          ))} */}
          <p>LEVEL WAS HEREE</p>
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-2">
          <Label className="text-green-600 font-normal">
            {/* £{formatPrice(goldTierProgressLabel)} more to reach
            <span className="capitalize">
              {user_profile.next_tier.next_level.charAt(0).toUpperCase() +
                user_profile.next_tier.next_level.slice(1).toLowerCase()}
            </span> */}
            POSITION WAS HERE
          </Label>
        </div>
      </CardContent>
    </Card>
  );
}
