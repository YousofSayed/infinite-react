import React, { memo, useEffect, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  ifrDocument,
  iframeWindow,
  refsStt,
  showOverlayIframState,
} from "../../helpers/atoms";
import { html } from "../../helpers/cocktail";
import mainScript from "../../helpers/main?raw";
// import { cleaner, iframeHandler } from "../../helpers/functions";

let firstRender = 0;

export const Iframe = () => {
  const ifrRef = useRef();
  const overlayRef = useRef();
  const scriptLoaded = useRef(false);
  const showOverlay = useRecoilValue(showOverlayIframState);
  const setRefs = useSetRecoilState(refsStt);
  const setIfrDocument = useSetRecoilState(ifrDocument);

  useEffect(() => {
    if (overlayRef.current) {
      setRefs((oldStt) => ({ ...oldStt, overlayRef: overlayRef.current }));
    }

    if (ifrRef.current && !showOverlay) {
      const iframeDocument = ifrRef.current.contentDocument;
      const iframeWindow = ifrRef.current.contentWindow;

      iframeDocument.head.querySelector("#mainScript")
        ? iframeDocument.head.querySelector("#mainScript").remove()
        : null;

      ifrRef.current.srcdoc = html`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <link rel="stylesheet" href="/styles/style.css" />
            <style id="elements-classes"></style>
            <!-- <script src="/scripts/tailwindcss.js"></script> -->
            <!-- <script src="/scripts/alpine-morph.js" defer></script> -->
            <!-- <script src="/scripts/alpine.js" defer></script> -->
            <script src="/scripts/cocktail.js" type="module" defer></script>
            <script id="mainScript" type="module" defer>
              ${mainScript};
            </script>
            <title>App</title>
          </head>
          <body>
            ${iframeDocument.body.innerHTML}

            
          </body>
        </html>
      `;
      ifrRef.current.addEventListener('load',(ev)=>{
        console.log(ev.target.contentDocument);
        setIfrDocument(ev.target.contentDocument);
        
      })
      // document.addEventListener('DOMContentLoaded',(ev)=>{
      //   console.log(ev.target);
        
      // })
    }

    return () => {
      if (scriptLoaded.current) {
        ifrRef.current.contentDocument.body.removeChild(scriptLoaded.current);
        scriptLoaded.current = null; // Clear the reference
      }
    };
  });

  return (
    <section className="relative flex items-center bg-gray-950 justify-center flex-grow h-full">
      <div
        ref={overlayRef}
        className={`absolute hidden w-full h-full bg-slate-400 z-10 opacity-[.5]`}
      ></div>

      <iframe
        ref={ifrRef}
        draggable={true}
        className="w-full h-full bg-white  hideScrollBar"
        title="It is iframe"
        srcDoc=""
        onDragOver={(ev) => {
          ev.preventDefault();
        }}
      ></iframe>
    </section>
  );
};
