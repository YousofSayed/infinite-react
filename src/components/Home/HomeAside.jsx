import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { refsStt, showPopupIframState, widths } from "../../helpers/atoms";

export const HomeAside = () => {
  const asideRef = useRef();
  const [asideWidth, setAsideWidth] = useState(300);
  const setPopUp = useSetRecoilState(showPopupIframState);

  let isResize = false,
    width;

  const onMove = (e) => {
    if (isResize ) {
     if(width < 200){setAsideWidth(200);return}
      const wVal =
        window.innerWidth -
        Math.trunc(e.clientX - asideRef.current.offsetWidth + 120);
        width = wVal;
      setAsideWidth(wVal);
    }
  };

  const onUp = () => {
    isResize = false;
    setPopUp(false);
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, [asideWidth]);

  return (
    <aside
      ref={asideRef}
      style={{ width: asideWidth }}
      className={`group relative h-full bg-slate-900 p-[10px] border-l-[1.5px] border-slate-400 `}
    >
      <select
        id="selEl"
        className="w-full bg-slate-800  p-[10px]  rounded-lg text-white font-semibold"
      >
        <option value="all">All</option>
        <option value="basic" defaultChecked={true}>
          Basic
        </option>
        <option value="layout">Layout</option>
      </select>

      <div
        id="resizer"
        draggable={false}
        className=" opacity-0 hover:opacity-[1] select-none transition-all absolute w-[5px] h-full  top-0 left-0 bg-blue-600 cursor-e-resize"
        onMouseDown={() => {
          isResize = true;
          setPopUp(true);
          console.log("down!");
        }}
      >
        <div
          id="btn-resizer"
          className="w-[35px] h-[35px] rounded-full bg-blue-600  absolute left-[-17.5px] top-[50%] z-20 cursor-grab"
          onMouseDown={(e) => {
            e.currentTarget.classList.replace("cursor-grab", "cursor-grabbing");
          }}
          onMouseUp={(e) => {
            e.currentTarget.classList.replace("cursor-grabbing", "cursor-grab");
          }}
          onMouseLeave={(e) => {
            e.currentTarget.classList.replace("cursor-grabbing", "cursor-grab");
          }}
        ></div>
      </div>
    </aside>
  );
};
