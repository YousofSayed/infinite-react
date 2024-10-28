import React, { useEffect, useState } from "react";
import { Aside } from "./Protos/Aside";
import { Details } from "./Protos/Details";
import { Layout } from "./Protos/Layout";
import { selector, useSetRecoilState } from "recoil";
import { currentElState } from "../../helpers/atoms";
import { StyleTypography } from "./Protos/StyleTypography";
import { Content } from "./Protos/Content";
import { StyleSize } from "./Protos/StyleSize";
import { Positioning } from "./Protos/Positioning";
import { Border } from "./Protos/Border";
import { Select } from "./Protos/Select";
// import {  selectors } from "../../constants/constants";
import { useEditorMaybe } from "@grapesjs/react";
import { AsideControllers } from "./Protos/AsideControllers";
import { SelectState } from "./Protos/SelectState";
import { SelectClass } from "./Protos/SelectClass";
import { Background } from "./Protos/Background";

/**
 *
 * @param {{className:string}} param0
 * @returns
 */
export const StyleAside = ({ className }) => {
  // const [currentEl, setCurrentEl] = useState();
  const editor = useEditorMaybe();
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
        <AsideControllers/>
  
     <Details label={'classes'}>
      <SelectClass/>
     </Details>

     <Details label={'states'}>
     <SelectState />
     </Details>


      <Details label={"Typography"}>
        <StyleTypography />
      </Details>

      <Details label={"size"}>
        <StyleSize />
      </Details>

      <Details label={"Positioning"}>
        <Positioning />
      </Details>

      <Details label={"border"}>
        <Border />
      </Details>

      <Details label={"layout"}>
        <Layout />
      </Details>

      <Details label={'background'}>
        <Background/>
      </Details>
    </>
  );
};
