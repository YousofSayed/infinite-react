import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  refsStt,
  searchWord,
} from "../../helpers/atoms";
import { Basics } from "./Elements/Basics";
import { Layouts } from "./Elements/Layouts";
import { Aside } from "./Protos/Aside";


export const ElementsAside = () => {
  const [elementsTarget, setElementTarget] = useState("all");
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

  

  return (
    <Aside>
      <label htmlFor="selEl">
        <p className="text-white font-semibold mb-[10px]">
          {" "}
          Choose an element:
        </p>
        <select
          onChange={(ev) => {
            setElementTarget(ev.target.value);
          }}
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
    </Aside>
  );
};
