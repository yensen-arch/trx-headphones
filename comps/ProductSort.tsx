"use client";
import React from "react";
import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon, FilterIcon } from "lucide-react";

interface ProductSortProps {
  onSortChange: (sortType: string) => void;
  currentSort: string;
}

const ProductSort = ({ onSortChange, currentSort }: ProductSortProps) => {
  return (
    <div className="flex items-center gap-2 mb-6">
      <FilterIcon className="h-5 w-5 text-gray-600" />
      <span className="text-sm font-medium text-gray-700">Filter by:</span>
      <Select.Root value={currentSort} onValueChange={onSortChange}>
        <Select.Trigger className="inline-flex items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-w-[180px]">
          <Select.Value placeholder="Price" />
          <Select.Icon asChild>
            <ChevronDownIcon className="h-4 w-4 text-gray-500" />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="overflow-hidden bg-white rounded-md shadow-lg border border-gray-200 z-50">
            <Select.Viewport className="p-1">
              <Select.Item
                value="low-to-high"
                className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-gray-100 focus:bg-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
              >
                <Select.ItemText>Low to High</Select.ItemText>
              </Select.Item>
              <Select.Item
                value="high-to-low"
                className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-gray-100 focus:bg-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
              >
                <Select.ItemText>High to Low</Select.ItemText>
              </Select.Item>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
};

export default ProductSort;
