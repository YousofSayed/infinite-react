import React, { memo, useEffect, useRef, useState, useTransition } from "react";
import { Button } from "../../Protos/Button";
import { Icons } from "../../Icons/Icons";
import { P } from "../../Protos/P";
import { Menu } from "./Menu";
import { useCloseMenu } from "../../../hooks/useCloseMenu";
import {
  getAllValsFromMultiProp,
  getPropVal,
  setMultiValInProp,
  toJsProp,
} from "../../../helpers/functions";
import {
  addClickClass,
  cloneObject,
  transformToNumInput,
  uniqueID,
} from "../../../helpers/cocktail";
import { filterUnits } from "../../../constants/constants";
import { useRecoilValue } from "recoil";
import { currentElState } from "../../../helpers/atoms";
let filters = {};

/**
 *
//  * @param {{label:string , uniqueKey:string | number,cssProp:string, propName:string , propVal:string | number , onInput:(ev:InputEvent)=>void,onTrashClick:(ev:MouseEvent)=>void}} param0
 * @returns
 */
const GeneratedElement = memo(
  ({
    label,
    cssProp,
    propName,
    propVal,
    uniqueKey,
    onTrashClick = (_) => {},
    onInput = (_) => {},
  }) => {
    const currentEl = useRecoilValue(currentElState);

    return (
      <section
        key={uniqueKey}
        className="flex items-center justify-between gap-2"
      >
        <section className="bg-gray-900 w-[90%] flex justify-between items-center gap-2 px-2 py-2 rounded-lg">
          <P>{label}</P>

          <input
          autoFocus={true}
            onInput={(ev) => {
              transformToNumInput(ev.target);
              setMultiValInProp({
                prevObjVals: {
                  ...getAllValsFromMultiProp(currentEl, cssProp).namesAndVals,
                },
                propName,
                cssProp,
                propVal: ev.target.value,
              });

              onInput(ev);
            }}
            placeholder={propVal}
            defaultValue={propVal}
            type="text"
            className="w-[50%] h-full bg-slate-800 rounded-lg p-2 outline-none text-white"
          />

          <p className="w-[20%] custom-font-size text-slate-200 grid place-items-center font-bold">
            {filterUnits[propName.toLowerCase()]}
          </p>
        </section>

        <i
          className="group cursor-pointer w-[10%] flex justify-center items-center"
          onClick={(ev) => {
            addClickClass(ev.target, "click");
            onTrashClick(ev);
          }}
        >
          {Icons.delete()}
        </i>
      </section>
    );
  }
);

/**
 *
 * @param {{label:string , cssProp:string , currentEl:HTMLElement ,keywords:string[] , units:string[]}} param0
 * @returns
 */
export const MultiProps = memo(({ label, cssProp, keywords }) => {
  const currentEl = useRecoilValue(currentElState);
  const [showMenu, setMenu] = useState();
  const [isPending, setTransition] = useTransition();
  const [generatedElements, setGeneratedElements] = useState({});
  const menuRef = useRef();
  const selectRef = useRef();
  const vals = useRef(getAllValsFromMultiProp(currentEl, cssProp)
  .namesAndVals);

  useEffect(() => {
    if (currentEl) {
      console.log(generatedElements);

      setGeneratedElements({
        ...getAllValsFromMultiProp(currentEl, cssProp).namesAndVals,
      });
    }
  }, [currentEl]);

 

  useCloseMenu(selectRef, setMenu);

  const showMenuCallback = (ev) => {
    if (!currentEl) return;
    menuRef.current.classList.toggle('hidden');
  };

  const removeFilter = (keyword) => {
    const newFilterObj = getAllValsFromMultiProp(currentEl, cssProp)
    .namesAndVals;
    delete newFilterObj[keyword];
    vals.current = newFilterObj;
    setMultiValInProp({ prevObjVals: newFilterObj, cssProp });
    setGeneratedElements(newFilterObj);
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

        {/* {showMenu && ( */}
          <Menu
            className={`hidden`}
            menuRef={menuRef}
            keywords={keywords}
            onItemClicked={(ev, keyword, i) => {
              menuRef.current.classList.toggle('hidden')
              // setMenu(false);
              setGeneratedElements({
                ...getAllValsFromMultiProp(currentEl, cssProp)
                .namesAndVals,
                [keyword]: getAllValsFromMultiProp(currentEl, cssProp)
                  .namesAndVals[keyword],
              });
            }}
          />
        {/* )} */}
      </div>

      <div className="flex flex-col gap-2">
        {Object.keys(generatedElements).map((key, i) => {
          console.log(generatedElements, key, "gennne");

          return (
            <GeneratedElement
              cssProp={cssProp}
              propName={key}
              propVal={generatedElements[key]}
              label={key}
              onTrashClick={(_) => {
                removeFilter(key);
              }}
              onInput={(ev) => {
                // setGeneratedElements({
                //   ...generatedElements,
                //   [key]: ev.target.value,
                // });

                vals.current = {
                  ...getAllValsFromMultiProp(currentEl, cssProp)
                  .namesAndVals,
                  [key]: ev.target.value,
                };
              }}
              key={uniqueID()}
            />
          );
        })}
      </div>
    </section>
  );
});
