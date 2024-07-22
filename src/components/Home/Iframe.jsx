import React, { useEffect, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { refsStt, showPopupIframState } from "../../helpers/atoms";

export const Iframe = () => {
  const ifrRef = useRef();
  const showPopUp = useRecoilValue(showPopupIframState);
  const refs = useRecoilValue(refsStt);

  return (
    <div
      ref={ifrRef}
      className="relative flex-grow h-full"
    >
      {showPopUp && (
        <div className="absolute w-full h-full bg-slate-400 z-10"></div>
      )}
      <iframe className="w-full h-full" id="ifrcontent"></iframe>
    </div>
  );
};
