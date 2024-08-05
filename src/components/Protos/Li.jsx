import React from "react";
import { addClickClass } from "../../helpers/cocktail";

export const Li = ({ children , onClick=()=>{}}) => {
  return (
    <li onClick={(ev)=>{ addClickClass(ev.currentTarget,'click');onClick(ev)}} className="group  w-[35px] h-[35px] rounded-lg grid place-items-center hover:bg-slate-800 transition-all ">
      {children}
    </li>
  );
};
