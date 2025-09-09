"use client";

import { Drumstick, Hamburger, Salad, Soup, BookmarkPlus } from "lucide-react";
import React, { useState } from "react";
import Menu_items from "@/libs/items";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { addReminder } from "@/utils/reminderStorage";

gsap.registerPlugin(ScrollTrigger);

function Items({setItemChanged}) {
  

  const width = () => Math.floor(Math.random() * (90 - 66 + 1) + 66);

  useGSAP(() => {
    if (typeof window === "undefined") return;
    gsap.utils.toArray(".item").forEach((el) => {
      gsap.fromTo(
        el,
        { width: 0, opacity: 0 },
        {
          opacity: 1,
          width: () => width() + "%",
          duration: 1.2,
          ease: "elastic.out",
          scrollTrigger: {
            trigger: el,
            start: "top 95%",
            toggleActions: "restart reverse restart reverse",
          },
        }
      );
    });
  });

  const handleAdd = (food) => {
    addReminder({
      id: food.items.id || food.items.name, // fallback
      name: food.items.name,
      price: food.items.price,
    });
    setItemChanged(true)
  };

  

  return (
    <div className="flex flex-col w-full gap-8 pb-4">
      {Menu_items.map((category, i) => {
        const header = category[0].header;
        const colorScheme = category[1].colorScheme;

        return (
          <div key={i} className="w-full flex-cc">
            {/* دسته‌بندی */}
            <div
              id={i === 0 ? "appetizer" : i === 1 ? "salad" : i === 2 ? "fried" : "burger"}
              className="flex-rc w-full h-24 bg-Secondary-cream/50 relative"
            >
              <button
                className={`px-4 ${
                  i === 1 || i === 3 ? "text-white" : "text-black"
                } py-2 shadow-rb rounded-[10px] -rotate-15 flex-rc gap-2 absolute z-0`}
                style={{ backgroundColor: `var(${colorScheme})` }}
              >
                {i === 0 ? <Soup /> : i === 1 ? <Salad /> : i === 2 ? <Drumstick /> : <Hamburger />}
                {header}
              </button>
            </div>

            {/* آیتم‌ها */}
            <div className="flex flex-col sm:w-90 items-end gap-4 mt-6 w-11/12">
              {category.slice(2).map((food, j) => (
                <div
                  key={j}
                  className={`item opacity-0 relative overflow-hidden flex items-center max-h-[56px] ${
                    i === 1 || i === 3 ? "text-white" : "text-black"
                  } justify-between py-4 px-2 shadow-rb rounded-[10px]`}
                  style={{ backgroundColor: `var(${colorScheme})` }}
                >
                  <div className="flex-rc gap-3 textInItems">
                    <span dir="rtl">{food.items.price}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="textInItems">{food.items.name}</span>
                    <button
                      onClick={() => handleAdd(food)}
                      className="p-1 rounded bg-white/30 hover:bg-white/50"
                      title="Save to reminders"
                    >
                      <BookmarkPlus size={18} />
                    </button>
                  </div>
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
