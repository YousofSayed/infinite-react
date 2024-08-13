import React, { useEffect, useRef, useState, useTransition } from "react";
import { Button } from "../../Protos/Button";
import { Icons } from "../../Icons/Icons";
import { P } from "../../Protos/P";
import { Menu } from "./Menu";
import { useCloseMenu } from "../../../assets/hooks/useCloseMenu";
import {
  getAllValsFromMultiProp,
  getPropVal,
  toJsProp,
} from "../../../helpers/functions";
import { transformToNumInput, uniqueID } from "../../../helpers/cocktail";
import { filterUnits } from "../../../constants/constants";
import { useRecoilValue } from "recoil";
import { currentElState } from "../../../helpers/atoms";
let filters = {};

/**
 *
 * @param {{label:string , cssProp:string, propName:string , propVal:string | number ,onTrashClick:(ev:MouseEvent)=>void}} param0
 * @returns
 */
const GeneratedElement = ({
  label,
  cssProp,
  propName,
  propVal,
  onTrashClick,
}) => {
  const currentEl = useRecoilValue(currentElState);
  console.log(propVal);
  
  return (
    <section className="flex items-center justify-between gap-2">
      <section className="bg-gray-900 w-[90%] flex justify-between items-center gap-2 px-2 py-2 rounded-lg">
        <P>{label}</P>

        <input
          onInput={(ev) => {
            transformToNumInput(ev.target);
            const vals = {
              ...getAllValsFromMultiProp(currentEl, cssProp).namesAndVals,
              [propName]:
                +ev.target.value <= 0 ? ev.target.value * 100 : ev.target.value,
            };

            let finalVlaue = ``;
            Object.keys(vals).forEach((val) => {
              finalVlaue += `${val}(${vals[val]}${filterUnits[val]})`;
            });
            currentEl.style[toJsProp(cssProp)] = finalVlaue;
          }}
          placeholder={propVal}
          type="text"
          className="w-[50%] h-full bg-slate-800 rounded-lg p-2 outline-none text-white"
        />

        <p className="w-[20%] custom-font-size text-slate-200 grid place-items-center font-bold">
          {filterUnits[propName.toLowerCase()]}
        </p>
      </section>

      <i
        className="group cursor-pointer w-[10%] flex justify-center items-center"
        onClick={(ev)=>{}}
      >
        {Icons.delete()}
      </i>
    </section>
  );
};

/**
 *
 * @param {{label:string , cssProp:string , currentEl:HTMLElement ,keywords:string[] , units:string[]}} param0
 * @returns
 */
export const MultiProps = ({ label, cssProp, keywords }) => {
  const currentEl = useRecoilValue(currentElState);
  const [showMenu, setMenu] = useState();
  const [isPending, setTransition] = useTransition();
  const [generatedElements, setGeneratedElements] = useState({});

  useEffect(() => {
    if (currentEl) {
      setGeneratedElements(
       {...getAllValsFromMultiProp(currentEl, cssProp).namesAndVals}
      );
    }
  }, [currentEl]);

  const selectRef = useRef();

  useCloseMenu(selectRef, setMenu);

  const showMenuCallback = (ev) => {
    setTransition(() => {
      setMenu(!showMenu);
    });
  };

  return (
    <section
      ref={selectRef}
      className="relative w-full flex flex-col gap-2 p-1 px-2 rounded-lg  bg-slate-800"
    >
      <div className="flex justify-between items-center">
        <P>{label}</P>

        <Button onClick={showMenuCallback} className="px-4 py-1 font-semibold">
          <div className="flex justify-between items-center">Add</div>
        </Button>

        {showMenu && (
          <Menu
            keywords={keywords}
            onItemClicked={(ev, keyword, i) => {
              
              setGeneratedElements({
                ...generatedElements,
                [keyword]: getAllValsFromMultiProp(currentEl,cssProp).namesAndVals[keyword],
              });

              setMenu(false);
            }}
          />
        )}
      </div>

      <div className="flex flex-col gap-2">
        {Object.keys(generatedElements).map((key, i) => (
          <GeneratedElement
            cssProp={cssProp}
            propName={key}
            propVal={getAllValsFromMultiProp(currentEl,cssProp).namesAndVals[key]}
            label={key}
            key={generatedElements[key]?.key || uniqueID()}
          />
        ))}
      </div>
    </section>
  );
};
