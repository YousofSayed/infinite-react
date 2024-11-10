import React from "react";
import { Property } from "./Property";
import { SelectStyle } from "./SelectStyle";
import {
  animationCompositions,
  animationDirections,
  animationFillModes,
  animationIterationCounts,
  animationPlayStates,
  animationTimingFunctions,
} from "../../../constants/constants";
import { MultiChoice } from "./MultiChoice";
import { ChoicesForStates } from "./ChoicesForStates";
import { AddMultiValuestoSingleProp } from "./AddMultiValuestoSingleProp";

export const Animation = () => {
  return (
    <section className="mt-3 flex flex-col gap-2">
      <Property cssProp="animation-name" label="Name" allowText={true} />
      <Property
        cssProp="animation-duration"
        label="Duration"
        allowText={true}
      />
      <Property cssProp="animation-delay" label="Delay" allowText={true} />
      <SelectStyle
        cssProp="animation-direction"
        keywords={animationDirections}
        label="Direction"
        allowText={true}
      />
      <SelectStyle
        cssProp="animation-fill-mode"
        keywords={animationFillModes}
        label="Fill"
        allowText={true}
      />
      <SelectStyle
        cssProp="animation-timing-function"
        keywords={animationTimingFunctions}
        label="Timing"
        allowText={true}
      />
      <SelectStyle
        cssProp="animation-iteration-count"
        keywords={animationIterationCounts}
        label="Counts"
        allowText={true}
      />
      <SelectStyle
        cssProp="animation-play-state"
        keywords={animationPlayStates}
        label="State"
        allowText={true}
      />
      <AddMultiValuestoSingleProp
        //   label="Composition"
        placeholder="Composition"
        cssProp="animation-composition"
        keywords={animationCompositions}
      />
    </section>
  );
};
