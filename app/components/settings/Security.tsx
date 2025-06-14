import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { MessageSquare, Smartphone } from "lucide-react";
import React from "react";

export default function Security() {
  return (
    <div className="w-full h-full flex flex-col items-center  justify-between">
      <div className="w-full h-full">
        <div className="mb-4 pb-2 border-b flex justify-between items-center settings-cont-2 gap-2">
          <Label className=" text-neutral-400">UPDATE PASSWORD</Label>
        </div>
        <div className="w-full max-w-[500px] gap-2 flex flex-col">
          <div className="flex flex-col gap-2">
            <Label>Current Password</Label>
            <Input type="password"></Input>
          </div>
          <div className="flex flex-col gap-2">
            <Label>New Password</Label>
            <Input type="password"></Input>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Re-enter Password</Label>
            <Input type="password"></Input>
          </div>
        </div>
        <div className="w-full my-4">
          <Button className="max-w-[500px] w-full bg-[#2E5257]">
            CHANGE PASSWORD
          </Button>
        </div>
      </div>
      <div className="w-full h-full flex flex-col mt-8">
        <div className="mb-4 pb-4 border-b flex justify-between items-center">
          <Label className=" text-neutral-400 uppercase">
            Two-factor authentication
          </Label>
        </div>
        <div className="w-full gap-4 flex flex-col">
          <div className="min-h-20 gap-2 cursor-pointer hover:bg-neutral-100 transition ease-in-out w-full flex justify-between items-center  rounded-2xl px-4">
            <div className="flex gap-2">
              <div>
                <Smartphone size={30}></Smartphone>
              </div>
              <div>
                <Label className="cursor-pointer">Authenticator App</Label>
                <Label className="cursor-pointer text-[12px] text-neutral-500 font-normal">
                  Use a code from Google Authenticator or Authy to secure your
                  account.
                </Label>
              </div>
            </div>
            <div className="cursor-pointer border h-9 flex w-auto min-w-20 justify-center items-center twofa-cont rounded-full border-[#2E5257] text-[#2E5257]">
              <Switch id="airplane-mode" className="toggle-switch hidden" />
              <Label className="toggle-label" htmlFor="airplane-mode">
                Enable
              </Label>
            </div>
          </div>

          <div className="min-h-20 gap-2 cursor-pointer hover:bg-neutral-100 transition ease-in-out w-full flex justify-between items-center  rounded-2xl px-4">
            <div className="flex gap-2">
              <div>
                <MessageSquare size={30}></MessageSquare>
              </div>
              <div>
                <Label className="cursor-pointer">SMS/Text message</Label>
                <Label className="cursor-pointer text-[12px] text-neutral-500 font-normal">
                  Get a one-time passcode sent to your mobile number to verify
                  your identity and secure your account.
                </Label>
              </div>
            </div>
            <div className="cursor-pointer border h-9 flex w-auto min-w-20 justify-center items-center twofa-cont rounded-full border-[#2E5257] text-[#2E5257]">
              <Switch id="airplane-mode" className="toggle-switch hidden" />
              <Label className="toggle-label" htmlFor="airplane-mode">
                Enable
              </Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
