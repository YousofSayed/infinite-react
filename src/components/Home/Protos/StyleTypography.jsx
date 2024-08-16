import React from "react";
import { Property } from "./Property";
import { useRecoilValue } from "recoil";
import { currentElState } from "../../../helpers/atoms";
import { Select } from "./Select";
import { cssFonts, fontWeights, textDecorationLineValues, textDecorationStyleValues, wordBreakValues } from "../../../constants/constants";
import { Color } from "./Color";

export const StyleTypography = () => {
  const currentEl = useRecoilValue(currentElState);
  return (
    <section className="mt-3  flex flex-col gap-2 p-2 rounded-lg bg-gray-900">
      <Select
        label="Font"
        cssProp="font-family"
        currentEl={currentEl}
        keywords={cssFonts}
      />
      <Select
        label="weight"
        cssProp="font-weight"
        currentEl={currentEl}
        keywords={fontWeights}
        splitHyphen={true}
      />
      <Color cssProp={'color'}/> 
      <Property label="Size" cssProp="font-size"  />
      <Property label="spacing" cssProp="letter-space"  />
      <Property label="line height" cssProp="line-height"  />
      <Property label="indent" cssProp="text-indent"  />
      <Select label="breaking" cssProp="word-break" keywords={wordBreakValues}  />
      <Select label="decoration line" cssProp="text-decoration-line" keywords={textDecorationLineValues}  />
      <Select label="decoration style" cssProp="text-decoration-style" keywords={textDecorationStyleValues}  />
      <Property label="decoration thickness" cssProp="text-decoration-thickness"/>
    </section>
  );
};
