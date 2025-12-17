"use client";

import {
  Drumstick,
  Hamburger,
  Salad,
  Soup,
  BookmarkPlus,
  Bookmark,
  BadgeQuestionMark,
  CirclePlus,
  Check,
  CupSoda,
  Utensils,
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import Menu_items from "@/libs/items";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { addReminder } from "@/utils/reminderStorage";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

function Items({ setItemChanged }) {
  const width = () => Math.floor(Math.random() * (100 - 100 + 1) + 100);
  const [activePlus, setActivePlus] = useState({});
  const [openItem, setOpenItem] = useState(null); // برای نگه داشتن آیتم باز شده
  const containerRef = useRef(null);

  useGSAP(() => {
    if (typeof window === "undefined") return;
    gsap.utils.toArray(".item").forEach((el) => {
      const textAndSvgs = el.querySelectorAll(".textInItems, svg");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 95%",
          toggleActions: "play none none none",
        },
      });

      // Animate the container first
      tl.fromTo(
        el,
        { width: 0, opacity: 0 },
        {
          opacity: 1,
          width: () => width() + "%",
          duration: 0.6,
          ease: "sine",
        }
      );

      // Then animate text and SVGs after 80% of the container animation
      tl.fromTo(
        textAndSvgs,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.05,
          ease: "sine",
        },
        0.48 // Start at 80% of the container animation (0.6 * 0.8 = 0.48)
      );
      const image = el.querySelector(".items-image");
      if (image) {
        tl.fromTo(
          image,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.3,
            ease: "sine",
          },
          "<="
        );
      }
    });
  });

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target)) {
        setOpenItem(null);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  const handleAdd = (food, key) => {
    addReminder({
      id: food.items.id || food.items.name,
      name: food.items.name,
      price: food.items.price,
    });
    setItemChanged(true);
    setActivePlus((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => setActivePlus((prev) => ({ ...prev, [key]: false })), 400);
  };

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center w-full gap-8 pb-4"
    >
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
                  ? "burger"
                  : i === 1
                    ? "appetizer"
                    : i === 2
                      ? "salad"
                      : i === 3
                        ? "drink"
                        : i === 4
                          ? "topping"
                          : "default value"
              }
              className="flex-rc w-full h-24 relative overflow-hidden"
            >
              <div className="absolute w-full h-full flex-cc">
                <Image alt={header} width={600} height={600} src={imgsrc} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-50% to-black" />
              <button className="px-4 text-xl text-white py-2 rounded-[10px] translate-y-6  flex items-center justify-center gap-2 relative z-10">
                {i === 0 ? <Hamburger /> : i === 1 ? <Soup /> : i === 2 ? <Salad /> : i === 3 ? <CupSoda /> : <Utensils />}
                {header}
              </button>
            </div>

            {/* آیتم‌ها */}
            <div className="flex flex-col items-end gap-4 mt-6 w-11/12">
              {category.slice(3).map((food, j) => {
                const key = `${i}-${j}`;

                return (
                  <div
                    key={j}
                    className={`item opacity-0 relative flex ${food.items.picture ? "min-h-[238px] max-h-[238px]" : "min-h-[40px] max-h-[56px]"} flex-col items-center  ${i === 0 || i === 3 ? "text-white" : "text-black"
                      } justify-between py-4  shadow-rb rounded-[10px]`}
                    style={{ backgroundColor: `var(${colorScheme})` }}
                    onClick={(e) => {
                      e.stopPropagation(); // جلوگیری از بستن موقع کلیک روی خودش
                      setOpenItem((prev) => (prev === key ? null : key));
                    }}
                  >

                    {openItem === key && (
                      <div
                        className={`absolute ${food.items.picture ? "top-[98%]" : "top-[90%]"}  w-3/4 right-1/8 shadow-rb rounded-b-[10px] z-50 overflow-hidden`}
                        style={{
                          backgroundColor: `var(${colorScheme})`,
                        }}
                        ref={(el) => {
                          if (el) {
                            const spans = el.querySelectorAll("span");

                            // Hide all child text before animation
                            gsap.set(spans, { opacity: 0 });

                            // Animate container first
                            gsap.fromTo(
                              el,
                              { y: -50, height: 0, opacity: 0 },
                              {
                                y: 0,
                                height: "auto",
                                opacity: 1,
                                duration: 0.4,
                                ease: "sine",
                                onComplete: () => {
                                  // Then fade in texts with stagger
                                  gsap.to(spans, {
                                    opacity: 1,
                                    y: 0,
                                    duration: 0.4,
                                    stagger: 0.07,
                                    ease: "sine",
                                  });
                                },
                              }
                            );
                          }
                        }}
                      >
                        <div className="flex items-end text-sm justify-center flex-col w-full h-full p-2 gap-2">
                          <div
                            dir="rtl"
                            className="flex flex-col gap-1 items-start justify-center"
                          >
                            <span className="underline underline-offset-6 text-base">
                              مزه
                            </span>
                            <span>{food.items.taste}</span>
                          </div>
                        </div>

                        <div className="flex items-end text-sm justify-center flex-col w-full h-full p-2 gap-2">
                          <div
                            dir="rtl"
                            className="flex flex-col gap-1 items-start justify-center"
                          >
                            <span className="underline underline-offset-6 text-base">
                              ترکیبات
                            </span>
                            <span>{food.items.ingredients.join("، ")}</span>
                          </div>
                        </div>

                        {food.items.allergyWarning ? <div className="flex items-end text-sm justify-center flex-col w-full h-full p-2 gap-2 text-primary-red">
                          <div
                            dir="rtl"
                            className="flex flex-col w-full gap-1 items-start justify-center bg-primary-white shadow-md p-1 rounded-[10px]"
                          >
                            <span className="underline underline-offset-6 text-base">
                              حساسیت‌ها
                            </span>
                            <span>{food.items.allergyWarning}</span>
                          </div>
                        </div> : ""}

                      </div>
                    )}

                    {food.items.picture && (
                      <div className="w-full h-full flex-cc px-1 ">
                        <div className="items-image w-full h-full opacity-0 relative flex-cc bg-Secondary-cream -translate-y-3 rounded-t-[7px] min-h-full">

                          <img
                            src={food.items.picture}
                            alt={food.items.name}
                            width={200}
                            height={200}
                            className="min-h-[150px] min-w-[150px] object-cover z-50 translate-y-4 items-image-shadow"
                          />
                          <div className="absolute inset-0 overflow-hidden rounded-t-[10px]">
                            <Image src={'/background-texture.svg'} alt="background texture" width={3000} height={3000} className="opacity-70 absolute w-full h-full  object-cover" />

                          </div>

                        </div>
                      </div>
                    )}

                    <div className="w-full h-full flex items-center justify-between px-2">

                      <div className="flex-rc gap-3 textInItems ">
                        <span dir="rtl">{food.items.price}</span>
                        <BadgeQuestionMark
                        className="animate-pulse"
                          style={{ backgroundColor: `var(${colorScheme})` }}
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="textInItems">{food.items.name}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAdd(food, key);
                          }}
                          className="p-1 textInItems bg-white/30 relative flex-rc hover:bg-white/50 shadow-md shadow-black/40  rounded-[20px]"
                          title="Save to reminders"
                        >
                          {activePlus[key] ? (
                            <Check size={18} />
                          ) : (
                            <CirclePlus size={18} />
                          )}

                          {activePlus[key] ? (
                            <div
                              ref={(el) => {
                                if (el) {
                                  gsap.set(el, { y: -5, opacity: 1 });

                                  gsap.to(el, {
                                    y: -30,
                                    opacity: 0,
                                    duration: 1,
                                    ease: "sine",
                                  });
                                }
                              }}
                              className={`absolute text-lg font-thin     select-none ${i === 3 ? "text-white" : "text-black"
                                }`}
                            >
                              +
                            </div>
                          ) : (
                            ""
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Items;
