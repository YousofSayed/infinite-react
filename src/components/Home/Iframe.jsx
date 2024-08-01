import React, { memo, useEffect, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  iframeBody,
  iframeWindow,
  refsStt,
  showPopupIframState,
} from "../../helpers/atoms";
// import style from "/styles/style.css";

import {
  appendStyle,
  cleaner,
  iframeHandler,
  removeOldScriptsAndStyles,
} from "../../helpers/functions";
import { html } from "../../helpers/cocktail";

let firstRender = 0;

export const Iframe = () => {
  const ifrRef = useRef();
  const showPopUp = useRecoilValue(showPopupIframState);
  const setIframeRef = useSetRecoilState(refsStt);
  const setIframeBody = useSetRecoilState(iframeBody);
  const setIframeWindow = useSetRecoilState(iframeWindow);

  useEffect(() => {
    firstRender++;
    if (ifrRef.current && firstRender == 2) {
      setIframeRef((oldstt) => ({ ...oldstt, ifrRef: ifrRef.current }));
      setIframeBody(ifrRef.current.contentDocument);
      iframeHandler(ifrRef.current);
      const script = document.createElement('script');
      script.src = '/scripts/main.js';
      ifrRef.current.contentDocument.body.appendChild(script);
    }

    return cleaner;
  }, [ifrRef]);

  return (
    <section draggable={true} className="relative flex-grow h-full">
      {showPopUp && (
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
