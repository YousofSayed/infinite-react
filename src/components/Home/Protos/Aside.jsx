import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { refsStt } from "../../../helpers/atoms";

export const Aside = ({ children, dir = "left" }) => {
  const asideRef = useRef();
  const [asideWidth, setAsideWidth] = useState(300);
  const overlayRef = useRecoilValue(refsStt).overlayRef;
  const isResize = useRef(false);

  /**
   *
   * @param {MouseEvent} e
   * @returns
   */
  const onMove = (e) => {
    if (isResize.current) {
      const wVal =
        dir == "left" ? window.innerWidth - e.clientX : e.clientX - 63;
      if (wVal < 200) {
        // isResize.current = false;
        setAsideWidth(210);
        return;
      }
      setAsideWidth(wVal);
      overlayRef && overlayRef.classList.remove("hidden");
    }
  };

  const onUp = () => {
    overlayRef && overlayRef.classList.add("hidden");
    // setIsResize(false);
    isResize.current = false;
    // window.removeEventListener("mouseup", onUp);
    // window.removeEventListener("mousemove", onMove);
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, [asideWidth]);

  return (
    <aside
      ref={asideRef}
      style={{ width: asideWidth }}
      className={` relative  h-full  bg-slate-900 p-3 `}
    >
      <section className="h-full w-full flex flex-col gap-[15px]  overflow-y-auto hideScrollBar">
        {children}
      </section>

      <div
        id="resizer"
        draggable={false}
        className={` opacity-0 z-30 hover:opacity-[1] select-none transition-all absolute w-[5px] h-full  top-0 ${
          dir == "left" ? "left-0" : "right-0"
        } bg-blue-600 cursor-col-resize`}
        onMouseDown={() => {
          isResize.current = true;
        }}
        onMouseUp={() => {
          isResize.current = false;
        }}
      >
        <div
          id="btn-resizer"
          className="w-[35px] h-[35px]  rounded-full bg-blue-600  absolute left-[-17.5px] top-[50%] z-20 cursor-col-resize"
          onMouseDown={(e) => {
            console.log("down");
            isResize.current = true;
          }}
          onMouseUp={() => {
            isResize.current = false;
          }}
        ></div>
      </div>
    </aside>
  );
};
