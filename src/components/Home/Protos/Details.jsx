import React, { useRef, useState, useTransition } from "react";
import { Icons } from "../../Icons/Icons";
import { P } from "../../Protos/P";

export const Details = ({ children, label, ref, id , containerClassName = '' }) => {
  const [showDetails, setShowDetails] = useState(false);
  const arrowIcon = useRef();

  return (
    <section
      ref={ref}
      className={`bg-slate-700 ${
        showDetails && "p-2 border-2 border-blue-600"
      } transition-[padding] rounded-lg`}
    >
      <div
        onClick={(ev) => {
          setShowDetails(!showDetails);
          arrowIcon.current.classList.toggle("rotate-180");
        }}
        className={`flex items-center   justify-between p-3 rounded-lg text-slate-300 text-lg font-bold ${
          showDetails ? "bg-gray-900" : "bg-slate-800"
        }`}
      >
        <P className="capitalize">{label} </P>
        <span ref={arrowIcon} className="group transition-all cursor-pointer">
          {Icons.arrow()}
        </span>
      </div>

      <section id={id} className={containerClassName + `${showDetails ? ' ' : ' hidden '} mt-2  `}>{ children}</section>
    </section>
  );
};
