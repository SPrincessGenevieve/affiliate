"use client";
import "@/app/globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/sidebar-menu";
import Header from "@/components/ui/header";
import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isOpen } = useUserContext();
  const [children_visibility, setChildrenVisibility] = useState("");

  useEffect(() => {
    if (isOpen === false) {
      setChildrenVisibility("blur-[5px]");
    } else {
      setChildrenVisibility("");
    }
  }, [isOpen]);

  return (
    <SidebarProvider className="relative bg-[#F6F6F6] flex">
      <div className="flex  w-full h-auto bg-[#F6F6F6]">
        <div
          className={`w-full h-full flex items-center flex-col  overflow-auto ${children_visibility}`}
        >
          <div className="w-full h-[55px] bg-white shadow-sm z-20">
            <Header></Header>
          </div>
          <div className="w-full h-full flex gap-2">
            <ScrollArea className="w-full h-auto min-h-screen bg-[#F9FAFB]  p-4 layout_scroll">
              <div className="w-full h-auto min-h-screen flex bg-[#F9FAFB]">
                <div className="w-[100%] mt-4 flex justify-center children-sidebar-cont">
                  <AppSidebar />
                  <div
                    className={`children-cont flex h-full w-full max-w-[130vh] justify-center items-start px-4 rounded-3xl overflow-y-auto `}
                  >
                    {children}
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
