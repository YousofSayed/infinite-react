import React from "react";
import { Icons } from "../../Icons/Icons";
import { SmallButton } from "./SmallButton";

/**
 *
 * @param {{keywords : string[] , currentIndexChoice:number, keywordsIndex:number, onCloseClick : (ev : MouseEvent , keyword : string , index:number) => void , onDelete:(ev:MouseEvent)=>void , onSelect:(ev:MouseEvent)=>void}} param0
 * @returns
 */
export const Choices = ({
  keywords,
  onCloseClick = (_, _1) => {},
}) => {
  return (
      <section
        className={`w-full min-h-[50px]  overflow-x-auto gap-2 flex items-center py-[5px] px-2 rounded-lg bg-slate-800 `}
      >
        {keywords.map((keyword, i) => {
          return (
            <p
              key={i}
              className="relative group px-[20px] w-fit  flex-shrink-0 py-[10px] text-white bg-blue-600 rounded-lg font-semibold"
            >
              {keyword}
              <i
                onClick={(ev) => {
                  onCloseClick(ev, keyword, i);
                }}
                className="absolute transition-all cursor-pointer opacity-0 group-hover:opacity-[1]  right-[5px] top-[5px]"
              >
                {Icons.close("", "", "white")}
              </i>
            </p>
          );
        })}
      </section>
      
  );
};
