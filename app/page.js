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
    <div className="font-lalezar flex flex-col items-center justify-center gap-6 overflow-hidden relative">
     <Image src={'/background-texture.svg'} width={2000} height={2000} className="opacity-70 fixed w-screen h-screen left-0 bottom-px  object-cover" />
     <Navbar /> 
     <Hero setItemChanged={setItemChanged} />
     <Buttons itemChanged={itemChanged} setItemChanged={setItemChanged} />
     <Items setItemChanged={setItemChanged} />
     <Footer />
    </div>
  );
}
