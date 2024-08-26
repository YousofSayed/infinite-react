import React, { useEffect, useState } from "react";
import {
  getPropVal,
  setClassForCurrentEl,
  toJsProp,
} from "../../../helpers/functions";
import { P } from "../../Protos/P";
import { useRecoilValue } from "recoil";
import { currentElState, ifrDocument } from "../../../helpers/atoms";
import {
  isNumber,
  isString,
  transformToNumInput,
} from "../../../helpers/cocktail";
import { useSetClassForCurrentEl } from "../../../hooks/useSetclassForCurrentEl";

/**
 *
 * @param {{label:string, currentEl:HTMLElement , cssProp:string , tailwindClass:string}} param0
 * @returns
 */
export const Property = ({ label, cssProp, allowText = false }) => {
  const currentEl = useRecoilValue(currentElState);
  const ifrDocumentVal = useRecoilValue(ifrDocument);
  const setClass = useSetClassForCurrentEl();

  const [render, setRerender] = useState("");
  const [val, setVal] = useState("");

  useEffect(() => {
    const valWithoutText = +parseInt(getPropVal(currentEl, cssProp))
      ? +parseInt(getPropVal(currentEl, cssProp))
      : 0;
      
    setVal(allowText ? getPropVal(currentEl, cssProp) : Math.round(valWithoutText));
  }, [currentEl]);

  const onInput = (ev) => {
    if (!currentEl) {
      setVal("");
      return;
    }

    setClass({
      cssProp,
      value:`${+ev.target.value ? `${ev.target.value}px` : ev.target.value}`
    });


    setVal(ev.target.value);
  };

  /**
   *
   * @param {{ev:KeyboardEvent , increase:boolean}} ev
   */
  const onKeyDown = (ev) => {
    const handleChange = ({ ev, increase }) => {
      if (!ev.target.value) ev.target.value = 0;
      ev.target.value = `${
        increase
          ? +parseInt(ev.target.value) + 1
          : +parseInt(ev.target.value) - 1
      }${ev.target.value.split(/\d+/gi).join("")}`;
      if (parseInt(ev.target.value) <= 0) {
        ev.target.value = 0;
        return;
      }

      setClass({
        cssProp,
        value:`${+ev.target.value ? `${ev.target.value}px` : ev.target.value}`
      });
    };

    if (ev.key == "ArrowUp") {
      ev.preventDefault();
      handleChange({ ev, increase: true });
    } else if (ev.key == "ArrowDown") {
      ev.preventDefault();
      handleChange({ ev, increase: false });
    }
  };

  return (
    <section className="flex flex-nowrap justify-between   items-center  bg-slate-800 p-1 px-2 rounded-lg">
      <P>{label} : </P>
      <input
        type="text"
        value={val}
        onFocus={(ev) => {
          ev.target.select();
        }}
        onInput={onInput}
        onKeyDown={onKeyDown}
        className="w-[70%] h-full  font-semibold bg-gray-900 rounded-lg p-2 outline-none text-white"
      />
    </section>
  );
};
