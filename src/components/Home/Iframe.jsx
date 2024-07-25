import React, { memo, useEffect, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { refsStt, showPopupIframState } from "../../helpers/atoms";
import style from "../../styles/style.css?raw";
import {
  appendStyle,
  cleaner,
  iframeHandler,
  removeOldScriptsAndStyles,
} from "../../helpers/functions";

export const Iframe = (() => {
  const ifrRef = useRef();
  const showPopUp = useRecoilValue(showPopupIframState);
  const setIframeRef = useSetRecoilState(refsStt);

  useEffect(() => {
    if (ifrRef.current) {
      setIframeRef((oldstt) => ({ ...oldstt, ifrRef: ifrRef.current }));
      removeOldScriptsAndStyles(ifrRef.current);
      iframeHandler(ifrRef.current);
      appendStyle(style, ifrRef.current);
    }

    return cleaner;
  },[]);


  return (
    <section draggable={true} className="relative flex-grow h-full" >
      {showPopUp && (
        <div className="absolute w-full h-full bg-slate-400 z-10 opacity-[.5]"></div>
      )}
      

      <iframe
        ref={ifrRef}
        draggable={true}
        className="w-full h-full"
        title="It is iframe"
        onDragOver={(ev)=>{ev.preventDefault()}}
      ></iframe>
    </section>
  );
});
