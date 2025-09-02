"use client"

import { Drumstick, Hamburger, Menu, Salad, Soup } from 'lucide-react'
import React from 'react'

function Buttons() {
    
  const scrollToItems = () => {
    const itemsContainer = document.getElementById("items-container")
    if (itemsContainer) {
      itemsContainer.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className='text-black w-full flex-cc'>
        
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
      <div id="items-container" className='flex-cc gap-2 w-11/12 sm:w-90 mt-10'>
        <div className='flex items-center justify-between gap-2 w-full'>
          <button className='w-5/12 text-white bg-primary-red py-3 shadow-rb rounded-[10px] flex-rc gap-2'>
            <Hamburger />برگر ها
          </button>
          <button className='w-5/12 bg-black text-white py-3 shadow-rb rounded-[10px] flex-rc gap-2'>
            <Salad />سالاد ها
          </button>
        </div>

        <div className='flex items-center justify-between gap-2 w-full'>
          <button className='w-5/12 bg-primary-white text-black py-3 shadow-rb rounded-[10px] flex-rc gap-2'>
            <Soup />پیش غذا
          </button>
          <button className='w-5/12 bg-Secondary-gold py-3 shadow-rb rounded-[10px] flex-rc gap-2'>
            <Drumstick />سوخاری
          </button>
        </div>
      </div>
    </div>
  )
}

export default Buttons
