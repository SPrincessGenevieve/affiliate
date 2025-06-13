"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import SpinnerIcon from "@/app/images/Spinner";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Logo from "@/app/images/logo.png"


export default function ResetPass() {
  const router = useRouter();
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingSend, setLoadingSend] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const navigateBackLogin = () => {
    setLoadingLogin(true);
    setLoadingSend(false);
    router.push("/");
  };

  const handleReset = () => {
    // setLoadingSend(true);
    toast.custom(
      (t) => (
        <div className="w-full max-w-md bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-lg shadow-lg p-4">
          <div
            className={`text-sm font-medium ${
              isSuccess ? "text-[#2E5257]" : "text-[red]"
            }`}
          >
            {isSuccess ? "Updated Successfully!" : "Update Failed!"}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {isSuccess
              ? "Your password has been updated successfully. Please log in again using your new credentials."
              : "There was an issue updating your password. Please try again."}
          </div>
          {isSuccess && (
            <div className="mt-3 text-right">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  navigateBackLogin();
                  toast.dismiss(t); // Close the toast
                }}
              >
                Login
              </Button>
            </div>
          )}
        </div>
      ),
      {
        duration: isSuccess ? Infinity : 3000, // prevents auto-close
      }
    );
  };

  return (
    <div className="w-full h-full flex flex-col gap-2 justify-evenly">
      <div className=" w-full p-4 h-30 my-10 flex items-center justify-center">
        <Image
          src={Logo}
          className="h-auto w-auto max-w-60"
          width={400}
          height={400}
          alt="logo"
        ></Image>
      </div>
      <div className="w-full text-center my-4 flex flex-col justify-center items-center">
        <Label className="text-[30px] text-center">Reset Password</Label>
        <Label className="font-thin text-gray-500">
          Please kindly set your new password
        </Label>
      </div>
      <div className="flex flex-col gap-4 h-full">
        <div className="flex flex-col gap-2">
          <Label>New Password</Label>
          <Input type="password"></Input>
        </div>
        <div className="flex flex-col gap-2">
          <Label>Re-enter Password</Label>
          <Input type="password"></Input>
        </div>
        <Button onClick={handleReset} className="w-full bg-[#2E5257]">
          {loadingSend && <SpinnerIcon strokeColor="white"></SpinnerIcon>}
          Continue
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
  );
}
