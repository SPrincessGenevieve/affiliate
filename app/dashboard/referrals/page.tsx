import TierFiveTable from "@/app/components/dashboard/tier-five-table";
import ReferralTable from "@/app/components/referrals/ReferralTable";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

export default function MyReferrals() {
  return (
    <div className="w-full relative h-screen flex bg-white p-4 rounded-2xl shadow-2xl overflow-x-auto scrollbar-hide-referral">
      <div className="absolute w-full h-full flex bg-[blue]">
        <ReferralTable />
      </div>
    </div>
  );
}
