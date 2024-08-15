import React, { useEffect, useState } from "react";
import { getPropVal, toJsProp } from "../../../helpers/functions";
import { P } from "../../Protos/P";
import { useRecoilValue } from "recoil";
import { currentElState } from "../../../helpers/atoms";
import { transformToNumInput } from "../../../helpers/cocktail";

/**
 *
 * @param {{label:string, currentEl:HTMLElement , cssProp:string , tailwindClass:string}} param0
 * @returns
 */
export const Property = ({ label, cssProp }) => {
  const currentEl = useRecoilValue(currentElState);
  const [render , setRerender] = useState('')
  const [val , setVal] = useState('');

  useEffect(()=>{setVal(getPropVal(currentEl, cssProp))},[currentEl]);

  const onInput = (ev) => {
    if (!currentEl) {
      setVal("")
      return;
    }
    currentEl.style[toJsProp(cssProp)] = `${
      +ev.target.value ? `${ev.target.value}px` : ev.target.value
    }`;

    setVal(ev.target.value)
  };

  /**
   *
   * @param {KeyboardEvent} ev
   */
  const onKeyDown = (ev) => {
    const handleChange = ({ ev, increase }) => {
      ev.target.value = `${
        increase
          ? +parseInt(ev.target.value) + 1
          : +parseInt(ev.target.value) - 1
      }${ev.target.value.split(/\d+/gi).join("")}`;
      currentEl.style[toJsProp(cssProp)] = `${
        +ev.target.value ? `${ev.target.value}px` : ev.target.value
      }`;
    };

    if (ev.key == "ArrowUp") {
      handleChange({ ev, increase: true });
    } else if (ev.key == "ArrowDown") {
      handleChange({ ev, increase: false });
    }
  };

  return (
    <section className="flex flex-nowrap justify-between   items-center  bg-slate-800 p-1 px-2 rounded-lg">
      <P>{label} : </P>
      <input
        type="text"
        value={val}
        onInput={onInput}
        onKeyDown={onKeyDown}
        className="w-[70%] h-full bg-gray-900 rounded-lg p-2 outline-none text-white"
      />
    </section>
  );
};
