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
import { ArrowRight, ShieldCheck } from "lucide-react";
import "@/app/globals.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

export default function MultiFactor() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingNotReady, setLoadingNotReady] = useState(false);
  const [loadingDialog, setLoadingDialog] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const handleNotReady = () => {
    setLoadingNotReady(true);
    setLoadingNotReady(false);
    setOpen(true);
  };

  const handleDashboard = () => {
    setLoadingDialog(true);
    router.push("/dashboard");
  };

  const handleRegister = () => {
    if (selected === "mfa") {
      router.push("/auth/registration/multi-factor/authenticator");
    } else if (selected === "sms") {
      router.push("/auth/registration/multi-factor/sms");
    } else {
      setOpen(true);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-evenly multi-cont ">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full flex flex-col">
          <DialogTitle>Missing Extra Layer</DialogTitle>
          <DialogDescription>
            You&quot;re about to skip two-factor authentication. Are you sure you
            want to proceed?
          </DialogDescription>
          <div className="gap-2 flex justify-end items-center w-full">
            <Button className="w-30 bg-[#8B1D24]" onClick={handleDashboard}>
              {loadingDialog && <SpinnerIcon strokeColor="white"></SpinnerIcon>}{" "}
              Yes
            </Button>
            <Button
              className="w-30 bg-[#2E5257]"
              onClick={() => setOpen(false)}
            >
              No
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <div className="w-full flex items-center justify-center p-4 ">
        <Image
          src={Logo}
          className="h-auto w-auto max-w-60"
          width={400}
          height={400}
          alt="logo"
        ></Image>
      </div>
      <div className="w-full">
        <Progress value={40}></Progress>
      </div>
      <div className="w-full flex justify-center items-center">
        <div className="gap-4 w-full flex flex-col justify-center items-center">
          <Label className="text-center text-[20px]">
            Secure your Account (Optional)
          </Label>
          <Label className="text-center font-light">
            You can add an extra layer of security to protect sensitive actions
            like checkout, selling, withdrawals, etc...
          </Label>
          <div className="w-full flex flex-col gap-4">
            <Card
              onClick={() => setSelected("mfa")}
              className={`border-2 hover:border-[#C4AD93] transition ease-in-out ${
                selected === "mfa" && "border-2 border-[#C4AD93]"
              }`}
            >
              <CardContent className="flex gap-4 items-center">
                <div>
                  <ShieldCheck color="#C4AD93"></ShieldCheck>
                </div>
                <div>
                  <Label className="text-[16px]">Authenticator App (MFA)</Label>
                  <Label className="text-[12px] font-light text-neutral-500">
                    Use Google Authenticator or any Authy for codes.
                  </Label>
                </div>
              </CardContent>
            </Card>
            <Card
              onClick={() => setSelected("sms")}
              className={`${
                selected === "sms" && "border-2 border-[#C4AD93]"
              } border-2 hover:border-[#C4AD93] transition ease-in-out`}
            >
              <CardContent className="flex gap-4 items-center">
                <div>
                  <ShieldCheck color="#C4AD93"></ShieldCheck>
                </div>
                <div>
                  <Label className="text-[16px]">SMS/ Text Message</Label>
                  <Label className="text-[12px] font-light text-neutral-500">
                    Receive a code via text message.
                  </Label>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex justify-center my-2 ">
        <Label
          className="cursor-pointer flex justify-center items-center"
          onClick={handleNotReady}
        >
          <div className="w-5 flex justify-center items-center">
            {loadingNotReady && (
              <SpinnerIcon strokeColor="#2E5257"></SpinnerIcon>
            )}{" "}
          </div>
          Not Ready? You can set this up later.
        </Label>
      </div>
      <Button onClick={handleRegister} className="bg-[#2E5257] w-full">
        {loading && <SpinnerIcon strokeColor="white"></SpinnerIcon>} Register{" "}
        <ArrowRight></ArrowRight>
      </Button>
    </div>
  );
}
