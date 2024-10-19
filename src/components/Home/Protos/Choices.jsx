import React from "react";
import { Icons } from "../../Icons/Icons";
import { SmallButton } from "./SmallButton";
import { useRecoilValue } from "recoil";
import { selectorState } from "../../../helpers/atoms";

/**
 *
 * @param {{keywords : string[] , className:string , onItemClick : ({ev , keyword , index} : {ev:MouseEvent , keyword:string , index:number})=>void,  itemClassName:React.HTMLAttributes.className,  onCloseClick : (ev : MouseEvent , keyword : string , index:number) => void , }} param0
 * @returns
 */
export const Choices = ({
  keywords,
  itemClassName = "bg-blue-600",
  className='',
  onItemClick = (_ev, _keyword, _index) => {},
  onCloseClick = (_, _1) => {},
}) => {
  const selector = useRecoilValue(selectorState);
  return (
    <section
      className={`w-full min-h-[50px]   overflow-x-auto gap-2 flex items-center py-[5px] px-2 rounded-lg bg-slate-800 ${className}`}
    >
      {keywords.map((keyword, i) => {
        return (
          keyword && (
            <p
              onClick={(ev) => {
                ev.stopPropagation();
                onItemClick({ ev, keyword, index: i });
              }}
              key={i}
              className={`relative group px-[20px] w-fit cursor-pointer select-none  flex-shrink-0 py-[10px] text-white ${itemClassName.index == i ? itemClassName.className : 'bg-gray-900'} transition-all rounded-lg font-semibold`}
            >
              {keyword}
              <i
                onClick={(ev) => {
                  onCloseClick(ev, keyword, i);
                }}
                className="absolute transition-all cursor-pointer opacity-0 group-hover:opacity-[1]  right-[-5px] top-[-5px]"
              >
                {Icons.close("", "", "white")}
              </i>
            </p>
          )
        );
      })}
    </section>
  );
};
