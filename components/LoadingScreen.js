"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useState, useRef } from "react";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  useGSAP(() => {
    // 100% GPU-accelerated: uses x (compositor transform) instead of left (layout reflow)
    gsap.fromTo(
      ".firstCube",
      { x: 0 },
      {
        x: 204,
        rotate: 360,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "circ.inOut",
        force3D: true,
      }
    );
    gsap.fromTo(
      ".secondCube",
      { x: 0 },
      {
        x: 152,
        rotate: 360,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "circ.inOut",
        force3D: true,
      }
    );
    gsap.fromTo(
      ".forthCube",
      { x: 0 },
      {
        x: 48,
        rotate: 360,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "circ.inOut",
        force3D: true,
      }
    );
    gsap.fromTo(
      ".innerCube",
      { scale: 0.25 },
      {
        scale: 1,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        force3D: true,
      }
    );
  }, []);

  useEffect(() => {
    const handleLoad = () => {
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
          onComplete: () => setLoading(false),
        });
      } else {
        setLoading(false);
      }
    };

    if (document.readyState === "complete") {
      setTimeout(handleLoad, 400);
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  if (!loading) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex items-center justify-center w-screen h-screen bg-foreground z-500 will-change-opacity pointer-events-auto"
    >
      <div className="relative w-56 h-56 flex items-center justify-center">
        {/* Cube 1 - Red + Cream */}
        <div className="w-12 h-12 bg-primary-red rounded-md firstCube border-2 border-Secondary-cream flex items-center justify-center will-change-transform">
          <div className="w-12 h-12 bg-Secondary-cream rounded-sm innerCube will-change-transform"></div>
        </div>

        {/* Cube 2 - Gold + Dark */}
        <div className="w-12 h-12 bg-Secondary-gold rounded-md secondCube border-2 border-primary-dark flex items-center justify-center will-change-transform">
          <div className="w-12 h-12 bg-primary-dark rounded-sm innerCube will-change-transform"></div>
        </div>

        {/* Cube 3 - Dark + Gold */}
        <div className="w-12 h-12 bg-primary-dark rounded-md forthCube border-2 border-Secondary-gold flex items-center justify-center will-change-transform">
          <div className="w-12 h-12 bg-Secondary-gold rounded-sm innerCube will-change-transform"></div>
        </div>
      </div>
    </div>
  );
}
