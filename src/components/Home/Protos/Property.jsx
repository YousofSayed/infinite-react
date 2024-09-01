import React, { useEffect, useRef, useState } from "react";
import {
  getOriginalCSSValue,
  getPropVal,
  isValidCssUnit,
} from "../../../helpers/functions";
import { P } from "../../Protos/P";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentElState,
  ifrDocument,
  undoAndRedoStates,
} from "../../../helpers/atoms";
import { transformToNumInput } from "../../../helpers/cocktail";
import { useSetClassForCurrentEl } from "../../../hooks/useSetclassForCurrentEl";
import {
  onFocus,
  onInput,
  onKeyDown,
  onKeyUp,
} from "../../../helpers/propertyInputHandlers";

/**
 *
 * @param {{label:string,  cssProp:string , sectionClassName:string ,inputClassName:string , allowText:boolean , special:boolean}} param0
 * @returns
 */
export const Property = ({
  label,
  cssProp,
  sectionClassName = "",
  inputClassName = "",
  allowText = false,
  special = false,
}) => {
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

  // /**
  //  *
  //  * @param {InputEvent} ev
  //  * @returns
  //  */
  // const onInput = (ev) => {
  //   special && transformToNumInput(ev.target);
  //   if (isCurrentELChange.current) {
  //     console.log("isCurrentELChange", isCurrentELChange.current);
  //     return;
  //   }

  //   if (!currentElObj.currentEl) {
  //     setVal("");
  //     return;
  //   }
  //   const finalVal = special ? ev.target.value : isValidCssUnit(ev.target.value) ? ev.target.value : 0;
  //   setVal(ev.target.value);

  //   setClass({
  //     cssProp: cssProp,
  //     value:  finalVal ,
  //   });
  // };

  // /**
  //  *
  //  * @param {KeyboardEvent} ev
  //  */
  // const onKeyDown = (ev) => {
  //   /**
  //    *
  //    * @param {{ev:KeyboardEvent , increase:boolean}} ev
  //    */
  //   const handleChange = ({ ev, increase }) => {
  //     const finalVal = `${
  //       increase
  //         ? +parseInt(ev.target.value) + 1
  //         : +parseInt(ev.target.value) <= 0
  //         ? 0
  //         : +parseInt(ev.target.value) - 1
  //     }${
  //       isValidCssUnit(ev.target.value.split(/\d+/g).join(""))
  //         ? ev.target.value.split(/\d+/g).join("")
  //         : "px"
  //     }`;

  //     console.log(+parseInt(ev.target.value));

  //     setClass({
  //       cssProp,
  //       value: +parseInt(ev.target.value) ? finalVal : isValidCssUnit(ev.target.value) ? ev.target.value : 0,
  //     });

  //     setVal(ev.target.value);
  //   };

  //   if (ev.key == "ArrowUp") {
  //     ev.preventDefault();
  //     handleChange({ ev, increase: true });
  //   } else if (ev.key == "ArrowDown") {
  //     ev.preventDefault();
  //     handleChange({ ev, increase: false });
  //   }

  //   if ((ev.ctrlKey && ev.key == "z") || (ev.ctrlKey && ev.key == "y")) {
  //     isCurrentELChange.current = true;
  //   }
  // };

  // /**
  //  *
  //  * @param {KeyboardEvent} ev
  //  */
  // const onKeyUp = (ev) => {
  //   if ((ev.ctrlKey && ev.key == "z") || (ev.ctrlKey && ev.key == "y")) {
  //     isCurrentELChange.current = false;
  //   }
  // };

  return (
    <section
      className={`${sectionClassName} flex flex-nowrap justify-between   items-center  bg-slate-800 p-1 px-2 rounded-lg`}
    >
      {label ? <P>{label} : </P> : ""}
      <input
        type="text"
        value={val}
        onFocus={(ev) => {
          onFocus({
            ev,
            setUndoAndRedoStatesVal,
          });
        }}
        onKeyUp={(ev) => {
          onKeyUp({ ev, isCurrentELChange });
        }}
        onInput={(ev) => {
          onInput({ ev, isCurrentELChange, setClass, setVal , special , currentElObj , cssProp});
        }}
        onKeyDown={(ev) => {
          onKeyDown({ ev, setClass, setVal , isCurrentELChange , cssProp});
        }}
        className={`${
          inputClassName ? inputClassName : "w-[70%]"
        } h-full shadow-inner shadow-gray-950  font-semibold bg-gray-900 rounded-lg p-2 outline-none text-white`}
      />
    </section>
  );
};
