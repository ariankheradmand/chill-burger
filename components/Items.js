"use client"

import { Bookmark, Soup } from "lucide-react";
import React from "react";
import Menu_items from "@/libs/items";
import { useGSAP } from "@gsap/react";
import gsap, { random } from "gsap";

function Items() {

    useGSAP(() => {
     gsap.fromTo("#items" , {width: "0%"} , {width: random()})
    })
  return (
    <div className="flex flex-col w-full gap-8">
      {Menu_items.map((category, i) => {
        const header = category[0].header;
        const colorScheme = category[1].colorScheme;

        return (
          <div key={i} className="w-full flex-cc">
            {/* دسته‌بندی */}
            <div className="flex-rc w-full h-24 bg-Secondary-cream/50 relative">
              <button
                className={`px-4  ${
                  i === 1 || i === 3 ? "text-white" : "text-black"
                } py-2 shadow-rb rounded-[10px] -rotate-15 flex-rc gap-2 absolute z-0`}
                style={{ backgroundColor: `var(${colorScheme})` }}
              >
                <Soup />
                {header}
              </button>
            </div>

            {/* آیتم‌ها */}
            <div className="flex flex-col items-end gap-4 mt-6 w-11/12">
              {category.slice(2).map((food, j) => (
                <div
                  key={j}
                  id="items"
                  className={`flex items-center ${
                    i === 1 || i === 3 ? "text-white" : "text-black"
                  } justify-between  py-4 px-2 text-black shadow-rb rounded-[10px]`}
                  style={{
                    backgroundColor: `var(${colorScheme})`,
                    width: `${Math.floor(Math.random() * (90 - 66 + 1) + 66)}%`,
                  }}
                >
                  <div className="flex-rc gap-3">
                    <Bookmark />
                    <span dir="rtl">{food.items.price}</span>
                  </div>
                  <span>{food.items.name}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Items;
