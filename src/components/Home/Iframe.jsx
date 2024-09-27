import React, { memo, useEffect, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import ReactDOM from "react-dom/client";
import {
  currentElState,
  editorStt,
  ifrDocument,
  iframeRoot,
  iframeWindow,
  refsStt,
  showOverlayIframState,
  widths,
} from "../../helpers/atoms";
import EditorJS from "@editorjs/editorjs";
import { html, uniqueID } from "../../helpers/cocktail";
import grapesjs from "grapesjs";
import { gjsEditor } from "../../helpers/globals";
import GjsEditor ,{ Canvas } from "@grapesjs/react";
// import { cleaner, iframeHandler } from "../../helpers/functions";

let firstRender = 0;

export const Iframe = () => {
  const ifrRef = useRef();
  const overlayRef = useRef();
  const scriptLoaded = useRef(false);
  const showOverlay = useRecoilValue(showOverlayIframState);
  const setRefs = useSetRecoilState(refsStt);
  const setIfrDocument = useSetRecoilState(ifrDocument);
  const setIframeRoot = useSetRecoilState(iframeRoot);
  const blocksStyleRef = useRef();
  const setEditor = useSetRecoilState(editorStt);
  const editor = useRecoilValue(editorStt);
  const asideWidths = useRecoilValue(widths);
  const setSelectedEl = useSetRecoilState(currentElState);
  /**
   * @type {{current:EditorJS}}
   */
  const gjs = useRef();
  /**
   * @type {{current:HTMLElement}}
   */

  const shadowRootRef = useRef();

  return (
    <section
      ref={shadowRootRef}
      className="relative bg-white w-full   h-full"
    >
 
 <Canvas></Canvas>

      {/* <main ref={gjs} className="w-full max-w-full h-full " id="gjs"> */}
        {/* <GjsEditor grapesjs={grapesjs}
        options={{
          height: "100%",
            width: "100%",
            storageManager: false,
            panels: { defaults: [] },
            components:html`
              <h1 id="${uniqueID()}">Loloere</h1>
            
            `
        }}
        > */}
        {/* </GjsEditor> */}
      {/* </main> */}
    </section>
  );
};
