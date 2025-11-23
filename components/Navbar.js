"use client"

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import React from "react";

function Navbar() {

  useGSAP(() => {
    gsap.to('.logo', { opacity: 1 })
  })
  return (
    <div className="h-24 w-full bg-primary-red z-10 flex-rc relative">
      <Image src={"MainLogo.svg"} alt="Chill Burger Logo" className="z-10" height={100} width={100} />
      <Image src={'/background-texture.svg'} alt="background texture" width={2000} height={2000} className="opacity-10 absolute w-screen h-screen left-0 bottom-0  object-cover" />

    </div>
  );
}

export default Navbar;
