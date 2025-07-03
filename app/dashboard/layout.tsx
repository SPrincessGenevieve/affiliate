"use client";

import "@/app/globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/sidebar-menu";
import Header from "@/components/ui/header";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useUserContext } from "../context/UserContext";
import { AppSidebarMobile } from "../components/sidebar-menu-mobile";
import SignIn from "../components/authenticator/SignIn";
import { useRouter } from "next/navigation";
import SpinnerIcon from "../images/Spinner";
import { getCSRF, getUser } from "@/lib/services/getData";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [children_visibility, setChildrenVisibility] = useState("");
  const pathname = usePathname();
  const { isLoggedIn, setUserDetails } = useUserContext();
  const router = useRouter();

  const hasFetched = useRef(false);

  const isSettings =
    pathname.includes("/dashboard/settings") ||
    pathname.includes("/dashboard/billing");

  useEffect(() => {
    if (isLoggedIn === null) {
      return;
    }
    if (isLoggedIn === false) {
      setUserDetails({
        isLoggedIn: false,
      });
      router.replace("/");
    }

    const fetchData = async () => {
      try {
        const responseCSRF = await getCSRF();
        const responseUser = await getUser();
        setUserDetails({
          user_profile: responseUser.data.detail,
        });
      } catch (error) {}
    };
    fetchData();
  });

  return (
    <SidebarProvider className="relative bg-[#F6F6F6] flex w-full h-full">
      {isLoggedIn === null && (
        <>
          <div className="absolute w-full h-full flex items-center justify-center z-60">
            <div className="w-20">
              <SpinnerIcon strokeColor="#2E5257"></SpinnerIcon>
            </div>
          </div>
          <div className="w-full h-full flex items-center justify-center absolute blur-3xl bg-[#ffffff] z-50"></div>
        </>
      )}
      {isLoggedIn ? (
        <>
          {" "}
          <div className="flex  w-full h-full bg-[#F6F6F6]">
            <div
              className={`w-full h-full flex items-center flex-col  overflow-auto ${children_visibility}`}
            >
              <div className="w-full h-[55px] bg-white shadow-sm z-20">
                <Header></Header>
              </div>
              <div className="w-full h-full flex px-4 gap-2 pb-4 overflow-hidden content-cont">
                <div className="w-full h-auto  flex bg-[#F9FAFB] desktop">
                  <div className="w-[100%] mt-4 flex justify-center children-sidebar-cont">
                    {!isSettings && <AppSidebar />}
                    <div
                      className={`children-cont flex h-full w-full justify-center items-start px-4 rounded-3xl overflow-y-auto `}
                    >
                      {children}
                    </div>
                  </div>
                </div>

                <div className="w-full h-auto relative  mobile hidden">
                  <div className="w-[100%] mt-4 flex flex-col-reverse justify-center children-sidebar-cont">
                    <div className="w-full mt-5">
                      {!isSettings && <AppSidebarMobile />}
                    </div>
                    <div
                      className={`children-cont flex h-full w-full justify-center items-start px-4 rounded-3xl overflow-y-auto `}
                    >
                      {children}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : isLoggedIn === false ? (
        <>
          <div className="z-50 flex w-full h-full bg-[#ffffff]  absolute">
            <div
              className={`w-full h-full image-bg bg-cover bg-center bg-[url(./images/auth_2.jpg)]`}
            ></div>
            <div className="w-full h-full bg-[#F3F4F6] flex items-center justify-center overflow-auto">
              <div className="w-[90%] h-[90%] overflow-auto bg-[white] flex items-center justify-center rounded-2xl">
                <SignIn></SignIn>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="z-50 flex w-full h-full bg-[#ffffff]  absolute"></div>
        </>
      )}
    </SidebarProvider>
  );
}
