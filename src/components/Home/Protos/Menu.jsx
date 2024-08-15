import React, { useEffect, useRef } from "react";

/**
 *
 * @param   {{keywords: string[] ,className:string, choosenKeyword:string, currentChoose:number, menuRef : import("react").Ref, onItemClicked:(ev:MouseEvent , keyword:string ,i:number , keywordsLength:number)=>void}} param0
 * @returns
 */
export const Menu = ({
  keywords,
  className = " ",
  choosenKeyword = "",
  currentChoose = 0,
  menuRef,
  onItemClicked,
  i,
}) => {
  const choosenRef = useRef();
  const unChoosenRef = useRef();
  // menuRef = menuRef ? menuRef : useRef();

  useEffect(() => {
    if (menuRef && menuRef.current) {
      menuRef.current.getBoundingClientRect().top <= 0
        ? menuRef.current.classList.add("top-[calc(100%+5px)]")
        : menuRef.current.classList.remove("bottom-[calc(100%+5px)]");
    }
    
    
    if( choosenRef && choosenRef.current ){
      choosenRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });

      choosenKeyword.current = choosenRef.current.textContent;
    }
  }, [menuRef , choosenRef , currentChoose]);

  return (
    <ul
      ref={menuRef}
      className={`absolute z-50 left-0   shadow-lg shadow-gray-950 border-[1px] max-h-[270px] overflow-y-auto border-slate-600 rounded-lg   bg-gray-900 w-full p-1 ${className}`}
    >
      {keywords.map((keyword, i) => (
        <li
        id={i}
          ref={currentChoose == i ? choosenRef : unChoosenRef  }
          onClick={(ev) => {
            onItemClicked(ev, keyword, i, keywords.length);
          }}
          className={`${
            currentChoose == i ? "bg-gray-800" : "bg-transparent"
          } py-2 px-1  transition-all cursor-pointer [&:not(:last-child)]:border-b-[1px] border-slate-600 hover:bg-gray-800 text-slate-200 text-[14px] font-semibold rounded`}
          key={i}
        >
          {keyword}
        </li>
      ))}
    </ul>
  );
};
