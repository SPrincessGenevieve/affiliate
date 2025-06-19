"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import SpinnerIcon from "@/app/images/Spinner";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Logo from "@/app/images/logo.png";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { postResetPassword } from "@/lib/services/postData";
import { toast } from "sonner";
import { getCSRF } from "@/lib/services/getData";

export default function ForgotPassword() {
  const router = useRouter();
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingSend, setLoadingSend] = useState(false);
  const [email, setEmail] = useState("");

  const navigateBackLogin = () => {
    setLoadingLogin(true);
    router.push("/");
  };

  const handleSend = async () => {
    setLoadingSend(true);
    try {
      const responseCSRF = await getCSRF();
      const csrfToken = responseCSRF?.data?.csrfToken;
      const responseSendEmail = postResetPassword(email, csrfToken);
      if (
        responseCSRF.status === 200 &&
        (await responseSendEmail).status === 200
      ) {
        router.push("/auth/forgot-password/check-email");
      }
    } catch (error: any) {
      const err = error.response.data.email[0];
      console.log(err);
      toast.custom(
        (t) => (
          <div className="w-full max-w-md bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-lg shadow-lg p-4">
            <div className={`text-sm font-medium text-red-600`}>
              Password Update request failed.
            </div>
            <div className={`text-sm text-gray-600 dark:text-gray-400 mt-1`}>
              {err ||
                "We couldn’t process your password update request. Try again shortly."}
            </div>
          </div>
        ),
        {
          duration: 5000,
        }
      );
    } finally {
      setLoadingSend(false);
    }
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
          <form
            className="flex flex-col gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <div className="flex flex-col gap-2">
              <Label>Email</Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
              ></Input>
            </div>
            <Button type="submit" className="w-full bg-[#2E5257]">
              {loadingSend && <SpinnerIcon strokeColor="white"></SpinnerIcon>}
              Send Email
            </Button>
          </form>
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
