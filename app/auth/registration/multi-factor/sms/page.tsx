"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import Logo from "@/app/images/logo.png";
import SpinnerIcon from "@/app/images/Spinner";
import { useRouter } from "next/navigation";
import { ArrowRight, MessageSquare, ShieldCheck, ThumbsUp } from "lucide-react";
import "@/app/globals.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import PhoneInput from "@/app/components/PhoneInput";

export default function SMS() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingNotReady, setLoadingNotReady] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [verify, setVerify] = useState(false);

  const handleSendCode = () => {
    setVerify(true);
  };

  const handleVerify = () => {
    setOpen(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 3000);
  };

  return (
    <div className="w-full h-full flex flex-col  multi-cont ">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>Registration Successful</DialogTitle>
          <DialogDescription>
            Success! Your registration is confirmed. Redirecting to dashboard...
          </DialogDescription>
        </DialogContent>
      </Dialog>
      <div className="w-full h-[30%] flex items-center justify-center p-4 ">
        <Image
          src={Logo}
          className="h-auto w-auto max-w-60"
          width={400}
          height={400}
          alt="logo"
        ></Image>
      </div>

      <div className="w-full flex flex-col gap-4 justify-center items-center">
        {verify ? (
          <>
            <div className="w-full">
              <Progress value={80}></Progress>
            </div>
            <div className="w-full flex flex-col justify-center items-center gap-4">
              <ThumbsUp color="#2E5257" size={40}></ThumbsUp>
              <div className="w-full flex flex-col justify-center items-center gap-4">
                <p>Enter the 6-digit code sent.</p>
                <div className="flex gap-1 justify-center items-center">
                  <MessageSquare color="#2E5257"></MessageSquare>
                  <p className="text-gray-500"></p>
                </div>
              </div>
              <div className="w-full">
                <Input
                  className="h-10 w-full text-center"
                  placeholder="1 2 3 4 5 6"
                ></Input>
              </div>
              <Button className="bg-[#2E5257] w-full" onClick={handleVerify}>
                Verify
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="w-full">
              <Progress value={60}></Progress>
            </div>
            <div className="w-full">
              <Label className="font-light">Enter your phone number</Label>
            </div>
            <PhoneInput></PhoneInput>
            <Button onClick={handleSendCode} className="bg-[#2E5257] w-full">
              {loading && <SpinnerIcon strokeColor="white"></SpinnerIcon>} Send
              Code <ArrowRight></ArrowRight>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
