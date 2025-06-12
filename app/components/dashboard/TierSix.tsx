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
import InviteNewClients from "@/app/components/dashboard/Tier-6/InviteNewClients";
import InvestmentAmount from "./Tier-6/InvestmentAmount";
import TrainingResources from "./Tier-6/TrainingResources";

export default function TierSix() {
  return (
    <div className="w-full flex gap-4 tier-six-cont">
      <InviteNewClients></InviteNewClients>
      <InvestmentAmount></InvestmentAmount>
      <TrainingResources></TrainingResources>
    </div>
  );
}
