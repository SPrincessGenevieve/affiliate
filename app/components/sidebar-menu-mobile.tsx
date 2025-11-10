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

const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "My Referrals", url: "/dashboard/referrals", icon: HandHelping },
  { title: "My Invites", url: "/dashboard/my-invites", icon: Users },
  { title: "Network Tree", url: "/dashboard/network-tree", icon: ListTree },
];

export function AppSidebarMobile() {
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
    <div className="w-full flex relative">
      <Card className="w-full flex p-0 rounded-none">
        <CardContent className={`flex p-0`}>
          <SidebarContent className="flex">
            <SidebarGroupContent className="flex">
              <SidebarMenu className="overflow-hidden p-0 gap-0 w-full flex">
                <div className="w-full flex justify-evenly">
                  {items.map((item) => {
                    const isActive = pathname === item.url;
                    const showSupportLabel = item.title === "Help Center";
                    return (
                      <div key={item.url} className="flex w-full">
                        <Link
                          href={item.url}
                          className={`text-black w-full ${
                            collapsed === true
                              ? "w-full flex justify-center items-center"
                              : ""
                          } flex items-center gap-2 py-3 text-[16px] transition ease-in-out rounded-none ${
                            isActive
                              ? "bg-[#2e525725] text-black border-b-3 border-[#2E5257]"
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
                      </div>
                    );
                  })}
                </div>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarContent>
        </CardContent>
      </Card>
    </div>
  );
}
