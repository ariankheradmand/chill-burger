"use client"

import Buttons from "@/components/Buttons";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Items from "@/components/Items";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useState } from "react";



export default function Home() {
  const [itemChanged , setItemChanged] = useState(false);
  return (
    <div className="font-lalezar flex flex-col items-center justify-center gap-6 overflow-hidden ">
     <Image src={'/background-texture.svg'} width={900} height={1200} className=" fixed w-full h-full left-0 bottom-0 object-cover" />
     <Navbar /> 
     <Hero />
     <Buttons itemChanged={itemChanged} setItemChanged={setItemChanged} />
     <Items setItemChanged={setItemChanged} />
     <Footer />
    </div>
  );
}
