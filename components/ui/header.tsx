"use client";
import React from "react";
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

export default function Header() {
  const router = useRouter();

  const navigateSettings = () => {
    router.push("/etcmf/settings");
  };

  return (
    <div className=" px-8 py-2 w-full h-auto flex justify-between items-center cont-header ">
      <div className="flex gap-2 w-full items-center municipality_cont">
        <Image
          className="w-[40] h-[40] rounded-full"
          width={400}
          height={400}
          src={
            "https://play-lh.googleusercontent.com/zpUiqoOvCo7k_9-M4KS2LYaYNJCGxA0jytnbo2LU902wATuhphtCtbPrJEqAfzZCBt0=w240-h480-rw"
          }
          alt=""
        ></Image>
        <p className="text-gray-500 font-semibold bg-[#F3F4F6] municipality text-[12px] w-auto p-2 rounded-[5px]">
          Affiliate Portal
        </p>
      </div>
      <div className="w-full flex gap-8 justify-end items-center avatar-cont">
        <div className="w-auto flex gap-2 justify-center items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="border-none text-[12px] w-auto text-white flex gap-2 justify-center items-center">
                <div className="w-full flex gap-2 justify-center items-center">
                  <Avatar className="w-[40px] h-[40px]">
                    <AvatarImage
                      src={
                        "https://scontent.fmnl14-1.fna.fbcdn.net/v/t39.30808-1/464115817_3669993786645187_3329516257053704408_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=109&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeE25rlhBG6vtaeITU36P4l0yjfTumkzSqzKN9O6aTNKrEqQCV91fZFZzDnTm-8J_F12wqy7Ws72BuDKp0-yGdDI&_nc_ohc=s-OGCxNLAiYQ7kNvwHj0fbp&_nc_oc=AdnPdm8Y3wZvQEi5N_edzGIYqIZVZCt7dj9dsVUbzNegTCPwSRW0MWD4Wba7ZQxW7-U&_nc_zt=24&_nc_ht=scontent.fmnl14-1.fna&_nc_gid=CDnyRWLvAOXLx4ABoVLpmQ&oh=00_AfEjPQcWog2PMWOXnFdx5Et28aO1EBN_lTMfbRAJll0qkg&oe=681BAC50"
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
                <DropdownMenuItem className="flex gap-2 ">
                  <p>Billing Information</p>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex gap-2 ">
                  <p>Help & Support</p>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex gap-2 ">
                  <p className="text-red-500">Sign Out</p>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
