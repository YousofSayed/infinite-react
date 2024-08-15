import React, { useEffect, useRef, useState, useTransition } from "react";
import { Icons } from "../../Icons/Icons";
import { getPropVal, toJsProp } from "../../../helpers/functions";
import { Menu } from "./Menu";
import { P } from "../../Protos/P";
import { useCloseMenu } from "../../../assets/hooks/useCloseMenu";
import { useRecoilValue } from "recoil";
import { currentElState } from "../../../helpers/atoms";

/**
 *
 * @param {{label:string , keywords:string[] , currentEl:HTMLElement,cssProp:string , tailwindClass:string}} param0
 * @returns
 */
export const Select = ({ label, keywords, cssProp, tailwindClass }) => {
  const currentEl = useRecoilValue(currentElState);
  const [showMenu, setMenu] = useState(false);
  const [newKeywords, setNewKeywords] = useState(Array.from(keywords));
  const [isPending, setTransition] = useTransition();
  const [currentChoose, setCurrentChoose] = useState(0);
  const [val, setVal] = useState("");
  const inputRef = useRef();
  const selectRef = useRef();
  const menuRef = useRef();
  const choosenKeyword = useRef();

  useCloseMenu(selectRef, setMenu);

  useEffect(() => {
    setVal(getPropVal(currentEl, cssProp));
  }, [currentEl]);

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
      keyword.toLowerCase().includes(ev.target.value.toLowerCase())
    );

    currentEl && (currentEl.style[toJsProp(cssProp)] = `${ev.target.value}`);

    if (newKeyW.length && ev.target.value) {
      setNewKeywords(newKeyW);
      setMenu(true);
    } else {
      setMenu(false);
      setNewKeywords(Array.from(keywords));
    }
  };

  /**
   *
   * @param {KeyboardEvent} ev
   */
  const handleChooses = (ev) => {
    if (ev.key == "ArrowDown") {
      if (currentChoose >= keywords.length) return;
      setCurrentChoose(currentChoose + 1);
    } else if (ev.key == "ArrowUp") {
      if (currentChoose <= 0) return;
      if (currentChoose) setCurrentChoose(currentChoose - 1);
    } else if (ev.key == "Enter") {
      currentEl && (currentEl.style[toJsProp(cssProp)] = `${choosenKeyword.current.split("-")[0] || choosenKeyword.current}`);
      setVal(choosenKeyword.current);
      setMenu(false);
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
          value={val}
          onInput={(ev) => {
            if (!currentEl) {
              setVal("");
              return;
            }
            setVal(ev.target.value);
            filterKeywords(ev);
          }}
          onKeyDown={(ev) => {
            handleChooses(ev);
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
            menuRef={menuRef}
            choosenKeyword={choosenKeyword}
            currentChoose={currentChoose}
            onItemClicked={(ev, keyword) => {
              console.log("clicked");
              currentEl &&
                (currentEl.style[toJsProp(cssProp)] = `${
                  keyword.split("-")[0] || keyword
                }`);
              // inputRef.current.value = keyword;
              setVal(keyword);
              setMenu(false);
            }}
          />
        )}
      </div>
    </section>
  );
};
