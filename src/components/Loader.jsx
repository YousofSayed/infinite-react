import React from 'react'

export const Loader = () => {
  return (
    <section className='w-full h-full flex justify-center items-center'>
        <div className='w-[100px] h-[100px] rounded-full border-2 border-blue-600 border-r-transparent animate-spin'></div>
    </section>
  )
}
