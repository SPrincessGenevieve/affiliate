"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "@/app/globals.css";
import { Label } from "./label";
import SpinnerIcon from "@/app/images/Spinner";
import CustomerSupport from "@/app/components/support/CustomerSupport";
import { useUserContext } from "@/app/context/UserContext";
import { Bell, ChevronDown } from "lucide-react";
import ToggleNotif from "@/app/components/header/ToggleNotif";

export default function Header() {
  const router = useRouter();
  const [loadingLogout, setLoadingLogout] = useState(false);
  const [open, setOpen] = useState(false);
  const { setUserDetails, isLoggedIn } = useUserContext();

  const navigateSettings = () => {
    setUserDetails({
      activeSettingsTab: "profile",
    });
    router.push("/dashboard/settings");
  };

  const navigateBilling = () => {
    setUserDetails({
      activeSettingsTab: "billing",
    });
    router.push("/dashboard/settings");
  };

  const navigateLogOut = () => {
    setLoadingLogout(true);
    setUserDetails({
      isLoggedIn: false
    })
    router.push("/");
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <div className="px-8 py-2 w-full h-auto flex justify-between items-center cont-header ">
      <div className=" flex gap-2 w-full items-center affiliate_cont">
        <Image
          onClick={handleDashboard}
          className="cursor-pointer w-[40] h-[40] rounded-full"
          width={400}
          height={400}
          src={
            "https://play-lh.googleusercontent.com/zpUiqoOvCo7k_9-M4KS2LYaYNJCGxA0jytnbo2LU902wATuhphtCtbPrJEqAfzZCBt0=w240-h480-rw"
          }
          alt=""
        ></Image>
        <p className="text-gray-500 font-semibold bg-[#F3F4F6] affiliate text-[12px] w-auto p-2 rounded-[5px]">
          Affiliate Portal
        </p>
      </div>
      <div className="w-full flex gap-8 justify-end items-center avatar-cont">
        <div className="w-auto flex gap-2 justify-center items-center">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <div className="flex gap-2 items-center">
                <div className="rounded-full p-2">
                  <Bell color="black"></Bell>
                </div>
                <ChevronDown size={17} color="gray"></ChevronDown>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full max-w-[400px] h-full ml-[2%] mr-0  notif-cont">
              <DropdownMenuLabel>Notification</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <div className="px-2 py-1">
                  <ToggleNotif />
                </div>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="border-none text-[12px] w-auto text-white flex gap-2 justify-center items-center">
                <div className="w-full flex gap-2 justify-center items-center">
                  <Avatar className="w-[40px] h-[40px]">
                    <AvatarImage
                      src={
                        "https://i.etsystatic.com/iap/b979b5/6846594779/iap_640x640.6846594779_kn1iey1x.jpg?version=0"
                      }
                    ></AvatarImage>
                    <AvatarFallback></AvatarFallback>
                  </Avatar>{" "}
                  <div>
                    <p className="text-[14px] font-semibold greetings-name text-[black]">
                      Sarah Johnson
                    </p>
                  </div>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>
                <div className="w-full flex gap-2 items-center">
                  <p>Sarah Johnson</p>
                </div>
                <Label className="text-[12px] font-normal text-gray-400">
                  sarahjohnson@example.com
                </Label>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={navigateSettings}
                  className="flex gap-2 "
                >
                  <p>Profile Settings</p>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={navigateBilling}
                  className="flex gap-2 "
                >
                  <p>Billing Information</p>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleOpen} className="flex gap-2 ">
                  <p>Help & Support</p>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={navigateLogOut}
                  className="flex gap-2 "
                >
                  <p className="text-red-500 flex gap-2 items-center justify-center">
                    {loadingLogout && (
                      <SpinnerIcon strokeColor="#2E5257"></SpinnerIcon>
                    )}
                    Sign Out
                  </p>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <CustomerSupport open={open} onOpenChange={setOpen}></CustomerSupport>
        </div>
      </div>
    </div>
  );
}
