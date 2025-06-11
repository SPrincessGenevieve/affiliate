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
import { Button } from "@/components/ui/button";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ITEMS_PER_PAGE = 15;

interface TableItem {
  rank: number;
  name: string;
  initials: string;
  tier: string;
  portfolio: string;
  income: string;
  change: number;
}

interface TableComponentProps {
  data: TableItem[];
  itemsPerPage?: number;
  caption?: string;
  renderRow?: (
    item: TableItem,
    selected: boolean,
    onSelect: () => void
  ) => React.ReactNode;
}

export default function TableComponent({
  data,
  itemsPerPage = ITEMS_PER_PAGE,
  caption,
  renderRow,
}: TableComponentProps) {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const defaultRenderRow = (
    item: TableItem,
    selected: boolean,
    onSelect: () => void
  ) => (
    <TableRow
      key={item.rank}
      onClick={onSelect}
      className={`border-t border-b h-10 cursor-pointer transition-colors ${
        selected ? "bg-[#F3F4F6]" : "font-normal"
      }`}
    >
      <TableCell>
        <div className="flex items-center">
          <p
            className={`rounded-full w-7 h-7 text-center flex items-center justify-center ${
              selected ? "bg-[#2E5257] text-white" : "font-normal"
            }`}
          >
            {item.rank}
          </p>
        </div>
      </TableCell>
      <TableCell
        className={`flex items-center gap-2 ${
          selected ? "font-bold" : "font-normal"
        }`}
      >
        <Avatar>
          <AvatarImage src="" alt={item.name} />
          <AvatarFallback
            className={` ${
              selected ? "bg-[#2E5257] text-white" : "font-normal"
            }`}
          >
            {item.name
              .split(" ")
              .map((word) => word[0])
              .join("")
              .substring(0, 2)
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
        {item.name}
      </TableCell>

      <TableCell>
        <div className="flex">
          <p
            className={`px-2 rounded-2xl ${
              item.tier === "Diamond"
                ? "bg-[#C4AD93] text-[#fff]"
                : "bg-[#F3F4F6] text-gray-800"
            }`}
          >
            {item.tier}
          </p>
        </div>
      </TableCell>
      <TableCell className="font-semibold">{item.portfolio}</TableCell>
      <TableCell>{item.income}</TableCell>
      <TableCell
        className={item.change < 0 ? "text-red-500" : "text-green-500"}
      >
        {item.change}%
      </TableCell>
    </TableRow>
  );

  return (
    <div className="w-full h-full flex flex-col justify-between ">
      <Table className="">
        {caption && <TableCaption>{caption}</TableCaption>}
        <TableHeader>
          <TableRow className="">
            <TableHead>Rank</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Tier</TableHead>
            <TableHead>AUM</TableHead>
            <TableHead>Commission</TableHead>
            <TableHead>YoY Growth</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((item) =>
            renderRow
              ? renderRow(item, selectedRow === item.rank, () =>
                  setSelectedRow(item.rank)
                )
              : defaultRenderRow(item, selectedRow === item.rank, () =>
                  setSelectedRow(item.rank)
                )
          )}
        </TableBody>
      </Table>

      <div className="mt-4 flex justify-end">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
            </PaginationItem>

            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (page) =>
                  page === 1 ||
                  page === totalPages ||
                  Math.abs(currentPage - page) <= 2
              )
              .map((page, idx, arr) => {
                const prevPage = arr[idx - 1];
                const showEllipsis = prevPage && page - prevPage > 1;

                return (
                  <React.Fragment key={page}>
                    {showEllipsis && (
                      <PaginationItem key={`ellipsis-${page}`}>
                        <span className="px-2">...</span>
                      </PaginationItem>
                    )}
                    <PaginationItem key={page}>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setCurrentPage(page)}
                        className={`${
                          page === currentPage
                            ? "bg-[#2E5257] text-white font-bold"
                            : ""
                        }`}
                      >
                        {page}
                      </Button>
                    </PaginationItem>
                  </React.Fragment>
                );
              })}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              />
            </PaginationItem>

            <PaginationItem>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
