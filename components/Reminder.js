"use client";
import { getReminders } from "@/utils/reminderStorage";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useEffect, useRef } from "react";

function Reminder({ reminderOpen }) {
  const containerRef = useRef(null);
  const prevReminderOpen = useRef(null);
  const hasMounted = useRef(false);
  const animTimeline = useRef(null);

  useEffect(() => {
    hasMounted.current = true;
  }, []);

  useGSAP(() => {
    if (!hasMounted.current || prevReminderOpen.current === reminderOpen) {
      prevReminderOpen.current = reminderOpen;
      return;
    }

    prevReminderOpen.current = reminderOpen;

    // Kill any running timeline before starting a new one
    if (animTimeline.current) {
      animTimeline.current.kill();
    }

    const el = containerRef.current;
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    animTimeline.current = tl;

    if (reminderOpen) {
      tl.fromTo(
        el,
        {
          opacity: 1,
          border: "1px solid black",
          width: "50px",
          height: "50px",
          y: 150,
          rotate: 360,
          borderRadius: "100%",
        },
        {
          y: -50,
          rotate: 0,
          borderRadius: "10px",
          duration: 0.6,
        }
      ).fromTo(
        el,
        { width: "0%", height: "0%", borderRadius: "10px" },
        {
          border: "none",
          width: "91.6667%",
          height: "75%",
          borderRadius: "20px",
          boxShadow: "10px 5px 0px -1px rgba(0,0,0,1)",
          duration: 0.6,
        },
        ">0.1" 
      );
    } else {
      tl.fromTo(
        el,
        {
          rotation: 0,
          width: "91.6667%",
          height: "75%",
          borderRadius: "20px",
        },
        {
          y: -50,
          width: "50px",
          height: "50px",
          borderRadius: "6%",
          boxShadow: "none",
          duration: 0.6,
        }
      ).fromTo(
        el,
        {
          border: "1px solid black",

          width: "50px",
          height: "50px",
          y: -50,
          borderRadius: "35%",
          boxShadow: "none",
          rotate: 360,
        },
        {
          borderRadius: "100%",
          y: 150,
          rotate: 0,
          width: "50px",
          height: "50px",
          opacity: 0,
          borderRadius: "0px",
          duration: 0.6,
        },
        ">0.2"
      );
    }
  }, [reminderOpen]);
  console.log(getReminders())
  return (
    <div className="fixed flex-cc h-screen w-screen z-100 top-0 text-white pointer-events-none">
      <div
        ref={containerRef}
        className="w-0 h-0 bg-primary-white reminder-container"
      >
        {}
      </div>
    </div>
  );
}

export default Reminder;
