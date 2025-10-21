import React from 'react'

function Popular() {
  return (
    <div className='flex-cc  text-black w-full gap-4 '>
        <span className='text-sm text-right w-full'>آمار محبوب ترین ها</span>
        <button className='w-full bg-primary-white shadow-rb py-5 rounded-[10px]'>دابل ماشروم برگر</button>
        <button className='w-full bg-primary-red text-white shadow-rb py-5 rounded-[10px]'>دابل ماشروم برگر</button>
        <button className='w-full bg-Secondary-lightblue text-white shadow-rb py-5 rounded-[10px]'>دابل ماشروم برگر</button>

        <button className='py-2  px-2 mt-4 bg-primary-white rounded-[10px] shadow-rb'>ویرایش محبوب ترین ها</button>
    </div>
  )
}

export default Popular