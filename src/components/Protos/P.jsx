import React from "react";

export const P = ({ children , className = "text-slate-300 capitalize custom-font-size w-fit font-semibold h-full mr-2"}) => {
  return (
    <p className={className}>
      {children}
    </p>
  );
};
