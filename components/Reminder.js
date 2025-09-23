"use client";
import {
  getReminders,
  addReminder,
  removeReminder,
} from "@/utils/reminderStorage";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";

function Reminder({ reminderOpen, setItemChanged, setReminderOpen }) {
  const containerRef = useRef(null);
  const prevReminderOpen = useRef(null);
  const hasMounted = useRef(false);
  const animTimeline = useRef(null);
  const textAnimTimeline = useRef(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    hasMounted.current = true;
  }, []);

  useGSAP(() => {
    if (!hasMounted.current || prevReminderOpen.current === reminderOpen) {
      prevReminderOpen.current = reminderOpen;
      return;
    }

    prevReminderOpen.current = reminderOpen;

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
          y: -75,
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
    setData(getReminders());
  }, [reminderOpen]);

  useGSAP(() => {
    if (textAnimTimeline.current) {
      textAnimTimeline.current.kill();
    }

    if (reminderOpen) {
      const tl = gsap.timeline();
      textAnimTimeline.current = tl;

      tl.fromTo(
        ".text-content",
        { opacity: 0 },
        { opacity: 1, duration: 0.3, stagger: 0.1, delay: 1 }
      );
    } else {
      const tl = gsap.timeline();
      textAnimTimeline.current = tl;

      tl.fromTo(".text-content", { opacity: 1 }, { opacity: 0, duration: 0.1 });
    }
  }, [reminderOpen]);

  const handleAdd = (item) => {
    addReminder(item);
    setData(getReminders());
    setItemChanged(true);
  };

  const handleRemove = (id) => {
    removeReminder(id);
    setData(getReminders());
    setItemChanged(true);
    if (data.length === 1) {
      if (data[0].quantity === 1) {
        setReminderOpen(false);
      }
    }
  };

  useEffect(() => {
    if (reminderOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [reminderOpen]);

  return (
    <div
      className={`fixed text-primary-black flex-cc h-screen w-screen z-100 top-0  ${
        reminderOpen ? "" : "pointer-events-none"
      }`}
    >
      <div
        onClick={(() => setReminderOpen(false))}
        className={` absolute w-full h-full z-50 bg-black/50 transition-all duration-500 ${
          reminderOpen ? "opacity-100" : "opacity-0"
        }`}
      ></div>
      <div
        ref={containerRef}
        className={`w-0 h-0 p-6 bg-primary-white reminder-container opacity-0 flex flex-col items-center gap-6 z-60`}
      >
        <div className="text-center text-xl text-content">لیست یادآوری</div>
        <div
          dir="rtl"
          className="flex items-center justify-between w-full border-b-2 text-content"
        >
          <div className="w-5/12">آیتم</div>
          <div className="w-4/12 text-center">تعداد</div>
          <div className="w-3/12 text-end">بها</div>
        </div>

        <div dir="rtl" className="flex flex-col w-full gap-3 text-content">
          {data?.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between w-full"
            >
              <div className="w-5/12">{item?.name}</div>

              {/* Quantity with + / - */}
              <div className="w-4/12 flex items-center justify-center gap-2">
                <button
                  onClick={() => handleAdd(item)}
                  className="p-1 rounded-[10px] bg-primary-white text-primary-black focus:bg-black focus:text-white transition-all shadow-md"
                >
                  <Plus size={16} />
                </button>
                <span className="underline">{item?.quantity}</span>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="p-1 rounded-[10px] bg-primary-white text-primary-black focus:bg-black focus:text-white transition-all shadow-md"
                >
                  <Minus size={16} />
                </button>
              </div>

              <div className="w-3/12 text-end">{item?.price}</div>
            </div>
          ))}
        </div>
        <div
          dir="rtl"
          className="flex items-center justify-between w-full border-t-2 text-content"
        >
          <div className="w-5/12">جمع کل</div>
          <div className="w-4/12 text-center">
            <div>
              {data.reduce((total, item) => total + (item.quantity || 0), 0)}
            </div>
          </div>
          <div className="w-3/12 text-end">
            {data
              .reduce(
                (total, item) =>
                  total + (parseFloat(item.price) || 0) * (item.quantity || 0),
                0
              )
              .toLocaleString()}{" "}
            ت
          </div>
        </div>
        <div onClick={(() => setReminderOpen(false))} className="text-content absolute bottom-6 right-6 text-lg underline underline-offset-8">بستن</div>
      </div>
    </div>
  );
}

export default Reminder;
