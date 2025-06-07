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
          <TableHead>Rank</TableHead>
          <TableHead>Affiliate</TableHead>
          <TableHead>Tier</TableHead>
          <TableHead>AUM</TableHead>
          <TableHead>Commission</TableHead>
          <TableHead>YoY Growth</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="">
        {affiliate_leaderboard.map((item) => (
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
                  selectedRow === item.rank && "bg-[#8B1D24] text-white"
                } ${item.rank === 1 && "bg-[#FEF3C7] text-[#8B1D24]"}`}
              >
                {item.rank}
              </Label>
            </TableCell>
            <TableCell className="flex gap-2">
              <Avatar>
                <AvatarImage src={""}></AvatarImage>
                <AvatarFallback
                  className={`cursor-pointer font-normal transition-colors text-gray-500 ${
                    selectedRow === item.rank && "bg-[#8B1D24] text-white"
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
                {item.name}
              </Label>
            </TableCell>
            <TableCell>
              <div className="flex">
                <Label
                  className={cn(
                    "cursor-pointer font-normal text-center flex w-auto  rounded-full p-1 px-2 justify-center items-center  transition-colors ",
                    item.rank === 1 ? "bg-[#FEF3C7] " : "bg-[#F3F4F6]"
                  )}
                >
                  {item.tier}
                </Label>
              </div>
            </TableCell>
            <TableCell>
              <Label>{item.portfolio}</Label>
            </TableCell>
            <TableCell>
              <Label>{item.income}</Label>
            </TableCell>
            <TableCell>
              <Label
                className={cn(
                  "cursor-pointer font-normal transition-colors",
                  item.change <= 0 ? "text-[red]" : "text-green-500"
                )}
              >
                {item.change}%
              </Label>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
