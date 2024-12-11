import React from "react";
import { addClickClass } from "../../helpers/cocktail";

export const Button = ({ children , title ,className = "py-[7.5px] px-[30px]  font-bold", onClick = ()=>{} }) => {
  return (
    <button
    title={title}
      className={`bg-blue-600 rounded-lg ${className} text-white`}
      onClick={(ev) => {
        addClickClass(ev.target, "click");
        onClick(ev);
      }}
    >
      {children}
    </button>
  );
};
