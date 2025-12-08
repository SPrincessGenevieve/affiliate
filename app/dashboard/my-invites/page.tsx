"use client";

import TableComponentInviteUser from "@/app/components/user-list/TableComponentInviteUser";
import { useUserContext } from "@/app/context/UserContext";
import SpinnerIcon from "@/app/images/Spinner";
import { Card, CardContent } from "@/components/ui/card";
import { getInviteUser, getInviteUserFiilter } from "@/lib/services/getData";
import React, { useEffect, useState } from "react";
import { Label } from "recharts";

export default function MyInvites() {
  const {
    invite_users,
    sessionkey,
    invite_user_current_page,
    activeFilter,
    setUserDetails,
  } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response =
          activeFilter === ""
            ? await getInviteUser(invite_user_current_page, sessionkey)
            : await getInviteUserFiilter(
                sessionkey,
                activeFilter,
                invite_user_current_page
              );

        setUserDetails({
          invite_users: response.data.results,
          invite_user_total_pages: response.data.total_pages,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [sessionkey, invite_user_current_page, activeFilter]);

  console.log("SESSION: ", activeFilter);
  console.log("CURRENT PAGE: ", invite_user_current_page);

  return (
    <div className="relative flex  w-full h-full gap-4 flex-col justify-between">
      <Card className=" w-full h-[100%] hover:mt-0">
        <CardContent className=" w-full h-full flex flex-col relative justify-center items-center">
          {isLoading && (
            <div className="w-[97%] h-[90%] top-0 bg-[#2A2C2D] absolute z-20 flex justify-center items-center">
              <div className="w-20">
                <SpinnerIcon strokeColor="#C4AD93"></SpinnerIcon>
              </div>
            </div>
          )}
          {invite_users.length !== 0 ? (
            <TableComponentInviteUser
              data={invite_users}
            ></TableComponentInviteUser>
          ) : (
            <div>
              <Label className="text-white/70">Table is empty</Label>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
