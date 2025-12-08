"use client";
import ReferralFilter from "@/app/components/referrals/ReferralFilter";
import TableComponent from "@/app/components/TableComponent";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { affiliate_leaderboard } from "@/lib/mock-data/affiliate_leaderboard";
import { getMyReferrals, getMyReferralsFiilter } from "@/lib/services/getData";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useUserContext } from "@/app/context/UserContext";
import SpinnerIcon from "@/app/images/Spinner";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

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
  const {
    setUserDetails,
    activeFilter,
    sessionkey,
    my_referrals,
    my_referrals_current_page,
  } = useUserContext();

  console.log("Active Filter: ", activeFilter);

  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const fetchMyReferral = async () => {
      try {
        if (activeFilter === "") {
          const responseMyReferrals = await getMyReferrals(
            my_referrals_current_page,
            sessionkey
          );

          setUserDetails({
            my_referrals: responseMyReferrals.data.results,
            my_referrals_total_pages: responseMyReferrals.data.total_pages,
          });
        } else {
          const responseMyReferralsFilter = await getMyReferralsFiilter(
            sessionkey,
            activeFilter,
            search === "" ? false : true,
            my_referrals_current_page
          );

          setUserDetails({
            my_referrals: responseMyReferralsFilter.data.results,
            my_referrals_total_pages:
              responseMyReferralsFilter.data.total_pages,
          });
        }
        setIsLoading(false);
      } catch (error: any) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyReferral();
  }, [my_referrals_current_page, activeFilter]);

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

  const handleSearch = () => {
    setUserDetails({
      activeFilter: search,
    });
  };

  return (
    <div className="relative flex  w-full h-full gap-4 flex-col justify-between">
      <div className="bg-[#2A2C2D] relative shadow h-full max-h-16 rounded-2xl p-2 w-full flex items-center justify-between">
        <div className="relative flex items-center gap-2">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search"
            className=""
          ></Input>
          <Button onClick={handleSearch}>
            <Search></Search>
          </Button>
        </div>
        {/* <ReferralFilter
          onFilterChange={handleFilterChange}
          filters={filters}
        ></ReferralFilter> */}
      </div>
      <Card className=" w-full h-[90%] hover:mt-0">
        <CardContent className=" w-full h-full flex flex-col relative justify-center items-center">
          {isLoading && (
            <div className="w-[97%] h-[90%] top-0 bg-[#2A2C2D] absolute z-20 flex justify-center items-center">
              <div className="w-20">
                <SpinnerIcon strokeColor="#C4AD93"></SpinnerIcon>
              </div>
            </div>
          )}
          {my_referrals.length !== 0 ? (
            <TableComponent data={my_referrals}></TableComponent>
          ) : (
            <div>
              <Label className="text-white/70">Table is empty</Label>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
