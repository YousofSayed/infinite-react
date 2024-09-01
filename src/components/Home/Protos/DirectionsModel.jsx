import React, { useEffect, useRef, useState } from "react";
import { Icons } from "../../Icons/Icons";
import { Property } from "./Property";
import directionsImg from "../../../assets/images/directions.png";
import { SidesControllers } from "./SideControllers";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentElState,
  ifrDocument,
  undoAndRedoStates,
} from "../../../helpers/atoms";
import {
  onFocus,
  onInput,
  onKeyDown,
  onKeyUp,
} from "../../../helpers/propertyInputHandlers";
import { useSetClassForCurrentEl } from "../../../hooks/useSetclassForCurrentEl";
import { getOriginalCSSValue } from "../../../helpers/functions";

/**
 *
 * @param {{tProp:string , rProp:string , bProp:string , lProp:string}} param0
 * @returns
 */
export const DirectionsModel = ({ tProp, rProp, bProp, lProp }) => {
  const currentElObj = useRecoilValue(currentElState);
  const ifrDocVal = useRecoilValue(ifrDocument);
  const setUndoAndRedoStatesVal = useSetRecoilState(undoAndRedoStates);
  const setClass = useSetClassForCurrentEl();
  const [option, setOption] = useState("");
  const [vals, setVal] = useState({
    tVal: "",
    rVal: "",
    bVal: "",
    lVal: "",
  });

  useEffect(() => {
    if (currentElObj && ifrDocVal) {
      const styleElement = ifrDocVal.head.querySelector("#elements-classes");
      const getVal = (prop) =>
        getOriginalCSSValue(currentElObj.currentEl, styleElement, prop) || "";
      setVal({
        tVal: getVal(tProp),
        rVal: getVal(rProp),
        bVal: getVal(bProp),
        lVal: getVal(lProp),
      });
    }
  }, [currentElObj, ifrDocVal]);
  const isCurrentELChange = useRef(false);

  /**
   *
   * @param {string} val
   * @param {string} specificProp
   */
  const handleVals = (val, specificProp) => {
    if (option == "all") {
      setVal({
        tVal: val,
        rVal: val,
        bVal: val,
        lVal: val,
      });
    } else if (option == "tb") {
      setVal({
        ...vals,
        tVal: val,
        bVal: val,
      });
    } else if (option == "lr") {
      setVal({
        ...vals,
        rVal: val,
        lVal: val,
      });
    } else {
      setVal({
        ...vals,
        [specificProp]: val,
      });
    }
  };

  const handleClass = ({ cssProp, value }) => {
    const allProps = [tProp, rProp, bProp, lProp];
    const tbProp = [tProp, bProp];
    const lrProp = [lProp, rProp];
    if (option == "all") {
      setClass({
        cssProp: allProps,
        value,
      });
    } else if (option == "tb") {
      setClass({
        cssProp: tbProp,
        value,
      });
    } else if (option == "lr") {
      setClass({
        cssProp: lrProp,
        value,
      });
    } else {
      setClass({
        cssProp,
        value,
      });
    }
  };

  /**
   *
   * @param {InputEvent} ev
   */
  //   const onInput = (ev) => {};

  return (
    <section className="flex flex-col gap-[15px]">
      <SidesControllers option={option} setOption={setOption} />
      <section className="flex flex-col gap-2 justify-center items-center">
        <div className="flex items-center justify-center">
          <input
            value={vals.tVal}
            placeholder="Top"
            onInput={(ev) => {
              onInput({
                cssProp: tProp,
                ev,
                setClass: handleClass,
                setVal: (val) => {
                  handleVals(val, "tVal");
                },
                isCurrentELChange,
                currentElObj,
              });
            }}
            onKeyUp={(ev) => {
              onKeyUp({ ev, isCurrentELChange });
            }}
            onKeyDown={(ev) => {
              onKeyDown({
                ev,
                isCurrentELChange,
                cssProp: tProp,
                setClass: handleClass,
                setVal: (val) => {
                  handleVals(val, "tVal");
                },
              });
            }}
            onFocus={(ev) => {
              onFocus({ ev, setUndoAndRedoStatesVal });
            }}
            type="text"
            className="p-2 text-center bg-slate-800 rounded-lg w-[35%] text-slate-200 outline-none font-semibold"
          />
        </div>
        <figure className="flex items-center justify-center gap-3">
          <input
          placeholder="Right"
            value={vals.lVal}
            onInput={(ev) => {
              onInput({
                cssProp: lProp,
                ev,
                setClass: handleClass,
                setVal: (val) => {
                  handleVals(val, "lVal");
                },
                isCurrentELChange,
                currentElObj,
              });
            }}
            onKeyUp={(ev) => {
              onKeyUp({ ev, isCurrentELChange });
            }}
            onKeyDown={(ev) => {
              onKeyDown({
                ev,
                isCurrentELChange,
                cssProp: lProp,
                setClass: handleClass,
                setVal: (val) => {
                  handleVals(val, "lVal");
                },
              });
            }}
            onFocus={(ev) => {
              onFocus({ ev, setUndoAndRedoStatesVal });
            }}
            type="text"
            className="p-2 bg-slate-800 text-center rounded-lg w-[30%] max-w-[100px] text-slate-200 outline-none font-semibold"
          />
          <img src={directionsImg} className="w-[40%]  object-fill" alt="" />
          <input
          placeholder="Bottom"
            value={vals.rVal}
            onInput={(ev) => {
              onInput({
                cssProp: rProp,
                ev,
                setClass: handleClass,
                setVal: (val) => {
                  handleVals(val, "rVal");
                },
                isCurrentELChange,
                currentElObj,
              });
            }}
            onKeyUp={(ev) => {
              onKeyUp({ ev, isCurrentELChange });
            }}
            onKeyDown={(ev) => {
              onKeyDown({
                ev,
                isCurrentELChange,
                cssProp: rProp,
                setClass: handleClass,
                setVal: (val) => {
                  handleVals(val, "rVal");
                },
              });
            }}
            onFocus={(ev) => {
              onFocus({ ev, setUndoAndRedoStatesVal });
            }}
            type="text"
            className="p-2 bg-slate-800 text-center rounded-lg w-[30%] max-w-[100px] text-slate-200 outline-none font-semibold"
          />
        </figure>
        <div className="flex items-center justify-center">
          <input
          placeholder="Left"
            value={vals.bVal}
            onInput={(ev) => {
              onInput({
                cssProp: bProp,
                ev,
                setClass: handleClass,
                setVal: (val) => {
                  handleVals(val, "bVal");
                },
                isCurrentELChange,
                currentElObj,
              });
            }}
            onKeyUp={(ev) => {
              onKeyUp({ ev, isCurrentELChange });
            }}
            onKeyDown={(ev) => {
              onKeyDown({
                ev,
                isCurrentELChange,
                cssProp: bProp,
                setClass: handleClass,
                setVal: (val) => {
                  handleVals(val, "bVal");
                },
              });
            }}
            onFocus={(ev) => {
              onFocus({ ev, setUndoAndRedoStatesVal });
            }}
            type="text"
            className="p-2 bg-slate-800 text-center rounded-lg w-[35%] text-slate-200 outline-none font-semibold"
          />
        </div>
      </section>
    </section>
  );
};
