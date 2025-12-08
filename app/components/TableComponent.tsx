"use client";

import React, { useEffect, useState } from "react";
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
  ArrowDown,
  ArrowDownNarrowWide,
  ArrowUp,
  ArrowUpNarrowWide,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TableItem } from "@/lib/type";
import { MyReferralsTypes, useUserContext } from "../context/UserContext";
import { Label } from "@/components/ui/label";

const ITEMS_PER_PAGE = 12;

interface TableComponentProps {
  data: MyReferralsTypes[];
  itemsPerPage?: number;
  caption?: string;
  renderRow?: (
    item: MyReferralsTypes,
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
  const {
    my_referrals_total_pages,
    my_referrals_current_page,
    activeFilter,
    setUserDetails,
  } = useUserContext();

  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(
    my_referrals_current_page || 1
  );
  const totalPages = my_referrals_total_pages;
  const paginatedData = data;

  useEffect(() => {
    if (currentPage !== my_referrals_current_page) {
      setUserDetails({ my_referrals_current_page: currentPage });
    }
  }, [currentPage]);

  const defaultRenderRow = (
    item: MyReferralsTypes,
    selected: boolean,
    onSelect: () => void
  ) => (
    <TableRow
      key={`${item.rank}-${item.full_name}`}
      onClick={onSelect}
      className={`border-y border-[#C4AD93] h-10 text-white/70 cursor-pointer transition-colors ${
        selected ? "bg-[#2A2C2D]" : "font-normal"
      }`}
    >
      {/* Rank */}
      {/* <TableCell>
        <div className="flex items-center">
          <p
            className={`rounded-full w-7 h-7 text-center flex items-center justify-center ${
              selected ? "bg-[#2E5257] text-white" : "font-normal"
            }`}
          >
            {item.rank}
          </p>
        </div>
      </TableCell> */}

      {/* My Client */}
      <TableCell
        className={`w-60 flex items-center gap-2 ${
          selected ? "font-bold" : "font-normal"
        }`}
      >
        <Avatar>
          <AvatarImage src="" alt={`${item.full_name[0]}`} />
          <AvatarFallback
            className={`${
              selected
                ? "bg-[#121416] text-white"
                : "bg-[#121416]/70 font-normal"
            }`}
          >
            {`${item.full_name[0]}`.toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <Label className="whitespace-normal break-words">
          {item.full_name}
        </Label>
      </TableCell>

      {/* Login Date & Time */}
      <TableCell>
        <div className="flex">
          <p>{item.last_login?.slice(0, 10)}</p>
        </div>
      </TableCell>

      {/* Tier */}
      <TableCell className="px-8">
        <Avatar>
          <AvatarFallback
            className={` ${
              item.rank === 1
                ? "bg-[#C4AD93] text-[#fff]"
                : "bg-[#F3F4F6] text-gray-800"
            }`}
          >
            {item.level}
          </AvatarFallback>
        </Avatar>
      </TableCell>

      {/* Market Value */}
      <TableCell className="">
        {item.market_value.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </TableCell>

      {/* Total Cases */}
      <TableCell className="">{item.total_cases}</TableCell>

      {/* Cases Sold */}
      <TableCell className="">{item.cases_sold}</TableCell>

      {/* Realised Profit Loss */}
      <TableCell
        className={`${
          item.realised_profit_loss > 0 ? "text-green-600" : "text-[red]"
        }`}
      >
        £
        {item.realised_profit_loss.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </TableCell>

      {/* Percent Profit Loss */}
      <TableCell
        className={`${
          item.profit_loss > 0 ? "text-green-600" : "text-[red]"
        }`}
      >
        {`${item.profit_loss}%`}
      </TableCell>

      {/* Current Monthly Payment */}
      <TableCell className="">
        £
        {item.monthly_commission.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </TableCell>

      {/* My Commission Annual */}
      <TableCell className="">
        £
        {typeof item.estimated_annual_commission === "number"
          ? item.estimated_annual_commission.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          : "0.00"}
      </TableCell>
    </TableRow>
  );

  console.log("ACTIVE FILTER: ", activeFilter);

  return (
    <div className="w-full h-full flex flex-col justify-between relative">
      <Table className="">
        {caption && <TableCaption>{caption}</TableCaption>}
        <TableHeader>
          <TableRow className="text-white/70">
            {/* <TableHead>Rank</TableHead> */}
            <TableCell>My Clients</TableCell>
            <TableCell>Last Login Date/Time</TableCell>
            <TableCell>
              {" "}
              <div className="flex text-center justify-center items-center gap-2 ">
                Tier
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                Market Value
                <div>
                  <Button
                    variant={
                      activeFilter === "market_value" ? "default" : "ghost"
                    }
                    className="h-7 w-7 rounded-full"
                    onClick={() =>
                      setUserDetails({
                        activeFilter:
                          activeFilter === "market_value" ? "" : "market_value",
                      })
                    }
                  >
                    <ArrowUp strokeWidth={1.5} size={20} />
                  </Button>
                  <Button
                    variant={
                      activeFilter === "-market_value" ? "default" : "ghost"
                    }
                    className="h-7 w-7 rounded-full"
                    onClick={() =>
                      setUserDetails({
                        activeFilter:
                          activeFilter === "-market_value"
                            ? ""
                            : "-market_value",
                      })
                    }
                  >
                    <ArrowDown strokeWidth={1.5} size={20} />
                  </Button>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">Total Cases</div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">Cases Sold</div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                Profit/Loss
                <div>
                  <Button
                    variant={
                      activeFilter === "realised_profit_loss"
                        ? "default"
                        : "ghost"
                    }
                    className="h-7 w-7 rounded-full"
                    onClick={() =>
                      setUserDetails({
                        activeFilter:
                          activeFilter === "realised_profit_loss"
                            ? ""
                            : "realised_profit_loss",
                      })
                    }
                  >
                    <ArrowUp strokeWidth={1.5} size={20} />
                  </Button>
                  <Button
                    variant={
                      activeFilter === "-realised_profit_loss"
                        ? "default"
                        : "ghost"
                    }
                    className="h-7 w-7 rounded-full"
                    onClick={() =>
                      setUserDetails({
                        activeFilter:
                          activeFilter === "-realised_profit_loss"
                            ? ""
                            : "-realised_profit_loss",
                      })
                    }
                  >
                    <ArrowDown strokeWidth={1.5} size={20} />
                  </Button>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                %Profit/Loss
                <div>
                  <Button
                    variant={
                      activeFilter === "profit_lost_by_percent"
                        ? "default"
                        : "ghost"
                    }
                    className="h-7 w-7 rounded-full"
                    onClick={() =>
                      setUserDetails({
                        activeFilter:
                          activeFilter === "profit_lost_by_percent"
                            ? ""
                            : "profit_lost_by_percent",
                      })
                    }
                  >
                    <ArrowUp strokeWidth={1.5} size={20} />
                  </Button>
                  <Button
                    variant={
                      activeFilter === "-profit_lost_by_percent"
                        ? "default"
                        : "ghost"
                    }
                    className="h-7 w-7 rounded-full"
                    onClick={() =>
                      setUserDetails({
                        activeFilter:
                          activeFilter === "-profit_lost_by_percent"
                            ? ""
                            : "-profit_lost_by_percent",
                      })
                    }
                  >
                    <ArrowDown strokeWidth={1.5} size={20} />
                  </Button>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                Current Monthly Payment
                <div>
                  <Button
                    variant={
                      activeFilter === "monthly_commission"
                        ? "default"
                        : "ghost"
                    }
                    className="h-7 w-7 rounded-full"
                    onClick={() =>
                      setUserDetails({
                        activeFilter:
                          activeFilter === "monthly_commission"
                            ? ""
                            : "monthly_commission",
                      })
                    }
                  >
                    <ArrowUp strokeWidth={1.5} size={20} />
                  </Button>
                  <Button
                    variant={
                      activeFilter === "-monthly_commission"
                        ? "default"
                        : "ghost"
                    }
                    className="h-7 w-7 rounded-full"
                    onClick={() =>
                      setUserDetails({
                        activeFilter:
                          activeFilter === "-monthly_commission"
                            ? ""
                            : "-monthly_commission",
                      })
                    }
                  >
                    <ArrowDown strokeWidth={1.5} size={20} />
                  </Button>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                My Commission (Annual)
                <div>
                  <Button
                    variant={
                      activeFilter === "estimated_annual_aum"
                        ? "default"
                        : "ghost"
                    }
                    className="h-7 w-7 rounded-full"
                    onClick={() =>
                      setUserDetails({
                        activeFilter:
                          activeFilter === "estimated_annual_aum"
                            ? ""
                            : "estimated_annual_aum",
                      })
                    }
                  >
                    <ArrowUp strokeWidth={1.5} size={20} />
                  </Button>
                  <Button
                    variant={
                      activeFilter === "-estimated_annual_aum"
                        ? "default"
                        : "ghost"
                    }
                    className="h-7 w-7 rounded-full"
                    onClick={() =>
                      setUserDetails({
                        activeFilter:
                          activeFilter === "-estimated_annual_aum"
                            ? ""
                            : "-estimated_annual_aum",
                      })
                    }
                  >
                    <ArrowDown strokeWidth={1.5} size={20} />
                  </Button>
                </div>
              </div>
            </TableCell>
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

      <div className="mt-4 flex justify-end w-full h-auto bg-[#2A2C2D]">
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
                        variant={page === currentPage ? "default" : "ghost"}
                        size="icon"
                        onClick={() => setCurrentPage(page)}
                        className={`text-[12px]`}
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
