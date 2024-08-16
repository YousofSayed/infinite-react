import React, { useRef, useState, useTransition } from "react";
import { useRecoilValue } from "recoil";
import { currentElState } from "../../../helpers/atoms";
import { HexAlphaColorPicker, HexColorInput } from "react-colorful";
import { hexToRgbA, toJsProp } from "../../../helpers/functions";
import { useCloseMenu } from "../../../assets/hooks/useCloseMenu";

export const Color = ({ cssProp }) => {
  const currentEl = useRecoilValue(currentElState);
  const [color, setColor] = useState("#111827");
  const [showHexColor, setShowHexColor] = useState(false);
  const [val, setVal] = useState("");
  const [isPending, setTransition] = useTransition();
  const hexColorRef = useRef();

  useCloseMenu(hexColorRef , setShowHexColor);

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
            onChange={(color) => {
              currentEl.style[toJsProp(cssProp)] = color;
              setColor(color);
              setVal(color);
            }}
            
          />
        </section>
      )}

      <input
        onFocus={(ev) => {
          ev.target.select();
        }}
        onInput={(ev) => {
          currentEl.style[toJsProp(cssProp)] = ev.target.value;
          setColor(ev.target.value);
          setVal(ev.target.value);
        }}
        className={`bg-gray-900 p-2 outline-none text-center text-slate-200 font-semibold w-[50%] rounded-lg`}
        type="text"
        value={val}
      />

      <p
        className={`w-[20%] p-2 text-slate-200 text-[14px] font-bold flex justify-center items-center rounded-lg  bg-gray-900`}
      >
        {hexToRgbA(color).opacity}
      </p>
    </section>
  );
};
