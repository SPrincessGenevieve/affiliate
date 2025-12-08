"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Bot } from "lucide-react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import Logo from "@/app/images/logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SpinnerIcon from "@/app/images/Spinner";
import { Textarea } from "@/components/ui/textarea";

interface SupportProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

export default function CustomerSupport({ open, onOpenChange }: SupportProps) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [selectedTab, setSelectedTab] = useState<"email" | "phone" | null>(
    "email"
  );
  const [timeCall, setTimeCall] = useState<"morning" | "afternoon" | null>(
    "morning"
  );
  const [email, setEmail] = useState("");
  const [contactNum, setContactNum] = useState("");

  useEffect(() => {
    if (selectedTab === "email") {
      if (email === "" || message === "") {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    } else if (selectedTab === "phone") {
      if (contactNum === "" || message === "" || timeCall === null) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    }
  }, [selectedTab, email, message, timeCall, contactNum]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-x-auto w-full h-[95%]">
        <div className="w-full flex flex-col items-center gap-4">
          <DialogTitle className="text-[14px] font-medium text-justify">
            Have a query? Please submit your ticket below and a member of our
            team will be happy to assist
          </DialogTitle>
          <DialogDescription className=" text-justify ">
            To submit a ticket, simply fill out the form with your issue or
            question and hit &quot;Submit&quot;. One of our team members will
            review your request and get in touch with you within 24 hours.
          </DialogDescription>
         <div className="my-4 flex flex-col gap-4">
           <div className="w-full h-20 flex justify-center">
            <Image
              alt=""
              src={Logo}
              width={400}
              height={400}
              className="h-full w-auto"
            ></Image>
          </div>
          <div className="w-full flex flex-col items-center gap-2">
            <Label className="font-normal text-white/70">
              Email us: support@vintage-associates.co.uk
            </Label>
            <Label className="font-normal text-white/70">
              Call us: (0203-998-3486)
            </Label>
          </div>
         </div>
          <div className="flex flex-col gap-2 mt-2 w-full">
            {/* <div className="flex gap-2 items-center pb-4">
              <Bot color="black" size={15}></Bot>
              <p className="text-[14px] text-gray-400">
                Try our AI chatbot for instant answers before contacting
                support!
              </p>
            </div> */}
            <div className="flex flex-col gap-3">
              <Label
                htmlFor="message"
                className="justify-between  text-white/70 font-normal"
              >
                Preferred Contact Method
              </Label>
              <div className="flex gap-2">
                <Button
                  className={`rounded-3xl border`}
                  variant={selectedTab === "email" ? "default" : "outline"}
                  onClick={() => setSelectedTab("email")}
                >
                  Email
                </Button>
                <Button
                  className={`rounded-3xl border`}
                  variant={selectedTab === "phone" ? "default" : "outline"}
                  onClick={() => setSelectedTab("phone")}
                >
                  Phone
                </Button>
              </div>
              {selectedTab === "email" ? (
                <>
                  <Label
                    htmlFor="message"
                    className="justify-between text-white/70 font-normal"
                  >
                    Email
                  </Label>
                  <Input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="h-10"
                  ></Input>
                </>
              ) : (
                <>
                  <Label className="justify-between text-white/70 font-normal">
                    Contact Number
                  </Label>
                  <Input
                    onChange={(e) => setContactNum(e.target.value)}
                    value={contactNum}
                    className="h-10"
                  ></Input>
                  <Label className="justify-between text-white/70 font-normal">
                    Best Time to Call
                  </Label>
                  <div className="flex gap-2">
                    <Button
                      className={`rounded-3xl border`}
                      variant={timeCall === "morning" ? "default" : "outline"}
                      onClick={() => setTimeCall("morning")}
                    >
                      Morning
                    </Button>
                    <Button
                      className={`rounded-3xl border`}
                      variant={timeCall === "afternoon" ? "default" : "outline"}
                      onClick={() => setTimeCall("afternoon")}
                    >
                      Afternoon
                    </Button>
                  </div>
                </>
              )}
              <Label htmlFor="message" className="justify-between text-white/70 font-normal">
                Your Inquiry
              </Label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            {error && (
              <p className="text-red-500">
                Something went wrong. Please try again later.
              </p>
            )}
            {success && <p className="text-[#2E5257]">Sent successfully</p>}

            <Button
              disabled={disabled}
              className={` ${
                disabled ? "opacity-35" : ""
              } w-full mt-4 rounded-3xl`}
            >
              {loading && (
                <div>
                  <SpinnerIcon strokeColor="white"></SpinnerIcon>
                </div>
              )}
              Submit ticket
            </Button>
            <Dialog open={success} onOpenChange={setSuccess}>
              <DialogContent>
                <p>
                  Thank you for your enquiry, we will be in contact shortly.
                </p>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
