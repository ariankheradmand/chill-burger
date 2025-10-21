"use client";
import { Pencil, Search } from "lucide-react";
import React, { useState, useMemo } from "react";
import Menu_items from "@/libs/items"; // adjust path if needed

function ManagingItems() {
  // Flatten all groups into a single item list
  const allItems = useMemo(
    () =>
      Menu_items.flatMap((group) =>
        group
          .filter((obj) => obj.items)
          .map((obj) => obj.items)
      ),
    []
  );

  const [search, setSearch] = useState("");

  // Filter by search term
  const filteredItems = useMemo(() => {
    const term = search.trim().toLowerCase();
    return term
      ? allItems.filter((item) => item.name.toLowerCase().includes(term))
      : allItems;
  }, [search, allItems]);

  // Only show 5 at a time
  const visibleItems = filteredItems.slice(0, 5);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <span className="text-black w-full text-right text-sm">
        حذف و ویرایش آیتم ها
      </span>

      {/* Search box */}
      <div className="w-full flex flex-row-reverse items-center  bg-primary-white shadow-rb rounded-[10px] px-3 py-3">
        <input
          type="text"
          placeholder="جستجو بین آیتم‌ها"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent text-black text-right outline-none placeholder:text-gray-500"
        />
        <Search className="text-gray-600" size={18} />
      </div>

      {/* Item list */}
      <div className="flex flex-col w-full gap-4">
        {visibleItems.map((item, index) => (
          <div key={index} className="flex items-center w-full">
            {/* Action buttons */}
            <div className="w-4/12 flex items-center gap-4 justify-center">
              <div className="w-9 h-9 bg-primary-red rounded-full shadow-rb flex items-center justify-center cursor-pointer">
                <div className="w-3 h-[2px] bg-white"></div>
              </div>
              <div className="w-9 h-9 bg-primary-white rounded-full shadow-rb flex items-center justify-center cursor-pointer">
                <Pencil color="black" />
              </div>
            </div>

            {/* Item info */}
            <div className="w-8/12">
              <div className="w-full flex items-center text-black bg-primary-white px-2 shadow-rb py-4 rounded-[10px]">
                <div className="w-4/12 text-center">{item.price}</div>
                <div className="w-8/12 text-right">{item.name}</div>
              </div>
            </div>
          </div>
        ))}

        {/* If nothing matches the search */}
        {visibleItems.length === 0 && (
          <div className="w-full text-center text-gray-500 text-sm">
            آیتمی پیدا نشد
          </div>
        )}
      </div>
    </div>
  );
}

export default ManagingItems;
