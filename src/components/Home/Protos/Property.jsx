import React, { useEffect, useState } from "react";
import {
  getOriginalCSSValue,
  getPropVal,
  setClassForCurrentEl,
  toJsProp,
} from "../../../helpers/functions";
import { P } from "../../Protos/P";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentElState,
  ifrDocument,
  undoAndRedoStates,
} from "../../../helpers/atoms";
import {
  isNumber,
  isString,
  transformToNumInput,
} from "../../../helpers/cocktail";
import { useSetClassForCurrentEl } from "../../../hooks/useSetclassForCurrentEl";

/**
 *
 * @param {{label:string, currentEl:HTMLElement , cssProp:string , allowText:boolean}} param0
 * @returns
 */
export const Property = ({ label, cssProp, allowText = false }) => {
  const currentElObj = useRecoilValue(currentElState);
  const ifrDocumentVal = useRecoilValue(ifrDocument);
  const setClass = useSetClassForCurrentEl();
  const setUndoAndRedoStatesVal = useSetRecoilState(undoAndRedoStates);
  const [val, setVal] = useState("");

  useEffect(() => {}, [currentElObj]);

  useEffect(() => {
    if (ifrDocumentVal && currentElObj.currentEl) {
      const styleElement =
        ifrDocumentVal.head.querySelector("#elements-classes");
      const prop = getOriginalCSSValue(
        currentElObj.currentEl,
        styleElement,
        cssProp
      );
      const valWithoutText = +parseInt(
        getPropVal(currentElObj.currentEl, cssProp)
      )
        ? +parseInt(getPropVal(currentElObj.currentEl, cssProp))
        : 0;
      const finalVal = allowText
        ? getPropVal(currentElObj.currentEl, cssProp)
        : Math.round(valWithoutText);
      setVal(prop || finalVal || 0);
      // allowText ? getPropVal(currentElObj.currentEl, cssProp) : Math.round(valWithoutText)
      console.log();
    }
  }, [currentElObj, ifrDocumentVal]);

  const onInput = (ev) => {
    if (!currentElObj.currentEl) {
      setVal("");
      return;
    }

    setClass({
      cssProp,
      value: `${+ev.target.value ? `${ev.target.value}px` : ev.target.value}`,
    });

    setVal(ev.target.value);
  };

  /**
   *
   * @param {{ev:KeyboardEvent , increase:boolean}} ev
   */
  const onKeyDown = (ev) => {
    const handleChange = ({ ev, increase }) => {
      const finalVal = `${
        increase  
          ? +parseInt(ev.target.value) + 1
          : +parseInt(ev.target.value) <= 0 ?  0  : +parseInt(ev.target.value) - 1 
      }${ev.target.value.split(/\d+/g).join("") || "px"}`;
      // setVal(finalVal);

      if (+parseInt(ev.target.value) < 0) {
        console.log("lesssss");
        setVal(0);
      }


      setClass({
        cssProp,
        value: finalVal,
      });

      setVal(finalVal);
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
          setUndoAndRedoStatesVal({
            isStyle: true,
            isDropping: false,
          });
        }}
        onInput={onInput}
        onKeyDown={onKeyDown}
        className="w-[70%] h-full shadow-inner shadow-gray-950  font-semibold bg-gray-900 rounded-lg p-2 outline-none text-white"
      />
    </section>
  );
};
