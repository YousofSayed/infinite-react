import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { refType } from "../../../helpers/jsDocs";

/**
 *
 * @param   {{keywords: string[] ,className:string, choosenKeyword:string, currentChoose:number, menuRef : {[current:string] :HTMLElement}, onItemClicked:(ev:MouseEvent , keyword:string ,i:number , keywordsLength:number)=>void}} param0
 * @returns
 */
export const Menu = ({
  keywords = [],
  className = "",
  choosenKeyword = "",
  currentChoose = 0,
  menuRef,
  onItemClicked,
  i,
}) => {
  const [keywordsState, setKeywordsState] = useState(keywords);
  const choosenRef = useRef(refType);
  const unChoosenRef = useRef();
  // menuRef = menuRef ? menuRef : useRef();

  useEffect(() => {
    setKeywordsState(keywords.length ? keywords : ["No Items Founded..."]);
  }, [keywords]);

  useLayoutEffect(() => {
    if (menuRef && menuRef.current) {
      const { top, bottom, left, right } =
        menuRef.current.parentNode.getBoundingClientRect();
      top - 70 <= 270
        ? menuRef.current.classList.add("top-[calc(100%+5px)]")
        : menuRef.current.classList.add("bottom-[calc(100%+5px)]");
    }

    if (choosenRef && choosenRef.current) {
      console.log("chosen num : ", currentChoose);

      choosenRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });

      choosenKeyword.current = choosenRef.current.textContent;
    }
  }, [menuRef, choosenRef, currentChoose]);

  return (
    <menu
      ref={menuRef}
      // style={{clipPath:'inset(2px)' left-0}}
      className={`absolute left-0   z-[100]   grid grid-cols-1  shadow-lg shadow-gray-950 border-[1px] max-h-[270px] overflow-y-auto border-slate-600 rounded-lg   bg-gray-900  p-1 ${
        className ? className : "w-full"
      }`}
    >
      {keywordsState.map((keyword, i) => (
        <li
          id={i}
          ref={currentChoose == i ? choosenRef : unChoosenRef}
          onClick={(ev) => {
            onItemClicked(ev, keyword, i, keywordsState.length);
          }}
          className={`${
            currentChoose == i
              ? "bg-blue-600 hover:bg-blue-600"
              : "bg-transparent hover:bg-gray-700"
          } ${
            keyword.toLowerCase() == "No Items Founded...".toLowerCase()
              ? "pointer-events-none bg-transparent"
              : ""
          }  py-[12px] px-2 text-nowrap w-full  overflow-x-auto   transition-all cursor-pointer [&:not(:last-child)]:border-b-[1px] border-slate-600  text-slate-200 rounded-md  text-[16px] font-semibold `}
          key={i}
        >
          {keyword}
        </li>
      ))}
    </menu>
  );
};
