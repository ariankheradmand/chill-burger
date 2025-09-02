"use client"

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import React from "react";

function Navbar() {

  useGSAP(() => {
    gsap.to('.logo' , {opacity: 1})
  })
  return (
    <div className="flex items-center justify-center w-full h-36 bg-primary-red">
      <Image className="opacity-0 logo mt-3" alt="chill burger logo"  width={120} height={120} src="/Frame.svg" />
    </div>
  );
}

export default Navbar;
