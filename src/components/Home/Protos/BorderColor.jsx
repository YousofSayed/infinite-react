import React, { useEffect, useState } from "react";
import { P } from "../../Protos/P";
import { Color } from "./Color";
import { SelectedBorder } from "./SelectedBorder";

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
  useEffect(() => {
    handleCssProps();
  }, [option]);

  return (
    <section className="flex flex-col gap-3  justify-between py-3 ">
      <P>border color: </P>

      <section className="flex justify-between gap-1 bg-gray-950 p-2 rounded-lg">
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
