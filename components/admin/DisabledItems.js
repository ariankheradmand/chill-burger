"use client";
import { Pencil, Search } from "lucide-react";
import React, { useState, useMemo } from "react";
import Menu_items from "@/libs/items"; // adjust path if needed

function DisabledItems() {
  // Flatten all item groups and keep only the disabled ones
  const disabledItems = useMemo(
    () =>
      Menu_items.flatMap((group) =>
        group
          .filter((obj) => obj.items && obj.items.disabled === true)
          .map((obj) => obj.items)
      ),
    []
  );

  const [search, setSearch] = useState("");

  // Filter search results (live)
  const filteredItems = useMemo(() => {
    const term = search.trim().toLowerCase();
    return term
      ? disabledItems.filter((item) =>
          item.name.toLowerCase().includes(term)
        )
      : disabledItems;
  }, [search, disabledItems]);

  // Limit visible list to 5
  const visibleItems = filteredItems.slice(0, 5);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <span className="text-black w-full text-right text-sm">
        آیتم‌های غیر فعال
      </span>

      {/* Search box */}
      <div className="w-full flex flex-row-reverse items-center bg-primary-white shadow-rb rounded-[10px] px-3 py-3">
        <input
          type="text"
          placeholder="جستجو بین آیتم‌های غیرفعال"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent text-black text-right outline-none placeholder:text-gray-500"
        />
        <Search className="text-gray-600" size={18} />
      </div>

      {/* Item list */}
      <div className="flex flex-col w-full gap-4">
        {visibleItems.map((item, index) => (
          <div key={index} className="flex items-center w-full ">
            {/* Action buttons */}
            <div className="w-4/12 flex items-center gap-4 justify-center">
              {/* Disabled delete button */}
              <div className="w-9 h-9 bg-primary-red text-lg rounded-full shadow-rb flex items-center justify-center cursor-not-allowed">
                +
              </div>
              {/* Disabled edit button */}
              <div className="w-9 h-9 bg-gray-200 rounded-full shadow-rb flex items-center justify-center cursor-not-allowed">
                <Pencil color="gray" />
              </div>
            </div>

            {/* Item info */}
            <div className="w-8/12">
              <div className="w-full flex items-center text-black bg-primary-white px-2 shadow-rb py-4 rounded-[10px]">
                <div className="w-4/12 text-center text-gray-500">
                  {item.price}
                </div>
                <div className="w-8/12 text-right text-gray-700">
                  {item.name}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* If nothing matches */}
        {visibleItems.length === 0 && (
          <div className="w-full text-center text-gray-500 text-sm">
            آیتم غیرفعالی پیدا نشد
          </div>
        )}
      </div>
    </div>
  );
}

export default DisabledItems;
