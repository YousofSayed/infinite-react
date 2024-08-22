import { Icons } from "../components/Icons/Icons";
import { filterUnits } from "../constants/constants";

/**
 *
 * @param {HTMLElement} el
 * @param {string} val
 */
export function getPropVal(el, val) {
  const prop = el
    ? window.getComputedStyle(el, null).getPropertyValue(val)
    : "";
  return prop == "none" ? " " : prop;
}

/**
 *
 * @param {string} prop
 */
export function getValFormMultiProp(prop) {
  return prop.replace(/\w+(\s+)?:/gi, "").replace(";", "") || "";
}

/**
 *
 * @param {string} prop
 */
export function toJsProp(prop) {
  return (
    prop
      .replace(/\w+(\s+)?:/gi, "")
      .replace(/-([a-z])/gi, (match, letter) => letter.toUpperCase()) || ""
  );
}

/**
 * @param {HTMLElement} el
 * @param {string} prop
 * @returns {{props : string[] , names:string[] , vals:string[] , namesAndVals:{[key : string]:string}}}
 */
export function getAllValsFromMultiProp(el, prop) {
  const props = getPropVal(el, prop)?.split(" ") || "";

  if (!props[0]) {
    return {
      props: [],
      names: [],
      vals: [],
      namesAndVals: {},
    };
  }

  const names = props.map((prop) => prop.replace(/\(.+\)/gi, ""));
  const vals = props.map((prop) =>
    prop
      .match(/\(.+\)/gi)
      .join("")
      .replace(/\(|\)/gi, "")
  );
  const namesAndVals = {};
  for (let i = 0; i < names.length; i++) {
    namesAndVals[names[i]] =
      +vals[i].match(/\d+/gi).join("") ;
  }

  // console.log(namesAndVals, vals);

  return {
    props,
    names,
    vals,
    namesAndVals,
  };
}

/**
 *
 * @param {{prevObjVals:{[key:string]:string} ,cssProp:string, propVal:string , propName:string}} param0
 */
export function setMultiValInProp({ prevObjVals, cssProp, propVal, propName }) {
  const vals = {
    ...prevObjVals,
    [propName]: +propVal <= 0 ? propVal * 100 : propVal,
  };
  !propName && delete vals[propName];

  let finalVlaue = ``;
  Object.keys(vals).forEach((val) => {
    finalVlaue += `${val}(${vals[val]}${filterUnits[val]})`;
  });

  currentEl.style[toJsProp(cssProp)] = finalVlaue;
}


export function hexToRgbA(hex) {
  // Remove the '#' if it exists
  let cleanedHex = hex.replace('#', '');

  // Handle 3 or 4 character HEX codes (shorthand versions)
  if (cleanedHex.length === 3 || cleanedHex.length === 4) {    cleanedHex = cleanedHex.split('').map(char => char + char).join('');
  }

  const r = parseInt(cleanedHex.substring(0, 2), 16);
  const g = parseInt(cleanedHex.substring(2, 4), 16);
  const b = parseInt(cleanedHex.substring(4, 6), 16);

  // If HEX contains alpha (opacity) information
  let a = 1; // Default to fully opaque
  if (cleanedHex.length === 8) {
    a = parseInt(cleanedHex.substring(6, 8), 16) / 255;
  }

  return {
    rgb: `rgb(${r}, ${g}, ${b})`,
    rgba: `rgba(${r}, ${g}, ${b}, ${a})`,
    opacity: Math.round(a * 100)
  };
}

export function rgbStringToHex(rgbString) {
  // Extract the numbers from the string
  const result = rgbString.match(/\d+/g);

  // Convert the extracted numbers to hexadecimal
  const r = parseInt(result[0], 10);
  const g = parseInt(result[1], 10);
  const b = parseInt(result[2], 10);

  const toHex = (component) => {
    const hex = component.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  const hexColor = `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();

  // If the input includes an alpha channel, handle it
  if (result.length === 4) {
    const a = Math.round(parseFloat(result[3]) * 255);
    const hexAlpha = toHex(a);
    return hexColor + hexAlpha;
  }

  return hexColor;
}

export const getIconForMultiChoice = (iconName)=>{
  return (strokeColor) =>
     Icons[iconName]({
       strokeColor: strokeColor,
       width: 16.5,
       height: 16.5,
     })
 };