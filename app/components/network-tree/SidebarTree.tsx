"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import {
  NetworkNode,
  NetworkUserDetail,
  useUserContext,
} from "@/app/context/UserContext";
import { Input } from "@/components/ui/input";

interface SidebarTreeProps {
  onNodeClick?: (node: NetworkNode) => void;
  expandedIds?: Set<number>;
}

function TreeNode({
  node,
  onNodeClick,
  expandedIds,
}: {
  node: NetworkNode;
  onNodeClick?: (node: NetworkNode) => void;
  expandedIds?: Set<number>;
}) {
  const [collapsed, setCollapsed] = useState(
    node.children && node.children.length > 0 ? true : false
  );
  const hasChildren = node.children && node.children.length > 0;

  const isExpanded = expandedIds?.has(node.id) ?? !collapsed;

  const handleClick = () => {
    if (hasChildren) {
      onNodeClick?.(node);
      setCollapsed(!collapsed); // optional for local collapse
    }
  };

  return (
    <div className="flex flex-col items-start w-full">
      <div
        onClick={handleClick}
        className="cursor-pointer border-l-4 border-[#385A5F] flex items-center gap-2 bg-gray-50 hover:bg-gray-100 p-2 rounded-md w-full"
      >
        <div className="flex-shrink-0 w-3 flex justify-center pt-1">
          {hasChildren ? (
            <Image
              src={isExpanded ? "/down.png" : "/play.png"}
              alt=""
              width={400}
              height={400}
              className="w-3 h-auto transition-transform"
            />
          ) : (
            <div className="w-3" />
          )}
        </div>

        <div className="flex items-center gap-2 w-full max-w-full relative">
          <Avatar className="rounded-[5px] w-6 h-6 shrink-0">
            {node.profile_picture ? (
              <AvatarImage src={node.profile_picture} />
            ) : (
              <AvatarFallback className="rounded-[5px] bg-[#385A5F] text-white font-bold text-[10px]">
                {node.user_email?.[0]?.toUpperCase() || "?"}
              </AvatarFallback>
            )}
          </Avatar>
          <Label
            className="text-sm text-gray-700 w-full break-words whitespace-normal leading-tight"
            style={{ wordBreak: "break-all" }}
          >
            {node.user_email}
          </Label>
          {hasChildren && (
            <Label className="bg-gray-300 text-[12px] font-bold p-1 px-4 text-center rounded-full">
              {node.children.length}
            </Label>
          )}
        </div>
      </div>

      {hasChildren && isExpanded && (
        <div className="mt-1 pl-6 gap-1 flex flex-col w-full border-l-2 border-gray-200">
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              onNodeClick={onNodeClick}
              expandedIds={expandedIds}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SidebarTree({
  onNodeClick,
  expandedIds,
}: SidebarTreeProps) {
  const { network_details } = useUserContext();

  if (!network_details) {
    return (
      <div className="p-4 flex flex-col gap-2 bg-white rounded-xl w-full">
        <Label className="font-semibold text-gray-600 mb-2">Network Tree</Label>
        <p className="text-sm text-gray-500">No network data available.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 bg-white rounded-xl w-full">
      <div className="border-b p-4">
        <Label className="font-bold mb-2 text-[14px]">Network Tree</Label>
      </div>
      <div className="p-4">
        <TreeNode
          node={network_details.network_tree}
          onNodeClick={onNodeClick}
          expandedIds={expandedIds}
        />
      </div>
    </div>
  );
}
