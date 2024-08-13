import React from "react";

export const P = ({ children , className = "text-slate-300 custom-font-size w-[30%] font-semibold h-full mr-2"}) => {
  return (
    <p className={className}>
      {children}
    </p>
  );
};
