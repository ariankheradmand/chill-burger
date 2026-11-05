"use client";

import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import Image from "next/image";
import React, { useState } from "react";
import Menu_items from "@/libs/items";
import { addReminder } from "@/utils/reminderStorage";
import { BookmarkPlus, Bookmark } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function Hero({ setItemChanged }) {
  // Dynamically find burger items from libs
  const burgerCategory = Menu_items.find((cat) => cat[0]?.header === "برگرها");
  const burgerItems = burgerCategory ? burgerCategory.slice(3) : [];

  // State for bookmark animation
  const [activePlus, setActivePlus] = useState({});

  // Map existing images to burger items
  const heroImages = ["/3.png", "/2.png", "/1.png"];

  const getDisplayPrice = (price) => {
    if (typeof price === "object" && price.single) {
      return `${price.single} / ${price.double}`;
    }
    return price;
  };

  const handleAdd = (item, index) => {
    const selectedPrice =
      typeof item.items.price === "object"
        ? item.items.price.single
        : item.items.price;

    addReminder({
      id: item.items.name,
      name: item.items.name,
      price: selectedPrice,
    });
    if (setItemChanged) setItemChanged(true);

    // Toggle plus animation
    setActivePlus((prev) => ({ ...prev, [index]: true }));
    setTimeout(() => {
      setActivePlus((prev) => ({ ...prev, [index]: false }));
    }, 400);
  };

  useGSAP(() => {
    // 100% GPU-accelerated batch entrance for hero boxes
    gsap.fromTo(
      ".hero-box",
      { x: 30, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
        force3D: true,
        scrollTrigger: {
          trigger: ".hero-box",
          start: "top 95%",
          toggleActions: "play none none none",
          once: true,
        },
      }
    );

    // High performance batch entrance for badges
    gsap.fromTo(
      ".hero-badge",
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.2)",
        force3D: true,
        scrollTrigger: {
          trigger: ".hero-badge",
          start: "top 95%",
          toggleActions: "play none none none",
          once: true,
        },
      }
    );
  }, []);

  return (
    <div className="flex-cc gap-6 w-full text-[12px]">
      <div dir="rtl" className="flex items-center justify-start w-11/12 sm:w-90">
        <div className="text-black text-xl z-10 font-bold">
          محبوب ترین برگر ها
        </div>
      </div>
      {burgerItems.slice(0, 3).map((item, index) => (
        <span
          key={index}
          className="hero-box w-11/12 h-38 opacity-0 sm:w-90 relative flex-cc bg-black rounded-[20px] shadow-md overflow-hidden transform-gpu will-change-transform"
        >
          <Image
            className="absolute w-full h-full object-cover"
            width={500}
            height={300}
            alt={item.items.name}
            src={heroImages[index] || "/3.png"}
          />
          <span
            dir="rtl"
            className="absolute top-2 bg-white/40 px-3 left-3 flex-cc text-[14px] font-bold py-1 rounded-[20px] backdrop-blur-[2px]"
          >
            {getDisplayPrice(item.items.price)}
          </span>
          <div className="absolute text-sm flex items-center justify-between bottom-2 w-11/12 h-12 text-white bg-white/40 backdrop-blur-[3px] rounded-[20px]">
            <button
              onClick={(e) => {
                handleAdd(item, index);
                const boxEl = e.currentTarget.closest(".hero-box");
                if (boxEl) {
                  gsap.fromTo(
                    boxEl,
                    { scale: 1 },
                    {
                      scale: 1.03,
                      duration: 0.15,
                      ease: "power1.out",
                      yoyo: true,
                      repeat: 1,
                      force3D: true,
                    }
                  );
                }
              }}
              className="ml-1 px-3 bg-primary-red/70 hover:bg-primary-red/90 rounded-[20px] h-[90%] flex items-center justify-center gap-2 transition-colors select-none"
            >
              {activePlus[index] ? (
                <BookmarkPlus size={16} />
              ) : (
                <Bookmark size={16} />
              )}
              افزودن به یادداشت
            </button>
            <div className="pr-2 text-primary-black font-bold">{item.items.name}</div>
          </div>
        </span>
      ))}

      <div className="h-24 w-11/12 sm:w-90 flex items-center justify-between">
        <div
          className="hero-badge bg-primary-red inner-shadow opacity-0 px-3 py-2 rounded-[8px] text-lg rotate-16 transform-gpu will-change-transform"
        >
          همبرگر های خوشمزه
        </div>
        <div
          dir="rtl"
          className="hero-badge bg-primary-red inner-shadow opacity-0 px-3 py-2 rounded-[8px] text-lg -rotate-16 transform-gpu will-change-transform"
        >
          چیل کنید کولیزا ...
        </div>
      </div>
    </div>
  );
}

export default Hero;
