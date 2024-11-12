import { Canvas, useEditorMaybe } from "@grapesjs/react";
import React, { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  showAnimationsBuilderState,
  showLayersState,
} from "../../helpers/atoms";
import { P } from "../Protos/P";
import { Button } from "../Protos/Button";
import { Icons } from "../Icons/Icons";

export const Iframe = () => {
  const showLayers = useRecoilValue(showLayersState);
  const showAnimBuilder = useRecoilValue(showAnimationsBuilderState);
  const setShowAnimBuilder = useSetRecoilState(showAnimationsBuilderState);
  const editor = useEditorMaybe();

  useEffect(() => {
    if (!editor) return;
    editor.Canvas.refresh();
  }, [showAnimBuilder, showLayers]);

  return (
    <section className="relative bg-[#aaa] w-full   h-full">
      {showAnimBuilder && (
        <section className="flex flex-col items-center justify-center p-2 absolute top-0 left-0 z-20 bg-blur-dark w-full h-full">
          <section className="flex flex-col items-center justify-center p-3 bg-gray-900 rounded-lg gap-5">
            {Icons.animation({ fill: "#2563eb", width: 60, height: 60 })}
            <h1 className="font-bold text-center text-white text-2xl ">
              <span className="text-blue-600 font-bold text-2xl ">" </span>
              You Are In Animations Builder Mode
              <span className="text-blue-600 font-bold text-2xl"> "</span>
            </h1>
            <Button
              onClick={(ev) => {
                setShowAnimBuilder(false);
              }}
            >
              Close
            </Button>
          </section>
        </section>
      )}
      <Canvas title="Editor" aria-label="Editor"></Canvas>
    </section>
  );
};
