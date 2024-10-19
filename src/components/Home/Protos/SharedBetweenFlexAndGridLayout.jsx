import React from "react";
import { P } from "../../Protos/P";
import { MultiChoice } from "./MultiChoice";
import {
    alignContentValues,
    alignItemsValues,
  alignSelfValues,
  justifyContentValues,
  justifyItemsValues,
} from "../../../constants/constants";
import { getIconForMultiChoice } from "../../../helpers/functions";
import { Select } from "./Select";
import { SelectStyle } from "./SelectStyle";

export const SharedBetweenFlexAndGridLayout = () => {
  return (
    <section className="flex flex-col gap-3">
      {/* <section className="flex flex-col gap-3">
        <P>justify content: </P>
        <MultiChoice
          cssProp="justify-content"
          choices={justifyContentValues}
          icons={[
            getIconForMultiChoice("justifyStart"),
            getIconForMultiChoice("justifyCenter"),
            getIconForMultiChoice("justifyEnd"),
            getIconForMultiChoice("justifyBetween"),
            getIconForMultiChoice("justifyAround"),
            getIconForMultiChoice("justifyEvenly"),
          ]}
        />
      </section>

      <section className="flex flex-col gap-3">
        <P>Align items: </P>
        <MultiChoice
          cssProp="align-items"
          choices={alignSelfValues}
          icons={[
            getIconForMultiChoice("alignStart"),
            getIconForMultiChoice("alignSelfCenter"),
            getIconForMultiChoice("alignEnd"),
            getIconForMultiChoice("alignSelfStretch"),
            getIconForMultiChoice("alignBaseline"),
          ]}
        />
      </section> */}

      <SelectStyle
        splitHyphen={false}
        label="align items"
        cssProp="align-items"
        keywords={alignItemsValues}
      />
      <SelectStyle
        splitHyphen={false}
        label="justify items"
        cssProp="justify-items"
        keywords={justifyItemsValues}
      />
      <SelectStyle
        splitHyphen={false}
        label="align content"
        cssProp="align-content"
        keywords={alignContentValues}
      />
      <SelectStyle
        splitHyphen={false}
        label="justify content"
        cssProp="justify-content"
        keywords={justifyContentValues}
      />
    </section>
  );
};
