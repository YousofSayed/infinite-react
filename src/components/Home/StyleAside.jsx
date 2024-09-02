import React, { useEffect, useState } from "react";
import { Aside } from "./Protos/Aside";
import { Details } from "./Protos/Details";
import { Layout } from "./Protos/Layout";
import { useSetRecoilState } from "recoil";
import { currentElState } from "../../helpers/atoms";
import { StyleTypography } from "./Protos/StyleTypography";
import { Content } from "./Protos/Content";
import { StyleSize } from "./Protos/StyleSize";
import { Positioning } from "./Protos/Positioning";
import { Border } from "./Protos/Border";

export const StyleAside = () => {
  // const [currentEl, setCurrentEl] = useState();
  const setCurrentEl = useSetRecoilState(currentElState);

  useEffect(() => {
    /**
     *
     * @param {CustomEvent} ev
     */
    const onCurrentEl = (ev) => {
      setCurrentEl((oldVal)=>({currentEl:ev.detail.currentEl}));
    };

    window.addEventListener("currentel", onCurrentEl);

    return () => {
      window.removeEventListener("currentel", onCurrentEl);
    };
  });
  return (
    <Aside dir="right">
      <Details label={'content'}>
        <Content />
      </Details>

      <Details label={'Typography'}>
        <StyleTypography/>
      </Details>

      <Details label={'size'} >
        <StyleSize />
      </Details>

      <Details label={'Positioning'}>
        <Positioning />
      </Details>

      <Details label={'border'}>
        <Border/>
      </Details>

      <Details label={'layout'}>
        <Layout />
      </Details>
    </Aside>
  );
};
