import React from "react";
import { Icons } from "../../Icons/Icons";

/**
 * 
 * @param {{content:string}} param0 
 * @returns 
 */
export const Element = ({content}) => {
  return (
    <div
      draggable={true}
      data-type={content.toLowerCase()}
      className="group h-[90px] bg-slate-800 border-[1.5px] border-slate-400 rounded-lg flex items-center  justify-center flex-col gap-[15px]"
    >
        {Icons.code()}
        <p className="font-semibold text-white text-[13px] mb-[10px]" >{content.toLowerCase()}</p>
    </div>
  );
};
