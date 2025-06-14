"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import "@/app/globals.css";
import Logo from "@/app/images/logo.png";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import SpinnerIcon from "./images/Spinner";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingForgotPass, setLoadingForgotPass] = useState(false);

  const handleSignIn = () => {
    setLoading(true);
    router.push("/dashboard");
  };

  const handleForgotPassword = () => {
    setLoadingForgotPass(true);
    router.push("/auth/forgot-password");
  };

  return (
    <div className="flex flex-col justify-center  h-full">
      <div className=" w-full h-30 flex items-center justify-center">
        <Image
          src={Logo}
          className="h-auto w-auto max-w-60"
          width={400}
          height={400}
          alt="logo"
        ></Image>
      </div>
      <div className="flex flex-col gap-4 h-auto mt-5 p-4">
        <div className="flex flex-col gap-2">
          <Label className="font-normal">Email</Label>
          <Input></Input>
        </div>
        <div className="flex flex-col gap-2">
          <Label className="font-normal">Password</Label>
          <Input type="password"></Input>
        </div>
        <div>
          <Button
            variant={"ghost"}
            onClick={handleForgotPassword}
            className="font-light p-0 text-left gap-2 flex items-center justify-center"
          >
            {loadingForgotPass && (
              <div className="w-5 h-full flex items-center">
                <SpinnerIcon strokeColor="#2E5257"></SpinnerIcon>
              </div>
            )}
            Forgot Password?
          </Button>
        </div>

        <Button onClick={handleSignIn} className="bg-[#2E5257]">
          {loading && <SpinnerIcon strokeColor="white"></SpinnerIcon>} Login{" "}
          <ArrowRight></ArrowRight>
        </Button>
        <Link href={"/auth/register"} className="font-light text-center">
          You do not have an account yet? Create an account here.
        </Link>
      </div>
    </div>
  );
}
