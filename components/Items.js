"use client";

import {
  Drumstick,
  Hamburger,
  Salad,
  Soup,
  BookmarkPlus,
  Bookmark,
} from "lucide-react";
import React, { useState } from "react";
import Menu_items from "@/libs/items";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { addReminder } from "@/utils/reminderStorage";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

function Items({ setItemChanged }) {
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
    setItemChanged(true);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-8 pb-4">
      {Menu_items.map((category, i) => {
        const header = category[0].header;
        const imgsrc = category[1].imgsrc;
        const colorScheme = category[2].colorScheme;

        return (
          <div key={i} className="w-full flex-cc sm:w-90">
            {/* دسته‌بندی */}
            <div
              id={
                i === 0
                  ? "appetizer"
                  : i === 1
                  ? "salad"
                  : i === 2
                  ? "fried"
                  : "burger"
              }
              className="flex-rc w-full  h-24 relative overflow-hidden"
            >
              <div className=" absolute w-full h-full flex-cc ">
                <Image
                  alt={
                    i === 0
                      ? "appetizer"
                      : i === 1
                      ? "salad"
                      : i === 2
                      ? "fried"
                      : "burger"
                  }
                  width={600}
                  height={600}
                  src={imgsrc}
                />
              </div>
              {/* overlay for readability */}
              <div className="absolute  inset-0 bg-gradient-to-b from-70% to-black" />

              <button
                className={`px-4 text-xl text-white py-2 rounded-[10px] translate-y-4 bg-white/1 backdrop-blur-[2px]  flex  items-center justify-center gap-2 relative z-10`}
              >
                {i === 0 ? (
                  <Soup />
                ) : i === 1 ? (
                  <Salad />
                ) : i === 2 ? (
                  <Drumstick />
                ) : (
                  <Hamburger />
                )}
                {header}
              </button>
            </div>

            {/* آیتم‌ها */}
            <div className="flex flex-col  items-end gap-4 mt-6 w-11/12">
              {category.slice(3).map((food, j) => (
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
                      className="p-1  bg-white/30 hover:bg-white/50 shadow-sm shadow-black/20 border-b-2 border-black"
                      title="Save to reminders"
                    >
                      <Bookmark size={18} />
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
