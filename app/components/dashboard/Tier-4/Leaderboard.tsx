import { Label } from "@/components/ui/label";
import React from "react";
import TierFiveTable from "../tier-five-table";
import { useUserContext } from "@/app/context/UserContext";

export default function Leaderboard() {
  const { affiliated_leaderboard } = useUserContext();

  return (
    <div className="w-full h-full flex justify-baseline items-baseline mt-7">
      <TierFiveTable affiliated_data={affiliated_leaderboard}></TierFiveTable>
    </div>
  );
}
