import React, { useEffect, useState } from "react";
import { P } from "../../Protos/P";
import { Color } from "./Color";
import { addClickClass } from "../../../helpers/cocktail";

const SelectedBorder = ({ borderName, borderDir, option, setOption }) => {
  return (
    <div
      onClick={(ev) => {
        addClickClass(ev.currentTarget, "click");
        setOption(option == borderDir ? "" : borderDir);
      }}
      className=" rounded-lg cursor-pointer p-2 flex justify-center items-center bg-gray-800"
    >
      <div
        className={`w-[20px] h-[20px] ${borderName} ${
          option != borderDir ? "border-slate-500" : "border-blue-500"
        } `}
      ></div>
    </div>
  );
};

export const BorderColor = () => {
  const [option, setOption] = useState("");
  const [cssProps, setCssProps] = useState([]);
  const handleCssProps = () => {
    switch (option) {
      case "top":
        setCssProps("border-top-color");
        break;
      case "right":
        setCssProps("border-right-color");
        break;
      case "bottom":
        setCssProps("border-bottom-color");
        break;
      case "left":
        setCssProps("border-left-color");
        break;
      case "all":
        setCssProps("border-color");
        break;
      default:
        break;
    }
  };
  useEffect(()=>{handleCssProps()},[option])

  return (
    <section className="flex flex-col gap-3 py-3 border-t-2 border-slate-600">
      <P>border color: </P>
      {/* <article className="flex justify-between items-center">

      </article> */}
      <section className="flex justify-between gap-1">
        <SelectedBorder
          borderName={"border-t-2"}
          borderDir="top"
          option={option}
          setOption={setOption}
        />
        <SelectedBorder
          borderName={"border-r-2"}
          borderDir="right"
          option={option}
          setOption={setOption}
        />
        <SelectedBorder
          borderName={"border-b-2"}
          borderDir="bottom"
          option={option}
          setOption={setOption}
        />
        <SelectedBorder
          borderName={"border-l-2"}
          borderDir="left"
          option={option}
          setOption={setOption}
        />
        <SelectedBorder
          borderName={"border-2"}
          borderDir="all"
          option={option}
          setOption={setOption}
        />
      </section>
      <div className="flex gap-2">
        <Color cssProp={cssProps} />
      </div>
    </section>
  );
};
