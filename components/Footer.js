import { Instagram } from "lucide-react";
import Image from "next/image";
import React from "react";

function Footer() {
  return (
    <div className="w-full flex-cc bg-black/50 gap-4 relative">
      <Image
        alt="CafeImage"
        width={450}
        height={750}
        className=" absolute w-full h-full sm:w-90 "
        src={"/Footer.png"}
      />
      <div className="w-11/12 sm:w-90 flex-cc bg-black/50 gap-4 mt-4 p-4 rounded-[20px] z-20">
        <p>آدرس: خیابان ظفر , جنب فروشگاه صادقی , پلاک 23 </p>
        <p>
          شماره تماس :{" "}
          <a href="tel:08334568877" className="underline hover:underline">
            08334568877
          </a>
        </p>
      </div>
      <div
        dir="rtl"
        className="flex-rc w-11/12 sm:w-90 gap-4 p-4 bg-black/50 rounded-[20px] z-20"
      >
        <span>ساعات کاری :</span>
        <span>از 12 ظهر تا 12 شب</span>{" "}
      </div>

      <div className="flex items-center justify-between w-11/12 sm:w-90 z-20">
        <div className="flex-cc w-[48%] bg-black/50 p-4 rounded-[20px] gap-4">
          <span>منو</span>
          <span>درباره ما</span>
          <span>تماس با ما</span>
        </div>
        <div className="flex-cc w-[48%] bg-black/50 p-4 rounded-[20px] gap-4">
          <span className="text-center">
            مارا در شبکه های اجتماعی دنبال کنید
          </span>
          <div className="flex items-center justify-between gap-4">
            <Instagram className="size-9" />
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
        <div className=" w-full h-36 bg-black/50 rounded-[20px] overflow-hidden">
          <iframe
            src="https://www.google.com/maps?q=34.34435650181349,47.0769375593508&z=15&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <div className="flex-rc w-11/12 sm:w-90 bg-black/50 py-2 rounded-[10px] mb-3 z-20">
        تمام حقوق سایت مربوط به تیم Auren Design میباشد
      </div>
    </div>
  );
}

export default Footer;
