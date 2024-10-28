import React from "react";
import { addClickClass } from "../../helpers/cocktail";
import { Link, useParams, useResolvedPath } from "react-router-dom";

export const Li = ({
  children,
  className = "",
  hover = true,
  to,
  onClick = () => {},
  icon = (strokeColor, strokeWidth) => {},
}) => {
  const path = useResolvedPath().pathname;

  return (
    <li
      className={`group  w-[35px] h-[35px] rounded-lg cursor-pointer grid place-items-center transition-all ${
        path == to && "bg-blue-600"
      } ${className}  ${hover ? "hover:bg-blue-700" : ""}`}
    >
      {to ? (
        <Link
          to={to}
          className="w-full h-full flex justify-center items-center"
          onClick={(ev) => {
            console.log(path.pathname, to);
            addClickClass(ev.currentTarget, "click");
            onClick(ev);
          }}
        >
          {icon(path == to ? "white" : undefined)}
          {children}
        </Link>
      ) : (
        <button
          className="w-full h-full flex justify-center items-center"
          onClick={(ev) => {
            console.log(path.pathname, to);
            addClickClass(ev.currentTarget, "click");
            onClick(ev);
          }}
        >
          {icon(path == to ? "white" : undefined)}
          {children}
        </button>
      )}
    </li>
  );
};
