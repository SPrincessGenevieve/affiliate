import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Dot } from "lucide-react";
import React from "react";
import "@/app/globals.css";

export default function TierSix() {
  return (
    <div className="w-full flex gap-4 tier-six-cont">
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
            <Button className=" bg-[#2E5257] hover:bg-[hsl(358,47%,27%)] w-full text-white">
              Send Invitation
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="p-0 m-0 w-full">
        <CardContent className="m-0 p-0">
          <Label className="text-[16px] px-4 p-5">Investment Amount (£)</Label>
          <Separator></Separator>
          <div className="flex flex-col p-4 gap-4">
            <div className="flex flex-col gap-2">
              <Label className="text-gray-600">Investment Term</Label>
              <Input placeholder=""></Input>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-gray-600">Investment Amount (£)</Label>
              <Select defaultValue="1.0">
                <SelectTrigger className="w-full">
                  <SelectValue></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1.0">1.5% (Current Rate)</SelectItem>
                  <SelectItem value="1.25">1.25% (Gold Tier)</SelectItem>
                  <SelectItem value="1.5">1.50% (Platinum Tier)</SelectItem>
                  <SelectItem value="2.0">2% (Diamond Tier)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-gray-600">Investment Term</Label>
              <Select defaultValue="1">
                <SelectTrigger className="w-full">
                  <SelectValue></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Year</SelectItem>
                  <SelectItem value="2">2 Year</SelectItem>
                  <SelectItem value="3">3 Year</SelectItem>
                  <SelectItem value="5">5 Year</SelectItem>
                  <SelectItem value="10">10 Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Separator></Separator>
          <div className="flex justify-between p-4">
            <div className="flex flex-col items-start gap-2">
              <Label className="text-gray-600">Initial Commission</Label>
              <Label className="text-gray-600">Annual Trailer Fee</Label>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Label>£1,000</Label>
              <Label>£500</Label>
            </div>
          </div>
          <Separator></Separator>
          <div className="flex justify-between gap-2 p-4">
            <Label className="text-gray-600 font-bold">Total (Year 1)</Label>
            <Label className="text-[#2E5257] font-bold">£1,500</Label>
          </div>
        </CardContent>
      </Card>
      <Card className="p-0 m-0 w-full">
        <CardContent className="m-0 p-0">
          <Label className="text-[16px] px-4 p-5">Training & Resources</Label>
          <div className="px-4 flex flex-col gap-4">
            <div className="flex rounded-xl items-start p-4 gap-4 bg-[#F9FAFB]">
              <div className="w-[30px] ">
                <div className="bg-[#DBEAFE] w-4 h-4 rounded-[2px]"></div>
              </div>
              <div className="flex flex-col ">
                <Label className="text-gray-600 text-[16px]">
                  New Advisor Onboarding
                </Label>
                <Label className="text-gray-400 text-[12px]">
                  Learn the essentials of our platform and products
                </Label>
                <Label className="flex items-center text-[12px] ">
                  <span className="text-[#10B981]">Certificate Available</span>{" "}
                  <Dot></Dot> 45 min
                </Label>
              </div>
            </div>
            <div className="flex rounded-xl justify-baseline items-start p-4 gap-4 bg-[#F9FAFB]">
              <div className="w-[30px] ">
                <div className="bg-[#D1FAE5] w-4 h-4 rounded-[2px]"></div>
              </div>
              <div className="flex flex-col ">
                <Label className="text-gray-600 text-[16px]">
                  2025 Product Guide
                </Label>
                <Label className="text-gray-400 text-[12px]">
                  Complete overview of our investment products
                </Label>
                <Label className="flex items-center text-[12px] ">
                  <span className="text-[#2563EB]">PDF Download</span>{" "}
                  <Dot></Dot> Updated February 2025
                </Label>
              </div>
            </div>
            <div className="flex rounded-xl justify-baseline items-start p-4 gap-4 bg-[#F9FAFB]">
              <div className="w-[30px] ">
                <div className="bg-[#EDE9FE] w-4 h-4 rounded-[2px]"></div>
              </div>
              <div className="flex flex-col ">
                <Label className="text-gray-600 text-[16px]">
                  Upcoming Webinar
                </Label>
                <Label className="text-gray-400 text-[12px]">
                  Market Outlook Q2 2025
                </Label>
                <Label className="flex items-center text-[12px] ">
                  <span className="text-[red]">Live Event</span> <Dot></Dot>{" "}
                  March 15, 2025
                </Label>
              </div>
            </div>
          </div>
          <div className="w-full p-4">
            <Button className="w-full hover:bg-[#2E5257] hover:text-white bg-transparent text-[#2E5257] border border-[#2E5257]">
              Browse All Resources
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
