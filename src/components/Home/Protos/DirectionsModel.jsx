import React, { useEffect, useRef, useState } from "react";
import { Icons } from "../../Icons/Icons";
import { Property } from "./Property";
import directionsImg from "../../../assets/images/directions.png";
import { SidesControllers } from "./SideControllers";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentElState, ifrDocument } from "../../../helpers/atoms";

import { useSetClassForCurrentEl } from "../../../hooks/useSetclassForCurrentEl";
import { SidesInput } from "./SidesInput";

/**
 *
 * @param {{defultoption: 'all' | 'lr' | 'tb',  tProp:string , rProp:string , bProp:string , lProp:string}} param0
 * @returns
 */
export const DirectionsModel = ({
  defultoption = "all",
  tProp,
  rProp,
  bProp,
  lProp,
}) => {
  const setClass = useSetClassForCurrentEl();
  const [option, setOption] = useState(defultoption);
  const [vals, setVal] = useState({
    tVal: "",
    rVal: "",
    bVal: "",
    lVal: "",
  });

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
    <section className="flex flex-col gap-2">
      <SidesControllers option={option} setOption={setOption} />
      <section className="flex flex-col gap-2 justify-center items-center bg-gray-950 p-2 rounded-lg">
        <div className="flex items-center justify-center">
          <SidesInput
            value={vals.tVal}
            placeholder={"Top"}
            cssProp={tProp}
            handleClass={handleClass}
            handleVals={handleVals}
            isCurrentELChange={isCurrentELChange}
          />
        </div>
        <figure className="flex items-center justify-center gap-3">
          <SidesInput
            value={vals.lVal}
            placeholder={"Left"}
            cssProp={lProp}
            handleClass={handleClass}
            handleVals={handleVals}
            isCurrentELChange={isCurrentELChange}
          />

          <img src={directionsImg} className="w-[40%]  object-fill" alt="" />
          <SidesInput
            value={vals.rVal}
            placeholder={"Right"}
            cssProp={rProp}
            handleClass={handleClass}
            handleVals={handleVals}
            isCurrentELChange={isCurrentELChange}
          />
        </figure>
        <div className="flex items-center justify-center">
          <SidesInput
            value={vals.bVal}
            placeholder="Bottom"
            cssProp={bProp}
            handleClass={handleClass}
            handleVals={handleVals}
            isCurrentELChange={isCurrentELChange}
          />
        </div>
      </section>
    </section>
  );
};
