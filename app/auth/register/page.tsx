"use client";

import { CalendarForm } from "@/app/components/CalendarComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Logo from "@/app/images/logo.png";
import Image from "next/image";
import "@/app/globals.css";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";
import SpinnerIcon from "@/app/images/Spinner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const navMultiFactor = () => {
    setLoading(true);
    setOpen(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 3000);
  };

  const handleLogin = () => {
    router.push("/");
  };

  return (
    <div className="w-full h-full body-cont flex flex-col justify-evenly">
      <div className="">
        <Button
          onClick={handleLogin}
          className="rounded-full font-thin"
          variant={"ghost"}
        >
          <ArrowLeft></ArrowLeft>Back to Login
        </Button>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>Registration Successful</DialogTitle>
          <DialogDescription className="flex items-center gap-2">
            <div className="h-full w-5 flex items-center">
              <SpinnerIcon strokeColor="#2E5257"></SpinnerIcon>
            </div>
            Success! Your registration is confirmed. Redirecting to dashboard...
          </DialogDescription>
        </DialogContent>
      </Dialog>
      <div className="flex flex-col gap-8">
        <div className="w-full flex items-center justify-center p-4 ">
          <Image
            src={Logo}
            className="h-auto w-auto max-w-60"
            width={400}
            height={400}
            alt="logo"
          ></Image>
        </div>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-2 form-register-cont">
            <div className="flex flex-col gap-4">
              <Label>First Name</Label>
              <Input></Input>
            </div>
            {/* <div className="flex flex-col gap-4">
              <Label>Middle Name</Label>
              <Input></Input>
            </div> */}
            <div className="flex flex-col gap-4">
              <Label>Last Name</Label>
              <Input></Input>
            </div>
            <div className="flex flex-col gap-4">
              <Label>Birthdate</Label>
              <CalendarForm></CalendarForm>
            </div>

            <div className="flex flex-col gap-4">
              <Label>Phone Number</Label>
              <Input></Input>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Label>Email</Label>
            <Input></Input>
          </div>
          <div className="flex flex-col gap-4">
            <Label>Password</Label>
            <Input type="password"></Input>
          </div>
          <div className="flex flex-col gap-4">
            <Label>Re-enter Password</Label>
            <Input type="password"></Input>
          </div>
        </div>
        <Button onClick={navMultiFactor} className="mb-10 bg-[#2E5257] w-full">
          {loading && <SpinnerIcon strokeColor="white"></SpinnerIcon>} Register{" "}
          <ArrowRight></ArrowRight>
        </Button>
      </div>
    </div>
  );
}
