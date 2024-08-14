import React from "react";
import { Property } from "./Property";
import { useRecoilValue } from "recoil";
import { currentElState } from "../../../helpers/atoms";
import { Select } from "./Select";
import { cssFonts, fontWeights } from "../../../constants/constants";

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
      />
      <Property label="Size" cssProp="font-size" currentEl={currentEl} />
      <Property label="spacing" cssProp="letter-space" currentEl={currentEl} />
      <Property label="line height" cssProp="line-height" currentEl={currentEl} />
      <Property label="indent" cssProp="text-indent" currentEl={currentEl} />
    </section>
  );
};
