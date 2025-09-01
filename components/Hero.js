import Image from "next/image";
import React from "react";

function Hero() {
  return (
    <div className=" flex-cc gap-6 w-full text-[12px]">
      <span className="w-11/12 h-38  sm:w-90  relative flex-cc bg-black rounded-[20px] shadow-md overflow-hidden ">
        <Image
          className=" absolute w-full h-full "
          width={500}
          height={300}
          src="/3.png"
        />
        <span dir="rtl" className=" absolute top-2 bg-black/20 left-3 flex-cc text-[16px] px-1 py-1 rounded-[20px] ">300 ت</span>
        <div className="absolute flex  items-center justify-between  bottom-2 w-11/12 h-12 bg-black/30 backdrop-blur-[2px] rounded-[20px]">
          <div className="ml-1 px-3 bg-primary-red/58 rounded-[20px] h-[90%] flex items-center justify-center ">افزودن به یادداشت</div>
          <div className=" pr-2">اسموکی برگر</div>
        </div>
      </span>
   <span className="w-11/12 h-38  sm:w-90  relative flex-cc bg-black rounded-[20px] shadow-md overflow-hidden">
        <Image
          className=" absolute w-full h-full "
          width={500}
          height={150}
          src="/2.png"
        />
        <span dir="rtl" className=" absolute top-2 bg-black/20 left-3 flex-cc text-[16px] px-1 py-1 rounded-[20px] ">350 ت</span>

        <div className="absolute flex  items-center justify-between  bottom-2 w-11/12 h-12 bg-black/30 backdrop-blur-[2px] rounded-[20px]">
          <div className="ml-1 px-3 bg-primary-red/58 rounded-[20px] h-[90%] flex items-center justify-center ">افزودن به یادداشت</div>
          <div className=" pr-2">چیز برگر</div>
        </div>
      </span><span className="w-11/12 sm:w-90 h-38 relative flex-cc bg-black rounded-[20px] shadow-md overflow-hidden">
        <Image
          className=" absolute w-full h-full "
          width={500}
          height={150}
          src="/1.png"
        />
        <span dir="rtl" className=" absolute top-2 bg-black/20 left-3 flex-cc text-[16px] px-1 py-1 rounded-[20px] ">360 ت</span>

        <div className="absolute flex  items-center justify-between  bottom-2 w-11/12 h-12 bg-black/30 backdrop-blur-[2px] rounded-[20px]">
          <div className="ml-1 px-3 bg-primary-red/58 rounded-[20px] h-[90%] flex items-center justify-center ">افزودن به یادداشت</div>
          <div className=" pr-2">کوارتر پارتر با پنیر</div>
        </div>
      </span>
      <div className="h-36 w-11/12  sm:w-90 flex items-center justify-between ">
       <div className="bg-primary-red px-3 py-2 rounded-[8px] text-xl shadow-rb rotate-25">همبرگر های خوشمزه</div>
       <div dir="rtl" className="bg-primary-red px-3 py-2 rounded-[8px] text-xl shadow-rbv2 -rotate-25">چیل کنید کولیزا ...</div>

      </div>
          </div>
  );
}

export default Hero;
