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
import React, { useState } from "react";
import "@/app/globals.css";
import { postCalculate } from "@/lib/services/postData";
import { useUserContext } from "@/app/context/UserContext";
import { Button } from "@/components/ui/button";
import SpinnerIcon from "@/app/images/Spinner";

interface CalculateProps {
  initial_investment: number;
  interest_rate: number;
  average_annual_growth: string;
  total_growth: number;
}

export default function InvestmentAmount() {
  const { sessionkey, setUserDetails } = useUserContext();
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [commissionRate, setCommissionRate] = useState("1.5");
  const [investmentTerm, setInvestmentTerm] = useState("1");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CalculateProps>();

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const response = await postCalculate(
        Number(investmentAmount),
        Number(commissionRate),
        Number(investmentTerm),
        sessionkey
      );
      setResult(response.data.detail);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  function extractNumber(growthString: string) {
    if (typeof growthString !== "string") {
      // If it's already a number or null/undefined, return it as is
      return growthString;
    }

    // 1. Remove " per year" (case-insensitive)
    // 2. Remove any other non-numeric character (except the decimal point and minus sign)
    //    If the original value is just "12.5", this will be fine too.

    // For your specific case of removing " per year":
    const cleanedString = growthString.replace(/\s*per year/i, "").trim();

    // If you want to be extremely robust and remove all non-numeric text:
    // const numberMatch = cleanedString.match(/^-?[\d,.]+/);
    // if (numberMatch) {
    //   return parseFloat(numberMatch[0].replace(/,/g, '')); // Handles potential commas and returns a number
    // }

    return cleanedString; // Returns the cleaned string (e.g., "12.5%")
  }

  // Example of how to use it
  const cleanedGrowth = extractNumber(result?.average_annual_growth || "0");

  console.log("RESULT: ", result);
  return (
    <Card className="p-0 m-0 w-full">
      <CardContent className="m-0 p-0">
        <Label className="text-[16px] px-4 p-5">Commission Calculator</Label>
        <Separator></Separator>
        <div className="flex flex-col p-4 gap-4">
          <div className="flex flex-col gap-2">
            <Label className="text-gray-600">Investment Amount (£)</Label>
            <Input
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(e.target.value)}
              placeholder=""
            ></Input>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-gray-600">Annual Commission Rate</Label>
            <Select
              defaultValue={commissionRate}
              onValueChange={setCommissionRate}
            >
              <SelectTrigger disabled className="w-full">
                <SelectValue></SelectValue>
              </SelectTrigger>
              <SelectContent>
                {/* <SelectItem value="0.4">0.4% (Vintage)</SelectItem> */}
                <SelectItem value="1.5">0.5%</SelectItem>
                {/* <SelectItem value="0.55">0.55% (Vintage Vault)</SelectItem>
                <SelectItem value="0.6">0.6% (Vintage Enclosure)</SelectItem>
                <SelectItem value="0.65">0.65% (Vintage Associate)</SelectItem> */}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-gray-600">Investment Term</Label>
            <Select
              defaultValue={investmentTerm}
              onValueChange={setInvestmentTerm}
            >
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
        {/* <div className="flex justify-between p-4">
          <div className="flex flex-col items-start gap-2">
            <Label className="text-gray-600">Monthly Earnings</Label>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Label>
              {result?.average_annual_growth}
            </Label>
          </div>
        </div> */}
        <Separator></Separator>
        <div className="flex justify-between gap-2 px-4 py-2 mt-2">
          <Label className="text-gray-600 font-bold">
            Average Annual Growth
          </Label>
          <Label className="text-[#2E5257] font-bold">
            £{Math.round(Number(cleanedGrowth)).toLocaleString()}{" "}
            {cleanedGrowth && "per year"}
          </Label>
        </div>
        <div className="flex justify-between gap-2 px-4 py-2">
          <Label className="text-gray-600 font-bold">Total Growth</Label>
          <Label className="text-[#2E5257] font-bold">
            £{Math.round(Number(result?.total_growth || 0)).toLocaleString()}
          </Label>
        </div>
        <div className="p-4 w-full">
          <Button onClick={handleCalculate} className="w-full bg-[#2E5257]">
            {loading && (
              <div>
                <SpinnerIcon strokeColor="white"></SpinnerIcon>
              </div>
            )}
            Calculate
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
