"use client";
import ReferralFilter from "@/app/components/referrals/ReferralFilter";
import TableComponent from "@/app/components/TableComponent";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { affiliate_leaderboard } from "@/lib/mock-data/affiliate_leaderboard";
import { getCSRF, getMyReferrals } from "@/lib/services/getData";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useUserContext } from "@/app/context/UserContext";
import SpinnerIcon from "@/app/images/Spinner";

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
  const { setUserDetails, my_referrals, my_referrals_current_page } =
    useUserContext();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchMyReferral = async () => {
      try {
        const responseCSRF = await getCSRF();
        const responseMyReferrals = await getMyReferrals(
          my_referrals_current_page
        );

        setUserDetails({
          my_referrals: responseMyReferrals.data.results,
          my_referrals_total_pages: responseMyReferrals.data.total_pages,
        });
        setIsLoading(false);
      } catch (error: any) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyReferral();
  }, [my_referrals_current_page]);

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
    <div className="relative flex  w-full h-full gap-4 flex-col justify-between">
      <div className="bg-white relative shadow h-full max-h-16 rounded-2xl p-2 w-full flex items-center justify-between">
        <div className="relative flex items-center">
          <Search className="absolute ml-2"></Search>
          <Input placeholder="search" className="pl-10"></Input>
        </div>
        <ReferralFilter
          onFilterChange={handleFilterChange}
          filters={filters}
        ></ReferralFilter>
      </div>
      <Card className=" w-full h-[90%] hover:mt-0">
        <CardContent className=" w-full h-full flex flex-col relative justify-center items-center">
          {isLoading && (
            <div className="w-[97%] h-[90%] top-0 bg-[white] absolute z-20 flex justify-center items-center">
              <div className="w-20">
                <SpinnerIcon strokeColor="#2E5257"></SpinnerIcon>
              </div>
            </div>
          )}
          <TableComponent data={my_referrals}></TableComponent>
        </CardContent>
      </Card>
    </div>
  );
}
