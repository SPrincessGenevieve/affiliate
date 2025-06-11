"use client";

import { CalendarForm } from "@/app/components/CalendarComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Logo from "@/app/images/logo.png";
import Image from "next/image";
import "@/app/globals.css";

export default function Register() {
  return (
    <div className="w-full h-full p-20 body-cont ">
      <Card className="h-auto min-h-full w-full rounded-none overflow-y-auto">
        <CardContent className="flex flex-col gap-4">
          <div className="w-full flex items-center justify-center p-4 ">
            <Image
              src={Logo}
              className="h-auto w-auto max-w-60"
              width={400}
              height={400}
              alt="logo"
            ></Image>
          </div>
          <div className="grid grid-cols-2 gap-2 form-register-cont">
            <div className="flex flex-col gap-4">
              <Label>First Name</Label>
              <Input></Input>
            </div>
            <div className="flex flex-col gap-4">
              <Label>Middle Name</Label>
              <Input></Input>
            </div>
            <div className="flex flex-col gap-4">
              <Label>Last Name</Label>
              <Input></Input>
            </div>
            <div className="flex flex-col gap-4">
              <Label>Birthdate</Label>
              <CalendarForm></CalendarForm>
            </div>
            <div className="flex flex-col gap-4">
              <Label>Email</Label>
              <Input></Input>
            </div>
            <div className="flex flex-col gap-4">
              <Label>Phone Number</Label>
              <Input></Input>
            </div>
            <div className="flex flex-col gap-4">
              <Label>Password</Label>
              <Input></Input>
            </div>
            <div className="flex flex-col gap-4">
              <Label>Re-enter Password</Label>
              <Input></Input>
            </div>
          </div>
          <Button className="bg-[#2E5257] w-full">
            Register <ArrowRight></ArrowRight>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
