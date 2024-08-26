import React, { useEffect, useRef, useState, useTransition } from "react";
import { Icons } from "../../Icons/Icons";
import { getPropVal, rgbStringToHex, setClassForCurrentEl, toJsProp } from "../../../helpers/functions";
import { Menu } from "./Menu";
import { P } from "../../Protos/P";
import { useCloseMenu } from "../../../hooks/useCloseMenu";
import { useRecoilValue } from "recoil";
import { currentElState } from "../../../helpers/atoms";
import { useSetClassForCurrentEl } from "../../../hooks/useSetclassForCurrentEl";

/**
 *
 * @param {{label:string , keywords:string[] , currentEl:HTMLElement,cssProp:string , splitHyphen:boolean}} param0
 * @returns
 */
export const Select = ({ label, keywords, cssProp, splitHyphen = false }) => {
  const setClass = useSetClassForCurrentEl();
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
    const val = getPropVal(currentEl, cssProp);

    setVal(val.includes('rgb')? rgbStringToHex(val) : val);
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

    newKeyW.length == 1 && setCurrentChoose(0);

    // currentEl && (currentEl.style[toJsProp(cssProp)] = `${ev.target.value}`);

    setClass({
      cssProp,
      value:ev.target.value,
    });

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
    let cloneCurrentChooseNum = currentChoose;
    if (ev.key == "ArrowDown") {
      ev.preventDefault();
      cloneCurrentChooseNum++;

      if (cloneCurrentChooseNum >= newKeywords.length) {
        setCurrentChoose(0);
        return;
      }
      setCurrentChoose(cloneCurrentChooseNum);
    } else if (ev.key == "ArrowUp") {
      ev.preventDefault();
      cloneCurrentChooseNum--;
      if (cloneCurrentChooseNum < 0) {
        setCurrentChoose(newKeywords.length - 1);
        return;
      }
      setCurrentChoose(cloneCurrentChooseNum);
    } else if (ev.key == "Enter") {
      ev.preventDefault();
      setClass({
        cssProp,
        value:splitHyphen
        ? choosenKeyword.current.split("-")[0]
        : choosenKeyword.current,
      });


      setVal(choosenKeyword.current.split("-")[0]);
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
          onFocus={(ev) => {
            setMenu(true);
            keywords.forEach((keyword, i) => {
              if(keyword.toLowerCase().includes(ev.target.value.toLowerCase()))setCurrentChoose(i);
            });
            ev.target.select();
          }}
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
          className="w-full h-full font-semibold bg-gray-900 rounded-lg p-2 pr-[27.5px] outline-none text-white"
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
              const nkeyw = splitHyphen
              ? keyword.split("-")[0]
              : keyword;

              setClass({
                cssProp,
                value:nkeyw,
              });

              setVal(nkeyw);
              setMenu(false);
            }}
          />
        )}
      </div>
    </section>
  );
};
