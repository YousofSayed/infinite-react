import React, { useEffect, useRef, useState, useTransition } from "react";
import { Icons } from "../../Icons/Icons";
import { getPropVal } from "../../../helpers/functions";
import { Menu } from "./Menu";
import { P } from "../../Protos/P";
import { useCloseMenu } from "../../../assets/hooks/useCloseMenu";

/**
 *
 * @param {{label:string , keywords:string[] , currentEl:HTMLElement,cssProp:string , tailwindClass:string}} param0
 * @returns
 */
export const Select = ({
  label,
  keywords,
  currentEl,
  cssProp,
  tailwindClass,
}) => {
  const [showMenu, setMenu] = useState(false);
  const [newKeywords, setNewKeywords] = useState(Array.from(keywords));
  const [isPending, setTransition] = useTransition();
  const inputRef = useRef();
  const selectRef = useRef();

  useCloseMenu(selectRef , setMenu);

  const showMenuCallback = () => {
    inputRef.current.focus();
    setTransition(() => {
      setMenu(!showMenu);
    });
  };

  /**
   *
   * @param {InputEvent} ev
   */
  const filterKeywords = (ev) => {
    const newKeyW = Array.from(keywords).filter((keyword) =>
      keyword.includes(ev.target.value)
    );

    currentEl && (currentEl.style.cssText += `${cssProp}:${ev.target.value};`);

    if (newKeyW.length && ev.target.value) {
      setNewKeywords(newKeyW);
      setMenu(true);
    } else {
      setMenu(false);
      setNewKeywords(Array.from(keywords));
    }
  };

  return (
    <section
      ref={selectRef}
      className="w-full p-1 px-2 rounded-lg flex justify-between items-center bg-slate-800"
    >
      <P>{label}: </P>
      <div className="w-[70%] relative">
        <input
          placeholder={getPropVal(currentEl, cssProp)}
          onInput={(ev) => {
            filterKeywords(ev);
          }}
          ref={inputRef}
          className="w-full h-full bg-gray-900 rounded-lg p-2 pr-[27.5px] outline-none text-white"
          type="text"
        />

        <i
          onClick={(ev) => {
            showMenuCallback();
          }}
          className={`group absolute right-1 top-[50%] translate-y-[-50%] ${
            showMenu ? "rotate-180" : "rotate-0"
          } transition-all cursor-pointer`}
        >
          {Icons.arrow()}
        </i>

        {showMenu && (
          <Menu
            keywords={newKeywords}
            onItemClicked={(ev, keyword) => {
              console.log("clicked");
              currentEl &&
                (currentEl.style.cssText += `${cssProp}:${keyword};`);
              inputRef.current.value = keyword;
              setMenu(false);
            }}
          />
        )}
      </div>
    </section>
  );
};
