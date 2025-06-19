"use client";

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
import React from "react";
import "@/app/globals.css";

export default function InvestmentAmount() {
  return (
    <Card className="p-0 m-0 w-full">
      <CardContent className="m-0 p-0">
        <Label className="text-[16px] px-4 p-5">Commission Calculator</Label>
        <Separator></Separator>
        <div className="flex flex-col p-4 gap-4">
          <div className="flex flex-col gap-2">
            <Label className="text-gray-600">Investment Amount (£)</Label>
            <Input placeholder=""></Input>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-gray-600">Your Commission Rate</Label>
            <Select defaultValue="1.0">
              <SelectTrigger className="w-full">
                <SelectValue></SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1.0">1.0% (Vintage)</SelectItem>
                <SelectItem value="1.25">1.25% (Vintage Cru)</SelectItem>
                <SelectItem value="1.75">1.75% (Vintage Vault)</SelectItem>
                <SelectItem value="1.5">1.50% (Vintage Enclosure)</SelectItem>
                <SelectItem value="2.0">2% (Vintage Associate)</SelectItem>
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
  );
}
