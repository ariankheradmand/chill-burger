"use client"

import Buttons from "@/components/Buttons";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Items from "@/components/Items";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useState } from "react";



export default function Home() {
  const [itemChanged, setItemChanged] = useState(false);
  return (
    <div className="font-lalezar flex flex-col items-center justify-center gap-6 overflow-hidden relative">
 
      <Navbar />
      <Buttons itemChanged={itemChanged} setItemChanged={setItemChanged} />
      <Items setItemChanged={setItemChanged} />
      <Footer />
           
    </div>
  );
}
