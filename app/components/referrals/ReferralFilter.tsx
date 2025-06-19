import React from "react";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";

// Define the valid keys for action and status filters
type FilterType = "sell" | "delivery" | "gift" | "buy";
type StatusType = "pending" | "complete" | "confirmed" | "idle";

interface Filters {
  action: { [key in FilterType]: boolean };
  status: { [key in StatusType]: boolean };
}

interface ActivityFilterProps {
  onFilterChange: (filterType: keyof Filters, key: string) => void;
  filters: Filters;
}

export default function ReferralFilter({
  onFilterChange,
  filters,
}: ActivityFilterProps) {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger className="border-none p-0 m-0 shadow-none">
          <Button
            variant="ghost"
            size="icon"
            className="p-0 border-none shadow-none w-full px-4"
          >
            Tier Filter <SlidersHorizontal strokeWidth={1.3} />
          </Button>
        </MenubarTrigger>
        <MenubarContent>
          {[
            "Vintage",
            "Vintage Cru",
            "Vintage Vault",
            "Vintage Enclosure",
            "Vintage Associate",
          ].map((action) => (
            <MenubarCheckboxItem
              key={action}
              checked={filters.action[action as FilterType]} // Type assertion here
              onCheckedChange={() => onFilterChange("action", action)}
            >
              <p className="capitalize">{action}</p>
            </MenubarCheckboxItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
