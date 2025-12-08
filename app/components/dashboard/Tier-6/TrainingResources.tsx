"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Dot } from "lucide-react";
import React from "react";
import "@/app/globals.css";
import { useUserContext } from "@/app/context/UserContext";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function TrainingResources() {
  const { events } = useUserContext();
  const total_event = events.length;
  return (
    <Card className="p-0 m-0 w-full">
      <CardContent className="m-0 p-0 rounded-2xl flex flex-col h-full justify-between">
        <div>
          <Label className="text-[16px] px-4 p-5">Training & Resources</Label>
        <div className="px-4 flex flex-col gap-4">
          {events.slice(0, 3).map((item, index) => (
            <div
              key={index}
              className="flex rounded-xl items-center justify-between p-4 gap-4 bg-[#121416]"
            >
              <div className="flex items-center justify-center">
                <div className="w-[30px] ">
                  <div
                    className={`${
                      item.status === "expired"
                        ? "bg-[#ff000048]"
                        : "bg-[#74e6c060]"
                    } w-4 h-4 rounded-[2px]`}
                  ></div>
                </div>

                <div className="flex flex-col ">
                  <Label className="text-[#C4AD93] text-[16px]">
                    {item.name}
                  </Label>
                  <Label className="text-white/70 text-[12px]">
                    {format(new Date(item.date), "MMMM dd, yyyy")}
                  </Label>

                  <Label className="flex items-center text-[12px] ">
                    <span className="text-[#10B981]">Total Participants</span>{" "}
                    <Dot></Dot> {item.total_participants}
                  </Label>
                </div>
              </div>
              <div>
                <Label
                  className={`capitalize ${
                    item.status === "expired" ? "text-[red]" : "text-blue-300"
                  }`}
                >
                  {item.status}
                </Label>
              </div>
            </div>
          ))}
        </div>
        </div>
        <div className="w-full p-4">
          <Dialog>
            <DialogTrigger className="w-full text-[#C4AD93] hover:bg-[#C4AD93] hover:text-black bg-transparent border border-[#C4AD93] rounded-[10px] h-10 flex items-center justify-center">
              Browse All Resources
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-[#C4AD93]">Training & Resources ({total_event})</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <div className="px-4 flex flex-col gap-4 overflow-auto">
                {events.map((item, index) => (
                  <div
                    key={index}
                    className="flex rounded-xl items-center justify-between p-4 gap-4 bg-[#2A2C2D]"
                  >
                    <div className="flex items-center justify-center">
                      <div className="w-[30px] ">
                        <div
                          className={`${
                            item.status === "expired"
                              ? "bg-[#ff000048]"
                              : "bg-[#74e6c060]"
                          } w-4 h-4 rounded-[2px]`}
                        ></div>
                      </div>

                      <div className="flex flex-col ">
                        <Label className="text-[#C4AD93] text-[16px]">
                          {item.name}
                        </Label>
                        <Label className="text-white/70 text-[12px]">
                          {format(new Date(item.date), "MMMM dd, yyyy")}
                        </Label>

                        <Label className="flex items-center text-[12px] ">
                          <span className="text-[#10B981]">
                            Total Participants
                          </span>{" "}
                          <Dot></Dot> {item.total_participants}
                        </Label>
                      </div>
                    </div>
                    <div>
                      <Label
                        className={`capitalize ${
                          item.status === "expired"
                            ? "text-[red]"
                            : "text-blue-300"
                        }`}
                      >
                        {item.status}
                      </Label>
                    </div>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
