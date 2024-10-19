import React, { useEffect, useRef, useState, useTransition } from "react";
import { useRecoilValue } from "recoil";
import { currentElState, ifrDocument } from "../../../helpers/atoms";
import { HexAlphaColorPicker, HexColorInput } from "react-colorful";
import {
  getPropVal,
  hexToRgbA,
  rgbStringToHex,
  setClassForCurrentEl,
  toJsProp,
} from "../../../helpers/functions";
import { useSetClassForCurrentEl } from "../../../hooks/useSetclassForCurrentEl";
import { useCloseMenu } from "../../../hooks/useCloseMenu";
import { useUpdateInputValue } from "../../../hooks/useUpdateInputValue";

/**
 *
 * @param {{cssProp:string , placeholder:string , hideOpacityField:boolean}} param0
 * @returns
 */
export const Color = ({ cssProp, placeholder, hideOpacityField = false }) => {
  const setClass = useSetClassForCurrentEl();
  const currentElObj = useRecoilValue(currentElState);
  const ifrDocumentVal = useRecoilValue(ifrDocument);
  const [color, setColor] = useState("#111827");
  const [showHexColor, setShowHexColor] = useState(false);
  const [isPending, setTransition] = useTransition();
  /**
   * @type {{current:HTMLElement}}
   */
  const hexColorRef = useRef();
  const parentRef = useRef(null);
  useEffect(() => {
    if (hexColorRef.current) {
      hexColorRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    } 
  }, [showHexColor]);

  useCloseMenu(hexColorRef , setShowHexColor);

  // useEffect(() => {
  //   setColor(rgbStringToHex(getPropVal(currentElObj.currentEl, cssProp)));
  // }, [currentElObj]);

  useUpdateInputValue({setVal:setColor , cssProp})

  return (
    <section
    
      className={`relative flex justify-between items-center bg-slate-800 w-full ${
        hideOpacityField ? "p-1 gap-2" : "p-2"
      } rounded-lg`}
    >
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
        <section
         
          ref={hexColorRef}
          className="absolute left-[0] z-[1]  top-[calc(100%+5px)] w-full"
        >
          <HexAlphaColorPicker
            color={color}
            className="z-40"
            onChange={(color) => {
              setClass({
                cssProp,
                value: color,
              });

              setColor(color);
            }}
          />
        </section>
      )}

      <input
        placeholder={placeholder}
        onFocus={(ev) => {
          ev.target.select();
        }}
        onInput={(ev) => {
          setClass({
            cssProp,
            value: ev.target.value,
          });
          setColor(ev.target.value);
        }}
        className={`bg-gray-900 shadow-inner shadow-gray-950 p-2 outline-none text-center text-slate-200 font-semibold ${
          hideOpacityField ? "w-[calc(100%-30px)]" : "w-[50%]"
        } rounded-lg`}
        type="text"
        value={color}
      />

      {!hideOpacityField && (
        <p
          className={`w-[20%] p-2 text-slate-200 text-[14px] font-bold flex justify-center items-center rounded-lg  bg-gray-900`}
        >
          {hexToRgbA(color||'').opacity}
        </p>
      )}
    </section>
  );
};
