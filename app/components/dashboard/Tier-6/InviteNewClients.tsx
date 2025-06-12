"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import "@/app/globals.css";

export default function InviteNewClients() {
  return (
    <Card className="p-0 m-0 w-full">
      <CardContent className="m-0 p-0">
        <Label className="text-[16px] px-4 p-5">Invite New Clients</Label>

        <Separator></Separator>
        <div className="flex flex-col p-4 gap-4">
          <div className="flex flex-col gap-2">
            <Label className="text-gray-600">Client Name</Label>
            <Input placeholder="Full Name"></Input>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-gray-600">Email Address</Label>
            <Input placeholder="client@email.com"></Input>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-gray-600">Phone Number (Optional)</Label>
            <Input placeholder="+44 1234 567890"></Input>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-gray-600">Potential Investment</Label>
            <div className="relative flex items-center">
              <p className="absolute pl-2 text-gray-600">£</p>
              <Input className="pl-5" placeholder="Amount"></Input>
            </div>
          </div>
        </div>
        <div className="w-full p-4">
          <Dialog>
            <DialogTrigger className="w-full">
              <div className="h-10 flex items-center justify-center rounded-[10px] bg-[#2E5257] hover:bg-[hsl(358,47%,27%)] w-full text-white">
                <Label>Send Invitation</Label>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Invitation Sent</DialogTitle>
              <DialogDescription>
                The invitation was sent successfully! Please wait for the user
                to accept the invite.
              </DialogDescription>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
