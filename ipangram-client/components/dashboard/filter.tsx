import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type FilterOption = "locationAsc" | "locationDesc" | "nameAsc" | "nameDesc";

interface FilterDropdownProps {
  onFilterChange: (filter: FilterOption) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState<FilterOption | null>(
    null
  );

  const handleFilterSelect = (filter: FilterOption) => {
    setSelectedFilter(filter);
    onFilterChange(filter);
  };

  return (
    <div className="flex items-end w-full justify-end py-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="bg-white hover:bg-gray-50 text-gray-700 p-4 font-bold rounded-full shadow-sm flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filter
            {selectedFilter && (
              <span className="ml-2 text-sm text-gray-500">
                ({selectedFilter})
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-ocean-50">
          <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleFilterSelect("locationAsc")}>
            Location (A-Z)
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFilterSelect("locationDesc")}>
            Location (Z-A)
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFilterSelect("nameAsc")}>
            Name (A-Z)
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFilterSelect("nameDesc")}>
            Name (Z-A)
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default FilterDropdown;
