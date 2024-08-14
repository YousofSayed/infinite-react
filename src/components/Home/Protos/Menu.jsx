import React from "react";

/**
 *
 * @param {{keywords: string[] ,className:string, menuRef : import("react").Ref, onItemClicked:(ev:MouseEvent , keyword:string ,i:number)=>void}} param0
 * @returns
 */
export const Menu = ({ keywords,className='', menuRef ,onItemClicked  , i }) => {
  return (
    <article ref={menuRef} className={`absolute  left-0 shadow-lg shadow-gray-950 border-[1px] max-h-[270px] overflow-y-auto border-slate-600 rounded-lg  bottom-[calc(100%+5px)] bg-gray-900 w-full p-1 ${className}`}>
       {keywords.map((keyword, i) => (
        <p
          onClick={(ev) => {
            onItemClicked(ev, keyword , i);
          }}
          className="py-2 px-1  transition-all cursor-pointer [&:not(:last-child)]:border-b-[1px] border-slate-600 hover:bg-gray-800 text-slate-200 text-[14px] font-semibold rounded"
          key={i}
        >
          {keyword}
        </p>
      ))}
    </article>
  );
};
