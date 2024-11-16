import React, { useEffect, useRef, useState } from "react";
import { $a, addClickClass } from "../../helpers/cocktail";
import { Link, useParams, useResolvedPath } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { removeAllActivesState } from "../../helpers/atoms";
import { refType } from "../../helpers/jsDocs";

export const Li = ({
  children,
  className = "",
  hover = true,
  to = "",
  title = "",
  onClick = () => {},
  justHover = false,
  target,
  icon = (strokeColor, strokeWidth) => {},
}) => {
  const path = useResolvedPath().pathname;
  const setRemoveActives = useSetRecoilState(removeAllActivesState);
  const allActives = useRecoilValue(removeAllActivesState);
  const [myName, setMyName] = useState("");
  const [isClicked, setIsClicked] = useState();
  const buttonRef = useRef(refType);

  // useEffect(() => {
  //   //   if (!buttonRef || !buttonRef.current) return;
  //   console.log(isClicked);

  //   if (allActives == title) {
  //     setMyName(title);
  //     setIsClicked(true);
  //     return;
  //   }
  //   setMyName("");
  //   setIsClicked(false);
  // }, [allActives]);

  // useEffect(() => {
  //   const handleClickCallback = () => {
  //     setRemoveActives("");
  //   };
  //   window.addEventListener("click", handleClickCallback);
  //   return () => {
  //     window.removeEventListener("click", handleClickCallback);
  //   };
  // }, []);

  return (
    <li
      className={`group  w-[35px] h-[35px] rounded-lg cursor-pointer grid place-items-center transition-all ${
        path == to && "bg-blue-600"
      } ${className}  ${hover ? "hover:bg-blue-700" : ""}`}
    >
      {to ? (
        <Link
          to={to}
          title={title}
          aria-label={title}
          target={target}
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
          ref={buttonRef}
          aria-label={title}
          title={title}
          className="w-full h-full flex justify-center items-center "
          style={{ strokeColor: "red" }}
          onClick={(ev) => {
            ev.stopPropagation();
            onClick(ev);
            addClickClass(ev.currentTarget, "click");
            if(justHover)return;
            [...$a(".clicked")]
              .filter((el) => el != ev.currentTarget)
              .forEach((el) => el.classList.remove("clicked"));
            setMyName("");
            const is = ev.currentTarget.classList.contains("clicked");
            setRemoveActives(title);

            if (is) {
              setIsClicked(false);

              ev.currentTarget.classList.remove("clicked");
            } else {
              setIsClicked(true);
              console.log("not is");

              ev.currentTarget.classList.add("clicked");
            }
          }}
        >
          {icon(
            undefined,
            undefined,
            isClicked && allActives == title ? "white" : undefined
          )}
          {children}
        </button>
      )}
    </li>
  );
};
