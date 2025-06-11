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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { affiliate_leaderboard } from "@/lib/mock-data/affiliate_leaderboard";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

const ITEMS_PER_PAGE = 15;

export default function ReferralTable() {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil(affiliate_leaderboard.length / ITEMS_PER_PAGE);
  const paginatedData = affiliate_leaderboard.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="w-full h-full bg-white relative flex flex-col scrollbar-hide ">
      <Table className="w-full h-full overflow-x-auto">
        <TableHeader>
          <TableRow>
            <TableHead>Rank</TableHead>
            <TableHead>Affiliate</TableHead>
            <TableHead>Tier</TableHead>
            <TableHead>AUM</TableHead>
            <TableHead>Commission</TableHead>
            <TableHead>YoY Growth</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((item) => (
            <TableRow
              key={item.rank}
              onClick={() => setSelectedRow(item.rank)}
              className={cn(
                "cursor-pointer transition-colors",
                selectedRow === item.rank
                  ? "bg-[#F3E8E9] font-bold"
                  : "font-normal"
              )}
            >
              <TableCell>
                <Label
                  className={cn(
                    "w-6 h-6 text-center flex items-center justify-center rounded-full bg-[#F3F4F6]",
                    selectedRow === item.rank && "bg-[#2E5257] text-white",
                    item.rank === 1 && "bg-[#FEF3C7] text-[#2E5257]"
                  )}
                >
                  {item.rank}
                </Label>
              </TableCell>
              <TableCell className="flex gap-2">
                <Avatar>
                  <AvatarImage src={""} />
                  <AvatarFallback
                    className={cn(
                      "cursor-pointer font-normal transition-colors text-gray-500",
                      selectedRow === item.rank && "bg-[#2E5257] text-white"
                    )}
                  >
                    {item.initials}
                  </AvatarFallback>
                </Avatar>
                <Label
                  className={cn(
                    "cursor-pointer transition-colors",
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
                      "cursor-pointer font-normal text-center flex w-auto rounded-full p-1 px-2 justify-center items-center transition-colors",
                      item.rank === 1 ? "bg-[#FEF3C7]" : "bg-[#F3F4F6]"
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
                    item.change <= 0 ? "text-red-500" : "text-green-500"
                  )}
                >
                  {item.change}%
                </Label>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="mt-4 flex justify-end">
        <Pagination>
          <PaginationContent>
            {/* First Page */}
            <PaginationItem>
              <Button
                variant={"ghost"}
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className={`px-2 py-1 border rounded ${
                  currentPage === 1 ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                <ChevronsLeft></ChevronsLeft>
              </Button>
            </PaginationItem>

            {/* Previous Page */}
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((page) => {
                if (
                  page === 1 || // always show first
                  page === totalPages || // always show last
                  Math.abs(currentPage - page) <= 2 || // current +/- 2
                  page <= 3 || // first few pages
                  page >= totalPages - 2 // last few pages
                ) {
                  return true;
                }
                return false;
              })
              .reduce((acc, page, index, arr) => {
                if (index > 0 && page - arr[index - 1] > 1) {
                  acc.push("ellipsis");
                }
                acc.push(page);
                return acc;
              }, [] as (number | "ellipsis")[])
              .map((page, index) =>
                page === "ellipsis" ? (
                  <PaginationItem key={`ellipsis-${index}`}>
                    <span className="px-2">...</span>
                  </PaginationItem>
                ) : (
                  <PaginationItem key={page}>
                    <Button
                      variant={"ghost"}
                      onClick={() => setCurrentPage(page)}
                      className={`h-10 border rounded-[10px] ${
                        page === currentPage
                          ? "bg-[#2E5257] text-white font-bold"
                          : ""
                      }`}
                    >
                      {page}
                    </Button>
                  </PaginationItem>
                )
              )}

            {/* Next Page */}
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>

            {/* Last Page */}
            <PaginationItem>
              <Button
                variant={"ghost"}
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className={`px-2 py-1 border rounded ${
                  currentPage === totalPages
                    ? "opacity-50 pointer-events-none"
                    : ""
                }`}
              >
                <ChevronsRight></ChevronsRight>
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
