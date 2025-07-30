"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Circle } from "lucide-react";
import React from "react";
import "@/app/globals.css";
import { useUserContext } from "@/app/context/UserContext";

export default function TierOne() {
  const { user_profile } = useUserContext();
  const current_level = user_profile.current_level;
  const level_ar = current_level - 1;

  const formatPrice = (value: number) => {
    if (value >= 1_000_000) {
      return `${(value / 1_000_000).toFixed(value % 1_000_000 === 0 ? 0 : 1)}M`;
    } else if (value >= 1_000) {
      return `${(value / 1_000).toFixed(value % 1_000 === 0 ? 0 : 1)}K`;
    }
    return value.toString();
  };

  return (
    <div className="flex gap-4 w-full tier-one-cont">
      <Card className="w-full">
        <CardContent className="flex flex-col gap-4 w-full">
          <div className="flex gap-2">
            <div className="flex items-center justify-center">
              <Circle
                color="#DBEAFE"
                size={15}
                className="bg-[#DBEAFE] flex items-center justify-center rounded-full"
              ></Circle>
            </div>
            <div>
              <Label className="font-normal text-gray-600">
                Client Growth Views
              </Label>
              <Label className="font-bold text-2xl text-[#2E5257]">
                {user_profile.commision_rate || 0}%
              </Label>
            </div>
          </div>
          <div className="flex justify-between">
            <Label className="font-normal text-gray-600">Next tier: </Label>
            <Label className="font-normal text-green-500">
              £
              {formatPrice(
                Number(user_profile.levels_list[level_ar].max_price)
              )}{" "}
              to go
            </Label>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardContent className="flex flex-col gap-4">
          <div className="flex gap-2">
            <div className="flex items-center justify-center">
              <Circle
                color="#D1FAE5"
                size={15}
                className="bg-[#D1FAE5] flex items-center justify-center rounded-full"
              ></Circle>
            </div>
            <div>
              <Label className="font-normal text-gray-600">Next Payment</Label>
              <Label className="font-bold text-2xl text-[#2E5257]">
                £
                {Number(user_profile.next_payment).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) || 0}
              </Label>
            </div>
          </div>
          <div className="flex justify-between">
            <Label className="font-normal text-gray-600">Due date</Label>
            <Label className="font-normal text-gray-600">
              {user_profile.due_date || ""}
            </Label>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardContent className="flex flex-col gap-4">
          <div className="flex gap-2">
            <div className="flex items-center justify-center">
              <Circle
                color="#EDE9FE"
                size={15}
                className="bg-[#EDE9FE] flex items-center justify-center rounded-full"
              ></Circle>
            </div>
            <div>
              <Label className="font-normal text-gray-600">Total Clients</Label>
              <Label className="font-bold text-2xl text-[#2E5257]">
                {user_profile.total_clients || 0}
              </Label>
            </div>
          </div>
          <div className="flex justify-between">
            <Label className="font-normal text-gray-600">This month</Label>
            <Label className="font-normal text-green-500">
              {user_profile.total_clients_month}
            </Label>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardContent className="flex flex-col gap-4">
          <div className="flex gap-2">
            <div>
              <Label className="font-normal text-gray-600">Total AUM</Label>
              <Label className="font-bold text-2xl text-[#2E5257]">
                £
                {Number(user_profile.total_aum).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) || 0}
              </Label>
            </div>
          </div>
          <div className="flex justify-between">
            <Label className="font-normal text-gray-600">This year</Label>
            <Label className="font-normal text-green-500">
              +£{user_profile.total_aum_yearly.toFixed(2)}
            </Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
