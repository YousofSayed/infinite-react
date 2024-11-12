import React, { useEffect, useState } from "react";
import { Aside } from "./Protos/Aside";
import { Details } from "./Protos/Details";
import { Layout } from "./Protos/Layout";
import { selector, useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentElState,
  showAnimationsBuilderState,
} from "../../helpers/atoms";
import { StyleTypography } from "./Protos/StyleTypography";
import { Content } from "./Protos/Content";
import { Size } from "./Protos/Size";
import { Positioning } from "./Protos/Positioning";
import { Border } from "./Protos/Border";
import { Select } from "./Protos/Select";
// import {  selectors } from "../../constants/constants";
import { useEditorMaybe } from "@grapesjs/react";
import { AsideControllers } from "./Protos/AsideControllers";
import { SelectState } from "./Protos/SelectState";
import { SelectClass } from "./Protos/SelectClass";
import { Background } from "./Protos/Background";
import { MultiFunctionProp } from "./Protos/MultiFunctionProp";
import { Animation } from "./Protos/Animation";
import { filterTypes, filterUnits, transformValues } from "../../constants/constants";
import { Others } from "./Protos/Others";
import { CSSEditor } from "./Protos/CSSEditor";

/**
 *
 * @param {{className:string}} param0
 * @returns
 */
export const StyleAside = ({ className }) => {
  // const [currentEl, setCurrentEl] = useState();
  const editor = useEditorMaybe();
  const showAnimeBuilder = useRecoilValue(showAnimationsBuilderState);
  const setCurrentEl = useSetRecoilState(currentElState);

  useEffect(() => {
    /**
     *
     * @param {CustomEvent} ev
     */
    const onCurrentEl = (ev) => {
      setCurrentEl((oldVal) => ({ currentEl: ev.detail.currentEl }));
    };

    window.addEventListener("currentel", onCurrentEl);

    return () => {
      window.removeEventListener("currentel", onCurrentEl);
    };
  });

  return (
    <>
      {/* <Details label={'content'}>
        <Content />
      </Details> */}

      {/* <section id="styles"></section> */}
      <AsideControllers />

      {!showAnimeBuilder && (
        <Details label={"classes"}>
          <SelectClass />
        </Details>
      )}

      {!showAnimeBuilder && (
        <Details label={"states"}>
          <SelectState />
        </Details>
      )}

      <Details label={"layout"}>
        <Layout />
      </Details>

      <Details label={"Typography"}>
        <StyleTypography />
      </Details>

      <Details label={"border"}>
        <Border />
      </Details>

      <Details label={"background"}>
        <Background />
      </Details>

      <Details label={"Filters"}>
        <MultiFunctionProp
          cssProp={"filter"}
          keywords={filterTypes}
          units={filterUnits}
          placeholder={"Select Filter"}
        />
      </Details>

      <Details label={"Transform"}>
        <MultiFunctionProp
          cssProp={"transform"}
          keywords={transformValues}
          placeholder={"Select Prop"}
        />
      </Details>

      {!showAnimeBuilder && (
        <Details label={"Animation"}>
          <Animation />
        </Details>
      )}

      <Details label={'Others'}>
        <Others/>
      </Details>

      {/* <Details label={'CSS'}>
        <CSSEditor/>
      </Details> */}
    </>
  );
};
