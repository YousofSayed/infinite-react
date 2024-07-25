import React from 'react'

export const Path = ({ d, strokeMiterlimit ,stroke='#64748B' ,strokeWidth='1.5' , group= true}) => {
  return (
    <path
        d={d}
        strokeMiterlimit={strokeMiterlimit}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        className={`group-hover:stroke-white transition-all`}
        strokeLinejoin="round"
      />
  )
}
