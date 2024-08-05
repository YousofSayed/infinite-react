import React, { memo, useEffect, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  iframeBody,
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
  const scriptLoaded = useRef(false);
  const showOverlay = useRecoilValue(showOverlayIframState);
  const setIframeRef = useSetRecoilState(refsStt);
  const setIframeBody = useSetRecoilState(iframeBody);

  useEffect(() => {
    if (ifrRef.current && !showOverlay) {
      const iframeDocument = ifrRef.current.contentDocument;
      const iframeWindow = ifrRef.current.contentWindow;

      iframeDocument.body.querySelector("#mainScript")
        ? iframeDocument.body.removeChild(
            iframeDocument.body.querySelector("#mainScript")
          )
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
            <link rel="stylesheet" href="/styles/style.css">
            <title>App</title>
          </head>
          <body>
            ${iframeDocument.body.innerHTML}

            <script src="/scripts/cocktail.js" type="module"></script>
            <script id="mainScript" type="module">
              ${mainScript};
            </script>
          </body>
        </html>
      `;


    }

    return () => {
      if (scriptLoaded.current) {
        ifrRef.current.contentDocument.body.removeChild(scriptLoaded.current);
        scriptLoaded.current = null; // Clear the reference
      }
    };
  });

  return (
    <section className="relative flex-grow h-full">
      {showOverlay && (
        <div className="absolute w-full h-full bg-slate-400 z-10 opacity-[.5]"></div>
      )}

      <iframe
        ref={ifrRef}
        draggable={true}
        className="w-full h-full"
        title="It is iframe"
        onDragOver={(ev) => {
          ev.preventDefault();
        }}
      ></iframe>
    </section>
  );
};
