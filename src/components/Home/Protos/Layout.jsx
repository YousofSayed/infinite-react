import React, { useEffect, useState } from "react";
import { getIconForMultiChoice, getPropVal } from "../../../helpers/functions";
import { Property } from "./Property";
import { Select } from "./Select";
import { MultiProps } from "./MultiProps";
import {
  alignContentValues,
  alignItemsValues,
  alignSelfValues,
  displayValues,
  filterTypes,
  filterUnits,
  flexDirectionValues,
  justifyContentValues,
  justifyItemsValues,
  justifySelfValues,
} from "../../../constants/constants";
import { useRecoilValue } from "recoil";
import { currentElState } from "../../../helpers/atoms";
import { Icons } from "../../Icons/Icons";
import { MultiChoice } from "./MultiChoice";
import { P } from "../../Protos/P";
import { Details } from "./Details";
import { SharedBetweenFlexAndGridLayout } from "./SharedBetweenFlexAndGridLayout";
import { GridLayout } from "./GridLayout";
import { FlexLayout } from "./FlexLayout";



/**
 *
 * @param {{currentEl:HTMLElement}} param0
 * @returns
 */
export const Layout = ({}) => {
  const [option, setOption] = useState("");
  const currentEl = useRecoilValue(currentElState);

  useEffect(()=>{
    console.log(option);
    
  },[option])

  return (
    <>
      <section className="mt-3 flex flex-col gap-2 p-2 rounded-lg bg-gray-900">
        <Select
          label="display"
          cssProp="display"
          keywords={displayValues}
          setKeyword={setOption}
        />
      </section>

     {option.length ?  <section className="mt-3 flex flex-col gap-2 p-2 rounded-lg bg-gray-900">
       {option.includes('flex') && <FlexLayout />}
       {option.includes('grid') && <GridLayout />}
      </section> : ''}
    </>
  );
};
