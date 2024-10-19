import React, { useState } from "react";
import { SharedBetweenFlexAndGridLayout } from "./SharedBetweenFlexAndGridLayout";
import { alignSelfValues } from "../../../constants/constants";
import { getIconForMultiChoice } from "../../../helpers/functions";
import { MultiChoice } from "./MultiChoice";
import { P } from "../../Protos/P";
import { Select } from "./Select";
import { Property } from "./Property";
import { SelectStyle } from "./SelectStyle";

export const FlexLayout = () => {
  const [dir, setDir] = useState("");

  return (
    <section className="flex flex-col gap-3">
      <section className="flex flex-col gap-3">
        <P>flex direction: </P>
        <MultiChoice
          choices={[
            "column",
            "row",
            `${dir.includes("column") ? "column-reverse" : "row-reverse"}`,
          ]}
          setChoice={setDir}
          cssProp="flex-direction"
          icons={[
            getIconForMultiChoice("columnDir"),
            getIconForMultiChoice("rowDir"),
            getIconForMultiChoice("reverseDir"),
          ]}
        />
      </section>

      <SharedBetweenFlexAndGridLayout />

      <SelectStyle
        label="flex wrap"
        splitHyphen={false}
        cssProp="flex-wrap"
        keywords={["wrap", "nowrap", "wrap-reverse"]}
      />
      <Property label="column gap" cssProp="column-gap" />
      <Property label="row gap" cssProp="row-gap" />
      <Property label="flex grow" cssProp="flex-grow" special={true} />
      <Property label="flex shrink" cssProp="flex-shrink" special={true} />
      <SelectStyle
        label="flex basis"
        cssProp="flex-basis"
        keywords={["auto", "content"]}
        splitHyphen={false}
      />
      <Property label="order" cssProp="order" special={true} />

      {/* <Details label={"more options"}> */}
      {/* <section className="flex flex-col gap-3"> */}
      {/* <Select
              label="align self"
              cssProp="align-self"
              keywords={alignSelfValues}
            />
            <Select
              label="align content"
              cssProp="align-content"
              keywords={alignContentValues}
            />
            <Select
              label="align items"
              cssProp="align-items"
              keywords={alignItemsValues}
            />
  
            <Select
              label="justify self"
              cssProp="justify-self"
              keywords={justifySelfValues}
            />
            <Select
              label="justify content"
              cssProp="justify-content"
              keywords={justifyContentValues}
            />
            <Select
              label="justify items"
              cssProp="justify-items"
              keywords={justifyItemsValues}
            /> */}
    </section>
  );
};