"use client"; // if you’re in `app/` directory

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useGSAP(() => {
    gsap.fromTo(".firstCube", {
            left: 0,
        }, {
            left: 204,
            rotate: 360,
            duration: 2,
            yoyo: true,
            repeat: -1,
            ease: "circ"
        })
        gsap.fromTo(".secondCube", {
            left: 0,
        }, {
            left: 152,
            rotate: 360,
            duration: 2,
            yoyo: true,
            repeat: -1,
            ease: "circ"
        })
        gsap.fromTo(".thirdCube", {
            left: 0,
        }, {
            left: 100,
            rotate: 360,
            duration: 2,
            yoyo: true,
            repeat: -1,
            ease: "circ"
        })
        gsap.fromTo(".forthCube", {
            left: 0,
        }, {
            left: 48,
            rotate: 360,
            duration: 2,
            yoyo: true,
            repeat: -1,
            ease: "circ"
        })
        gsap.fromTo(".innerCube" , {
            width: 12,
            height: 12,
        } , {
            duration: 2,
            yoyo: true,
            repeat: -1,
            width: 48,
            height: 48,
            ease: "sine"
        })
  })

  useEffect(() => {
    // Wait until everything (images, scripts, etc.) is fully loaded
    const handleLoad = () => {
      setTimeout(() => setLoading(false), 800); // add a small delay for smoothness
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  if (!loading) return null;

  

  return (
   <div className="fixed inset-0 flex items-center justify-center w-screen h-screen bg-foreground z-500">
  <div className="relative w-56 h-56 flex items-center justify-center">
    {/* Cube 1 - Red + Cream */}
    <div className="w-12 h-12 bg-primary-red rounded-md firstCube border-2 border-Secondary-cream flex items-center justify-center">
      <div className="w-6 h-6 bg-Secondary-cream rounded-sm innerCube"></div>
    </div>

    {/* Cube 2 - Gold + Dark */}
    <div className="w-12 h-12 bg-Secondary-gold rounded-md secondCube border-2 border-primary-dark flex items-center justify-center">
      <div className="w-6 h-6 bg-primary-dark rounded-sm innerCube"></div>
    </div>

    

    {/* Cube 3 - Dark + Gold */}
    <div className="w-12 h-12 bg-primary-dark rounded-md forthCube border-2 border-Secondary-gold flex items-center justify-center">
      <div className="w-6 h-6 bg-Secondary-gold rounded-sm innerCube"></div>
    </div>

    {/* Cube 4 - Light Blue + Dark */}
    <div className="w-12 h-12 bg-Secondary-lightblue rounded-md thirdCube border-2 border-primary-dark flex items-center justify-center">
      <div className="w-6 h-6 bg-primary-dark rounded-sm innerCube"></div>
    </div>
  </div>
</div>

  );
}
