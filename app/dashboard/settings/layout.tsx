"use client";

import "@/app/globals.css";
import { getCSRF, getUser } from "@/lib/services/getData";
import { useEffect, useRef, useState } from "react";
import { UserProfile } from "@/app/context/UserContext";
import { useUserContext } from "@/app/context/UserContext";

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setUserDetails, isLoggedIn, user_profile } = useUserContext();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

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
  }, [isLoggedIn]);

  return (
    <div
      className={`children-cont flex h-full w-full justify-center items-start px-4 rounded-3xl overflow-y-auto `}
    >
      {children}
    </div>
  );
}
