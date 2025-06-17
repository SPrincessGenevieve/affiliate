"use client";
import React, { Suspense } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function CheckEmail() {
  return (
    <Suspense>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <Label className="text-[25px]">Check your inbox!</Label>
        <Label className="font-light text-center">
          Please check your email and follow the link to update your password
          securely.
        </Label>
        <div className="w-auto h-70">
          <DotLottieReact src="/email.lottie" loop autoplay />
        </div>
      </div>
    </Suspense>
  );
}
