import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  refsStt,
  searchWord,
  showPopupIframState,
  widths,
} from "../../helpers/atoms";
import { Basics } from "./Elements/Basics";
import { Layouts } from "./Elements/Layouts";

export const HomeAside = () => {
  const asideRef = useRef();
  const [asideWidth, setAsideWidth] = useState(300);
  const [elementsTarget , setElementTarget] = useState('all')
  const setPopUp = useSetRecoilState(showPopupIframState);
  const setSearchW = useSetRecoilState(searchWord);
  const Elements = {
    basics: <Basics />,
    layouts: <Layouts />,
    all: (
      <>
        <Layouts />
        <Basics />
      </>
    ),
  };
  let isResize = false,
    width;

  const onMove = (e) => {
    if (isResize) {
      if (width < 200) {
        setAsideWidth(210);
        return;
      }
      const wVal = window.innerWidth - e.clientX;
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
      className={` relative h-full flex flex-col gap-[15px] bg-slate-900 p-[10px] border-l-[1.5px] border-slate-400 `}
    >
      <label htmlFor="selEl">
        <p className="text-white font-semibold mb-[10px]">
          {" "}
          Choose an element:
        </p>
        <select
          onChange={(ev)=>{setElementTarget(ev.target.value)}}
          className="w-full bg-slate-800  p-[10px]  rounded-lg text-white font-semibold"
        >
          <option value="all">All</option>
          <option value="basics" defaultValue={true}>
            Basics
          </option>
          <option value="layouts">Layouts</option>
        </select>
      </label>

      <section>
        <input
          type="search"
          onInput={(ev) => {
            setSearchW(ev.target.value);
          }}
          placeholder="Search..."
          className="w-full bg-slate-800 p-[10px] rounded-lg focus:outline-none text-white"
        />
      </section>

      <section className="grid custom-grid-col gap-[15px] overflow-x-auto pr-3 ">
        {Elements[elementsTarget]}
      </section>

      <div
        id="resizer"
        draggable={false}
        className=" opacity-0 z-30 hover:opacity-[1] select-none transition-all absolute w-[5px] h-full  top-0 left-0 bg-blue-600 cursor-e-resize"
        onMouseDown={() => {
          isResize = true;
          setPopUp(true);
        }}
      >
        <div
          id="btn-resizer"
          className="w-[35px] h-[35px]  rounded-full bg-blue-600  absolute left-[-17.5px] top-[50%] z-20 cursor-grab"
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
