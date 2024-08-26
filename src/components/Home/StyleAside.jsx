import React, { useEffect, useState } from "react";
import { Aside } from "./Protos/Aside";
import { Details } from "./Protos/Details";
import { StyleLayout } from "./Protos/StyleLayout";
import { useSetRecoilState } from "recoil";
import { currentElState } from "../../helpers/atoms";
import { StyleTypography } from "./Protos/StyleTypography";
import { Content } from "./Protos/Content";
import { StyleSize } from "./Protos/StyleSize";

export const StyleAside = () => {
  // const [currentEl, setCurrentEl] = useState();
  const setCurrentEl = useSetRecoilState(currentElState);

  useEffect(() => {
    /**
     *
     * @param {CustomEvent} ev
     */
    const onCurrentEl = (ev) => {
      setCurrentEl((oldVal)=>ev.detail.currentEl);
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
    </Aside>
  );
};
