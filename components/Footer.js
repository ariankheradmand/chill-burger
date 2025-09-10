import { Instagram } from "lucide-react";
import Image from "next/image";
import React from "react";

function Footer() {
  return (
    <div className="w-full flex-cc bg-black/50 gap-4">
      <div className="w-11/12 sm:w-90 flex-cc bg-black/50 gap-4 mt-4 p-4 rounded-[20px]">
        <p>آدرس: خیابان ظفر , جنب فروشگاه صادقی , پلاک 23 </p>
        <p>
          شماره تماس :{" "}
          <a
            href="tel:08334568877"
            className="text-blue-600 underline hover:underline"
          >
            08334568877
          </a>
        </p>
      </div>
      <div
        dir="rtl"
        className="flex-rc w-11/12 sm:w-90 gap-4 p-4 bg-black/50 rounded-[20px]"
      >
        <span>ساعات کاری :</span>
        <span>از 12 ظهر تا 12 شب</span>{" "}
      </div>

      <div className="flex items-center justify-between w-11/12 sm:w-90 ">
        <div className="flex-cc w-[48%] bg-black/50 p-4 rounded-[20px] gap-4">
          <span>منو</span>
          <span>درباره ما</span>
          <span>تماس با ما</span>
        </div>
        <div className="flex-cc w-[48%] bg-black/50 p-4 rounded-[20px]">
        <span className="text-center">مارا در شبکه های اجتماعی دنبال کنید</span>
        <div className="flex items-center justify-between">
            <Instagram />
            <Image width={45} height={45} src={"/snapp-svgrepo-com.svg"} />
        </div>
        </div>
      </div>
      <div className="flex-rc w-11/12 sm:w-90"></div>
      <div className="flex-rc w-11/12 sm:w-90"></div>
    </div>
  );
}

export default Footer;
