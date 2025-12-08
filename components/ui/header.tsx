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
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Logo from "@/app/images/gold-log.png"

export default function Header() {
  const router = useRouter();
  const [loadingLogout, setLoadingLogout] = useState(false);
  const [open, setOpen] = useState(false);
  const { setUserDetails, invite_user_current_page, user_profile } =
    useUserContext();

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
      isLoggedIn: false,
      sessionkey: "",
      invite_user_current_page: 1,
      my_referrals_current_page: 1,
    });
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
          className="cursor-pointer w-auto h-[40]"
          width={400}
          height={400}
          src={Logo}
          alt=""
        ></Image>
        <p className="text-[#C4AD93] font-semibold bg-[#121416] affiliate text-[12px] w-auto p-2 rounded-[5px]">
          Affiliate Portal
        </p>
      </div>
      <div className="w-full flex gap-8 justify-end items-center avatar-cont">
        <div className="w-auto flex gap-2 justify-center items-center">
          <DropdownMenu modal={false}>
            {/* <DropdownMenuTrigger asChild>
              <div className="flex gap-2 items-center">
                <div className="rounded-full p-2">
                  <Bell color="black"></Bell>
                </div>
                <ChevronDown size={17} color="gray"></ChevronDown>
              </div>
            </DropdownMenuTrigger> */}
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
                {user_profile.profile_picture === null ||
                user_profile.profile_picture === "" ? (
                  <>
                    <div className="relative w-10 h-10 flex items-center justify-center">
                      <DotLottieReact
                        className="absolute w-[70px] h-[70px]"
                        src="/profile.lottie"
                        autoplay
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-full flex gap-2 justify-center items-center">
                      <Avatar className="w-[40px] h-[40px] shadow border border-[#C4AD93]">
                        <AvatarImage
                          src={user_profile.profile_picture}
                        ></AvatarImage>
                        <AvatarFallback></AvatarFallback>
                      </Avatar>{" "}
                    </div>
                  </>
                )}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>
                <div className="w-full flex gap-2 items-center">
                  <p className="text-[14px]">
                    {user_profile.first_name} {user_profile.middle_name}{" "}
                    {user_profile.last_name}
                  </p>
                </div>
                <Label className="text-[12px] font-normal text-gray-400">
                  {user_profile.email}
                </Label>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {/* <DropdownMenuItem
                  onClick={navigateSettings}
                  className="flex gap-2 "
                >
                  <Label className="text-[12px] font-normal">
                    Profile Settings
                  </Label>
                </DropdownMenuItem> */}
                {/* <DropdownMenuItem
                  onClick={navigateBilling}
                  className="flex gap-2 "
                >
                  <Label className="text-[12px] font-normal">
                    Billing Information
                  </Label>
                </DropdownMenuItem> */}
                <DropdownMenuItem onClick={handleOpen} className="flex gap-2 ">
                  <Label className="text-[12px] font-normal">
                    Help & Support
                  </Label>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={navigateLogOut}
                  className="flex gap-2 "
                >
                  <Label className="text-red-500 text-[12px] font-normal flex gap-2 items-center justify-center">
                    {loadingLogout && (
                      <SpinnerIcon strokeColor="#2E5257"></SpinnerIcon>
                    )}
                    Sign Out
                  </Label>
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
