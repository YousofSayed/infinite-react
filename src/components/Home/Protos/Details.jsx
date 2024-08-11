import React, { useRef, useState, useTransition } from "react";
import { Icons } from "../../Icons/Icons";

export const Details = ({ children }) => {
    const [isPending , setTransition] = useTransition();
    const [showDetails , setShowDetails] = useState(false);

  return (
    <section className={`bg-slate-700 ${showDetails && 'p-2'} transition-all rounded-lg`}>
      <div className={`flex items-center justify-between p-3 rounded-lg text-slate-300 text-lg font-bold ${showDetails ? 'bg-gray-900' : 'bg-slate-800'}`}>
        Layout{" "}
        <span
          className="group  transition-all cursor-pointer"
          onClick={(ev) => {
            setTransition(()=>{
                setShowDetails(!showDetails);
            })
            ev.currentTarget.classList.toggle("rotate-180");
          }}
        >
          {Icons.arrow()}
        </span>
      </div>

     {showDetails && children}
    </section>
  );
};
