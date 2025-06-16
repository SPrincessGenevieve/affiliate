"use client";
import ReferralFilter from "@/app/components/referrals/ReferralFilter";
import TableComponent from "@/app/components/TableComponent";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { affiliate_leaderboard } from "@/lib/mock-data/affiliate_leaderboard";
import { Search } from "lucide-react";
import React, { useState } from "react";

type Filters = {
  action: {
    sell: boolean;
    delivery: boolean;
    gift: boolean;
    buy: boolean;
  };
  status: {
    pending: boolean;
    complete: boolean;
    confirmed: boolean;
    idle: boolean;
  };
  search: string;
};

export default function MyReferrals() {
  const [filters, setFilters] = useState<Filters>({
    action: {
      sell: false,
      delivery: false,
      gift: false,
      buy: false,
    },
    status: {
      pending: false,
      complete: false,
      confirmed: false,
      idle: false,
    },
    search: "",
  });

  const handleFilterChange = (filterType: keyof Filters, key: string) => {
    setFilters((prevFilters) => {
      const currentFilter = prevFilters[filterType] as {
        [key: string]: boolean;
      };
      return {
        ...prevFilters,
        [filterType]: {
          ...currentFilter,
          [key]: !currentFilter[key], // Access the key directly
        },
      };
    });
  };

  return (
    <div className="flex w-full h-full gap-4 flex-col justify-between">
      <div className="bg-white shadow h-full max-h-16 rounded-2xl p-2 w-full flex items-center justify-between">
        <div className="relative flex items-center">
          <Search className="absolute ml-2"></Search>
          <Input placeholder="search" className="pl-10"></Input>
        </div>
        <ReferralFilter
          onFilterChange={handleFilterChange}
          filters={filters}
        ></ReferralFilter>
      </div>
      <Card className="w-full h-[90%] hover:mt-0">
        <CardContent className="w-full h-full  ">
          <TableComponent data={affiliate_leaderboard}></TableComponent>
        </CardContent>
      </Card>
    </div>
  );
}
