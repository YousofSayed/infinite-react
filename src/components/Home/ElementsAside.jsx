import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { blocksStt, refsStt, searchWord } from "../../helpers/atoms";
import { Basics } from "./Elements/Basics";
import { Layouts } from "./Elements/Layouts";
import { Aside } from "./Protos/Aside";
import { useEditorMaybe } from "@grapesjs/react";
import { handleCustomBlock } from "../../helpers/functions";
import { blocksType } from "../../helpers/jsDocs";
import { DetailsForBlocks } from "./Protos/DetailsForBlocks";

export const ElementsAside = () => {
  const [elementsTarget, setElementTarget] = useState("all");
  // const blocks = useRecoilValue(blocksStt);
  const blocksAtom = useRecoilValue(blocksStt);
  const [blocks, setBlocks] = useState([blocksType]);
  const setSearchW = useSetRecoilState(searchWord);
  const editor = useEditorMaybe();

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

  // useEffect(() => {
  //   Object.keys(handleCustomBlock(blocks)).forEach((ctg) => {});
  // }, [blocksAtom]);

  return (
    <Aside>
      {/* <label htmlFor="selEl">
        <p className="text-white custom-font-size font-semibold mb-[10px]">
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
      </section> */}
      
      {
      Object.keys(blocksAtom).map((ctg , i) => {
        return <DetailsForBlocks key={i} label={ctg} HTMLChildren={blocksAtom[ctg]}/>
      })}

      <section id="blocks" className="grid custom-grid-col  overflow-x-auto ">
        {/* {Elements[elementsTarget]} */}
      </section>
    </Aside>
  );
};
