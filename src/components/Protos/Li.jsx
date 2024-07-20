import React from "react";

export const Li = ({ children }) => {
  return (
    <li className="group w-[35px] h-[35px] rounded-lg grid place-items-center hover:bg-slate-800 transition-all ">
      {children}
    </li>
  );
};
