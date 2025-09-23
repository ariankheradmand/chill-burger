"use client";

import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import Image from "next/image";
import React, { useState } from "react";
import Menu_items from "@/libs/items";
import { addReminder } from "@/utils/reminderStorage";
import { Plus, Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function Hero({ setItemChanged }) {
  // Get burger items from libs (index 3 is burgers)
  const burgerItems = Menu_items[3].slice(3); // Skip header, imgsrc, colorScheme

  // State for bookmark animation
  const [activePlus, setActivePlus] = useState({});

  // Map existing images to burger items
  const heroImages = ["/3.png", "/2.png", "/1.png"];

  const handleAdd = (item, index) => {
    addReminder({
      id: item.items.name,
      name: item.items.name,
      price: item.items.price,
    });
    if (setItemChanged) setItemChanged(true);

    // Toggle plus animation
    setActivePlus((prev) => ({ ...prev, [index]: true }));
    setTimeout(() => {
      setActivePlus((prev) => ({ ...prev, [index]: false }));
    }, 600);
  };

  useGSAP(() => {
    // Video container animation
    gsap.fromTo(
      "#hero-video",
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: "power2.out", delay: 0.2 }
    );

    // Title animation
    gsap.fromTo(
      "#hero-title",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.1 }
    );

    // Section title animation
    gsap.fromTo(
      "#section-title",
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        scrollTrigger: {
          trigger: "#section-title",
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    );

    // Burger cards animation
    gsap.fromTo(
      ".burger-card",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".burger-grid",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <div className="w-full bg-background">
      {/* Hero Section */}
      <div className="px-4 py-6">
        <div className="max-w-sm mx-auto space-y-6">
          
          {/* Header Text */}
          <div id="hero-title" className="text-center opacity-0 flex-cc">
            <h1 className="text-2xl font-bold text-primary-dark mb-2 ">
              همبرگر های خوشمزه
            </h1>
            <p className="text-sm text-primary-black/70 bg-white w-fit px-2">
              چیل کنید کولیزا، بهترین طعم رو تجربه کنید
            </p>
          </div>

          {/* Video Container */}
          <div id="hero-video" className="opacity-0">
            <div className="relative aspect-video rounded-2xl overflow-hidden h-102 shadow-lg w-full shadow-rb">
              <video
                muted
                loop
                autoPlay
                className="w-full h-full object-cover"
                src="/burger.mp4"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Burger Items Section */}
      <div className="px-4 pb-8">
        <div className="max-w-sm mx-auto">
          
          {/* Section Title */}
          <div id="section-title" className="text-center mb-6 opacity-0">
            <h2 className="text-xl font-bold text-primary-dark mb-2">
              محبوب ترین برگر ها
            </h2>
            <div className="w-12 h-0.5 bg-primary-red mx-auto rounded-full"></div>
          </div>

          {/* Burger Grid */}
          <div className="burger-grid space-y-4">
            {burgerItems.slice(0, 3).map((item, index) => (
              <div key={index} className="burger-card opacity-0 ">
                <div className="bg-primary-white rounded-xl shadow-md shadow-rb overflow-hidden border border-Secondary-cream/40 hover:shadow-lg transition-shadow duration-300">
                  
                  {/* Image and Content Layout */}
                  <div className="flex items-center p-4 gap-4">
                    
                    {/* Image */}
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <Image
                        className="w-full h-full object-cover rounded-xl"
                        width={80}
                        height={80}
                        alt={item.items.name}
                        src={heroImages[index]}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-bold text-primary-dark truncate">
                          {item.items.name}
                        </h3>
                        <div className="bg-Secondary-gold text-primary-black px-2 py-1 rounded-lg text-sm font-semibold ml-2 flex-shrink-0">
                          {item.items.price}
                        </div>
                      </div>

                      {/* Add Button */}
                      <button
                        onClick={(e) => {
                          handleAdd(item, index);
                          const card = e.currentTarget.closest('.burger-card');
                          if (card) {
                            gsap.to(card, {
                              scale: 0.98,
                              duration: 0.1,
                              yoyo: true,
                              repeat: 1,
                            });
                          }
                        }}
                        className="w-full bg-primary-dark hover:bg-primary-red text-primary-white py-2.5 px-4 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        <div className="relative w-4 h-4">
                          <Plus
                            size={16}
                            className={`absolute inset-0 transition-all duration-300 ${
                              activePlus[index]
                                ? "opacity-0 rotate-90 scale-0"
                                : "opacity-100 rotate-0 scale-100"
                            }`}
                          />
                          <Check
                            size={16}
                            className={`absolute inset-0 transition-all duration-300 ${
                              activePlus[index]
                                ? "opacity-100 rotate-0 scale-100"
                                : "opacity-0 -rotate-90 scale-0"
                            }`}
                          />
                        </div>
                        <span className="text-sm">
                          {activePlus[index] ? "اضافه شد" : "افزودن به یادداشت"}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;