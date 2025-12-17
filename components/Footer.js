import { Instagram, Map } from "lucide-react";
import Image from "next/image";
import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <div className="w-full flex-cc bg-black/50 gap-10 relative pb-20">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/Footer.mkv" type="video/mp4" />
        مرورگر شما از ویدیو پشتیبانی نمی‌کند.
      </video>

      <div className="w-11/12 sm:w-90 flex-cc bg-black/50 gap-4 mt-4 p-4 rounded-[20px] z-20">
        <p>آدرس: بلوار ظفر جنوبی , نبش کوچه ی شهدا </p>
      </div>
      <div
        dir="rtl"
        className="flex-rc w-11/12 sm:w-90 gap-4 p-4 bg-black/50 rounded-[20px] z-20"
      >
        <span>ساعات کاری :</span>
        <span>از 11 ظهر تا 10:45 شب</span>{" "}
      </div>

      <div className="flex items-center justify-between w-11/12 sm:w-90 z-20">
        <div className="flex-cc w-[48%] bg-black/50 p-4 rounded-[20px] gap-4">
          <Link href="/">
            <span>منو</span>
          </Link>
          <Link href="/about-us">
            <span>درباره ما</span>
          </Link>
          <span>تماس با ما</span>
        </div>
        <div className="flex-cc w-[48%] bg-black/50 p-4 rounded-[20px] gap-4">
          <span className="text-center">
            مارا در شبکه های اجتماعی دنبال کنید
          </span>
          <div className="flex items-center justify-between gap-4">
            <a href="https://www.instagram.com/cb.smash">
              {" "}
              <Instagram className="size-9" />
            </a>
            <Image
              alt="snapp-brand-logo"
              className="size-11"
              width={45}
              height={45}
              src={"/snapp-svgrepo-com.svg"}
            />
          </div>
        </div>
      </div>
      <div className="flex-rc w-11/12 sm:w-90 z-20">
        <a href="https://maps.app.goo.gl/Y8tpF5zuuXvdV4Ev5">
          <Map size={48} />
        </a>
      </div>
      <div
        dir="rtl"
        className="flex-rc w-11/12 sm:w-90 bg-black/50 py-2 rounded-[10px] mb-3 z-20"
      >
        تمام حقوق سایت مربوط به تیم Auren Design میباشد
      </div>
    </div>
  );
}

export default Footer;
