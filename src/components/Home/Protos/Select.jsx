import React, { useEffect, useRef, useState, useTransition } from "react";
import { Icons } from "../../Icons/Icons";
import {
  advancedSearchSuggestions,
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
import { currentElState, framesStylesState } from "../../../helpers/atoms";
import { useSetClassForCurrentEl } from "../../../hooks/useSetclassForCurrentEl";
import { useUpdateInputValue } from "../../../hooks/useUpdateInputValue";
import { uniqueID } from "../../../helpers/cocktail";

/**
 *
 * @param {{label:string , keywords:string[] ,className:string , inputClassName:string ,containerClassName:string, placeholder:string,  singleValInInput:boolean, preventInput:boolean, icon:import('react').ReactNode, value:string , setVal:Function , isRelative : boolean, onKeywordsSeted : (keywords:string[])=>void, onItemClicked:(keyword ,index : number)=>void , onAll : (value:string)=>void, onMenuOpen : ({menu , setKeywords , keywords } : {menu:HTMLElement , setKeywords : Function , keywords: string[]})=>void , onMenuClose:({menu , setKeywords , keywords } : {menu:HTMLElement , setKeywords : Function , keywords: string[]})=>void, onEnterPress: (keyword:string )=>void,  onInput:(value:string)=>void, wrap:boolean, setKeyword:(keyword:string )=>void , respectParenthesis : boolean,splitHyphen:boolean}} param0
 * @returns
 */
export const Select = ({
  label,
  keywords,
  className = "",
  inputClassName = "",
  containerClassName = "",
  setKeyword = (_, _2) => {},
  onItemClicked = (_) => {},
  onInput = (_) => {},
  onEnterPress = (_, _2) => {},
  onAll = (value) => {},
  onMenuOpen = (_) => {},
  onMenuClose = (_) => {},
  onKeywordsSeted = (_) => {},
  placeholder = "",
  wrap = false,
  respectParenthesis = false,
  icon,
  isRelative = true,
  preventInput = false,
  value = "",
  singleValInInput = true,
  splitHyphen = false,
}) => {
  const [showMenu, setMenu] = useState(false);
  const [newKeywords, setNewKeywords] = useState(structuredClone(keywords));
  const [isPending, setTransition] = useTransition();
  const [currentChoose, setCurrentChoose] = useState(0);
  const [val, setVal] = useState(value);
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

  useEffect(() => {
    onKeywordsSeted(newKeywords);
    // setNewKeywords(keywords);
  }, [keywords]);

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

  useEffect(() => {
    const closeMenuCallback = () => {
      setMenu(false);
    };
    document.addEventListener("click", closeMenuCallback);
    return () => {
      document.removeEventListener("click", closeMenuCallback);
    };
  });

  useEffect(() => {
    setVal(value);
  }, [value]);

  const showMenuCallback = () => {
    inputRef.current.focus();
    setTransition(() => {
      setMenu(!showMenu);
    });
  };

  function findIndex(keywords = [], serachValue) {
    const index = keywords.findIndex((value, i) =>
      value.toLowerCase().includes(serachValue)
    );

    return index;
  }

  /**
   *
   * @param {InputEvent} ev
   */
  const filterKeywords = (ev) => {
    const newKeyW = advancedSearchSuggestions(
      structuredClone(keywords),
      ev.target.value
    );

    if (!newKeyW.length) {
      setMenu(false);
      return;
    }
    console.log(newKeyW, "newwww");

    setNewKeywords(newKeyW);
    const index = findIndex(newKeyW, ev.target.value);
    console.log(index, newKeyW.length);

    if (index == -1 && newKeyW.length) {
      setCurrentChoose(0);
      choosenKeyword.current = newKeyW[0];
    } else {
      setCurrentChoose(index);
      choosenKeyword.current = newKeyW[index];
    }

    // setMenu(true);
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

    //Arrow Down
    if (ev.key == "ArrowDown") {
      ev.preventDefault();
      cloneCurrentChooseNum++;

      if (cloneCurrentChooseNum >= newKeywords.length) {
        setCurrentChoose(0);
        return;
      }
      setCurrentChoose(cloneCurrentChooseNum);
    }
    //Ctrl & Sapce
    else if (ev.ctrlKey && ev.key == " ") {
      const newKeyW = advancedSearchSuggestions(keywords, val);
      if (!val.replaceAll(" ", "")) {
        setNewKeywords(keywords);
        showMenuCallback();
        return;
      }
      console.log(newKeyW);
      const index = findIndex(newKeyW, val);
      setNewKeywords(newKeyW);
      setCurrentChoose(index);
      showMenuCallback();
    }
    //ArrowUp
    else if (ev.key == "ArrowUp") {
      ev.preventDefault();
      cloneCurrentChooseNum--;
      if (cloneCurrentChooseNum < 0) {
        setCurrentChoose(newKeywords.length - 1);
        return;
      }
      setCurrentChoose(cloneCurrentChooseNum);
    }
    //Enter
    else if (ev.key == "Enter") {
      ev.preventDefault();
      const finalVal = splitHyphen
        ? choosenKeyword.current.split("-")[0]
        : choosenKeyword.current;

      const singleOrMultiVal = singleValInInput ? finalVal : val + finalVal;

      setKeyword(finalVal || val || "");
      onAll(finalVal || val || "");
      setVal(finalVal || val || "");
      console.log("finalVal : ", finalVal);
      console.log("val : ", val);

      onEnterPress(finalVal || val || "");
      setMenu(false);
    }
  };

  return (
    <section
      ref={selectRef}
      className={`w-full p-1 px-2 h-fit rounded-lg flex ${
        wrap && "flex-wrap gap-3 py-3 pl-2"
      }  justify-between gap-3 items-center  ${
        className ? className : "bg-slate-800"
      }`}
    >
      {icon}
      {label ? <P>{label}: </P> : null}
      <div
        onClick={(ev) => {
          selectRef.current.click();
          console.log(preventInput, "dsad");
          // showMenuCallback()
          preventInput &&
            setTimeout(() => {
              setNewKeywords(keywords);
              setCurrentChoose(findIndex(keywords, val));
              setMenu(!showMenu);
            }, 0);
        }}

        onDoubleClick={(ev) => {
          preventInput && inputRef.current.focus();
        }}
        className={`${label ? "w-[55%]" : "w-full"} ${
          isRelative ? "relative" : ""
        }  flex items-center flex-nowrap justify-center  bg-gray-900  rounded-lg ${
          containerClassName ? containerClassName : ""
        }`}
      >


        <input
          value={val}
          ref={inputRef}
          className={`w-full h-full  font-semibold   focus:border-blue-600  rounded-lg   p-2   outline-none text-white ${
            preventInput ? "pointer-events-none" : ""
          } ${inputClassName ? inputClassName : "bg-gray-900"} `}
          type="text"
          placeholder={placeholder}
          onClick={(ev) => {
            ev.stopPropagation();
            selectRef.current.click();
            // showMenuCallback();
            setNewKeywords(keywords)
            setCurrentChoose(
              newKeywords.findIndex((keyword) =>
                keyword.toLowerCase().includes(ev.target.value.toLowerCase())
              )
            );
            // setTimeout(()=>{setMenu(!showMenu);},1000)
            setMenu(!showMenu);
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
          onFocus={(ev) => {
            // ev.stopPropagation();
            // showMenuCallback();
            // filterKeywords(ev);
            // setMenu(true)
            // setTimeout(()=>{setMenu(true)},20)
          }}
          onInput={(ev) => {
            setVal(ev.target.value);
            filterKeywords(ev);
            onInput(ev.target.value);
            onAll(ev.target.value);
          }}
          onKeyDown={(ev) => {
            handleChooses(ev);
          }}
        />

        <i
          onClick={(ev) => {
            ev.stopPropagation();
            selectRef.current.click();
            showMenuCallback();
          }}
          className={`group   ${
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
              ev.stopPropagation();
              const nkeyw = splitHyphen ? keyword.split("-")[0] : keyword;
              const singleOrMultiVal = singleValInInput ? nkeyw : val + nkeyw;
              setVal(nkeyw);
              onAll(nkeyw);
              onItemClicked(nkeyw, i);
              setKeyword(nkeyw);
              setMenu(false);
            }}
          />
        )}
      </div>
    </section>
  );
};
