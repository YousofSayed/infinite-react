import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { currentElState } from "../../../helpers/atoms";
import { getPropVal } from "../../../helpers/functions";
import { useSetClassForCurrentEl } from "../../../hooks/useSetclassForCurrentEl";

/**
 *
 * @param {{label:string, icons:HTMLOrSVGElement[] , cssProp : string , choices:string[]}}} param0
 * @returns
 */
export const MultiChoice = ({ label , icons, cssProp, choices }) => {
  const setClass= useSetClassForCurrentEl();
  const currentElObj = useRecoilValue(currentElState);
  const [currentChoice, setCurrentChoice] = useState(null);
  const lastIndex = useRef(null);

  useEffect(()=>{
    const currentElCssVal = getPropVal(currentElObj.currentEl , cssProp) ;
    const currentElCssIndex = choices.findIndex(choice =>choice.trim() == currentElCssVal.trim() );

    
    setCurrentChoice(currentElCssIndex);
    
  },[currentElObj])

  const handleSelecting = (index)=>{
    if(index == lastIndex.current){
        setCurrentChoice(null);
        lastIndex.current = null;
        
        setClass({
          cssProp , 
          value:'',
        });
        return;
    }
    
    setClass({
      cssProp , 
      value: choices[index],
    });
    lastIndex.current = index;
    setCurrentChoice(index);

  }

  return (
    <ul className="flex justify-between flex-nowrap items-center  w-full p-2 bg-slate-800 rounded-lg transition-all">
      {icons.map((icon, i) => (
        <li
        title={choices[i]}
          key={i}
          className={`group cursor-pointer flex justify-center items-center p-2   rounded-full ${i == currentChoice ? ' bg-gray-900 shadow-md shadow-gray-900 ' : ''}  transition-[background]`}
          onClick={(ev)=>{handleSelecting(i)}}
        >
          { icon(i == currentChoice ? 'white' : '')}
        </li>
      ))}
    </ul>
  );
};
