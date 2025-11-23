"use client";

import {
  AArrowUp,
  ArrowUp,
  Bookmark,
  Drumstick,
  Hamburger,
  Menu,
  Salad,
  Soup,
  CupSoda,
  Utensils,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { getReminders } from "@/utils/reminderStorage";
import Reminder from "./Reminder";

gsap.registerPlugin(ScrollTrigger);

function Buttons({ setItemChanged, itemChanged }) {
  const [items, setItems] = useState(getReminders());
  const [itemsCount, setItemsCount] = useState(0);
  const [reminderOpen, setReminderOpen] = useState(false);

  useGSAP(() => {
    gsap.fromTo(
      ".menub",
      { scale: 1 },
      { scale: 1.05, ease: "sine", repeat: -1, yoyo: true }
    );

    // ArrowUp rotation on scroll
    gsap.to(".arrow-up", {
      rotation: 0,
      scrollTrigger: {
        trigger: "body",
        start: "top -190px",
        end: "top -196px",
        scrub: false,
        toggleActions: "play none none reverse",
      },
    });

    gsap.utils.toArray(".left-arrow").forEach((arrow, i) => {
      ScrollTrigger.create({
        trigger: ".your-container",
        start: "top bottom",
        end: "bottom top",
        onEnter: () => gsap.to(arrow, { rotate: 0, duration: 0.3 }),
        onLeave: () => gsap.to(arrow, { rotate: -40, duration: 0.3 }),
        onEnterBack: () => gsap.to(arrow, { rotate: 0, duration: 0.3 }),
        onLeaveBack: () => gsap.to(arrow, { rotate: 40, duration: 0.3 }),
      });
    });

    gsap.utils.toArray(".right-arrow").forEach((arrow, i) => {
      ScrollTrigger.create({
        trigger: ".your-container",
        start: "top bottom",
        end: "bottom top",
        onEnter: () => gsap.to(arrow, { rotate: 0, duration: 0.3 }),
        onLeave: () => gsap.to(arrow, { rotate: 40, duration: 0.3 }),
        onEnterBack: () => gsap.to(arrow, { rotate: 0, duration: 0.3 }),
        onLeaveBack: () => gsap.to(arrow, { rotate: -40, duration: 0.3 }),
      });
    });

    gsap.utils.toArray("#right-b").forEach((box) => {
      gsap.fromTo(
        box,
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: box,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        }
      );
    });
    gsap.utils.toArray("#left-b").forEach((box) => {
      gsap.fromTo(
        box,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: box,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // Hanging Sign Animation
    gsap.utils.toArray(".hanging-sign").forEach((sign, i) => {
      gsap.fromTo(
        sign,
        { y: -100, rotation: i === 0 ? 10 : -10, opacity: 0 },
        {
          y: -5,
          rotation: 0,
          opacity: 1,
          duration: 2,
          ease: "elastic.out(1, 0.3)",
          scrollTrigger: {
            trigger: sign,
            start: "top 80%",
          },
        }
      );

      // Continuous gentle sway
      gsap.to(sign, {
        rotation: i === 0 ? 5 : -5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2,
      });
    });
  });

  const scrollToItems = (id) => {
    if (typeof window !== "undefined") {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const scrollToItemsSection = () => {
    if (typeof window !== "undefined") {
      const itemsContainer = document.getElementById("items-container");
      if (itemsContainer) {
        itemsContainer.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const calculateCount = (list) => {
    return list.reduce((sum, item) => sum + (item.quantity || 1), 0);
  };

  useEffect(() => {
    setItems(getReminders());
    setItemsCount(calculateCount(getReminders()));
    setItemChanged(false);
  }, [itemChanged]);

  useEffect(() => {
    const check = getReminders() || [];
    if (check.length) {
      gsap.fromTo(".reminder", { scale: 0.8 }, { scale: 1 });
    }
  }, [itemChanged]);

  return (
    <div id="items-container" className="text-black w-full flex-cc">
      <Reminder
        setItemChanged={setItemChanged}
        reminderOpen={reminderOpen}
        setReminderOpen={setReminderOpen}
      />
      {/* Menu Button */}
      <span className="fixed w-fit flex-rc bottom-7 z-160 menub">
        <button
          onClick={scrollToItemsSection}
          className="bg-primary-white px-5 gap-3 rounded-[20px] py-3 flex-rc shadow-rb "
        >
          <div className="flex-cc gap-[3]">
            <div className="flex-rc">
              <div className="w-[10] h-[2px] rotate-40 bg-primary-black left-arrow"></div>
              <div className="w-[10] h-[2px] -rotate-40 bg-primary-black right-arrow"></div>
            </div>
            <div className="flex-rc">
              <div className="w-[10] h-[2px] rotate-40 bg-primary-black left-arrow"></div>
              <div className="w-[10] h-[2px] -rotate-40 bg-primary-black right-arrow"></div>
            </div>
            <div className="flex-rc">
              <div className=" w-[10] h-[2px] rotate-40 bg-primary-black left-arrow"></div>
              <div className=" w-[10] h-[2px] -rotate-40 bg-primary-black right-arrow"></div>
            </div>
          </div>
          <span>منو</span>
        </button>
      </span>
      {items?.length === 0 ? (
        ""
      ) : (
        <span className="fixed w-11/12 flex items-center justify-end  bottom-7 z-150 ">
          <button
            onClick={() => setReminderOpen((prev) => !prev)}
            className="bg-primary-white size-[48px] px-2 py-2 rounded-[10px] shadow-rb relative flex-cc scale-0 reminder"
          >
            <Bookmark />
            <span className=" absolute -top-5 bg-primary-black text-primary-white w-6 h-6 rounded-full ">
              {itemsCount}
            </span>
          </button>
        </span>
      )}
      {/* Items Container */}
      <div className="flex-cc gap-2 w-11/12 sm:w-90 your-container pt-4 ">
        <div className="flex items-center justify-between gap-2 w-full">
          <button
            onClick={() => scrollToItems("burger")}
            id="left-b"
            className="w-[100%] text-lg text-white bg-primary-red py-4 shadow-rb rounded-[10px] flex-rc gap-2"
          >
            <Hamburger />
            برگر ها
          </button>
        </div>

        <div className="flex items-center justify-between gap-2 w-full">
          <button
            onClick={() => scrollToItems("appetizer")}
            id="left-b"
            className="w-[45%] text-lg bg-primary-white text-black py-3 shadow-rb rounded-[10px] flex-rc gap-2"
          >
            <Soup />
            پیش غذا
          </button>
          <button
            onClick={() => scrollToItems("salad")}
            id="right-b"
            className="w-[45%] text-lg opacity-0 bg-Secondary-lightblue text-white py-3 shadow-rb rounded-[10px] flex-rc gap-2"
          >
            <Salad />
            سالاد ها
          </button>
        </div>
        <div className="flex items-center justify-between gap-2 w-full">
          <button
            onClick={() => scrollToItems("drink")}
            id="left-b"
            className="w-[45%] text-lg bg-primary-black text-white py-3 shadow-rb rounded-[10px] flex-rc gap-2"
          >
            <CupSoda />
            نوشیدنی ها
          </button>
          <button
            onClick={() => scrollToItems("topping")}
            id="right-b"
            className="w-[45%] text-lg opacity-0 bg-Secondary-gold text-black py-3 shadow-rb rounded-[10px] flex-rc gap-2"
          >
            <Utensils />
            تاپینگ ها
          </button>
        </div>

        <div dir="rtl" className="w-full h-38 relative text-primary-red z-5 ">
          {/* Right Sign (RTL Start) */}
          <div className="hanging-sign absolute right-4 top-0 flex flex-col items-center origin-top">
            <div className="h-24 w-px border-l-2 border-primary-black border-dotted"></div>
            <div className="relative -mt-1">
              <div className="size-3 bg-primary-black rounded-full absolute left-1/2  -translate-x-1/2 -top-1 z-10"></div>
              <div className="bg-primary-white px-4 py-3 rounded-[10px] shadow-rbv2 -rotate-20">
                همبرگر های خوشمزه
              </div>
            </div>
          </div>

          {/* Left Sign (RTL End) */}
          <div className="hanging-sign absolute left-4 top-0 flex flex-col items-center origin-top">
            <div className="h-20 w-px border-l-2 border-primary-black border-dotted"></div>
            <div className="relative -mt-1">
              <div className="size-3 bg-primary-black rounded-full absolute left-1/2 -translate-x-1/2 -top-1 z-10"></div>
              <div className="bg-primary-white px-4 py-3 rounded-[10px] shadow-rb rotate-20">
                یه bite بزن chill شو
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Buttons;
