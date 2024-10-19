import React, { useState } from "react";
import { Icons } from "../../Icons/Icons";
import { Li } from "../../Protos/Li";

export const AsideControllers = () => {
  const [select, setSelect] = useState("style");
  return (
    <ul className="w-full flex items-center  bg-slate-800 shadow-md p-1 shadow-gray-950 rounded-lg gap-2">
      <Li
      to={'/edite/traits'}
        className={`w-[50%] h-[40px] hover:bg-blue-600 `}
        icon={Icons.setting}
      />

      <Li
      to={'/edite/styling'}
        className={`w-[50%] h-[40px] hover:bg-blue-600 `}
        icon={Icons.style}
      />

      
      
    </ul>
  );
};
