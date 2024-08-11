import React from "react";
import { getPropVal } from "../../../helpers/functions";
import { P } from "../../Protos/P";

/**
 *
 * @param {{currentEl:HTMLElement , prop:string , tailwindClass:string}} param0
 * @returns
 */
export const Property = ({ currentEl, prop, tailwindClass }) => {
  const onInput = (ev) => {
    currentEl.style.cssText += `${prop}:${ev.target.value || "unset"};`;
    console.log(currentEl.style.cssText);

    // ev.target.placeholder = ev.target.value;
  };

  return (
    <section className="flex flex-nowrap justify-between   items-center  bg-slate-800 p-1 px-2 rounded-lg">
      <P>{prop} : </P>
      <input
        type="text"
        placeholder={getPropVal(currentEl, prop)}
        onInput={onInput}
        className="w-[70%] h-full bg-gray-900 rounded-lg p-2 outline-none text-white"
      />
    </section>
  );
};
