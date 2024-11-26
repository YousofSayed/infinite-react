import React from "react";
import { Color } from "./Color";
import { SmallButton } from "./SmallButton";
import { Icons } from "../../Icons/Icons";
import { Input } from "./Input";
import { Property } from "./Property";
import { useEditorMaybe } from "@grapesjs/react";
import { useSetRecoilState } from "recoil";
import { cssPropForAssetsManagerState } from "../../../helpers/atoms";
import { AssetsManager } from "../AssetsManager";
import { SelectStyle } from "./SelectStyle";
import {
  backgroundAttachmentValues,
  backgroundBlendModeValues,
  backgroundClipValues,
  backgroundRepeatValues,
  backgroundSize,
} from "../../../constants/constants";
import { AddMultiValuestoSingleProp } from "./AddMultiValuestoSingleProp";
import { Gradient } from "./Gradient";
import { MiniTitle } from "./MiniTitle";
import { useSetClassForCurrentEl } from "../../../hooks/useSetclassForCurrentEl";

export const Background = () => {
  const editor = useEditorMaybe();
  const setCssPropForAm = useSetRecoilState(cssPropForAssetsManagerState);
  const setClass = useSetClassForCurrentEl();

  return (
    <section className="mt-3 flex flex-col gap-3">
      <MiniTitle>Color</MiniTitle>
      <Color cssProp="background-color" />

      <MiniTitle>Image</MiniTitle>
      <section className="flex gap-2 bg-gray-800 p-2 rounded-lg justify-between">
        <Input
          cssProp="background-image"
          className="min-w-[70%] bg-gray-900"
          placeholder="source"
          inputClassName="w-full"
          onInput={(ev) => {
            setClass({
              cssProp: "background-image",
              value: `url('${ev.target.value}')`,
            });
          }}
        />
        <SmallButton className="bg-gray-900">{Icons.delete()}</SmallButton>
        <SmallButton
          className="bg-gray-900"
          onClick={(ev) => {
            setCssPropForAm("background-image");
            // editor.AssetManager.open();
            editor.Commands.run("open:custom:modal", {
              title: "Select File",
              JSXModal: <AssetsManager editor={editor} />,
            });
          }}
        >
          {Icons.gallery("white")}
        </SmallButton>
      </section>
      <Property cssProp="background-position-x" label="position-x" />
      <Property cssProp="background-position-y" label="position-y" />
      <SelectStyle
        cssProp="background-repeat"
        keywords={backgroundRepeatValues}
        placeholder="Repeat"
      />
      <SelectStyle
        cssProp="background-size"
        keywords={backgroundSize}
        placeholder="Size"
      />

      <AddMultiValuestoSingleProp
        placeholder="Attachment"
        cssProp="background-attachment"
        keywords={backgroundAttachmentValues}
      />

      <MiniTitle>Gradient</MiniTitle>
      <Gradient />

      <MiniTitle>Other</MiniTitle>
      <SelectStyle
        cssProp="background-clip"
        placeholder="Clip"
        keywords={backgroundClipValues}
      />
      <SelectStyle
        cssProp="background-origin"
        placeholder="Origin"
        keywords={backgroundClipValues.slice(0, -1)}
      />
      <SelectStyle
        cssProp="background-blend-mode"
        placeholder="Blend-mode"
        keywords={backgroundBlendModeValues}
      />
    </section>
  );
};
