"use client";

import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import Image from "next/image";
import React from "react";

gsap.registerPlugin(ScrollTrigger);

function Hero() {
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
            toggleActions: "restart reverse restart reverse"
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
            toggleActions: "restart reverse restart reverse"
          },
        }
      );
    });
  }, []);

  return (
    <div className=" flex-cc gap-6 w-full text-[12px]">
    <div dir="rtl" className="flex items-center justify-start w-11/12 sm:w-90">
      <div className="text-black text-xl">
       محبوب ترین برگر ها
      </div>
    </div>
      <span
        id="boxes"
        className="w-11/12 h-38 opacity-0 sm:w-90  relative flex-cc bg-black rounded-[20px] shadow-md overflow-hidden "
      >
        <Image
          className=" absolute w-full h-full "
          width={500}
          height={300}
          src="/3.png"
        />
        <span
          dir="rtl"
          className=" absolute top-2 bg-black/20 left-3 flex-cc text-[16px] px-1 py-1 rounded-[20px] "
        >
          300 ت
        </span>
        <div className="absolute flex  items-center justify-between  bottom-2 w-11/12 h-12 bg-black/30 backdrop-blur-[2px] rounded-[20px]">
          <div className="ml-1 px-3 bg-primary-red/58 rounded-[20px] h-[90%] flex items-center justify-center ">
            افزودن به یادداشت
          </div>
          <div className=" pr-2">اسموکی برگر</div>
        </div>
      </span>

      <span
        id="boxes"
        className="w-11/12 h-38 opacity-0  sm:w-90  relative flex-cc bg-black rounded-[20px] shadow-md overflow-hidden"
      >
        <Image
          className=" absolute w-full h-full "
          width={500}
          height={150}
          src="/2.png"
        />
        <span
          dir="rtl"
          className=" absolute top-2 bg-black/20 left-3 flex-cc text-[16px] px-1 py-1 rounded-[20px] "
        >
          350 ت
        </span>

        <div className="absolute flex  items-center justify-between  bottom-2 w-11/12 h-12 bg-black/30 backdrop-blur-[2px] rounded-[20px]">
          <div className="ml-1 px-3 bg-primary-red/58 rounded-[20px] h-[90%] flex items-center justify-center ">
            افزودن به یادداشت
          </div>
          <div className=" pr-2">چیز برگر</div>
        </div>
      </span>

      <span
        id="boxes"
        className="w-11/12 opacity-0 sm:w-90 h-38 relative flex-cc bg-black rounded-[20px] shadow-md overflow-hidden"
      >
        <Image
          className=" absolute w-full h-full "
          width={500}
          height={150}
          src="/1.png"
        />
        <span
          dir="rtl"
          className=" absolute top-2 bg-black/20 left-3 flex-cc text-[16px] px-1 py-1 rounded-[20px] "
        >
          360 ت
        </span>
        <div className="absolute flex  items-center justify-between  bottom-2 w-11/12 h-12 bg-black/30 backdrop-blur-[2px] rounded-[20px]">
          <div className="ml-1 px-3 bg-primary-red/58 rounded-[20px] h-[90%] flex items-center justify-center ">
            افزودن به یادداشت
          </div>
          <div className=" pr-2">کوارتر پارتر با پنیر</div>
        </div>
      </span>

      <div className="h-36 w-11/12  sm:w-90 flex items-center justify-between ">
        <div
          id="badge"
          className="bg-primary-red opacity-0 px-3 py-2 rounded-[8px] text-xl shadow-rb rotate-16"
        >
          همبرگر های خوشمزه
        </div>
        <div
          id="badge"
          dir="rtl"
          className="bg-primary-red opacity-0 px-3 py-2 rounded-[8px] text-xl shadow-rbv2 -rotate-16"
        >
          چیل کنید کولیزا ...
        </div>
      </div>
    </div>
  );
}

export default Hero;
