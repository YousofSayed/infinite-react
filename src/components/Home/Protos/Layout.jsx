import React, { useEffect, useState } from "react";
import { displayValues } from "../../../constants/constants";
import { useRecoilValue } from "recoil";
import { currentElState } from "../../../helpers/atoms";
import { GridLayout } from "./GridLayout";
import { FlexLayout } from "./FlexLayout";
import { SelectStyle } from "./SelectStyle";
import { Size } from "./Size";
import { MiniTitle } from "./MiniTitle";
import { Positioning } from "./Positioning";
import { Paddaing } from "./Paddding";
import { Margin } from "./Margin";

/**
 *
 * @param {{currentEl:HTMLElement}} param0
 * @returns
 */
export const Layout = ({}) => {
  const [option, setOption] = useState("");
  const currentEl = useRecoilValue(currentElState);

  useEffect(() => {
    console.log(option);
  }, [option]);

  return (
    <section className="mt-3 flex flex-col gap-2">
      <Size />

      <Paddaing />

      <Margin />
      
      <Positioning />

      <section className=" flex flex-col gap-2 p-2 rounded-lg bg-gray-900">
        <MiniTitle>display</MiniTitle>
        <SelectStyle
          label="display"
          cssProp="display"
          keywords={displayValues}
          setKeyword={setOption}
        />
      </section>

      {(option.includes("flex") || option.includes("grid")) && (
        <section className=" flex flex-col gap-2 p-2 rounded-lg bg-gray-900">
          {option.includes("flex") && <FlexLayout />}
          {option.includes("grid") && <GridLayout />}
        </section>
      )}

    </section>
  );
};
