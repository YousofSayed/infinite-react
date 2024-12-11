import React, { useEffect, useState, useTransition } from "react";
import { SmallButton } from "../Home/Protos/SmallButton";
import { Icons } from "../Icons/Icons";
import { Menu } from "../Home/Protos/Menu";

export const OptionsButton = ({
  children,
  buttonClassName = "",
  menuClassName = "",
  callbackChildren = ({setShowMenu})=>{}
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isPending, setTransition] = useTransition();

  useEffect(() => {
    const clickCallback = (ev) => {
      console.log(ev.target.tagName);
      setTransition(() => {
        setShowMenu(false);
      });
    };
    window.addEventListener("click", clickCallback);
    
    return () => {
      window.removeEventListener("click", clickCallback);
      //   document.removeEventListener("focusout", clickCallback);
    };
  });

  return (
    <section
      className="relative h-full"
      
    >
      <SmallButton
        onBlur={(ev) => {
          ev.stopPropagation();
        }}
        onClick={(ev) => {
          console.log(true);
          ev.stopPropagation();

          ev.currentTarget.parentNode.click();
          setTransition(() => {
            setShowMenu(!showMenu);
          });
        }}
        className={`h-full ${
          buttonClassName ? buttonClassName : "bg-gray-800"
        }`}
      >
        {Icons.options({ fill: "#fff" })}
      </SmallButton>

      {showMenu && (
        <menu
       
          onClick={(ev) => {
            ev.stopPropagation();
          }}
          className={`flex flex-col gap-2 border-2 border-slate-600  p-2 absolute  shadow-md shadow-gray-950 text-white w-[130px] text-center left-[-65px] rounded-lg z-[500] top-[calc(100%+10px)] ${
            menuClassName ? menuClassName : "bg-gray-800"
          }`}
        >
          {children || callbackChildren({setShowMenu})}
        </menu>
      )}
    </section>
  );
};
