"use client";

import "@/app/globals.css";
import CommissionTrend from "./Tier-3/CommissionTrend";
import AUMGrowth from "./Tier-3/AUMGrowth";

export default function TierThree() {
  return (
    <div className="w-full h-[400px] flex-wrap grid grid-cols-2 tier-three-cont justify-between gap-4">
      <CommissionTrend></CommissionTrend>
      <AUMGrowth></AUMGrowth>
    </div>
  );
}
