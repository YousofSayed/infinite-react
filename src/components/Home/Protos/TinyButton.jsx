import React from "react";
import { addClickClass } from "../../../helpers/cocktail";

/**
 * 
 * @param {{className:string , onClick : (ev:MouseEvent)=>void}} param0 
 * @returns 
 */
export const TinyButton = ({children , className , onClick}) => {
  return (
    <button className={`w-[35px] h-[35px] hover:bg-blue-600 transition-all  flex justify-center items-center rounded-lg ${className? className : 'bg-gray-950'}`} 
        onClick={(ev)=>{
            addClickClass(ev.currentTarget , 'click');
            onClick(ev)
        }}
    >
        {children}
    </button>
  );
};
