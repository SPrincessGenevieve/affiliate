"use client";

import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import Profile from "@/app/components/settings/Profile";
import Billing from "@/app/components/settings/Billing";
import "@/app/globals.css";
import Image from "next/image";
import { useUserContext } from "@/app/context/UserContext";
import Security from "@/app/components/settings/Security";

export default function Settings() {
  const { activeSettingsTab, setUserDetails } = useUserContext();
  const [selected, setSelected] = useState(activeSettingsTab);
  const btnTab = ["profile", "security", "billing"];

  useEffect(() => {
    setSelected(activeSettingsTab);
  }, [activeSettingsTab]);

  useEffect(() => {
    setUserDetails({
      activeSettingsTab: selected,
    });
  }, [selected]);

  const handleUpdateTab = (item: any) => {
    setUserDetails({
      activeSettingsTab: selected,
    });
    setSelected(item);
  };

  return (
    <div className="flex w-full h-full gap-4 settings-cont">
      <div className="h-auto shadow-xl rounded-2xl p-8 flex flex-col gap-4 bg-white">
        <div className="w-full flex flex-col items-center justify-center gap-4">
          <div className="flex flex-col w-full items-center justify-center">
            <Label className="text-[20px]">Sarah Johnson</Label>
            <Label className="text-[14px] text-gray-400 font-normal">
              sarahjohnson@gmail.com
            </Label>
          </div>

          <div className="relative w-50 h-50 flex justify-center items-center">
            <Image
              width={400}
              height={400}
              className="w-full max-w-50 max-h-50 h-full rounded-full"
              src={
                "https://i.etsystatic.com/iap/b979b5/6846594779/iap_640x640.6846594779_kn1iey1x.jpg?version=0"
              }
              alt=""
            ></Image>
            <Button
              variant={"ghost"}
              className="rounded-full absolute top-0 right-0"
            >
              <Edit size={15}></Edit>
            </Button>
          </div>
          <div>
            <Label className="text-[14px]">Silver Tier Affiliate</Label>
          </div>
        </div>
      </div>
      <div className="w-full h-auto flex flex-col profile-billing-cont shadow-xl bg-white rounded-2xl p-8 overflow-y-auto">
        <div className="flex settings-tab w-auto">
          {btnTab.map((item, index) => (
            <Button
              value={item}
              key={index}
              onClick={() => handleUpdateTab(item)}
              className={`rounded-none capitalize border-b-4 w-auto border-white ${
                item === selected ? "border-[#2E5257] bg-neutral-100" : ""
              }`}
              variant={"ghost"}
            >
              {item === "security" ? "Password & Security" : item}
            </Button>
          ))}
        </div>
        <div className="w-full h-auto py-4 pt-10 gap-8 flex flex-col justify-evenly settings-content">
          {selected === "profile" ? (
            <>
              <Profile></Profile>
            </>
          ) : selected === "billing" ? (
            <>
              <Billing></Billing>
            </>
          ) : (
            <Security></Security>
          )}
        </div>
      </div>
    </div>
  );
}
