"use client";
import { useEffect, useState } from "react";
import {
  Archive,
  ArchiveX,
  LayoutDashboard,
  Settings,
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

const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "My Referrals", url: "/dashboard/referrals", icon: Archive },

  { title: "Help Center", url: "/dashboard/help-center", icon: Settings },
  { title: "Contact Us", url: "/dashboard/contact-us", icon: ArchiveX },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { setUserDetails, isOpen } = useUserContext();

  const handleCollapse = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
  };

  useEffect(() => {
    setUserDetails({
      isOpen: collapsed,
    });
  }, [isOpen, collapsed]);

  useEffect(() => {
    const handleResize = () => {
      const shouldCollapse = window.innerWidth <= 885;
      setCollapsed(shouldCollapse);
    };

    handleResize(); // run once on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <Card className="">
      <CardContent
        className={`rounded-3xl p-0 m-0 mt-0 h-screen  ${
          collapsed ? "w-16" : "w-60 sidebar_width transition-all ease-in-out"
        } bg-[white] border-0 rounded-none`}
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
            <Avatar className="h-auto w-auto max-h-20 max-w-20 border">
              <AvatarImage
                src={
                  "https://play-lh.googleusercontent.com/zpUiqoOvCo7k_9-M4KS2LYaYNJCGxA0jytnbo2LU902wATuhphtCtbPrJEqAfzZCBt0=w240-h480-rw"
                }
              ></AvatarImage>
              <AvatarFallback>VA</AvatarFallback>
            </Avatar>
            <div
              className={`${collapsed ? "hidden transition ease-in-out" : ""}`}
            >
              <Label
                className={`text-black text-center text-[16px] font-medium w-full `}
              >
                Sarah Johnson
              </Label>
              <p
                className={`text-[12px] text-center font-normal text-gray-500 w-full `}
              >
                Silver Tier Affiliate
              </p>
            </div>
          </div>
        </div>
        <Separator></Separator>
        <Label
          className={`my-4 px-4 text-gray-500 text-[12px] ${
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
                    <>
                      {showSupportLabel && !collapsed && (
                        <Label className="px-4 pt-6 pb-2 text-[12px] text-gray-500">
                          SUPPORT
                        </Label>
                      )}
                      <Link
                        href={item.url}
                        key={item.url}
                        className={`text-black ${
                          collapsed === true
                            ? "pl-0 w-full  flex justify-center items-center"
                            : "pl-10"
                        } flex items-center gap-2 py-3 text-[16px] transition ease-in-out rounded-none 
        ${
          isActive
            ? "bg-[#F3E8E9] text-black border-l-3 border-[#8B1D24]"
            : "hover:bg-[#F9FAFB]"
        }`}
                      >
                        <div className={`${collapsed ? "" : "hidden"}`}>
                          <item.icon
                            size={30}
                            className={`w-auto h-[25px] ${
                              isActive
                                ? "stroke-black"
                                : "stroke-black group-hover:stroke-[#0B6540]"
                            }`}
                          />
                        </div>
                        {!collapsed && (
                          <Label className="text-[16px] font-normal">
                            {item.title}
                          </Label>
                        )}
                      </Link>
                    </>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </CardContent>
    </Card>
  );
}
