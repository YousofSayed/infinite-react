import React, { useEffect, useRef } from "react";
import { Details } from "./Details";
import { refType } from "../../../helpers/jsDocs";

/**
 *
 * @param {{label : string , HTMLChildren : HTMLElement[]}} param0
 * @returns
 */
export const DetailsForBlocks = ({ label, HTMLChildren }) => {
  const blocksContainerRef = useRef(refType);
  useEffect(() => {
    if (!blocksContainerRef.current) return;
    
    blocksContainerRef.current.innerHTML = '';
    HTMLChildren.forEach((HTMLChild) => {
      blocksContainerRef.current.appendChild(HTMLChild);
    });
  });
  return (
    <Details label={label}>
      <section id={label} ref={blocksContainerRef} className="grid custom-grid-col"></section>
    </Details>
  );
};
