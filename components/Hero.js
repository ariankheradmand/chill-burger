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
  // Get burger items from libs (index 3 is burgers)
  const burgerItems = Menu_items[3].slice(3); // Skip header, imgsrc, colorScheme

  // State for bookmark animation
  const [activePlus, setActivePlus] = useState({});

  // Map existing images to burger items
  const heroImages = ["/3.png", "/2.png", "/1.png"];

  const handleAdd = (item, index) => {
    addReminder({
      id: item.items.name,
      name: item.items.name,
      price: item.items.price,
    });
    if (setItemChanged) setItemChanged(true);

    // Toggle plus animation
    setActivePlus((prev) => ({ ...prev, [index]: true }));
    setTimeout(() => {
      setActivePlus((prev) => ({ ...prev, [index]: false }));
    }, 400);
  };

  useGSAP(() => {
    // animate boxes when scrolled into view
    gsap.utils.toArray("#boxes").forEach((box) => {
      gsap.fromTo(
        box,
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: box,
            start: "top 95%", // when top of box hits 80% of viewport
            toggleActions: "play none none none"
          },
        }
      );
    });

    gsap.utils.toArray("#badge").forEach((badge) => {
      gsap.fromTo(
        badge,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: badge,
            start: "top 95%",
            toggleActions: "play none none none"
          },
        }
      );
    });
  }, []);

  return (
    <div className=" flex-cc gap-6 w-full text-[12px]">
      <div dir="rtl" className="flex items-center justify-start w-11/12 sm:w-90">
        <div className="text-black text-xl z-10">
          محبوب ترین برگر ها

        </div>
      </div>
      {burgerItems.slice(0, 3).map((item, index) => (
        <span
          key={index}
          id="boxes"
          className="w-11/12 h-38  opacity-0 sm:w-90 relative  flex-cc bg-black rounded-[20px] shadow-md overflow-hidden"
        >
          <Image
            className="absolute w-full h-full "
            width={500}
            height={300}
            alt={item.items.name}
            src={heroImages[index]}
          />
          <span
            dir="rtl"
            className="absolute top-2 bg-white/40 px-3 left-3 flex-cc text-[16px] py-1 rounded-[20px]"
          >
            {item.items.price}
          </span>
          <div className="absolute text-sm flex items-center justify-between bottom-2 w-11/12 h-12 text-white bg-white/40 backdrop-blur-[3px] rounded-[20px]">
            <button
              onClick={(e) => {
                handleAdd(item, index);
                const boxEl = e.currentTarget.closest("#boxes");
                if (boxEl) {
                  gsap.fromTo(
                    boxEl,
                    { scale: 1, 
                    },
                    {
                      scale: 1.05,
                      duration: 0.15,
                      ease: "power1.out",
                      yoyo: true,
                      repeat: 1,
                    }
                  );
                }
              }}
              className="ml-1 px-3 bg-primary-red/58 hover:bg-primary-red/70 rounded-[20px] h-[90%] flex items-center justify-center gap-2 transition-colors"
            >
              {activePlus[index] ? (
                <BookmarkPlus size={16} />
              ) : (
                <Bookmark size={16} />
              )}
              افزودن به یادداشت
            </button>
            <div className="pr-2 text-primary-black">{item.items.name}</div>
          </div>
        </span>
      ))}

      <div className="h-36 w-11/12  sm:w-90 flex items-center justify-between ">
        <div
          id="badge"
          className="bg-primary-red inner-shadow opacity-0 px-3 py-2 rounded-[8px] text-lg inner-shadow  rotate-16"
        >
          همبرگر های خوشمزه
        </div>
        <div
          id="badge"
          dir="rtl"
          className="bg-primary-red inner-shadow opacity-0 px-3 py-2 rounded-[8px] text-lg inner-shadow  -rotate-16"
        >
          چیل کنید کولیزا ...
        </div>
      </div>
    </div>
  );
}

export default Hero;