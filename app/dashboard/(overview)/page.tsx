import Greetings from "@/app/components/dashboard/Greetings";
import TierFive from "@/app/components/dashboard/TierFive";
import TierFour from "@/app/components/dashboard/TierFour";
import TierOne from "@/app/components/dashboard/TierOne";
import TierSix from "@/app/components/dashboard/TierSix";
import TierThree from "@/app/components/dashboard/TierThree";
import TierTwo from "@/app/components/dashboard/TierTwo";
import React from "react";

export default function Dashboard() {
  return (
    <div className="w-full flex flex-col gap-4 dashboard-cont">
      <Greetings></Greetings>
      <TierOne></TierOne>
      <TierTwo></TierTwo>
      <TierThree></TierThree>
      <div className="w-full tier-4-5-cont flex gap-4 max-h-[450px] h-screen justify-evenly">
        <div className="w-full h-full min-h-[450px]">
          <TierFour></TierFour>
        </div>
          <TierFive></TierFive>
      </div>
      <TierSix></TierSix>
    </div>
  );
}
