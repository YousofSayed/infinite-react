import React from "react";
import { DirectionsModel } from "./DirectionsModel";
import { Property } from "./Property";
import { P } from "../../Protos/P";
import { Color } from "./Color";
import { BorderColor } from "./BorderColor";

export const Border = () => {
  return (
    <section className="mt-3  flex flex-col gap-[25px] p-2 rounded-lg bg-gray-900">
      <DirectionsModel
        tProp="border-top-width"
        rProp="border-right-width"
        bProp="border-bottom-width"
        lProp="border-left-width"
      />
        <BorderColor />
      {/* <Property label="border left color" cssProp="border-left-color" /> */}
    </section>
  );
};
