import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Image from "next/image";



export default function Home() {
  return (
    <div className="font-lalezar flex flex-col items-center justify-center gap-6">
     <Navbar /> 
     <Hero />
    </div>
  );
}
