import Greetings from "@/app/components/dashboard/Greetings";
import TierFive from "@/app/components/dashboard/TierFive";
import TierFour from "@/app/components/dashboard/TierFour";
import TierOne from "@/app/components/dashboard/TierOne";
import TierSix from "@/app/components/dashboard/TierSix";
import TierThree from "@/app/components/dashboard/TierThree";
import TierTwo from "@/app/components/dashboard/TierTwo";
import React from "react";
import "@/app/globals.css";

export default function Dashboard() {
  return (
    <div className="w-full h-full flex flex-col gap-4 dashboard-cont">
      <Greetings></Greetings>
      
      {/* Commission Rate */}
      <TierOne></TierOne>

      {/* Tier Progress */}
      <TierTwo></TierTwo>
      <div>
        {/* Commission Trend & AUM Growth */}
        <TierThree></TierThree>
      </div>
      <div className="w-full flex flex-col gap-4">
        <div className="w-full tier-4-5-cont flex gap-4 max-h-[450px] h-full justify-evenly">
          <div className="w-full max-h-[450px] h-screen tier-4-cont">
            <div className="w-full h-full min-h-[450px]">
              {/* Affiliated Leaderboard*/}
              <TierFour></TierFour>
            </div>
          </div>
          <div className="w-[49%] h-full flex tier-5-cont">
            {/* Recent Referrals */}
            <TierFive></TierFive>
          </div>
        </div>
        <div className="w-full h-auto">
          <TierSix></TierSix>
        </div>
      </div>
    </div>
  );
}
