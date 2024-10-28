import React from "react";
import { addClickClass } from "../../../helpers/cocktail";

/**
 * 
 * @param {{onClick : (ev : MouseEvent)=>void , className:string , children : children}} param0 
 * @returns 
 */
export const SmallButton = ({onClick = (_)=>{} , className='', children}) => {
  return (
    <button
      onClick={(ev) => {
        addClickClass(ev.currentTarget, "click"); 
        onClick(ev);
      }}
      className={`w-[48px] transition-all hover:bg-blue-600 flex rounded-lg cursor-pointer items-center justify-center bg-slate-800 ${className}`}
    >
      {children}
    </button>
  );
};
