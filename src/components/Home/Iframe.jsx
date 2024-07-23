import React, { useEffect, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { refsStt, showPopupIframState } from "../../helpers/atoms";
import bodyDrag from "../../scripts/bodyDrag?raw";
import style from "../../styles/style.css?raw";
import {
  appendScript,
  appendStyle,
  removeOldScriptsAndStyles,
} from "../../helpers/functions";

export const Iframe = () => {
  const ifrRef = useRef();
  const showPopUp = useRecoilValue(showPopupIframState);
  const setIframeRef = useSetRecoilState(refsStt);

  useEffect(() => {
    if (ifrRef.current) {
      setIframeRef((oldstt) => ({ ...oldstt, ifrRef: ifrRef.current }));
      removeOldScriptsAndStyles(ifrRef.current);
      appendScript(bodyDrag, ifrRef.current);
      appendStyle(style, ifrRef.current);
    }
  });


  return (
    <section draggable={true} className="relative flex-grow h-full" >
      {showPopUp && (
        <div className="absolute w-full h-full bg-slate-400 z-10"></div>
      )}
      
      {/* <div draggable={true} className="rela top-0 left-0 w-full h-full bg-black opacity-[.2] z-30"></div> */}

      <iframe
        ref={ifrRef}
        draggable={true}
        className="w-full h-full"
        onDragOver={(ev)=>{ev.preventDefault()}}
      ></iframe>
    </section>
  );
};
