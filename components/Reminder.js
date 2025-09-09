"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useEffect, useRef } from "react";

function Reminder({ reminderOpen }) {
  console.log(reminderOpen);
  const prevReminderOpen = useRef(null);
  const hasMounted = useRef(false);

  useEffect(() => {
    hasMounted.current = true;
  }, []);

  useGSAP(() => {
    if (!hasMounted.current || prevReminderOpen.current === reminderOpen) {
      prevReminderOpen.current = reminderOpen;
      return;
    }

    prevReminderOpen.current = reminderOpen;

    if (reminderOpen) {
      gsap.fromTo(
        ".reminder-container",
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
          duration: 0.6
        }
      );
      gsap.fromTo(
        ".reminder-container",
        {
          width: "0%",
          height: "0%",
          borderRadius: "10px"
        },
        {
          border: "none",
          delay: 0.6,
          width: "91.6667%",
          height: "75%",
          borderRadius: "20px",
          boxShadow: "10px 5px 0px -1px rgba(0,0,0,1)",
        }
      );
    } else {
      gsap.fromTo(
        ".reminder-container",
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
      );
      gsap.fromTo(
        ".reminder-container",
        {
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
          delay: 0.8,
          width: "50px",
          height: "50px",
          opacity: 0,
          borderRadius: "0px",
          duration: 0.6,
        }
      );
    }
  }, [reminderOpen]);

  return (
    <div className=" fixed flex-cc h-screen w-screen z-100 top-0 text-white pointer-events-none">
      <div className=" w-0 h-0 bg-primary-white reminder-container"></div>
    </div>
  );
}

export default Reminder;