"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import SpinnerIcon from "@/app/images/Spinner";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
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
    <div className="w-full h-full p-20 forgot-cont flex items-center justify-center">
      <Card className="w-full h-full flex items-center rounded-none card-cont ">
        <CardContent className="w-[90%] h-[70%] min-h-[300px] flex">
          <div className="w-full h-full flex flex-col gap-2 justify-evenly">
            <div className="w-full text-center my-4 flex flex-col justify-center items-center">
              <Label className="text-[30px] text-center">
                Forgot your password?
              </Label>
              <Label className="font-thin text-gray-500">
                Enter your email so we can send your password reset link.
              </Label>
            </div>
            <div className="flex flex-col gap-4">
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
        </CardContent>
      </Card>
    </div>
  );
}
