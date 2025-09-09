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
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { getReminders } from "@/utils/reminderStorage";

gsap.registerPlugin(ScrollTrigger);

function Buttons({ setItemChanged, itemChanged }) {
  const [items, setItems] = useState(getReminders());
  const [itemsCount, setItemsCount] = useState(0);

  useGSAP(() => {
    gsap.fromTo(
      ".menub",
      { scale: 1 },
      { scale: 1.05, repeat: -1, yoyo: true }
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
            toggleActions: "restart reverse restart reverse",
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
            toggleActions: "restart reverse restart reverse",
          },
        }
      );
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
    console.log(getReminders());
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
      {/* Menu Button */}
      <span className="fixed w-full flex-rc left-0 bottom-3 z-50 menub">
        <button
          onClick={scrollToItemsSection}
          className="bg-primary-white px-5 gap-1 rounded-[20px] py-3 flex-cc shadow-rb "
        >
          <ArrowUp className="border rounded-md mx-1 arrow-up rotate-180" />
          <span>منیو</span>
        </button>
      </span>
      {items?.length === 0 ? (
        ""
      ) : (
        <span className="fixed w-11/12 flex items-center justify-end  bottom-3 z-50 ">
          <button className="bg-primary-white px-2 py-2 rounded-[10px] shadow-rb relative flex-cc scale-0 reminder">
            <Bookmark />
            <span className=" absolute -top-5 bg-primary-black text-primary-white w-6 h-6 rounded-full ">
              {itemsCount}
            </span>
          </button>
        </span>
      )}

      {/* Items Container */}
      <div className="flex-cc gap-2 w-11/12 sm:w-90 mt-10">
        <div className="flex items-center justify-between gap-2 w-full">
          <button
            onClick={() => scrollToItems("burger")}
            id="left-b"
            className="w-[45%] text-lg text-white bg-primary-red py-3 shadow-rb rounded-[10px] flex-rc gap-2"
          >
            <Hamburger />
            برگر ها
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
            onClick={() => scrollToItems("appetizer")}
            id="left-b"
            className="w-[45%] text-lg bg-primary-white text-black py-3 shadow-rb rounded-[10px] flex-rc gap-2"
          >
            <Soup />
            پیش غذا
          </button>
          <button
            onClick={() => scrollToItems("fried")}
            id="right-b"
            className="w-[45%] text-lg opacity-0 bg-Secondary-gold py-3 shadow-rb rounded-[10px] flex-rc gap-2"
          >
            <Drumstick />
            سوخاری
          </button>
        </div>
      </div>
    </div>
  );
}

export default Buttons;
