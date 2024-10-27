import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { refsStt, widths } from "../../../helpers/atoms";
import interact from "interactjs";
import { PanelResizeHandle } from "react-resizable-panels";

export const Aside = ({ children, className = "", dir = "left" }) => {
  /**
   * @type {{current:HTMLElement}}
   */
  const asideRef = useRef();
  /**
   * @type {{current:HTMLElement}}
   */
  const resizerRef = useRef();
  
  return (
    <aside
      ref={asideRef}
      className={`${className} relative w-full backdrop-blur-lg  h-full  bg-slate-900 p-3 `}
    >
      <section className="h-full w-full flex flex-col gap-[15px]  overflow-y-auto hideScrollBar">
        {children}
      </section>

      <PanelResizeHandle
        className={`flex  items-center justify-center opacity-0 z-30 hover:opacity-[1] select-none transition-all absolute w-[8px] h-full  top-0 ${
          dir == "left" ? "left-0" : "right-0"
        } bg-blue-600 cursor-col-resize`}
      />
     
    </aside>
  );
};
