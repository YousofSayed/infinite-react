import React, { useEffect, useRef, useState, useTransition } from "react";
import { Icons } from "../../Icons/Icons";
import {
  getOriginalCSSValue,
  getPropVal,
  rgbStringToHex,
  setClassForCurrentEl,
  toJsProp,
} from "../../../helpers/functions";
import { Menu } from "./Menu";
import { P } from "../../Protos/P";
import { useCloseMenu } from "../../../hooks/useCloseMenu";
import { useRecoilValue } from "recoil";
import { currentElState } from "../../../helpers/atoms";
import { useSetClassForCurrentEl } from "../../../hooks/useSetclassForCurrentEl";
import { useUpdateInputValue } from "../../../hooks/useUpdateInputValue";

/**
 *
 * @param {{label:string , keywords:string[] , placeholder:string,  singleValInInput:boolean, val:string , setVal:Function , onKeywordsSeted : (keywords:string[])=>void, onItemClicked:(keyword ,index : number)=>void , onMenuOpen : ({menu , setKeywords , keywords } : {menu:HTMLElement , setKeywords : Function , keywords: string[]})=>void , onMenuClose:({menu , setKeywords , keywords } : {menu:HTMLElement , setKeywords : Function , keywords: string[]})=>void, onEnterPress: (keyword:string )=>void,  onInput:(value:string)=>void, wrap:boolean, setKeyword:(keyword:string )=>void , respectParenthesis : boolean,splitHyphen:boolean}} param0
 * @returns
 */
export const Select = ({
  label,
  keywords,
  setKeyword = (_, _2) => {},
  onItemClicked = (_) => {},
  onInput = (_) => {},
  onEnterPress = (_, _2) => {},
  onMenuOpen = (_) => {},
  onMenuClose = (_) => {},
  onKeywordsSeted = (_)=>{},
  placeholder = "",
  wrap = false,
  respectParenthesis = false,
  val,
  setVal,
  singleValInInput = true,
  splitHyphen = false,
}) => {
  const [showMenu, setMenu] = useState(false);
  const [newKeywords, setNewKeywords] = useState(Array.from(keywords));
  const [isPending, setTransition] = useTransition();
  const [currentChoose, setCurrentChoose] = useState(0);
  // const [val, setVal] = useState('');
  const inputRef = useRef();
  const selectRef = useRef();
  const menuRef = useRef();
  const choosenKeyword = useRef();

  useEffect(() => {
    if (
      respectParenthesis &&
      inputRef.current.value.lastIndexOf(")") ==
        inputRef.current.value.length - 1
    ) {
      respectParenthesisHandler();
    }
  }, [val]);

  useEffect(()=>{
    onKeywordsSeted(newKeywords);
  },[keywords])

  useEffect(() => {
    showMenu
      ? onMenuOpen({
          menu: menuRef.current,
          setKeywords: setNewKeywords,
          keywords: newKeywords,
        })
      : onMenuClose({
          menu: menuRef.current,
          setKeywords: setNewKeywords,
          keywords: newKeywords,
        });
  }, [showMenu]);

  useCloseMenu(selectRef, setMenu);
  // useUpdateInputValue({ setVal: setVal, cssProp });

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
    const newKeyW = Array.from(keywords).filter((keyword, i) =>
      keyword.toLowerCase().includes(ev.target.value.toLowerCase())
    );

    if (newKeyW.length && ev.target.value) {
      setNewKeywords(newKeyW);
      const index = newKeyW.findIndex((value, i) =>
        value.toLowerCase().includes(ev.target.value)
      );
      setCurrentChoose(index);
      choosenKeyword.current = newKeyW[index];
      setMenu(true);
    } else {
      setMenu(false);
      setNewKeywords(Array.from(keywords));
    }
  };

  const respectParenthesisHandler = () => {
    const value = inputRef.current.value;
    const openIndex = value.lastIndexOf("(");
    const closeIndex = value.lastIndexOf(")");
    if (openIndex !== -1 && closeIndex !== -1 && closeIndex > openIndex) {
      // Place the cursor right after the last opening parenthesis
      const cursorPosition = openIndex + 1;
      inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
    }
  };

  /**
   *
   * @param {KeyboardEvent} ev
   */
  const handleChooses = (ev) => {
    let cloneCurrentChooseNum = currentChoose;
    console.log(ev.key);

    if (ev.key == "ArrowDown") {
      ev.preventDefault();
      cloneCurrentChooseNum++;

      if (cloneCurrentChooseNum >= newKeywords.length) {
        setCurrentChoose(0);
        return;
      }
      setCurrentChoose(cloneCurrentChooseNum);
    } else if (ev.ctrlKey && ev.key == " ") {
      showMenuCallback();
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
      const finalVal = splitHyphen
        ? choosenKeyword.current.split("-")[0]
        : choosenKeyword.current;

      const singleOrMultiVal = singleValInInput ? finalVal : val + finalVal;
      setKeyword(finalVal);
      setVal(finalVal);
      onEnterPress(finalVal);
      setMenu(false);
    }
  };

  return (
    <section
      ref={selectRef}
      className={`w-full p-1 px-2 rounded-lg flex ${
        wrap && "flex-wrap gap-3 py-3"
      }  justify-between items-center bg-slate-800`}
    >
      {label ? <P>{label}: </P> : null}
      <div className={`${label ? "w-[55%]" : "w-full"} relative`}>
        <input
          value={val}
          ref={inputRef}
          className="w-full h-full font-semibold bg-gray-900 rounded-lg p-2 pr-[27.5px] outline-none text-white"
          type="text"
          placeholder={placeholder}
          onClick={(ev) => {
            showMenuCallback();
            setCurrentChoose(
              newKeywords.findIndex((keyword) =>
                keyword.toLowerCase().includes(ev.target.value.toLowerCase())
              )
            );
            // ev.target.select();
          }}
          // onFocus={(ev) => {
          // !showMenu && setMenu(true);

          //   setCurrentChoose(
          //     newKeywords.findIndex((keyword) =>
          //       keyword.toLowerCase().includes(ev.target.value.toLowerCase())
          //     )
          //   );
          //   ev.target.select();
          // }}
          onInput={(ev) => {
            onInput(ev.target.value);
            setVal(ev.target.value);
            filterKeywords(ev);
          }}
          onKeyDown={(ev) => {
            handleChooses(ev);
          }}
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
            onItemClicked={(ev, keyword, i) => {
              const nkeyw = splitHyphen ? keyword.split("-")[0] : keyword;
              const singleOrMultiVal = singleValInInput ? nkeyw : val + nkeyw;
              onItemClicked(nkeyw, i);
              setKeyword(nkeyw);
              setVal(nkeyw);
              setMenu(false);
            }}
          />
        )}
      </div>
    </section>
  );
};
