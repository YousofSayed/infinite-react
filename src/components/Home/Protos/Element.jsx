import React, { memo } from "react";
import { Icons } from "../../Icons/Icons";
import { useRecoilValue } from "recoil";
import { refsStt, searchWord } from "../../../helpers/atoms";

/**
 *
 * @param {{content:string}} param0
 * @returns
 */
export const Element = ({ content }) => {
  const searchW = useRecoilValue(searchWord);
  return ( 
    <div
      draggable={true}

      onDragStart={(ev) => {
        console.log("start");
        ev.dataTransfer.setData("text/plain", content.toLowerCase());
      }}

      onDragEnd={(ev) => {
        console.log("end");
        window.parent.postMessage({ type: 'end' , elType :content.toLowerCase() });
      }}

      className={`${content.toLowerCase().includes(searchW.toLowerCase())? '':'hidden'} group h-[90px] bg-slate-800 border-[1.5px] border-slate-400 rounded-lg flex items-center  justify-center flex-col gap-[15px]`}
    >
      {Icons.code()}
      <p className="font-semibold text-white text-[13px] mb-[10px]">
        {content.toLowerCase()}
      </p>
    </div>
  );
};
