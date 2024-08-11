import React from "react";
import { addClickClass } from "../../helpers/cocktail";

export const Button = ({ children ,className = "py-[7.5px] px-[30px]  font-bold", onClick }) => {
  return (
    <button
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
