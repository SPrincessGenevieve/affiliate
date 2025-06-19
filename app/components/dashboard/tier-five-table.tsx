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

export default function TierFiveTable() {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  return (
    <Table className="w-full">
      <TableCaption></TableCaption>
      <TableHeader className="">
        <TableRow className="">
          <TableHead>
            <div className="flex items-baseline h-full  gap-2">Rank</div>
          </TableHead>
          <TableHead>
            {" "}
            <div className="flex items-baseline h-full  gap-2">My Clients</div>
          </TableHead>
          <TableHead>
            {" "}
            <div className="flex items-baseline h-full  gap-2">
              Last Login Date/Time
            </div>
          </TableHead>
          <TableHead className="flex items-baseline h-full  gap-2">
            Tier
          </TableHead>
          <TableHead>
            <div className="flex items-baseline h-full  gap-2">
              Market Value
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-baseline h-full  gap-2">Total Cases</div>
          </TableHead>
          <TableHead>
            <div className="flex items-baseline h-full  gap-2">Cases Sold</div>
          </TableHead>
          <TableHead>
            <div className="flex items-baseline h-full  gap-2">
              Realised Profit/Loss
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-baseline h-full gap-2">%Profit/Loss</div>
          </TableHead>
          <TableHead>
            <div className="flex items-baseline h-full gap-2">
              My Commission<br></br>(Annual)
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="">
        {affiliate_leaderboard.slice(0, 6).map((item) => (
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
                  JW
                </AvatarFallback>
              </Avatar>
              <Label
                className={cn(
                  "cursor-pointer  transition-colors ",
                  selectedRow === item.rank ? "font-bold" : "font-normal"
                )}
              >
                {item.my_clients}
              </Label>
            </TableCell>
            <TableCell>
              <Label className="font-normal">{item.last_login_date_time}</Label>
            </TableCell>
            <TableCell>
              <div className="flex">
                <Label
                  className={cn(
                    "cursor-pointer font-normal text-center flex w-auto  rounded-full p-1 px-2 justify-center items-center  transition-colors ",
                    item.rank === 1 ? "bg-[#C4AD93] text-white" : "bg-[#F3F4F6]"
                  )}
                >
                  {item.tier}
                </Label>
              </div>
            </TableCell>
            <TableCell>
              <Label className="font-normal">{item.market_value}</Label>
            </TableCell>
            <TableCell>
              <Label className="font-normal">{item.total_cases}</Label>
            </TableCell>
            <TableCell>
              <Label className="font-normal">{item.cases_sold}</Label>
            </TableCell>
            <TableCell>
              <Label className="font-normal">{item.realised_profit_loss}</Label>
            </TableCell>
            <TableCell>
              <Label className="font-normal">{item.percent_profit_loss}</Label>
            </TableCell>
            <TableCell>
              <Label className="font-normal">{item.my_commission_annual}</Label>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
