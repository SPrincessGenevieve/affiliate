"use client";
import { useEffect, useState } from "react";
import {
  Speech,
  LayoutDashboard,
  CircleHelp,
  HandHelping,
  Headset,
  Users,
  ListTree,
} from "lucide-react";

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUserContext } from "@/app/context/UserContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import "@/app/globals.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "My Referrals", url: "/dashboard/referrals", icon: HandHelping },
  { title: "My Invites", url: "/dashboard/my-invites", icon: Users },
  // { title: "Network Tree", url: "/dashboard/network-tree", icon: ListTree },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(true);
  const pathname = usePathname();
  const { setUserDetails, isOpen, user_profile } = useUserContext();

  const lname = user_profile.last_name;
  const fname = user_profile.first_name;
  const full_name = fname + lname;
  const current_level = user_profile.current_level;
  // const level_name = user_profile.levels_list.map(
  //   (item) => item.id === current_level && item.name
  // );

  const handleCollapse = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
  };

  useEffect(() => {
    setUserDetails({
      isOpen: collapsed,
    });
  }, [collapsed]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 885) {
        setCollapsed(true);
      }
    };

    handleResize(); // run once on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  console.log("COLLAPSE: ", collapsed);

  return (
    <div className="max-w-[245px] h-full relative">
      <Card className="bg-[#121416] h-full border border-[#C4AD93] ">
        <CardContent
          className={`rounded-3xl p-0 m-0 mt-0 h-auto  ${
            collapsed ? "w-16" : "w-60 sidebar_width transition-all ease-in-out"
          } bg-[#121416] border-0 rounded-none`}
        >
          <div
            className={`flex w-full justify-between ${
              collapsed ? "flex-col" : "flex-row"
            }`}
          >
            <div
              onClick={handleCollapse}
              className="cursor-pointer flex flex-col gap-2 items-center justify-center w-full p-2"
            >
              {user_profile.profile_picture === "" ||
              user_profile.profile_picture === null ? (
                <>
                  <div className="relative w-full h-25 flex justify-center items-center">
                    <DotLottieReact
                      className={`p-0 m-0 absolute transition ease-in-out ${
                        collapsed ? "w-15 h-15" : "w-35 h-35"
                      }`}
                      src="/profile.lottie"
                      loop
                      autoplay
                    />
                  </div>
                </>
              ) : (
                <>
                  <Avatar className="h-auto w-auto max-h-30 max-w-30 border border-[#C4AD93]">
                    <AvatarImage
                      src={user_profile.profile_picture || ""}
                    ></AvatarImage>
                    <AvatarFallback></AvatarFallback>
                  </Avatar>
                </>
              )}

              <div
                className={`${
                  collapsed ? "hidden transition ease-in-out" : ""
                }`}
              >
                <Label
                  className={`text-white/70 text-center text-[14px] font-medium w-full `}
                >
                  {full_name}
                </Label>
                <p
                  className={`text-[12px] text-center font-normal text-white/70 w-full `}
                >
                  {/* {level_name} */}
                </p>
              </div>
            </div>
          </div>
          <Separator></Separator>
          <Label
            className={`my-4 px-4 text-white/70 text-[12px] ${
              collapsed ? "hidden" : ""
            }`}
          >
            MAIN MENU
          </Label>
          <SidebarContent className="mt-2">
            <SidebarGroup className="">
              <SidebarGroupContent className="">
                <SidebarMenu className="overflow-hidden p-0 gap-0">
                  {items.map((item) => {
                    const isActive = pathname === item.url;
                    const showSupportLabel = item.title === "Help Center";
                    return (
                      <div key={item.url}>
                        {showSupportLabel && !collapsed && (
                          <Label className="px-4 pt-6 pb-2 text-[12px] text-white/70">
                            SUPPORT
                          </Label>
                        )}
                        <Link
                          href={item.url}
                          className={`text-white/70 ${
                            collapsed === true
                              ? "pl-0 w-full  flex justify-center items-center"
                              : "pl-10"
                          } flex items-center gap-2 py-3 text-[14px] transition ease-in-out rounded-none 
        ${
          isActive
            ? "bg-[#2A2C2D] text-black border-l-3 border-[#C4AD93]"
            : "hover:bg-[#2A2C2D]"
        }`}
                        >
                          <div className={`${collapsed ? "" : "hidden"}`}>
                            <item.icon
                              size={30}
                              className={`w-auto h-[25px] ${
                                isActive
                                  ? "stroke-[#C4AD93]"
                                  : "stroke-[#C4AD93] group-hover:stroke-[#C4AD93]"
                              }`}
                            />
                          </div>
                          {!collapsed && (
                            <Label className="text-[12px] font-normal">
                              {item.title}
                            </Label>
                          )}
                        </Link>
                      </div>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </CardContent>
      </Card>
    </div>
  );
}
