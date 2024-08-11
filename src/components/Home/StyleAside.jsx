import React, { useEffect, useState } from "react";
import { Aside } from "./Protos/Aside";
import { Details } from "./Protos/Details";
import { StyleLayout } from "./Protos/StyleLayout";

export const StyleAside = () => {
  const [currentEl, setCurrentEl] = useState();

  useEffect(() => {
    /**
     *
     * @param {CustomEvent} ev
     */
    const onCurrentEl = (ev) => {
      setCurrentEl(ev.detail.currentEl);
    };

    window.addEventListener("currentel", onCurrentEl);

    return () => {
      window.removeEventListener("currentel", onCurrentEl);
    };
  });
  return (
    <Aside dir="right">
      <Details>
        <StyleLayout  currentEl={currentEl}/>
      </Details>
    </Aside>
  );
};
