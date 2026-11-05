"use client";
import {
  getReminders,
  addReminder,
  removeReminder,
  clearReminders,
} from "@/utils/reminderStorage";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { Plus, Minus, Trash } from "lucide-react";

function Reminder({ reminderOpen, setItemChanged, setReminderOpen }) {
  const containerRef = useRef(null);
  const prevReminderOpen = useRef(null);
  const hasMounted = useRef(false);
  const animTimeline = useRef(null);
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
    if (!el) return;

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    animTimeline.current = tl;

    if (reminderOpen) {
      // 100% GPU Compositor Transform: zero layout reflows (no width/height animation)
      tl.fromTo(
        el,
        {
          scale: 0.2,
          rotate: 180,
          y: 120,
          opacity: 0,
        },
        {
          scale: 1,
          rotate: 0,
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.2)",
          force3D: true,
        }
      ).fromTo(
        ".text-content",
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.04,
          ease: "power2.out",
          force3D: true,
        },
        "-=0.2"
      );
    } else {
      tl.to(".text-content", {
        opacity: 0,
        duration: 0.15,
        force3D: true,
      }).to(
        el,
        {
          scale: 0.2,
          rotate: -90,
          y: 120,
          opacity: 0,
          duration: 0.35,
          ease: "power2.in",
          force3D: true,
        },
        "-=0.05"
      );
    }
    setData(getReminders());
  }, [reminderOpen]);

  const handleAdd = (item) => {
    addReminder(item);
    setData(getReminders());
    if (setItemChanged) setItemChanged(true);
  };

  const handleRemove = (id) => {
    removeReminder(id);
    setData(getReminders());
    if (setItemChanged) setItemChanged(true);
    if (data.length === 1 && data[0].quantity === 1) {
      setReminderOpen(false);
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
      className={`fixed text-primary-black flex-cc h-screen w-screen z-100 top-0 ${
        reminderOpen ? "" : "pointer-events-none"
      }`}
    >
      <div
        onClick={() => setReminderOpen(false)}
        className={`absolute w-full h-full z-50 bg-black/50 transition-opacity duration-300 will-change-opacity ${
          reminderOpen ? "opacity-100" : "opacity-0"
        }`}
      ></div>

      <div
        ref={containerRef}
        className={`w-11/12 max-w-lg h-[75%] p-6 bg-primary-white reminder-container opacity-0 flex flex-col items-center gap-6 z-60 rounded-[20px] shadow-rb transform-gpu will-change-transform`}
      >
        <div className="text-center text-xl text-content font-bold">لیست یادآوری</div>
        <div
          dir="rtl"
          className="flex items-center justify-between w-full border-b-2 text-content pb-2 font-bold"
        >
          <div className="w-5/12">آیتم</div>
          <div className="w-4/12 text-center">تعداد</div>
          <div className="w-3/12 text-end">بها</div>
        </div>

        <div className="flex flex-col w-full gap-3 text-content max-h-[400px] overflow-y-auto pb-1 [direction:ltr] [&>*]:[direction:rtl]">
          {data?.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between w-full py-1"
            >
              <div className="w-5/12 flex items-center gap-1">
                <span>{item?.name}</span>
                {item?.type && (
                  <span
                    className={`text-[10px] px-[5px] py-[1px] rounded-full ${
                      item.type === "دوبل"
                        ? "bg-primary-red text-white"
                        : "bg-primary-dark text-white"
                    }`}
                  >
                    {item.type}
                  </span>
                )}
              </div>

              {/* Quantity with + / - */}
              <div className="w-4/12 flex items-center justify-center gap-2">
                <button
                  onClick={() => handleAdd(item)}
                  className="p-1 rounded-[10px] bg-primary-white text-primary-black hover:bg-black hover:text-white transition-colors shadow-md"
                >
                  <Plus size={16} />
                </button>
                <span className="font-bold">{item?.quantity}</span>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="p-1 rounded-[10px] bg-primary-white text-primary-black hover:bg-black hover:text-white transition-colors shadow-md"
                >
                  <Minus size={16} />
                </button>
              </div>

              <div className="w-3/12 text-end font-bold">{item?.price}</div>
            </div>
          ))}
        </div>

        <div
          dir="rtl"
          className="flex items-center justify-between w-full border-t-2 text-content pt-3 font-bold"
        >
          <div className="w-5/12">جمع کل</div>
          <div className="w-4/12 text-center">
            <div>
              {data.reduce((total, item) => total + (item.quantity || 0), 0)}
            </div>
          </div>
          <div className="w-3/12 text-end text-primary-red">
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

        <div className="w-full flex items-center justify-between mt-auto">
          <button
            onClick={() => {
              clearReminders();
              setData([]);
              if (setItemChanged) setItemChanged(true);
              setReminderOpen(false);
            }}
            className="flex gap-2 border text-content px-3 py-1.5 rounded-[10px] items-center justify-center text-sm hover:bg-red-50 text-red-600 border-red-200 transition-colors"
          >
            <Trash size={16} />
            <span>پاک کردن همه</span>
          </button>

          <button
            onClick={() => setReminderOpen(false)}
            className="text-content text-lg font-bold text-primary-black hover:text-primary-red transition-colors underline underline-offset-4"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
}

export default Reminder;
