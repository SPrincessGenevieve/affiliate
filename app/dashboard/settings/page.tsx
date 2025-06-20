"use client";

import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Profile from "@/app/components/settings/Profile";
import Billing from "@/app/components/settings/Billing";
import "@/app/globals.css";
import { useUserContext } from "@/app/context/UserContext";
import Security from "@/app/components/settings/Security";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import ProfileSection from "@/app/components/settings/Profile/ProfileSection";

export default function Settings() {
  const { activeSettingsTab, setUserDetails } = useUserContext();
  const [selected, setSelected] = useState(activeSettingsTab);
  const router = useRouter();
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

  const navigateDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <div className="flex w-full h-full gap-4 settings-cont">
      <div className="h-auto shadow-xl rounded-2xl p-8 flex flex-col gap-4 bg-white">
        <ProfileSection></ProfileSection>
      </div>
      <div className="w-full h-full flex flex-col profile-billing-cont shadow-xl bg- rounded-2xl p-2 px-8 overflow-y-auto bg-white">
        <div className="my-4">
          <Button onClick={navigateDashboard} className="" variant={"ghost"}>
            <ArrowLeft></ArrowLeft> Dashboard
          </Button>
        </div>
        <div className="flex settings-tab w-auto settings-desktop">
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
        <div className="w-full h-auto py-4 pt-5 gap-8 flex flex-col justify-evenly settings-content">
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
      <div className="w-full min-h-15 hidden bottom-settings">
        <div className="justify-center h-15 settings-mobile hidden absolute bottom-0 left-0 w-full">
          <Card className="w-full flex p-0 rounded-none">
            <CardContent className="flex p-0 h-15">
              {btnTab.map((item, index) => (
                <div key={index} className="w-full h-full">
                  <Button
                    value={item}
                    onClick={() => handleUpdateTab(item)}
                    className={`w-full h-full rounded-none capitalize border-b-4 border-white ${
                      item === selected ? "border-[#2E5257] border-b-4" : ""
                    }`}
                    variant={"ghost"}
                  >
                    {item === "security" ? "Password & Security" : item}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

{
  /*  */
}
