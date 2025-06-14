"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import SpinnerIcon from "@/app/images/Spinner";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Logo from "@/app/images/logo.png"
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";


export default function ForgotPassword() {
  const router = useRouter();
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingSend, setLoadingSend] = useState(false);

  const navigateBackLogin = () => {
    setLoadingLogin(true);
    router.push("/");
  };

  const handleSend = () => {
    setLoadingSend(true);
    router.push("/auth/forgot-password/reset-pass");
  };

  return (
    <div className="w-full h-full forgot-cont flex flex-col items-center justify-center">
       <div className=" w-full p-4 h-30 flex items-center justify-center">
        <Image
          src={Logo}
          className="h-auto w-auto max-w-60"
          width={400}
          height={400}
          alt="logo"
        ></Image>
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="w-full text-center gap-4 flex flex-col justify-center items-center">
          <Label className="text-[30px] text-center">
            Forgot your password?
          </Label>
          <Label className="font-thin text-gray-500">
            Enter your email so we can send your password reset link.
          </Label>
        </div>
        <div className="flex flex-col gap-4 mt-8">
          <div className="flex flex-col gap-2">
            <Label>Email</Label>
            <Input placeholder="example@gmail.com"></Input>
          </div>
          <Button onClick={handleSend} className="w-full bg-[#2E5257]">
            {loadingSend && <SpinnerIcon strokeColor="white"></SpinnerIcon>}
            Send Email
          </Button>
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
      </div>
    </div>
  );
}
