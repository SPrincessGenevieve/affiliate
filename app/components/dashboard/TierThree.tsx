"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import "@/app/globals.css";
import CommissionTrend from "./Tier-3/CommissionTrend";
import AUMGrowth from "./Tier-3/AUMGrowth";

export default function TierThree() {
  const filter = ["Monthly", "Quarterly", "Yearly"];
  const [selected, setSelected] = useState<string>("Quarterly");

  return (
    <div className="w-full h-[400px] flex-wrap grid grid-cols-2 tier-three-cont justify-between gap-4">
      <CommissionTrend></CommissionTrend>
      <AUMGrowth></AUMGrowth>
    </div>
  );
}
