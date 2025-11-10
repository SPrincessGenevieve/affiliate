"use client";
import { useEffect } from "react";
import SidebarTree from "@/app/components/network-tree/SidebarTree";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { useUserContext } from "@/app/context/UserContext";
import { getNetworkTree } from "@/lib/services/getData";
import { mockNetworkTree } from "@/lib/mock-data/networking_tree_data";
import { Progress } from "@/components/ui/progress";

const header_content = [
  {
    title: "Direct Assets",
    value: "£1.2M",
  },
  {
    title: "Network Assets",
    value: "£24.8M",
  },
  {
    title: "Direct Referrals",
    value: "12",
  },
  {
    title: "Annual Commission",
    value: "£124,000",
  },
];

const column = [
  "Affiliate",
  "Level",
  "Direct Assets",
  "Network Assets",
  "Clients",
  "Referrals",
  "Contribution",
];

const btn_header = [
  "Export Network Data",
  "Generate Report",
  "Invite New Affiliate",
];

export default function NetworkTree() {
  const { setUserDetails, sessionkey, network_details } = useUserContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getNetworkTree(sessionkey);
        setUserDetails({
          network_details: response.data.detail,
        });
      } catch (error: any) {
        console.log("ERROR: ", error);
      }
    };

    fetchData();
  });

  console.log("DATA: ", network_details);

  return (
    <div className="w-full h-full networking-cont flex flex-row gap-4">
      <div className="net-sidebar w-[20%] min-w-80 h-full shadow-md bg-[white] rounded-2xl">
        <SidebarTree></SidebarTree>
      </div>
      <div className="net-table bg-[white] shadow-md w-[80%] h-full flex flex-col rounded-2xl">
        <div className="w-full flex flex-wrap gap-2 p-4">
          {btn_header.map((item, index) => (
            <Button
              key={index}
              className="border-[#385A5F]"
              variant={item === "Export Network Data" ? "default" : "outline"}
            >
              {item}
            </Button>
          ))}
        </div>
        <div className="flex flex-row gap-2 items-center justify-center bg-gray-100">
          {header_content.map((item, index) => (
            <div
              key={index}
              className="w-[25%] border-y h-20 bg-transparent flex flex-col items-center justify-center"
            >
              <Label className="text-center uppercase text-[10px] text-gray-500">
                {item.title}
              </Label>
              <Label
                className={`text-center text-[18px] font-bold ${
                  item.title === "Annual Commission"
                    ? "text-red-600"
                    : "text-black"
                }`}
              >
                {item.value}
              </Label>
            </div>
          ))}
        </div>
        <div className="w-full p-4 h-[calc(90vh-150px)] flex flex-col bg-[white] rounded-lg">
          {/* Table Header */}
          <Table>
            <TableHeader className="border-b bg-white">
              <TableRow>
                {column.map((item) => (
                  <TableCell
                    key={item}
                    className="font-bold uppercase text-[12px] text-gray-500"
                  >
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockNetworkTree.map((item, index) => (
                <TableRow>
                  <TableCell className="">{item.Affiliate}</TableCell>
                  <TableCell className="">{item.Level}</TableCell>
                  <TableCell className="">£{item.DirectAssets.toLocaleString()}</TableCell>
                  <TableCell className="">£{item.NetworkAssets.toLocaleString()}</TableCell>
                  <TableCell className="">{item.Clients}</TableCell>
                  <TableCell className="">{item.Referrals}</TableCell>
                  <TableCell className=""><Progress value={item.Contribution * 100}></Progress></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
