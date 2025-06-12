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
  DialogTitle,
} from "@/components/ui/dialog";
import AudioInstruction from "@/app/components/AudioInstruction";
import Link from "next/link";
import AppStore from "@/app/images/app-store.png";
import PlayStore from "@/app/images/google-play.png";

interface GuideProps {
  onClick: () => void;
}

export default function AuthenticatorGuide({ onClick }: GuideProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingNotReady, setLoadingNotReady] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div>
      
      <div className="border p-2 rounded-xl">
        <p className="text-[14px]  font-medium">How to set up MFA?</p>
        <AudioInstruction></AudioInstruction>
      </div>
      <div className="h-[70%] flex flex-col justify-center items-center">
        <p className="text-[20px] text-center mb-5">
          Set Up MFA & KYC Before You Can Proceed
        </p>
        <div className="p-2 border-[3px] border-black rounded-full w-[100px] h-[100px] flex justify-center items-center">
          <Smartphone size={60} strokeWidth={1}></Smartphone>
        </div>
        <p className="text-[20px] text-center">Install an Authenticator App</p>
        <p className="text-center text-[14px] text-gray-500">
          You need an authenticator app on your phone. If you already have
          google Authenticator (or a different app), click next.{" "}
        </p>
        <div className="flex gap-2 my-5">
          <Link
            target="_blank"
            href={
              "https://apps.apple.com/us/app/google-authenticator/id388497605"
            }
            className="p-0 m-0 hover:scale-105 transition ease-in-out"
          >
            <Image
              src={AppStore}
              width={400}
              height={400}
              alt="app"
              className="w-30 h-auto"
            ></Image>
          </Link>
          <Link
            target="_blank"
            href={
              "https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en"
            }
            className="p-0 m-0 hover:scale-105 transition ease-in-out"
          >
            <Image
              src={PlayStore}
              width={400}
              height={400}
              alt="app"
              className="w-30 h-auto"
            ></Image>
          </Link>
        </div>
      </div>

      <Button onClick={onClick} className="bg-[#2E5257] w-full">
        {loading && <SpinnerIcon strokeColor="white"></SpinnerIcon>} Next{" "}
        <ArrowRight></ArrowRight>
      </Button>
    </div>
  );
}
