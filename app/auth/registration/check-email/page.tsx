"use client";
import React, { Suspense, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import SpinnerIcon from "@/app/images/Spinner";
import { ChevronLeft } from "lucide-react";

export default function CheckEmail() {
  const router = useRouter();
  const [loadingLogin, setLoadingLogin] = useState(false);

  const navigateBackLogin = () => {
    setLoadingLogin(true);
    router.replace("/");
  };

  return (
    <Suspense>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <Label className="text-[25px]">Check your inbox!</Label>
        <Label className="font-light">
          Check your email to verify and proceed.
        </Label>
        <div className="w-auto h-70">
          <DotLottieReact src="/email.lottie" loop autoplay />
        </div>
        <Button
          onClick={navigateBackLogin}
          variant={"ghost"}
          className="font-light p-0 text-left gap-2 flex items-center justify-center"
        >
          {loadingLogin && (
            <div className="w-5 h-full flex items-center">
              <SpinnerIcon strokeColor="#2E5257"></SpinnerIcon>
            </div>
          )}
          <ChevronLeft></ChevronLeft> Back to Login
        </Button>
      </div>
    </Suspense>
  );
}
