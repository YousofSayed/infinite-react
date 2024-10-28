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

export const Background = () => {
  const editor = useEditorMaybe();
  const setCssPropForAm = useSetRecoilState(cssPropForAssetsManagerState);

  return (
    <section className="mt-3 flex flex-col gap-3">
      <Color cssProp="background-color" />
      <section className="flex gap-2 justify-between">
        <Input
          cssProp="background-image"
          className="min-w-[70%] bg-gray-800"
          placeholder="source"
          inputClassName="w-full"
        />
        <SmallButton>{Icons.delete()}</SmallButton>

        <SmallButton
          onClick={(ev) => {
            setCssPropForAm("background-image");
            // editor.AssetManager.open();
            editor.Commands.run('open:custom:modal' , {
                title:'Select File',
                JSXModal:<AssetsManager editor={editor} />
            })
          }}
        >
          {Icons.gallery("white")}
        </SmallButton>
      </section>
    </section>
  );
};
