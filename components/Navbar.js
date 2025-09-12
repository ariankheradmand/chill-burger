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
          <Image className="opacity-0 logo z-10" alt="chill burger logo"  width={1920} height={1080} src="/Frame 3.svg" />

  );
}

export default Navbar;
