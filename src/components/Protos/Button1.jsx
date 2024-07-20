import React from 'react'

export const Button1 = ({text , onClick}) => {
  return (
    <button className=' bg-blue-600 rounded-lg py-[10px] px-[30px] text-white font-bold' onClick={onClick}>{text}</button>
  )
}
