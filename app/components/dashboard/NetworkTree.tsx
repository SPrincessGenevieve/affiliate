"use client";

import { useEffect, useState } from "react";
import SidebarTree from "@/app/components/network-tree/SidebarTree";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import {
  NetworkNode,
  NetworkUserDetail,
  useUserContext,
} from "@/app/context/UserContext";
import { getNetworkTree } from "@/lib/services/getData";

const column = [
  "Affiliate",
  "Level",
  "Direct Assets",
  "Network Assets",
  "Clients",
  "Referrals",
  // "Contribution",
];

export interface FlatNetworkNode {
  id: number;
  parentId: number | null;
  Affiliate: string;
  Level: number;
  DirectAssets: number;
  NetworkAssets: number;
  Clients: number;
  Referrals: number;
  Monthly: number;
  Contribution: number;
  children: NetworkNode[];
}

export default function NetworkTree() {
  const { setUserDetails, sessionkey, network_details } = useUserContext();
  const [flatData, setFlatData] = useState<FlatNetworkNode[]>([]);
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());
  const [selectedNodeId, setSelectedNodeId] = useState<number | null>(null);
  const [headerContent, setHeaderContent] = useState([
    { title: "Direct Assets", value: 0 },
    { title: "Network Assets", value: 0 },
    { title: "Direct Referrals", value: 0 },
    { title: "Monthly Commission", value: 0 },
  ]);
  // Flatten network tree and include children
  const flattenTree = (node: any, parentId: number | null = null) => {
    const result: FlatNetworkNode[] = [];

    const traverse = (n: any, parentId: number | null) => {
      result.push({
        id: n.id,
        parentId,
        Affiliate: n.full_name,
        Level: n.level,
        DirectAssets: n.direct_assets,
        NetworkAssets: n.network_assets,
        Clients: n.direct_refferals,
        Referrals: n.direct_refferals,
        Monthly: n.monthly_commission,
        Contribution:
          n.network_assets + n.direct_assets > 0
            ? n.direct_assets / (n.network_assets + n.direct_assets)
            : 0,
        children: n.children || [],
      });
      if (n.children && n.children.length > 0) {
        n.children.forEach((child: any) => traverse(child, n.id));
      }
    };
    traverse(node, parentId);
    setFlatData(result);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getNetworkTree(sessionkey);
        setUserDetails({ network_details: response.data.detail });
        flattenTree(response.data.detail.network_tree);
      } catch (error: any) {
        console.log("ERROR: ", error);
      }
    };
    fetchData();
  }, [sessionkey, setUserDetails]);

  // Generate visible rows based on expandedIds
  const getVisibleData = () => {
    const visible: any[] = [];
    const map = new Map(flatData.map((item) => [item.id, item]));

    // show first-level nodes
    flatData
      .filter((item) => item.parentId === null)
      .forEach((node) => {
        visible.push(node);
        addExpandedChildren(node);
      });

    function addExpandedChildren(node: any) {
      if (expandedIds.has(node.id) && node.children) {
        node.children.forEach((child: any) => {
          const childNode = map.get(child.id);
          if (childNode) {
            visible.push(childNode);
            addExpandedChildren(childNode); // recursive
          }
        });
      }
    }

    return visible;
  };

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const visibleData = getVisibleData();

  const handleNodeClick = (clickedNode: any) => {
    setSelectedNodeId(clickedNode.id); // mark this node as selected

    // Update header content
    const node = flatData.find((n) => n.id === clickedNode.id);
    if (!node) return;

    setHeaderContent([
      {
        title: "Direct Assets",
        value: node.DirectAssets,
      },
      {
        title: "Network Assets",
        value: node.NetworkAssets,
      },
      {
        title: "Direct Referrals",
        value: node.Referrals,
      },
      {
        title: "Monthly Commission",
        value: node.Monthly, // or calculate dynamically
      },
    ]);

    // Only toggle expansion if the node has children
    if (node.children && node.children.length > 0) {
      toggleExpand(node.id);
    }
  };

  return (
    <div className="w-full h-full networking-cont flex flex-row gap-4 rounded-t-2xl">
      <div className="net-sidebar w-[20%] min-w-80 h-full shadow-md bg-white rounded-2xl">
        <SidebarTree onNodeClick={handleNodeClick} expandedIds={expandedIds} />
      </div>

      <div className="net-table bg-white shadow-md w-[80%] h-full flex flex-col rounded-2xl">
        <div className="w-full flex flex-wrap gap-2 p-4 py-5">
          <Label className="text-[14px] font-bold">Network Overview</Label>
        </div>

        <div className="flex flex-row gap-2 items-center justify-center border-y bg-gray-100">
          {headerContent.map((item, index) => (
            <div
              key={index}
              className="w-[25%] min-h-20 flex flex-col items-center justify-baseline"
            >
              <div className="min-h-7 mt-2">
                <Label className="text-center  uppercase text-[10px] text-gray-500">
                  {item.title}
                </Label>
              </div>
              <Label
                className={`block table-header-text text-[2.5vw] text-center w-full font-bold break-words whitespace-normal ${
                  item.title !== "Monthly Commission"
                    ? "text-black"
                    : item.value >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {item.title !== "Direct Referrals" && "£"}
                {Number(Number(item.value ?? 0).toFixed(2)).toLocaleString()}
              </Label>
            </div>
          ))}
        </div>

        <div className="w-full p-4 h-auto min-h-[100px] flex flex-col bg-white rounded-lg overflow-auto">
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
              {visibleData.length > 0 ? (
                visibleData.map((item, index) => (
                  <TableRow
                    key={index}
                    className="cursor-pointer"
                    onClick={() => {
                      // Update header only
                      setHeaderContent([
                        {
                          title: "Direct Assets",
                          value: item.DirectAssets,
                        },
                        {
                          title: "Network Assets",
                          value: item.NetworkAssets,
                        },
                        {
                          title: "Direct Referrals",
                          value: item.Referrals,
                        },
                        {
                          title: "Monthly Commission",
                          value: item.Monthly, // calculate if available
                        },
                      ]);
                      setSelectedNodeId(item.id); // optional: highlight selected
                    }}
                  >
                    <TableCell>{item.Affiliate}</TableCell>
                    <TableCell>{item.Level}</TableCell>
                    <TableCell>£{item.DirectAssets.toLocaleString()}</TableCell>
                    <TableCell>
                      £{item.NetworkAssets.toLocaleString()}
                    </TableCell>
                    <TableCell>{item.Clients}</TableCell>
                    <TableCell>{item.Referrals}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
