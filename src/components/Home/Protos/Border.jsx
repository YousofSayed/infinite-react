import React from "react";
import { DirectionsModel } from "./DirectionsModel";
import { Property } from "./Property";
import { P } from "../../Protos/P";
import { Color } from "./Color";
import { BorderColor } from "./BorderColor";
import { BorderStyle } from "./BorderStyle";
import { BorderRadius } from "./BorderRadius";

export const Border = () => {
  return (
    <>
      <section className="mt-3  flex flex-col gap-[25px] p-2 rounded-lg bg-gray-900">
        <DirectionsModel
          tProp="border-top-width"
          rProp="border-right-width"
          bProp="border-bottom-width"
          lProp="border-left-width"
        />
        {/* <Property label="border left color" cssProp="border-left-color" /> */}
      </section>
      <section className="mt-3  flex flex-col gap-[25px] p-2 rounded-lg bg-gray-900">
        <BorderColor />
      </section>

      <section className="mt-3  flex flex-col gap-[25px] p-2 rounded-lg bg-gray-900">
        <BorderStyle />
      </section>

      <section className="mt-3  flex flex-col gap-[25px] p-2 rounded-lg bg-gray-900">
        <BorderRadius />
      </section>
      
    </>
  );
};
