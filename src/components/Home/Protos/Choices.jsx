import React, { useEffect, useRef, useState } from "react";
import { Icons } from "../../Icons/Icons";
import { SmallButton } from "./SmallButton";
import { useRecoilValue } from "recoil";
import { currentElState, selectorState } from "../../../helpers/atoms";

/**
 *
 * @param {{keywords : string[] , className:string , onActive : ({ keyword , index} : { keyword:string , index:number})=>void, onUnActive : ({ keyword , index} : { keyword:string , index:number})=>void,  enableSelecting:boolean,  onCloseClick : (ev : MouseEvent , keyword : string , index:number) => void , }} param0
 * @returns
 */
export const Choices = ({
  keywords,
  enableSelecting = false,
  className = "", 
  onActive = (_ev, _keyword, _index) => {},
  onUnActive = (_ev, _keyword, _index) => {},
  onCloseClick = (_, _1) => {},
}) => {
  const sle = useRecoilValue(currentElState);
  const [active, setActive] = useState(false);
  const [keyword, setKeyword] = useState("");
  const currentIndex = useRef();

  useEffect(()=>{
    setActive(false);
  },[sle])

  useEffect(() => {
    active
      ? onActive({ keyword, index: currentIndex.current })
      : onUnActive({ keyword, index: currentIndex.current });
  }, [active, keyword]);

  return (
    <section
      className={`w-full min-h-[50px]   overflow-x-auto gap-2 flex items-center py-[5px] px-2 rounded-lg  ${className ? className : 'bg-slate-800'}`}
    >
      {keywords.map((keyword, i) => {
        return (
          keyword && (
            <p
              onClick={(ev) => {
                ev.stopPropagation();
                setActive(!active);
                currentIndex.current = i;
                setKeyword(keyword);
              }}
              key={i}
              className={`relative group px-[20px] w-fit cursor-pointer select-none  flex-shrink-0 py-[10px] text-white ${
                enableSelecting && active && currentIndex.current == i
                  ? "bg-blue-600"
                  : enableSelecting
                  ? "bg-gray-900"
                  : "bg-blue-600"
              }  transition-all rounded-lg font-semibold`}
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
