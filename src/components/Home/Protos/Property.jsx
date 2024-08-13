import React from "react";
import { getPropVal, toJsProp } from "../../../helpers/functions";
import { P } from "../../Protos/P";
import { useRecoilValue } from "recoil";
import { currentElState } from "../../../helpers/atoms";

/**
 *
 * @param {{label:string, currentEl:HTMLElement , cssProp:string , tailwindClass:string}} param0
 * @returns
 */
export const Property = ({ label , cssProp, tailwindClass }) => {
    const currentEl = useRecoilValue(currentElState);
  const onInput = (ev) => {
    currentEl.style[toJsProp(cssProp)] = `${ev.target.value}`;
    console.log(currentEl.style.cssText);

    // ev.target.placeholder = ev.target.value;
  };

  return (
    <section className="flex flex-nowrap justify-between   items-center  bg-slate-800 p-1 px-2 rounded-lg">
      <P>{label} : </P>
      <input
        type="text"
        placeholder={getPropVal(currentEl, cssProp)}
        onInput={onInput}
        className="w-[70%] h-full bg-gray-900 rounded-lg p-2 outline-none text-white"
      />
    </section>
  );
};
