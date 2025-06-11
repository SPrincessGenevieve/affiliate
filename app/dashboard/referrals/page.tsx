import TableComponent from "@/app/components/TableComponent";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { affiliate_leaderboard } from "@/lib/mock-data/affiliate_leaderboard";
import { Search } from "lucide-react";
import React from "react";

export default function MyReferrals() {
  return (
    <div className="flex w-full h-full gap-4 flex-col justify-between">
      <div className="bg-white shadow h-full max-h-16 rounded-2xl p-2 w-full flex items-center">
        <div className="relative flex items-center">
          <Search className="absolute ml-2"></Search>
          <Input placeholder="search" className="pl-10"></Input>
        </div>
      </div>
      <Card className="w-full h-[90%] hover:mt-0">
        <CardContent className="w-full h-full  ">
          <TableComponent data={affiliate_leaderboard}></TableComponent>
        </CardContent>
      </Card>
    </div>
  );
}
