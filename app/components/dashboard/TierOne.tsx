"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Circle } from "lucide-react";
import React, { useState } from "react";
import "@/app/globals.css";
import { useUserContext } from "@/app/context/UserContext";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

export default function TierOne() {
  const { user_profile, network_details } = useUserContext();
  // const currentLevel = user_profile.current_level;
  // const matchCurrentLevel = user_profile.levels_list.find(
  //   (level) => level.id === user_profile.current_level
  // );
  // const next_level = currentLevel + 1;
  // const matchNextLevel = user_profile.levels_list.find(
  //   (level) => level.id === next_level
  // );
  // const next_tier = user_profile.next_tier.next_tier_to_go

  const formatPrice = (value: number) => {
    if (value >= 1_000_000) {
      return `${(value / 1_000_000).toFixed(value % 1_000_000 === 0 ? 0 : 1)}M`;
    } else if (value >= 1_000) {
      return `${(value / 1_000).toFixed(value % 1_000 === 0 ? 0 : 1)}K`;
    }
    return value.toString();
  };

  const [toggle, setToggle] = useState(false);

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
              <Label className="font-normal text-white/70">
                Commission Rate
              </Label>
              <Label className="font-bold text-2xl text-[#C4AD93]">
                {user_profile.commision_rate || 0}%
              </Label>
            </div>
          </div>
          <div className="flex justify-between">
            {/* <Label className="font-normal text-white/70">Next tier: </Label> */}
            <Label className="font-normal text-green-500">
              {/* £{formatPrice(Number(next_tier))} to go */}
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
              <Label className="font-normal text-white/70">
                Your Next Monthly Payment
              </Label>
              <Label className="font-bold text-2xl text-[#C4AD93]">
                £
                {Number(user_profile.next_payment).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) || 0}
              </Label>
            </div>
          </div>
          <div className="flex justify-between">
            <Label className="font-normal text-white/70">Due date</Label>
            <Label className="font-normal text-white/70">
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
              <Label className="font-normal text-white/70">Total Clients</Label>
              <Label className="font-bold text-2xl text-[#C4AD93]">
                {user_profile.total_clients || 0}
              </Label>
            </div>
          </div>
          <div className="flex justify-between">
            <Label className="font-normal text-white/70">This month</Label>
            <Label className="font-normal text-green-500">
              {user_profile.total_clients_month}
            </Label>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardContent className="flex flex-col gap-4 relative">
          <Switch
            checked={toggle}
            onCheckedChange={setToggle}
            className="absolute top-0 right-5"
          ></Switch>

          {toggle ? (
            <>
              <div className="flex gap-2">
                <div>
                  <Label className="font-normal text-white/70">
                    Total Commission Earned
                  </Label>
                  <Label className="font-bold text-2xl text-[#C4AD93]">
                    £
                    {Number(user_profile.total_commission).toLocaleString(
                      undefined,
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    ) || 0}
                  </Label>
                </div>
              </div>
              <div className="flex justify-between">
                <Label className="font-normal text-white/70">This year</Label>
                <Label className="font-normal text-green-500">
                  +£
                  {Number(
                    user_profile.total_commission_yearly.toFixed(2)
                  ).toLocaleString()}
                </Label>
              </div>
            </>
          ) : (
            <>
              <div className="flex gap-2">
                <div>
                  <Label className="font-normal text-white/70">Total AUM</Label>
                  <Label className="font-bold text-2xl text-[#C4AD93]">
                    £
                    {Number(
                      user_profile?.total_monthly_aum ?? 0
                    ).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </Label>
                </div>
              </div>
              <div className="flex justify-between">
                <Label className="font-normal text-white/70">This year</Label>
                <Label className="font-normal text-green-500">
                  +£
                  {Number(
                    user_profile.total_commission_yearly.toFixed(2)
                  ).toLocaleString()}
                </Label>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
