import { Canvas, useEditorMaybe } from "@grapesjs/react";
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { showAnimationsBuilderState, showLayersState } from "../../helpers/atoms";

export const Iframe = () => {
  const showLayers = useRecoilValue(showLayersState);
  const showAnimBuilder = useRecoilValue(showAnimationsBuilderState);
  const editor = useEditorMaybe();

  useEffect(()=>{
    if(!editor)return;
    editor.Canvas.refresh();
  },[showAnimBuilder , showLayers])

  return (
    <section className="relative bg-[#aaa] w-full   h-full">
      <Canvas title="Editor" aria-label="Editor"></Canvas>
    </section>
  );
};
