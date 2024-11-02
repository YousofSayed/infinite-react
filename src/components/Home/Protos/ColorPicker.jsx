import React, { useEffect, useRef, useState, useTransition } from "react";
import { HexAlphaColorPicker } from "react-colorful";
import { uniqueID } from "../../../helpers/cocktail";

/**
 *
 * @param {{color:string , setColor:Function , onEffect : (color:string , setColor:Function)=>void}} param0
 * @returns
 */
export const ColorPicker = ({
  color = "",
  setColor,
  onEffect = (_1, _2) => {},
}) => {
  const [showHexColor, setShowHexColor] = useState(false);
  /**
   * @type {{current:HTMLElement}}
   */
  const colorPickerContainerRef = useRef();
  const [isPending, setTransition] = useTransition();

  /**
   * @type {{current:HTMLElement}}
   */
  const hexColorRef = useRef();
  useEffect(() => {
    if (hexColorRef.current) {
      hexColorRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [showHexColor]);

  // useEffect(()=>{
  //   if(!hexColorRef.current)return;
  //   console.log(hexColorRef.current , 's');
  //   hexColorRef.current.focus();
  // })

  useEffect(() => {
    const hideColorPicker = () => {
      setShowHexColor(false);
    };
    document.addEventListener("click", hideColorPicker);

    return () => {
      document.removeEventListener("click", hideColorPicker);
    };
  });

  useEffect(() => {
    onEffect(color, setColor);
  }, [color]);

  return (
    <section ref={colorPickerContainerRef} className="relative">
      <button
        className={`w-[30px] h-[30px] shadow-md shadow-gray-950 rounded-lg border-[2.3px] border-slate-600  bg-gray-900 cursor-pointer`}
        onClick={(ev) => {

          ev.stopPropagation();
          colorPickerContainerRef.current.click()
          setTransition(() => {
            setShowHexColor(!showHexColor);
          });
        }}
        style={{ backgroundColor: color }}
      ></button>
      {showHexColor && (
        <section
          className="absolute left-[0] z-[1]  top-[calc(100%+5px)] w-[250px]"
          ref={hexColorRef}
        
        >
          <HexAlphaColorPicker
            id="color_picker"
            color={color}
            className="z-50"
            onClick={(ev) => {
              ev.stopPropagation();
            }}
            onChange={(color) => {
              // setShowHexColor(true);
              setColor(color);
            }}
          />
        </section>
      )}
    </section>
  );
};
