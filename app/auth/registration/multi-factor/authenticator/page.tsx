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
import { ArrowRight, ShieldCheck, Smartphone } from "lucide-react";
import "@/app/globals.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AudioInstruction from "@/app/components/AudioInstruction";
import Link from "next/link";
import AppStore from "@/app/images/app-store.png";
import PlayStore from "@/app/images/google-play.png";
import AuthenticatorGuide from "@/app/components/authenticator/AuthenticatorGuide";
import AuthenticatorVerify from "@/app/components/authenticator/AuthenticatorVerify";

export default function Authenticator() {
  const router = useRouter();
  const [next, setNext] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingNotReady, setLoadingNotReady] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const handleNext = () => {
    setNext(true);
  };

  const handleVerify = () => {
    setOpen(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 3000);
  };

  return (
    <div className="w-full h-full flex flex-col justify-evenly multi-cont overflow-auto">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogHeader>
          <DialogContent>
            <DialogTitle>Registration Successful</DialogTitle>
            <DialogDescription>
              Success! Your registration is confirmed. Redirecting to
              dashboard...
            </DialogDescription>
          </DialogContent>
        </DialogHeader>
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
        <Progress value={next ? 70 : 50}></Progress>
      </div>
      {next ? (
        <AuthenticatorVerify onClick={handleVerify}></AuthenticatorVerify>
      ) : (
        <AuthenticatorGuide onClick={handleNext}></AuthenticatorGuide>
      )}
    </div>
  );
}
