import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { recent_refferal } from "@/lib/mock-data/recent_refferals";
import React from "react";
import "@/app/globals.css"

export default function TierFive() {
  const formatToK = (amount: number) => {
    if (!amount) return "0";
    return `${Math.round(amount / 1000)}K`;
  };

  return (
    <Card className="m-0 p-0 w-full flex max-w-[400px] tier-five-cont">
      <CardContent className="p-0 flex flex-col w-full h-full">
        <div className="w-full h-[90%]">
          <Label className="text-[16px] px-4 pb-5">Recent Referrals</Label>
          <Separator></Separator>
          <ScrollArea className="h-screen max-h-[320px] p-4 flex flex-col gap-2">
            <div className="w-full flex flex-col gap-4">
              {recent_refferal.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#F9FAFB]  min-h-10 flex w-full gap-2 items-center justify-between rounded-xl p-2"
                >
                  <div className="flex flex-col gap-2">
                    <Label className="text-[16px]">{item.name}</Label>
                    <div className="flex justify-between gap-4">
                      <Label
                        className={` ${
                          item.status === "Approved"
                            ? "bg-[#D1FAE5] text-[#055E45]"
                            : item.status === "Rejected"
                            ? "bg-[#FEE2E2] text-[#B91C1C]"
                            : item.status === "Pending"
                            ? "bg-[#FEF3C7] text-[#92400E]"
                            : ""
                        } rounded-3xl px-2 py-1 text-[12px] font-medium`}
                      >
                        {item.status}
                      </Label>
                      <Label className="text-[12px] text-gray-400 font-normal">
                        {item.date}
                      </Label>
                    </div>
                  </div>
                  <Label
                    className={`text-[20px]  ${
                      item.amount <= 0 ? "text-gray-400" : "text-[#8B1D24]"
                    } font-bold`}
                  >
                    £{formatToK(item.amount)}
                  </Label>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
        <Separator></Separator>
        <div className="w-full h-[10%]">
          <Button
            variant={"ghost"}
            className="text-[#8B1D24] font-normal h-10 w-full hover:underline cursor-pointer"
          >
            View All Referrals
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
