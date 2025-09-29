"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUserContext } from "@/app/context/UserContext";

import "@/app/globals.css";
import CopyInput from "@/components/ui/copt-input";
import { postInvite } from "@/lib/services/postData";
import SpinnerIcon from "@/app/images/Spinner";

export default function InviteNewClients() {
  const { user_profile, sessionkey } = useUserContext();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [openErrpr, setOpenError] = useState(false);
  const invitation_link = user_profile.referral_link;
  const [client_name, setClientName] = useState("");
  const [email_addres, setEmailAddress] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInvite = async () => {
    if (client_name === "" || email_addres === "") {
      setMessage(
        " Please provide both your full name and email address to proceed with notifying the seller of your interest."
      );
      setTitle("Missing Information");
      setOpenError(true);
      return;
    }
    setLoading(true);
    try {
      const response = await postInvite(
        sessionkey,
        client_name,
        email_addres,
        phone_number
      );
      console.log(response);
      setOpen(true);
    } catch (error: any) {
      const data = error?.response?.data;
      setOpenError(true);
      setTitle("Invitation was not sent");
      if (data && typeof data === "object") {
        Object.entries(data).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            // Case: value is an array
            setMessage(value.join(", "));
          } else if (typeof value === "object" && value !== null) {
            // Case: value is an object (like { detail: "..." })
            if ("detail" in value) {
              setMessage((value as any).detail);
            } else {
              setMessage(JSON.stringify(value));
            }
          } else {
            // Case: simple string or number
            setMessage(String(value));
          }
        });
      } else {
        console.log("Unknown error format:", error);
        setMessage("Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };
  //
  return (
    <Card className="p-0 m-0 w-full">
      <CardContent className="m-0 p-0">
        <Label className="text-[16px] px-4 p-5">Invite New Clients</Label>

        <Separator></Separator>
        <div className="flex flex-col p-4 gap-4">
          <div className="flex flex-col gap-2">
            <Label className="text-gray-600">Client Name</Label>
            <Input
              value={client_name}
              onChange={(e) => setClientName(e.target.value)}
              name="full_name"
              placeholder="Full Name"
            ></Input>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-gray-600">Email Address</Label>
            <Input
              value={email_addres}
              onChange={(e) => setEmailAddress(e.target.value)}
              name="email"
              placeholder="client@email.com"
            ></Input>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-gray-600">Phone Number (Optional)</Label>
            <Input
              value={phone_number}
              onChange={(e) => setPhoneNumber(e.target.value)}
              name="phone_number"
              placeholder="+44 1234 567890"
            ></Input>
          </div>
          {/* <div className="flex flex-col gap-2">
            <Label className="text-gray-600">Potential Investment</Label>
            <div className="relative flex items-center">
              <p className="absolute pl-2 text-gray-600">£</p>
              <Input className="pl-5" placeholder="Amount"></Input>
            </div>
          </div> */}
          {/* <div className="flex justify-center items-center flex-col gap-2">
            <div className="flex items-start w-full">
              <Label className="text-gray-600">Referral Link</Label>
            </div>
            <CopyInput full_link={invitation_link}></CopyInput>
          </div> */}
        </div>

        <div className="w-full p-4">
          <Button
            onClick={handleInvite}
            className="w-full p-0"
            variant={"ghost"}
          >
            <div className="h-10 flex items-center justify-center rounded-[10px] bg-[#2E5257] hover:bg-[#40686e] w-full text-white">
              <Label>
                {loading && <SpinnerIcon strokeColor="white"></SpinnerIcon>}Send
                Invitation
              </Label>
            </div>
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invitation Sent</DialogTitle>
                <DialogDescription>
                  The invitation was sent successfully! Please wait for the user
                  to accept the invite.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Dialog open={openErrpr} onOpenChange={setOpenError}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{message}</DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
