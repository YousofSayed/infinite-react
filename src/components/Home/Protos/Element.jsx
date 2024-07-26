import React, { memo } from "react";
import { Icons } from "../../Icons/Icons";
import { useRecoilValue } from "recoil";
import { refsStt, searchWord } from "../../../helpers/atoms";
import { stringify } from "../../../helpers/cocktail";

/**
 *
 * @param {{content:string ,inner:string, name:string,classes:string}} param0
 * @returns
 */
export const Element = ({ content='', inner='', name ='', classes='' }) => {
  const searchW = useRecoilValue(searchWord);
  return (
    <div
      draggable={true}
      onDragStart={(ev) => {
        ev.dataTransfer.setData(
          "application/json",
          stringify({
            tagType: content.toLowerCase(),
            inner,
            oldId: "",
            classes,
          })
        );
      }}
      className={`${
        content.toLowerCase().includes(searchW.toLowerCase()) ||
        name.toLowerCase().includes(searchW.toLowerCase())
          ? ""
          : "hidden"
      } group h-[90px] bg-slate-800 border-[1.5px] border-slate-400 rounded-lg flex items-center  justify-center flex-col gap-[15px]`}
    >
      {Icons.code()}
      <p className="font-semibold text-white text-[13px] mb-[10px]">
        {name || content.toLowerCase()}
      </p>
    </div>
  );
};
