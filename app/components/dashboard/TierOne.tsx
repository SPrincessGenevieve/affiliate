"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Circle } from "lucide-react";
import React from "react";
import "@/app/globals.css";
import { useUserContext } from "@/app/context/UserContext";

export default function TierOne() {
  const { user_profile } = useUserContext();
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
                Commission Rate
              </Label>
              <Label className="font-bold text-2xl text-[#2E5257]">
                {user_profile.commision_rate}%
              </Label>
            </div>
          </div>
          <div className="flex justify-between">
            <Label className="font-normal text-gray-600">Next tier: </Label>
            <Label className="font-normal text-green-500">£500K to go</Label>
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
                £{user_profile.next_payment.toLocaleString()}
              </Label>
            </div>
          </div>
          <div className="flex justify-between">
            <Label className="font-normal text-gray-600">Due date</Label>
            <Label className="font-normal text-gray-600">28 Feb 2025</Label>
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
                {user_profile.referral_total_clicks}
              </Label>
            </div>
          </div>
          <div className="flex justify-between">
            <Label className="font-normal text-gray-600">This month</Label>
            <Label className="font-normal text-green-500">+4 new</Label>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardContent className="flex flex-col gap-4">
          <div className="flex gap-2">
            <div>
              <Label className="font-normal text-gray-600">Total AUM</Label>
              <Label className="font-bold text-2xl text-[#2E5257]">
                £{Number(user_profile.aum).toLocaleString()}
              </Label>
            </div>
          </div>
          <div className="flex justify-between">
            <Label className="font-normal text-gray-600">This year</Label>
            <Label className="font-normal text-green-500">+£800K</Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
