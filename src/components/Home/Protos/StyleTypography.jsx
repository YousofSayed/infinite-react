import React from "react";
import { Property } from "./Property";
import { useRecoilValue } from "recoil";
import { currentElState } from "../../../helpers/atoms";
import { Select } from "./Select";
import {
  cssFonts,
  fontWeights,
  textDecorationLineValues,
  textDecorationStyleValues,
  textOverflowValues,
  wordBreakValues,
} from "../../../constants/constants";
import { Color } from "./Color";
import { MultiChoice } from "./MultiChoice";
import { Icons } from "../../Icons/Icons";
import { getIconForMultiChoice } from "../../../helpers/functions";
import { SelectStyle } from "./SelectStyle";

export const StyleTypography = () => {
  const currentEl = useRecoilValue(currentElState);
  return (
    <section className="mt-3  flex flex-col gap-2 p-2 rounded-lg bg-gray-900">
      <SelectStyle
        label="Font"
        cssProp="font-family"
        currentEl={currentEl}
        keywords={cssFonts}
      />
      <SelectStyle
        label="weight"
        cssProp="font-weight"
        currentEl={currentEl}
        keywords={fontWeights}
        splitHyphen={true}
      />
      <Color cssProp={"color"} />
      <Property label="Size" cssProp="font-size" />
      <Property label="spacing" cssProp="letter-spacing"  />
      <Property label="line height" cssProp="line-height" />

      <MultiChoice
        icons={[
          getIconForMultiChoice("textNone"),
          getIconForMultiChoice("textCapitalize"),
          getIconForMultiChoice("textLowercase"),
          getIconForMultiChoice("textUppercase"),
        ]}
        cssProp="text-transform"
        choices={["none", "capitalize", "lowercase", " uppercase"]}
      />

      <Property label="indent" cssProp="text-indent" />

      <MultiChoice
        icons={[
          getIconForMultiChoice("textStart"),
          getIconForMultiChoice("textCenter"),
          getIconForMultiChoice("textEnd"),
          getIconForMultiChoice("textJustify"),
        ]}
        cssProp="text-align"
        choices={["start", "center", "end", "justify"]}
      />

      <SelectStyle
        label="Overflow"
        splitHyphen={false}
        cssProp="text-overflow"
        keywords={textOverflowValues}
      />

      <SelectStyle
        label="breaking"
        cssProp="word-break"
        keywords={wordBreakValues}
      />
      <SelectStyle
        label="decoration line"
        cssProp="text-decoration-line"
        keywords={textDecorationLineValues}
      />
      <SelectStyle
        label="decoration style"
        cssProp="text-decoration-style"
        keywords={textDecorationStyleValues}
      />
      <Property
        label="decoration thickness"
        cssProp="text-decoration-thickness"
      />
    </section>
  );
};
