import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { currentElState } from "../../../helpers/atoms";
import { getPropVal, toJsProp } from "../../../helpers/functions";
import { isFunction } from "../../../helpers/cocktail";

/**
 *
 * @param {{icons:HTMLOrSVGElement[] , cssProp : string , choices:string[]}}} param0
 * @returns
 */
export const MultiChoice = ({ icons, cssProp, choices }) => {
  const [currentChoice, setCurrentChoice] = useState(null);
  const lastIndex = useRef(null);
  const currentEl = useRecoilValue(currentElState);

  useEffect(()=>{
    const currentElCssVal = getPropVal(currentEl , cssProp) ;
    const currentElCssIndex = choices.findIndex(choice =>choice.trim() == currentElCssVal.trim() );

    
    setCurrentChoice(currentElCssIndex);
    
  },[currentEl])

  const handleSelecting = (index)=>{
    if(index == lastIndex.current){
        setCurrentChoice(null);
        lastIndex.current = null;
        currentEl.style[toJsProp(cssProp)] = ``;
        return;
    }
    currentEl.style[toJsProp(cssProp)] = choices[index];
    lastIndex.current = index;
    setCurrentChoice(index);

  }

  return (
    <ul className="flex justify-between items-center  w-full p-2 bg-slate-800 rounded-lg transition-all">
      {icons.map((icon, i) => (
        <li
          key={i}
          className={`group cursor-pointer flex justify-center items-center w-[30px] h-[30px]   rounded-full ${i == currentChoice ? 'p-2 bg-gray-900 shadow-md shadow-gray-900 ' : ''}  transition-all`}
          onClick={(ev)=>{handleSelecting(i)}}
        >
          { icon(i == currentChoice ? 'white' : '')}
        </li>
      ))}
    </ul>
  );
};
