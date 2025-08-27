"use client";

import "@/app/globals.css";
import AUMGrowth from "./Tier-3/AUMGrowth";
import ClientGrowth from "./Tier-3/ClientGrowth";

export default function TierThree() {
  return (
    <div className="w-full h-[400px] flex-wrap grid grid-cols-2 tier-three-cont justify-between gap-4">
      <ClientGrowth></ClientGrowth>
      <AUMGrowth></AUMGrowth>
    </div>
  );
}
