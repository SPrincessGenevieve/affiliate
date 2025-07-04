"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { affiliate_leaderboard } from "@/lib/mock-data/affiliate_leaderboard";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useUserContext } from "@/app/context/UserContext";
import { AffiliateLeaderboardTypes } from "@/app/context/UserContext";

interface AffiliatedProps {
  affiliated_data: AffiliateLeaderboardTypes[];
  sliceCount?: number;
}

export default function TierFiveTable({
  affiliated_data,
  sliceCount,
}: AffiliatedProps) {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const visibleRows = sliceCount
    ? affiliated_data.slice(0, sliceCount)
    : affiliated_data;
  return (
    <Table className="w-full">
      <TableCaption></TableCaption>
      <TableHeader className="">
        <TableRow className="">
          <TableHead>
            <div className="flex items-baseline h-full  gap-2">Rank</div>
          </TableHead>
          <TableHead>
            <div className="flex items-baseline h-full  gap-2">My Clients</div>
          </TableHead>
          <TableHead>
            <div className="flex items-baseline h-full  gap-2">AUM</div>
          </TableHead>
          <TableHead className="flex items-baseline h-full  gap-2">
            Annual Commission Rate
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="">
        {visibleRows.map((item) => (
          <TableRow
            key={item.rank}
            onClick={() => setSelectedRow(item.rank)}
            className={cn(
              "cursor-pointer transition-colors ",
              selectedRow === item.rank
                ? "bg-[#F3E8E9] font-bold"
                : "font-normal"
            )}
          >
            <TableCell>
              <Label
                className={`w-6 h-6 text-center flex items-center justify-center rounded-full bg-[#F3F4F6] ${
                  selectedRow === item.rank && "bg-[#2E5257] text-white"
                } ${item.rank === 1 && "bg-[#C4AD93] text-[#fff]"}`}
              >
                {item.rank}
              </Label>
            </TableCell>
            <TableCell className="flex gap-2">
              <Avatar>
                <AvatarImage src={""}></AvatarImage>
                <AvatarFallback
                  className={`cursor-pointer font-normal transition-colors text-gray-500 ${
                    selectedRow === item.rank && "bg-[#2E5257] text-white"
                  }`}
                >
                  {`${item.affiliator[0]}`}
                </AvatarFallback>
              </Avatar>
              <Label
                className={cn(
                  "cursor-pointer  transition-colors ",
                  selectedRow === item.rank ? "font-bold" : "font-normal"
                )}
              >
                {item.affiliator}
              </Label>
            </TableCell>

            <TableCell>
              <div className="flex">
                <Label className="">{item.aum}</Label>
              </div>
            </TableCell>
            <TableCell>
              <Label className="font-normal">
                {item.annual_commission_rate}
              </Label>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
