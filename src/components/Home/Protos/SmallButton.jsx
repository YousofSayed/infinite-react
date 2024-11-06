import React from "react";
import { addClickClass } from "../../../helpers/cocktail";

/**
 * 
 * @param {{onClick : (ev : MouseEvent)=>void , className:string , title:string, children : children}} param0 
 * @returns 
 */
export const SmallButton = ({onClick = (_)=>{} , className='', children , title=''}) => {
  return (
    <button
    aria-label={title}
    title = {title}
      onClick={(ev) => {
        addClickClass(ev.currentTarget, "click"); 
        onClick(ev);
      }}
      className={`w-[48px] outline-none border-2 border-transparent focus:border-blue-600 transition-colors shadow-md shadow-gray-950  hover:bg-blue-600 flex rounded-lg cursor-pointer items-center justify-center  ${className ? className : 'bg-slate-800'}`}
    >
      {children}
    </button>
  );
};

let l ={
  0:{
    color:'',
    opacity:'',
  }
}
