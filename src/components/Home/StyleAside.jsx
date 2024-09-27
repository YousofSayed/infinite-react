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
import { Select } from "./Protos/Select";
import { allPesodus } from "../../constants/constants";
import { useEditorMaybe } from "@grapesjs/react";

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
    <Aside className={className} dir="right">
      {/* <Details label={'content'}>
        <Content />
      </Details> */}

      {/* <section id="styles"></section> */}

      <Select
      placeholder="state"
        keywords={allPesodus}
        setKeyword={(keyword) => {
          editor.Selectors.setState(keyword.replace(':',''));
          console.log(editor.Selectors.getState());
          console.log(editor.Selectors.all);
          console.log(editor.getStyle().models[editor.getStyle().models.length-1]);
          console.log(editor.getStyle().models[editor.getStyle().models.length-1].changed);
          setCurrentEl({currentEl:editor.getSelected().getEl()});
        }}
      />

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
    </Aside>
  );
};
