"use client";

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
import React, { useEffect, useState } from "react";
import "@/app/globals.css";
import TierFiveTable from "./tier-five-table";
import { useRouter } from "next/navigation";
import { getLeaderboard } from "@/lib/services/getData";
import { useUserContext } from "@/app/context/UserContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Leaderboard from "./Tier-4/Leaderboard";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function TierFour() {
  const { setUserDetails, affiliated_leaderboard, sessionkey } =
    useUserContext();


  useEffect(() => {
    const fetchAffilicated = async () => {
      try {
        const responseAffilicated = await getLeaderboard(sessionkey);
        setUserDetails({
          affiliated_leaderboard: responseAffilicated.data.results,
        });
      } catch (error) {}
    };

    fetchAffilicated();
  });


  return (
    <Card className="m-0 p-0 w-full h-full flex ">
      <CardContent className="p-0 m-0 flex flex-col  justify-between h-full w-full">
        <div className="h-[90%] w-full  ">
          <div className="flex w-full justify-between p-4">
            <Label className="text-[16px]">Affiliated Leaderboard</Label>
            {/* <Select defaultValue="q1">
              <SelectTrigger>
                <SelectValue></SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="q1">Q1 2025</SelectItem>
                <SelectItem value="q4">Q4 2024</SelectItem>
                <SelectItem value="q3">Q3 2024</SelectItem>
              </SelectContent>
            </Select> */}
          </div>
          <div className="w-full h-[80%] relative flex overflow-x-auto ">
            <div className="absolute w-full h-full flex px-4">
              {/* <TierFiveTable
                sliceCount={5}
                affiliated_data={affiliated_leaderboard}
              /> */}
              {affiliated_leaderboard.length > 0 ? (
                <>
                  <TierFiveTable
                    sliceCount={5}
                    affiliated_data={affiliated_leaderboard}
                  />
                </>
              ) : (
                <>
                  <div className="h-full w-full flex flex-col items-center justify-center">
                    <DotLottieReact
                      src="/empty.lottie"
                      loop
                      autoplay
                      className="h-50"
                    ></DotLottieReact>
                    <Label>
                      There are currently no records.
                    </Label>
                  </div>
                </>
              )}
              {/* <div className="h-full w-full flex flex-col items-center justify-center">
                <DotLottieReact
                  src="/maintenance.lottie"
                  loop
                  autoplay
                  className="h-50"
                ></DotLottieReact>
                <Label className="text-center">
                  This feature is currently under development. Please check back
                  soon!
                </Label>
              </div> */}
            </div>
          </div>
        </div>
        <Separator></Separator>
        <div className="h-[10%] w-full flex items-center justify-center">
          <Dialog>
            <DialogTrigger
              className={`${
                affiliated_leaderboard.length > 0
                  ? "text-[#2E5257] font-normal text-[14px] w-full h-10 hover:underline cursor-pointer"
                  : "opacity-50 text-[#2E5257] font-normal text-[14px] w-full h-10"
              }`}
            >
              View Full Leaderboard
            </DialogTrigger>
            <DialogContent className="w-full h-[70%] min-w-[40%] overflow-auto">
              <DialogHeader>
                <DialogTitle>Leaderboard</DialogTitle>
                <DialogDescription>
                  Browse the current top performers and their stats.
                </DialogDescription>
                <Leaderboard></Leaderboard>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
