import React, { useEffect, useRef, useState, useTransition } from "react";
import { useRecoilValue } from "recoil";
import { currentElState, ifrDocument } from "../../../helpers/atoms";
import { HexAlphaColorPicker, HexColorInput } from "react-colorful";
import { getPropVal, hexToRgbA, rgbStringToHex, setClassForCurrentEl, toJsProp } from "../../../helpers/functions";
import { useSetClassForCurrentEl } from "../../../hooks/useSetclassForCurrentEl";

export const Color = ({ cssProp }) => {
  const setClass = useSetClassForCurrentEl();
  const currentElObj = useRecoilValue(currentElState);
  const ifrDocumentVal = useRecoilValue(ifrDocument);
  const [color, setColor] = useState("#111827");
  const [showHexColor, setShowHexColor] = useState(false);
  const [isPending, setTransition] = useTransition();
  const hexColorRef = useRef();

  useEffect(()=>{
    setColor(rgbStringToHex(getPropVal(currentElObj.currentEl , cssProp)));
  },[currentElObj])


  return (
    <section className="relative flex justify-between items-center bg-slate-800 w-full p-2 rounded-lg">
      <button
        onClick={(ev) => {
          setTransition(() => {
            setShowHexColor(!showHexColor);
          });
        }}
        style={{ backgroundColor: color }}
        className={`w-[30px] h-[30px] shadow-md shadow-gray-950 rounded-lg border-[2.3px] border-slate-600  bg-gray-900 cursor-pointer`}
      ></button>
      {showHexColor && (
        <section ref={hexColorRef} className="absolute left-[0]  top-[calc(100%+5px)] w-full">
          <HexAlphaColorPicker
            color={color}
            onBlur={(ev)=>{
              setShowHexColor(false);
            }}
            onChange={(color) => {
              

              setClass({
                cssProp , 
                value:color,
              });

              setColor(color);
            }}
            
          />
        </section>
      )}

      <input
        onFocus={(ev) => {
          ev.target.select();
        }}
        onInput={(ev) => {
          setClass({
            cssProp , 
            value:ev.target.value,
          });
          setColor(ev.target.value);
        }}
        className={`bg-gray-900 shadow-inner shadow-gray-950 p-2 outline-none text-center text-slate-200 font-semibold w-[50%] rounded-lg`}
        type="text"
        value={color}
      />

      <p
        className={`w-[20%] p-2 text-slate-200 text-[14px] font-bold flex justify-center items-center rounded-lg  bg-gray-900`}
      >
        {hexToRgbA(color).opacity}
      </p>
    </section>
  );
};
