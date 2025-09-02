"use client"

import { Drumstick, Hamburger, Menu, Salad, Soup } from 'lucide-react'
import React from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

function Buttons() {

  useGSAP(() => {

   gsap.utils.toArray('#right-b').forEach((box) => {
    gsap.fromTo(
      box,
      {x: 30 , opacity :0},
      {
        x: 0 ,
        opacity : 1,
        duration: 1,
        scrollTrigger: {
          trigger: box,
          start: "top 95%",
          toggleActions: "restart reverse restart reverse"
        }
      }
    )
   })
   gsap.utils.toArray('#left-b').forEach((box) => {
    gsap.fromTo(
      box,
      {x: -30 , opacity :0},
      {
        x: 0 ,
        opacity : 1,
        duration: 1,
        scrollTrigger: {
          trigger: box,
          start: "top 95%",
          toggleActions: "restart reverse restart reverse"
        }
      }
    )
   })


  })
    
  const scrollToItems = () => {
    const itemsContainer = document.getElementById("items-container")
    if (itemsContainer) {
      itemsContainer.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div id="items-container" className='text-black w-full flex-cc'>
        
      {/* Menu Button */}
      <span className='fixed w-full flex-rc left-0 bottom-3 z-50'>
        <button
          onClick={scrollToItems}
          className='bg-primary-white px-5 gap-1 rounded-[20px] py-3 flex-rc shadow-rb '
        >
          <Menu />
          <span>منیو</span>
        </button>
      </span>

      {/* Items Container */}
      <div  className='flex-cc gap-2 w-11/12 sm:w-90 mt-10'>
        <div className='flex items-center justify-between gap-2 w-full'>
          <button id='left-b' className='w-5/12 text-white bg-primary-red py-3 shadow-rb rounded-[10px] flex-rc gap-2'>
            <Hamburger />برگر ها
          </button>
          <button id="right-b" className='w-5/12 opacity-0 bg-Secondary-lightblue text-white py-3 shadow-rb rounded-[10px] flex-rc gap-2'>
            <Salad />سالاد ها
          </button>
        </div>

        <div className='flex items-center justify-between gap-2 w-full'>
          <button id='left-b' className='w-5/12 bg-primary-white text-black py-3 shadow-rb rounded-[10px] flex-rc gap-2'>
            <Soup />پیش غذا
          </button>
          <button id='right-b' className='w-5/12 opacity-0 bg-Secondary-gold py-3 shadow-rb rounded-[10px] flex-rc gap-2'>
            <Drumstick />سوخاری
          </button>
        </div>
      </div>
    </div>
  )
}

export default Buttons
