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
import { Label } from "@/components/ui/label";
import { InviteUserResult, useUserContext } from "@/app/context/UserContext";

const ITEMS_PER_PAGE = 12;

interface TableComponentProps {
  data: InviteUserResult[];
  itemsPerPage?: number;
  caption?: string;
  renderRow?: (
    item: InviteUserResult,
    selected: boolean,
    onSelect: () => void
  ) => React.ReactNode;
}

export default function TableComponentInviteUser({
  data,
  itemsPerPage = ITEMS_PER_PAGE,
  caption,
  renderRow,
}: TableComponentProps) {
  const {
    invite_user_total_pages,
    invite_user_current_page,
    activeFilter,
    setUserDetails,
  } = useUserContext();

  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(
    invite_user_current_page || 1
  );
  const totalPages = invite_user_total_pages;
  const paginatedData = data;

  useEffect(() => {
    if (currentPage !== invite_user_current_page) {
      setUserDetails({ invite_user_current_page: currentPage });
    }
  }, [currentPage]);

  const defaultRenderRow = (
    item: InviteUserResult,
    selected: boolean,
    onSelect: () => void
  ) => (
    <TableRow
      onClick={onSelect}
      className={`border-t border-b h-10 cursor-pointer transition-colors ${
        selected ? "bg-[#F3F4F6]" : "font-normal"
      }`}
    >
      <TableCell className="">{item.name}</TableCell>
      <TableCell className="">{item.email}</TableCell>
      <TableCell className="">{item.phone}</TableCell>
      <TableCell className="capitalize">{item.status}</TableCell>
      <TableCell>
        <div className="flex">
          <p>{item.expires_at?.slice(0, 10)}</p>
        </div>
      </TableCell>
    </TableRow>
  );

  return (
    <div className="w-full h-full flex flex-col justify-between relative">
      <Table className="">
        {caption && <TableCaption>{caption}</TableCaption>}
        <TableHeader>
          <TableRow className="">
            {/* <TableHead>Rank</TableHead> */}
            <TableHead>
              <div className="flex items-center gap-2">
                Name
                {/* <div>
                  <Button
                    variant={activeFilter === "name" ? "default" : "ghost"}
                    className="h-7 w-7 rounded-full"
                    onClick={() =>
                      setUserDetails({
                        activeFilter: activeFilter === "name" ? "" : "name",
                      })
                    }
                  >
                    <ArrowUp strokeWidth={1.5} size={20} />
                  </Button>
                  <Button
                    variant={activeFilter === "-name" ? "default" : "ghost"}
                    className="h-7 w-7 rounded-full"
                    onClick={() =>
                      setUserDetails({
                        activeFilter: activeFilter === "-name" ? "" : "-name",
                      })
                    }
                  >
                    <ArrowDown strokeWidth={1.5} size={20} />
                  </Button>
                </div> */}
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-2">
                Email
                {/* <div>
                  <Button
                    variant={activeFilter === "email" ? "default" : "ghost"}
                    className="h-7 w-7 rounded-full"
                    onClick={() =>
                      setUserDetails({
                        activeFilter: activeFilter === "email" ? "" : "email",
                      })
                    }
                  >
                    <ArrowUp strokeWidth={1.5} size={20} />
                  </Button>
                  <Button
                    variant={activeFilter === "-email" ? "default" : "ghost"}
                    className="h-7 w-7 rounded-full"
                    onClick={() =>
                      setUserDetails({
                        activeFilter: activeFilter === "-email" ? "" : "-email",
                      })
                    }
                  >
                    <ArrowDown strokeWidth={1.5} size={20} />
                  </Button>
                </div> */}
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-2">
                Phone
                {/* <div>
                  <Button
                    variant={activeFilter === "phone" ? "default" : "ghost"}
                    className="h-7 w-7 rounded-full"
                    onClick={() =>
                      setUserDetails({
                        activeFilter: activeFilter === "phone" ? "" : "phone",
                      })
                    }
                  >
                    <ArrowUp strokeWidth={1.5} size={20} />
                  </Button>
                  <Button
                    variant={activeFilter === "-phone" ? "default" : "ghost"}
                    className="h-7 w-7 rounded-full"
                    onClick={() =>
                      setUserDetails({
                        activeFilter: activeFilter === "-phone" ? "" : "-phone",
                      })
                    }
                  >
                    <ArrowDown strokeWidth={1.5} size={20} />
                  </Button>
                </div> */}
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-2">
                Status
                {/* <div>
                  <Button
                    variant={activeFilter === "status" ? "default" : "ghost"}
                    className="h-7 w-7 rounded-full"
                    onClick={() =>
                      setUserDetails({
                        activeFilter: activeFilter === "status" ? "" : "status",
                      })
                    }
                  >
                    <ArrowUp strokeWidth={1.5} size={20} />
                  </Button>
                  <Button
                    variant={activeFilter === "-status" ? "default" : "ghost"}
                    className="h-7 w-7 rounded-full"
                    onClick={() =>
                      setUserDetails({
                        activeFilter:
                          activeFilter === "-status" ? "" : "-status",
                      })
                    }
                  >
                    <ArrowDown strokeWidth={1.5} size={20} />
                  </Button>
                </div> */}
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-2">
                Valid Until
                {/* <div>
                  <Button
                    variant={
                      activeFilter === "expires_at" ? "default" : "ghost"
                    }
                    className="h-7 w-7 rounded-full"
                    onClick={() =>
                      setUserDetails({
                        activeFilter:
                          activeFilter === "expires_at" ? "" : "expires_at",
                      })
                    }
                  >
                    <ArrowUp strokeWidth={1.5} size={20} />
                  </Button>
                  <Button
                    variant={
                      activeFilter === "-expires_at" ? "default" : "ghost"
                    }
                    className="h-7 w-7 rounded-full"
                    onClick={() =>
                      setUserDetails({
                        activeFilter:
                          activeFilter === "-expires_at" ? "" : "-expires_at",
                      })
                    }
                  >
                    <ArrowDown strokeWidth={1.5} size={20} />
                  </Button>
                </div> */}
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((item, index) =>
            renderRow
              ? renderRow(item, selectedRow === index, () =>
                  setSelectedRow(index)
                )
              : defaultRenderRow(item, selectedRow === index, () =>
                  setSelectedRow(index)
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
