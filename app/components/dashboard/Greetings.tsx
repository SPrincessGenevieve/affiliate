import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import React from "react";
import "@/app/globals.css"

export default function Greetings() {
  return (
    <Card className="w-full ">
      <CardContent className="greetings-cont flex justify-between items-center w-full">
        <div className="">
          <Label className="font-bold text-xl">Welcome Back, Sarah!</Label>
          <Label className="font-normal text-[14px]">
            Your performance this month is up by 15% compared to last month.
          </Label>
        </div>
        <div>
          <Button variant={"ghost"}>View Reports</Button>
        </div>
      </CardContent>
    </Card>
  );
}
