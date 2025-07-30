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
  total_earnings: number;
  monthly_earnings: number;
}

export default function InvestmentAmount() {
  const { sessionkey, setUserDetails } = useUserContext();
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [commissionRate, setCommissionRate] = useState("1.0");
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
            <Label className="text-gray-600">Your Commission Rate</Label>
            <Select
              defaultValue={commissionRate}
              onValueChange={setCommissionRate}
            >
              <SelectTrigger className="w-full">
                <SelectValue></SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1.0">0.1% (Vintage)</SelectItem>
                <SelectItem value="1.25">0.25% (Vintage Cru)</SelectItem>
                <SelectItem value="1.75">0.5% (Vintage Vault)</SelectItem>
                <SelectItem value="1.5">0.75% (Vintage Enclosure)</SelectItem>
                <SelectItem value="2.0">1.0% (Vintage Associate)</SelectItem>
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
        <div className="flex justify-between p-4">
          <div className="flex flex-col items-start gap-2">
            {/* <Label className="text-gray-600">Initial Commission</Label> */}
            <Label className="text-gray-600">Monthly Earnings</Label>
          </div>
          <div className="flex flex-col items-end gap-2">
            {/* <Label>£1,000</Label> */}
            <Label>
              £{Number(result?.monthly_earnings || 0).toLocaleString()}
            </Label>
          </div>
        </div>
        <Separator></Separator>
        <div className="flex justify-between gap-2 p-4">
          <Label className="text-gray-600 font-bold">
            Total Earnings (Year {investmentTerm})
          </Label>
          <Label className="text-[#2E5257] font-bold">
            £{Number(result?.total_earnings || 0).toLocaleString()}
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
