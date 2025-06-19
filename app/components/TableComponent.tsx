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
import {
  ArrowDownNarrowWide,
  ArrowUpNarrowWide,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TableItem } from "@/lib/type";

const ITEMS_PER_PAGE = 12;

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
  const [selectedFilter, setSelectedFilter] = useState("");
  const [isFiltered, setIsFiltered] = useState(false);

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
      {/* Rank */}
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

      {/* My Client */}
      <TableCell
        className={`flex items-center gap-2 ${
          selected ? "font-bold" : "font-normal"
        }`}
      >
        <Avatar>
          <AvatarImage src="" alt={item.my_clients} />
          <AvatarFallback
            className={` ${
              selected ? "bg-[#2E5257] text-white" : "font-normal"
            }`}
          >
            {item.my_clients
              .split(" ")
              .map((word) => word[0])
              .join("")
              .substring(0, 2)
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
        {item.my_clients}
      </TableCell>

      {/* Login Date & Time */}
      <TableCell>
        <div className="flex">
          <p>{item.last_login_date_time}</p>
        </div>
      </TableCell>

      {/* Tier */}
      <TableCell className="">
        <div
          className={`px-2 font-semibold h-7 flex items-center justify-center rounded-2xl text-center ${
            item.rank === 1
              ? "bg-[#C4AD93] text-[#fff]"
              : "bg-[#F3F4F6] text-gray-800"
          }`}
        >
          {item.tier}
        </div>
      </TableCell>

      {/* Market Value */}
      <TableCell className="">{item.market_value}</TableCell>

      {/* Total Cases */}
      <TableCell className="">{item.total_cases}</TableCell>

      {/* Cases Sold */}
      <TableCell className="">{item.cases_sold}</TableCell>

      {/* Realised Profit Loss */}
      <TableCell className="">{item.realised_profit_loss}</TableCell>

      {/* Percent Profit Loss */}
      <TableCell className="">{item.percent_profit_loss}</TableCell>

      {/* My Commission Annual */}
      <TableCell className="">{item.my_commission_annual}</TableCell>
    </TableRow>
  );

  return (
    <div className="w-full h-full flex flex-col justify-between relative">
      <Table className="">
        {caption && <TableCaption>{caption}</TableCaption>}
        <TableHeader>
          <TableRow className="">
            <TableHead>Rank</TableHead>
            <TableHead>My Clients</TableHead>
            <TableHead>Last Login Date/Time</TableHead>
            <TableHead>Tier</TableHead>
            <TableHead>
              <div className="flex items-center gap-2">
                Market Value
                <Button variant={"ghost"}>
                  {selectedFilter === "aum" ? (
                    <ArrowUpNarrowWide
                      strokeWidth={1.5}
                      size={20}
                    ></ArrowUpNarrowWide>
                  ) : (
                    <ArrowDownNarrowWide
                      strokeWidth={1.5}
                      size={20}
                    ></ArrowDownNarrowWide>
                  )}
                </Button>
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-2">Total Cases</div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-2">Cases Sold</div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-2">
                Realised Profit/Loss
                <Button
                  variant={"ghost"}
                  onClick={() => {
                    if (selectedFilter !== "") {
                      setSelectedFilter("");
                    } else {
                      setSelectedFilter("aum");
                    }
                  }}
                >
                  {selectedFilter === "aum" ? (
                    <ArrowUpNarrowWide
                      strokeWidth={1.5}
                      size={20}
                    ></ArrowUpNarrowWide>
                  ) : (
                    <ArrowDownNarrowWide
                      strokeWidth={1.5}
                      size={20}
                    ></ArrowDownNarrowWide>
                  )}
                </Button>
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-2">
                %Profit/Loss
                <Button variant={"ghost"}>
                  {selectedFilter === "aum" ? (
                    <ArrowUpNarrowWide
                      strokeWidth={1.5}
                      size={20}
                    ></ArrowUpNarrowWide>
                  ) : (
                    <ArrowDownNarrowWide
                      strokeWidth={1.5}
                      size={20}
                    ></ArrowDownNarrowWide>
                  )}
                </Button>
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-2">
                My Commission (Annual)
                <Button variant={"ghost"}>
                  {selectedFilter === "commission" ? (
                    <ArrowUpNarrowWide
                      strokeWidth={1.5}
                      size={20}
                    ></ArrowUpNarrowWide>
                  ) : (
                    <ArrowDownNarrowWide
                      strokeWidth={1.5}
                      size={20}
                    ></ArrowDownNarrowWide>
                  )}
                </Button>
              </div>
            </TableHead>
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

      <div className="mt-4 flex justify-end w-full h-auto bg-white">
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
                        } text-[12px]`}
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
