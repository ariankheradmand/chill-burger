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
  Plus,
  Flame,
} from "lucide-react";
import React, { useEffect, useState, useMemo } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { getReminders } from "@/utils/reminderStorage";
import Reminder from "./Reminder";

gsap.registerPlugin(ScrollTrigger);

function Buttons({ setItemChanged, itemChanged }) {
  const [items, setItems] = useState([]);
  const [itemsCount, setItemsCount] = useState(0);
  const [reminderOpen, setReminderOpen] = useState(false);

  useEffect(() => {
    const rems = getReminders() || [];
    setItems(rems);
    setItemsCount(rems.reduce((sum, item) => sum + (item.quantity || 1), 0));
    if (setItemChanged) setItemChanged(false);
  }, [itemChanged, setItemChanged]);

  useEffect(() => {
    const check = getReminders() || [];
    if (check.length) {
      gsap.fromTo(
        ".reminder",
        { scale: 0.8 },
        { scale: 1, duration: 0.3, ease: "back.out(2)", force3D: true }
      );
    }
  }, [itemChanged]);

  useGSAP(() => {
    // 100% GPU pulse on floating menu button
    gsap.fromTo(
      ".menub",
      { scale: 1 },
      {
        scale: 1.05,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        force3D: true,
      }
    );

    // Arrow indicator state sync via single ScrollTrigger
    ScrollTrigger.create({
      trigger: ".your-container",
      start: "top bottom",
      end: "bottom top",
      onEnter: () =>
        gsap.to(".left-arrow, .right-arrow", {
          rotate: 0,
          duration: 0.3,
          force3D: true,
        }),
      onLeave: () => {
        gsap.to(".left-arrow", { rotate: -40, duration: 0.3, force3D: true });
        gsap.to(".right-arrow", { rotate: 40, duration: 0.3, force3D: true });
      },
      onEnterBack: () =>
        gsap.to(".left-arrow, .right-arrow", {
          rotate: 0,
          duration: 0.3,
          force3D: true,
        }),
      onLeaveBack: () => {
        gsap.to(".left-arrow", { rotate: 40, duration: 0.3, force3D: true });
        gsap.to(".right-arrow", { rotate: -40, duration: 0.3, force3D: true });
      },
    });

    // Batched GPU slide-ins for menu navigation buttons
    gsap.fromTo(
      ".btn-slide-left",
      { x: -30, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: "power2.out",
        force3D: true,
        scrollTrigger: {
          trigger: ".your-container",
          start: "top 95%",
          toggleActions: "play none none none",
          once: true,
        },
      }
    );

    gsap.fromTo(
      ".btn-slide-right",
      { x: 30, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: "power2.out",
        force3D: true,
        scrollTrigger: {
          trigger: ".your-container",
          start: "top 95%",
          toggleActions: "play none none none",
          once: true,
        },
      }
    );

    // High-performance elastic hanging sign entrance & sway
    gsap.fromTo(
      ".hanging-sign",
      { y: -70, opacity: 0 },
      {
        y: -5,
        opacity: 1,
        duration: 1.5,
        stagger: 0.15,
        ease: "elastic.out(1, 0.4)",
        force3D: true,
        scrollTrigger: {
          trigger: ".hanging-sign",
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
      }
    );

    // Continuous sway on GPU layer
    gsap.to(".sign-right", {
      rotation: 4,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      force3D: true,
      delay: 1.5,
    });

    gsap.to(".sign-left", {
      rotation: -4,
      duration: 3.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      force3D: true,
      delay: 1.5,
    });
  }, []);

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

  return (
    <div id="items-container" className="text-black w-full flex-cc">
      <Reminder
        setItemChanged={setItemChanged}
        reminderOpen={reminderOpen}
        setReminderOpen={setReminderOpen}
      />

      {/* Floating Menu Button */}
      <span className="fixed w-fit flex-rc bottom-7 z-160 menub transform-gpu will-change-transform">
        <button
          onClick={scrollToItemsSection}
          className="bg-primary-white px-5 gap-3 rounded-[20px] py-3 flex-rc shadow-rb"
        >
          <div className="flex-cc gap-[3px]">
            <div className="flex-rc">
              <div className="w-[10px] h-[2px] rotate-40 bg-primary-black left-arrow transform-gpu will-change-transform"></div>
              <div className="w-[10px] h-[2px] -rotate-40 bg-primary-black right-arrow transform-gpu will-change-transform"></div>
            </div>
            <div className="flex-rc">
              <div className="w-[10px] h-[2px] rotate-40 bg-primary-black left-arrow transform-gpu will-change-transform"></div>
              <div className="w-[10px] h-[2px] -rotate-40 bg-primary-black right-arrow transform-gpu will-change-transform"></div>
            </div>
            <div className="flex-rc">
              <div className="w-[10px] h-[2px] rotate-40 bg-primary-black left-arrow transform-gpu will-change-transform"></div>
              <div className="w-[10px] h-[2px] -rotate-40 bg-primary-black right-arrow transform-gpu will-change-transform"></div>
            </div>
          </div>
          <span className="font-bold">منو</span>
        </button>
      </span>

      {/* Floating Reminder Trigger */}
      {items?.length > 0 && (
        <span className="fixed w-11/12 flex items-center justify-end bottom-7 z-150">
          <button
            onClick={() => setReminderOpen((prev) => !prev)}
            className="bg-primary-white size-[48px] px-2 py-2 rounded-[10px] shadow-rb relative flex-cc reminder transform-gpu will-change-transform"
          >
            <Bookmark />
            <span className="absolute -top-5 bg-primary-black text-primary-white w-6 h-6 rounded-full flex-cc text-xs font-bold">
              {itemsCount}
            </span>
          </button>
        </span>
      )}

      {/* Navigation Buttons Container */}
      <div className="flex-cc gap-4 w-11/12 sm:w-90 your-container pt-4">
        {/* Row 1: برگر ها - full width */}
        <div className="flex items-center justify-center gap-2 w-full">
          <button
            onClick={() => scrollToItems("burger")}
            className="btn-slide-left w-[65%] text-lg text-white bg-primary-red py-3 shadow-rb rounded-[10px] flex-rc gap-2 opacity-0 transform-gpu will-change-transform"
          >
            <Hamburger />
            برگر ها
          </button>
        </div>

        {/* Row 2: کمبو ها + ترتیلا */}
        <div className="flex items-center justify-between gap-2 w-full">
          <button
            onClick={() => scrollToItems("combo")}
            className="btn-slide-left w-[45%] text-lg bg-primary-white text-black py-3 shadow-rb rounded-[10px] flex-rc gap-2 opacity-0 transform-gpu will-change-transform"
          >
            <Hamburger size={18} />
            <Drumstick size={18} />
            کمبو ها
          </button>
          <button
            onClick={() => scrollToItems("tortilla")}
            className="btn-slide-right w-[45%] text-lg opacity-0 bg-primary-red text-white py-3 shadow-rb rounded-[10px] flex-rc gap-2 transform-gpu will-change-transform"
          >
            <Flame size={18} />
            ترتیلا
          </button>
        </div>

        {/* Row 3: پیش غذا + نوشیدنی ها */}
        <div className="flex items-center justify-between gap-2 w-full">
          <button
            onClick={() => scrollToItems("appetizer")}
            className="btn-slide-left w-[45%] text-lg bg-primary-white text-black py-3 shadow-rb rounded-[10px] flex-rc gap-2 opacity-0 transform-gpu will-change-transform"
          >
            <Soup />
            پیش غذا
          </button>
          <button
            onClick={() => scrollToItems("drink")}
            className="btn-slide-right w-[45%] text-lg opacity-0 bg-primary-black text-white py-3 shadow-rb rounded-[10px] flex-rc gap-2 transform-gpu will-change-transform"
          >
            <CupSoda />
            نوشیدنی ها
          </button>
        </div>

        {/* Row 4: تاپینگ ها + افزودنی ها */}
        <div className="flex items-center justify-between gap-2 w-full">
          <button
            onClick={() => scrollToItems("topping")}
            className="btn-slide-left w-[45%] text-lg bg-Secondary-gold text-black py-3 shadow-rb rounded-[10px] flex-rc gap-2 opacity-0 transform-gpu will-change-transform"
          >
            <Utensils />
            تاپینگ ها
          </button>
          <button
            onClick={() => scrollToItems("extras")}
            className="btn-slide-right w-[45%] text-lg opacity-0 text-white bg-primary-black py-3 shadow-rb rounded-[10px] flex-rc gap-2 transform-gpu will-change-transform"
          >
            <Plus />
            افزودنی ها
          </button>
        </div>

        {/* Hanging Signs */}
        <div dir="rtl" className="w-full h-38 relative text-primary-red z-5">
          {/* Right Sign */}
          <div className="hanging-sign sign-right absolute right-4 top-0 flex flex-col items-center origin-top transform-gpu will-change-transform opacity-0">
            <div className="h-24 w-px border-l-2 border-primary-black border-dotted"></div>
            <div className="relative -mt-1">
              <div className="size-3 bg-primary-black rounded-full absolute left-1/2 -translate-x-1/2 -top-1 z-10"></div>
              <div className="bg-primary-white px-4 py-3 rounded-[10px] shadow-rbv2 -rotate-20">
                همبرگر های خوشمزه
              </div>
            </div>
          </div>

          {/* Left Sign */}
          <div className="hanging-sign sign-left absolute left-4 top-0 flex flex-col items-center origin-top transform-gpu will-change-transform opacity-0">
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
