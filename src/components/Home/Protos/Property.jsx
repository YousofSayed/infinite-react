import React, { useEffect, useRef, useState } from "react";
import {
  getOriginalCSSValue,
  getPropVal,
  isValidCssUnit,
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
  const isCurrentELChange = useRef(false);

  useEffect(() => {
    if (ifrDocumentVal && currentElObj.currentEl) {
      const styleElement =
        ifrDocumentVal.head.querySelector("#elements-classes");
      const prop =
        getOriginalCSSValue(currentElObj.currentEl, styleElement, cssProp) ||
        "";

      const valWithoutText = +parseInt(
        getPropVal(currentElObj.currentEl, cssProp)
      )
        ? +parseInt(getPropVal(currentElObj.currentEl, cssProp))
        : 0;
      const finalVal = allowText
        ? getPropVal(currentElObj.currentEl, cssProp)
        : Math.round(valWithoutText);

      setVal(prop);
    }
  }, [currentElObj, ifrDocumentVal]);

  /**
   *
   * @param {InputEvent} ev
   * @returns
   */
  const onInput = (ev) => {
    if (isCurrentELChange.current) {
      console.log("isCurrentELChange", isCurrentELChange.current);
      return;
    }

    if (!currentElObj.currentEl) {
      setVal("");
      return;
    }

    const finalVal = `${+parseInt(ev.target.value)}${
      isValidCssUnit(ev.target.value.split(/\d+/g).join(""))
        ? ev.target.value.split(/\d+/g).join("")
        : "px"
    }`;

    setVal(ev.target.value);

    setClass({
      cssProp: ev.target.value ? cssProp : "",
      value: ev.target.value ? finalVal : "",
    });
  };

  /**
   *
   * @param {KeyboardEvent} ev
   */
  const onKeyDown = (ev) => {
    /**
     *
     * @param {{ev:KeyboardEvent , increase:boolean}} ev
     */
    const handleChange = ({ ev, increase }) => {
      const finalVal = `${
        increase
          ? +parseInt(ev.target.value) + 1
          : +parseInt(ev.target.value) <= 0
          ? 0
          : +parseInt(ev.target.value) - 1
      }${
        isValidCssUnit(ev.target.value.split(/\d+/g).join(""))
          ? ev.target.value.split(/\d+/g).join("")
          : "px"
      }`;

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

    if ((ev.ctrlKey && ev.key == "z") || (ev.ctrlKey && ev.key == "y")) {
      isCurrentELChange.current = true;
    }
  };

  /**
   *
   * @param {KeyboardEvent} ev
   */
  const onKeyUp = (ev) => {
    if ((ev.ctrlKey && ev.key == "z") || (ev.ctrlKey && ev.key == "y")) {
      isCurrentELChange.current = false;
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
        onKeyUp={onKeyUp}
        onInput={onInput}
        onKeyDown={onKeyDown}
        className="w-[70%] h-full shadow-inner shadow-gray-950  font-semibold bg-gray-900 rounded-lg p-2 outline-none text-white"
      />
    </section>
  );
};
