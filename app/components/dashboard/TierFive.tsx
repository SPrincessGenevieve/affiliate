"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "@/app/globals.css";
import SpinnerIcon from "@/app/images/Spinner";
import { useUserContext } from "@/app/context/UserContext";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function TierFive() {
  const { user_profile, recent_referrals } = useUserContext();
  const items = recent_referrals.length;
  // const recent_refferal = user_profile.user_referral_detail.recent_referrals;

  const formatToK = (amount: number) => {
    if (!amount) return "0";
    return `${Math.round(amount / 1000)}K`;
  };

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const navigateReferral = () => {
    setLoading(true);
    setTimeout(() => {
      router.push("/dashboard/referrals");
    }, 3000);
  };

  return (
    <Card className="m-0 p-0 w-full flex tier-five-cont">
      <CardContent className="p-0 flex flex-col w-full h-full">
        <div className="w-full h-[90%]">
          <Label className="text-[16px] px-4 py-5">Recent Referrals</Label>
          <Separator></Separator>
          <ScrollArea className="h-screen max-h-[340px]  p-4 flex flex-col gap-2">
            <div className="w-full flex flex-col gap-4">
              {items > 0 ? (
                <>
                  {recent_referrals.slice(0, 4).map((item, index) => (
                    <div
                      key={index}
                      className="bg-[#F9FAFB]  min-h-10 flex w-full gap-2 items-center justify-between rounded-xl p-2"
                    >
                      <div className="flex flex-col gap-2">
                        <Label className="text-[16px] capitalize">
                          {item.full_name}
                        </Label>
                        <div className="flex justify-between gap-4">
                          <Label className="text-[12px] text-gray-400 font-normal">
                            {new Date(item.created_at).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </Label>
                        </div>
                      </div>
                      <Label
                        className={`text-[20px]  ${
                          Number(item.deposit_amount) <= 0
                            ? "text-gray-400"
                            : "text-[#2E5257]"
                        } font-bold`}
                      >
                        £{formatToK(Number(item.deposit_amount))}
                      </Label>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <div className="h-full w-full flex flex-col items-center justify-center">
                    <DotLottieReact
                      src="/empty.lottie"
                      loop
                      autoplay
                    ></DotLottieReact>
                    <Label className="text-center">
                      You haven’t made any referrals yet. Share your link to get
                      started!
                    </Label>
                  </div>
                </>
              )}
            </div>
          </ScrollArea>
        </div>
        <Separator></Separator>
        <div className="w-full h-[10%]">
          <Button
            onClick={navigateReferral}
            className="text-[14px] text-[#2E5257] font-normal h-10 w-full hover:underline cursor-pointer"
            variant={"ghost"}
          >
            {" "}
            {loading && <SpinnerIcon strokeColor="#2E5257"></SpinnerIcon>}
            View All Referrals
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
