"use client";

import {
  Hamburger,
  Salad,
  Soup,
  Bookmark,
  BadgeQuestionMark,
  Check,
  CupSoda,
  Utensils,
  Plus,
  Flame,
  Drumstick,
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
  const [openItem, setOpenItem] = useState(null);
  const [priceMode, setPriceMode] = useState("single"); // "single" or "double"
  const containerRef = useRef(null);
  const toggleRef = useRef(null);

  // Map category index to section IDs
  const sectionIds = [
    "burger",
    "combo",
    "tortilla",
    "appetizer",
    "drink",
    "topping",
    "extras",
  ];

  useGSAP(() => {
    if (typeof window === "undefined") return;
    gsap.utils.toArray(".item").forEach((el) => {
      const textAndSvgs = el.querySelectorAll(".textInItems, svg");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 95%",
          toggleActions: "restart reverse restart reverse",
        },
      });

      tl.fromTo(
        el,
        { width: 0, opacity: 0 },
        {
          opacity: 1,
          width: () => width() + "%",
          duration: 0.6,
          ease: "sine",
        },
      );

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
        0.48,
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
          "<=",
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

  // Animate toggle slider
  useEffect(() => {
    if (toggleRef.current) {
      const slider = toggleRef.current.querySelector(".toggle-slider");
      if (slider) {
        gsap.to(slider, {
          x: priceMode === "single" ? 0 : "-100%",
          duration: 0.35,
          ease: "power2.out",
        });
      }
    }
    // Animate price tags
    gsap.utils.toArray(".price-single").forEach((el) => {
      gsap.to(el, {
        scale: priceMode === "single" ? 1 : 0.85,
        opacity: priceMode === "single" ? 1 : 0.5,
        duration: 0.3,
        ease: "power2.out",
      });
    });
    gsap.utils.toArray(".price-double").forEach((el) => {
      gsap.to(el, {
        scale: priceMode === "double" ? 1 : 0.85,
        opacity: priceMode === "double" ? 1 : 0.5,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  }, [priceMode]);

  const handleAdd = (food, key) => {
    const isDual = hasDualPrice(food.items.price);
    const selectedPrice = isDual
      ? priceMode === "double"
        ? food.items.price.double
        : food.items.price.single
      : food.items.price;
    const typeLabel = isDual
      ? priceMode === "double"
        ? "دوبل"
        : "سینگل"
      : null;

    addReminder({
      id: isDual
        ? `${food.items.name}-${priceMode}`
        : food.items.id || food.items.name,
      name: food.items.name,
      price: selectedPrice,
      type: typeLabel,
    });
    setItemChanged(true);
    setActivePlus((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => setActivePlus((prev) => ({ ...prev, [key]: false })), 400);
  };

  // Check if price is an object with single/double
  const hasDualPrice = (price) => {
    return typeof price === "object" && price.single && price.double;
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

        // Check if this category has dual pricing (burgers)
        const categoryHasDualPrice = category
          .slice(3)
          .some((food) => hasDualPrice(food.items.price));

        return (
          <div key={i} className="w-full flex-cc sm:w-90">
            {/* دسته‌بندی */}
            <div
              id={sectionIds[i] || `section-${i}`}
              className="flex-rc w-full h-24 relative overflow-hidden"
            >
              <div className="absolute w-full h-full flex-cc">
                <Image alt={header} width={600} height={600} src={imgsrc} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-50% to-black" />
              <button className="px-4 text-xl text-white py-2 rounded-[10px] translate-y-6 flex items-center justify-center gap-2 relative z-10">
                {header === "برگرها" ? (
                  <Hamburger />
                ) : header === "کومبو" ? (
                  <Drumstick />
                ) : header === "ترتیلا" ? (
                  <Flame />
                ) : header === "پیش‌غذاها" ? (
                  <Soup />
                ) : header === "نوشیدنی ها" ? (
                  <CupSoda />
                ) : header === "تاپینگ ها" ? (
                  <Utensils />
                ) : (
                  <Plus />
                )}
                {header}
              </button>
            </div>

            {/* Premium Toggle for dual-price categories */}
            {categoryHasDualPrice && (
              <div className="w-11/12 mt-5 mb-1 z-10 flex-cc gap-3">
                {/* Title */}
                <h3 className="text-center text-primary-dark text-base font-bold">
                  نوع برگرت رو انتخاب کن:
                </h3>

                {/* Toggle Switch */}
                <div
                  ref={toggleRef}
                  className="relative flex items-center w-[280px] h-[52px] bg-primary-dark rounded-full p-1 shadow-rb cursor-pointer select-none"
                  dir="rtl"
                >
                  {/* Sliding Pill */}
                  <div
                    className="toggle-slider absolute w-[calc(50%-4px)] h-[calc(100%-8px)] bg-primary-red rounded-full shadow-lg"
                    style={{ top: "4px", right: "4px" }}
                  />

                  {/* Single Option */}
                  <button
                    onClick={() => setPriceMode("single")}
                    className="relative z-10 flex-1 flex-rc gap-2 h-full transition-colors duration-300"
                  >
                    <div className="flex-cc">
                      <span
                        className={`text-sm font-bold ${priceMode === "single" ? "text-white" : "text-white/50"} transition-all duration-300`}
                      >
                        سینگل
                      </span>
                      <span
                        className={`text-[11px] ${priceMode === "single" ? "text-white/90" : "text-white/30"} transition-all duration-300`}
                      >
                        70gr
                      </span>
                    </div>
                    <div
                      className={`flex flex-col items-center gap-[2px] ${priceMode === "single" ? "opacity-100" : "opacity-30"} transition-all duration-300`}
                    >
                      <div className="w-5 h-[3px] bg-white rounded-full" />
                    </div>
                  </button>

                  {/* Double Option */}
                  <button
                    onClick={() => setPriceMode("double")}
                    className="relative z-10 flex-1 flex-rc gap-2 h-full transition-colors duration-300"
                  >
                    <div className="flex-cc">
                      <span
                        className={`text-sm font-bold ${priceMode === "double" ? "text-white" : "text-white/50"} transition-all duration-300`}
                      >
                        دوبل
                      </span>
                      <span
                        className={`text-[11px] ${priceMode === "double" ? "text-white/90" : "text-white/30"} transition-all duration-300`}
                      >
                        140gr
                      </span>
                    </div>
                    <div
                      className={`flex flex-col items-center gap-[2px] ${priceMode === "double" ? "opacity-100" : "opacity-30"} transition-all duration-300`}
                    >
                      <div className="w-5 h-[3px] bg-white rounded-full" />
                      <div className="w-5 h-[3px] bg-white rounded-full" />
                    </div>
                  </button>
                </div>

                {/* Weight indicator dots */}
                <div className="flex items-center gap-2 mt-1">
                  <div
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${priceMode === "double" ? "bg-primary-red scale-125" : "bg-primary-dark/30"}`}
                  />
                  <div
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${priceMode === "single" ? "bg-primary-red scale-125" : "bg-primary-dark/30"}`}
                  />
                </div>
              </div>
            )}

            {/* آیتم‌ها */}
            <div className="flex flex-col items-end gap-4 mt-6 w-11/12">
              {category.slice(3).map((food, j) => {
                const key = `${i}-${j}`;
                const isDualPrice = hasDualPrice(food.items.price);

                return (
                  <div
                    key={j}
                    className={`item opacity-0 relative flex ${food.items.picture ? "min-h-[238px] max-h-[238px]" : "min-h-[40px] max-h-[56px]"} flex-col items-center  ${
                      colorScheme === "--color-primary-red" || colorScheme === "--color-primary-black" ? "text-white" : "text-black"
                    } justify-between py-4  shadow-rb rounded-[10px]`}
                    style={{ backgroundColor: `var(${colorScheme})` }}
                    onClick={(e) => {
                      e.stopPropagation();
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
                            gsap.set(spans, { opacity: 0 });
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
                                  gsap.to(spans, {
                                    opacity: 1,
                                    y: 0,
                                    duration: 0.4,
                                    stagger: 0.07,
                                    ease: "sine",
                                  });
                                },
                              },
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

                        {food.items.allergyWarning ? (
                          <div className="flex items-end text-sm justify-center flex-col w-full h-full p-2 gap-2 text-primary-red">
                            <div
                              dir="rtl"
                              className="flex flex-col w-full gap-1 items-start justify-center bg-primary-white shadow-md p-1 rounded-[10px]"
                            >
                              <span className="underline underline-offset-6 text-base">
                                حساسیت‌ها
                              </span>
                              <span>{food.items.allergyWarning}</span>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    )}

                    {food.items.picture && (
                      <div className="w-full h-full flex-cc px-1 ">
                        <div className="items-image w-full h-full opacity-0 relative flex-cc bg-Secondary-cream -translate-y-3 rounded-t-[7px] min-h-full">
                          {food.items.badge && (
                            <div
                              className="absolute top-2 right-2 bg-primary-red text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md z-60 flex items-center gap-1 select-none"
                              dir="rtl"
                            >
                              <span>{food.items.badge}</span>
                            </div>
                          )}
                          <img
                            src={food.items.picture}
                            alt={food.items.name}
                            width={200}
                            height={200}
                            className="min-h-[150px] min-w-[150px] object-cover z-50 translate-y-4 items-image-shadow"
                          />
                          <div className="absolute inset-0 overflow-hidden rounded-t-[10px]">
                            <Image
                              src={"/background-texture.svg"}
                              alt="background texture"
                              width={500}
                              height={500}
                              className="opacity-70 absolute w-full h-full  object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="w-full h-full flex items-center justify-between px-2">
                      {/* Price Display */}
                      <div className="flex-rc gap-2 textInItems">
                        {isDualPrice ? (
                          <div className="flex items-center gap-2" dir="rtl">
                            {/* Single Price Tag */}
                            <div
                              className={`price-single flex items-center gap-1 px-2 py-[2px] rounded-full ${
                                priceMode === "single"
                                  ? "bg-white/25 shadow-md"
                                  : "bg-white/10"
                              } transition-all duration-300`}
                            >
                              <div className="flex flex-col items-center gap-[1px]">
                                <div className="w-[10px] h-[2px] bg-current rounded-full" />
                              </div>
                              <span className="text-[13px]">
                                {food.items.price.single}
                              </span>
                            </div>

                            {/* Double Price Tag */}
                            <div
                              className={`price-double flex items-center gap-1 px-2 py-[2px] rounded-full ${
                                priceMode === "double"
                                  ? "bg-white/25 shadow-md"
                                  : "bg-white/10"
                              } transition-all duration-300`}
                            >
                              <div className="flex flex-col items-center gap-[1px]">
                                <div className="w-[10px] h-[2px] bg-current rounded-full" />
                                <div className="w-[10px] h-[2px] bg-current rounded-full" />
                              </div>
                              <span className="text-[13px]">
                                {food.items.price.double}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <span dir="rtl">{food.items.price}</span>
                        )}
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
                            <Bookmark size={18} />
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
                              className={`absolute text-lg font-thin     select-none ${
                                colorScheme === "--color-primary-red" || colorScheme === "--color-primary-black" ? "text-white" : "text-black"
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
