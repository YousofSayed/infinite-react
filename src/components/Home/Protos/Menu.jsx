import React from "react";

/**
 *
 * @param {{keywords: string[] , onItemClicked:(ev:MouseEvent , keyword:string)=>void}} param0
 * @returns
 */
export const Menu = ({ keywords, onItemClicked }) => {
  return (
    <article className="absolute  left-0 border-[1px] border-slate-600 rounded-lg  bottom-[calc(100%+5px)] bg-gray-900 w-full p-1">
      {keywords.map((keyword, i) => (
        <p
          onClick={(ev) => {
            onItemClicked(ev, keyword);
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
