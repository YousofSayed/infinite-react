import React from "react";
import { addClickClass } from "../../helpers/cocktail";
import { Link, useParams, useResolvedPath } from "react-router-dom";

export const Li = ({
  children,
  className = "",
  hover = true,
  to,
  onClick = () => {},
  icon = (strokeColor , strokeWidth)=>{}
}) => {
  const path = useResolvedPath().pathname;
  return (
    <Link
      to={to}
      className={`group  w-[35px] h-[35px] rounded-lg grid place-items-center transition-all ${path == to && 'bg-blue-600'} ${className}  ${
        hover ? "hover:bg-slate-800" : ""
      }`}
      onClick={(ev) => {
        console.log(path.pathname , to);
        addClickClass(ev.currentTarget, "click");
        onClick(ev);
      }}
    >
      <li>
        {icon(path == to ? 'white' : undefined)}
        {children}
        </li>
    </Link>
  );
};
