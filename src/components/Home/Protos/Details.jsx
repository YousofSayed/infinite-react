import React, { useRef, useState, useTransition } from "react";
import { Icons } from "../../Icons/Icons";

export const Details = ({ children, label }) => {
  const [showDetails, setShowDetails] = useState(false);
  const arrowIcon = useRef();

  return (
    <section
      className={`bg-slate-700 ${
        showDetails && "p-2"
      } transition-all rounded-lg`}
    >
      <div
        onClick={(ev) => {
          setShowDetails(!showDetails);
          arrowIcon.current.classList.toggle("rotate-180");
        }}
        className={`flex items-center  justify-between p-3 rounded-lg text-slate-300 text-lg font-bold ${
          showDetails ? "bg-gray-900" : "bg-slate-800"
        }`}
      >
        <p className="capitalize">{label} </p>
        <span ref={arrowIcon} className="group transition-all cursor-pointer">
          {Icons.arrow()}
        </span>
      </div>

      {showDetails && children}
    </section>
  );
};
