import { Canvas, useNode } from "@craftjs/core";
import React from "react";
import { uniqueID } from "../helpers/cocktail";

export const MyText = ({ text }) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    // <div ref={drag}>
        <p id={uniqueID()} draggable={true} className="no-user-select" ref={(ref) => connect(drag(ref))}>
          {text}
        </p>
    // </div>
  );
};
