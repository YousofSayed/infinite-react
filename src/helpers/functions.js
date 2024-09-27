import { createRoot } from "react-dom/client";
import { Icons } from "../components/Icons/Icons";
import { filterUnits } from "../constants/constants";
import { css, html, parseToHTML, uniqueID } from "./cocktail";
import { dispatchCurrentEl } from "./customEvents";

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

export const isValidCssUnit = (value) => {
  // Updated regex to match valid CSS units, calc(), or var(), but not single numbers
  const cssUnitRegex =
    /^\s*(-?\d+(\.\d+)?\s*(px|em|rem|%|vh|vw|vmin|vmax|ch|ex|cm|mm|in|pt|pc|fr|deg|grad|rad|turn|s|ms|hz|khz)|calc\([^()]*\)|var\(--[a-zA-Z0-9-]+\))\s*$/i;
  return cssUnitRegex.test(value);
};

/**
 *
 * @param {HTMLElement} element
 * @param {HTMLStyleElement} styleElement
 * @param {string} property
 * @returns
 */
export const getOriginalCSSValue = (element, styleElement, property) => {
  // Find the <style> element

  if (styleElement && styleElement.sheet) {
    const sheet = styleElement.sheet; // Access the stylesheet object

    // Loop through all CSS rules in the stylesheet
    for (const rule of sheet.cssRules) {
      if (rule.selectorText && element.matches(rule.selectorText)) {
        // If the rule matches the element, return the original value
        const value = rule.style.getPropertyValue(property);
        if (value) {
          return value; // Return the original value (e.g., "1.5rem")
        }
      }
    }
  }
  return null; // Return null if no matching rule or property is found
};

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
    namesAndVals[names[i]] = +vals[i].match(/\d+/gi).join("");
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
  let cleanedHex = hex.replace("#", "");

  // Handle 3 or 4 character HEX codes (shorthand versions)
  if (cleanedHex.length === 3 || cleanedHex.length === 4) {
    cleanedHex = cleanedHex
      .split("")
      .map((char) => char + char)
      .join("");
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
    opacity: Math.round(a * 100),
  };
}

export function rgbStringToHex(rgbString) {
  // Extract the numbers from the string
  const result = rgbString.match(/\d+(\.\d+)?/g) || "";

  // Convert the extracted numbers to hexadecimal
  const r = parseInt(result[0], 10);
  const g = parseInt(result[1], 10);
  const b = parseInt(result[2], 10);

  const toHex = (component) => {
    const hex = component.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  let hexColor = `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();

  // If the input includes an alpha channel, handle it
  if (result.length === 4) {
    const a = Math.round(parseFloat(result[3]) * 255);
    const hexAlpha = toHex(a).toUpperCase();
    hexColor += hexAlpha;
  }
  return result ? hexColor : "";
}

export const getIconForMultiChoice = (iconName) => {
  return (strokeColor) =>
    Icons[iconName]({
      strokeColor: strokeColor,
      width: 16.5,
      height: 16.5,
    });
};

export function getCSSPropertiesFromClass(cssClassName, cssFileContent) {
  // Create a regex to find the class definition
  const regex = new RegExp(`\\.${cssClassName}\\s*\\{([^}]*)\\}`, "g");

  // Find the class definition
  const match = regex.exec(cssFileContent);
  if (!match) {
    return null; // Class not found
  }

  // Extract the properties inside the class definition
  const propertiesString = match[1].trim();

  // Split the properties into key-value pairs
  const propertiesArray = propertiesString
    .split(";")
    .filter((prop) => prop.trim() !== "");

  // Convert the properties into an object
  const properties = {};
  propertiesArray.forEach((prop) => {
    const [key, value] = prop.split(":").map((part) => part.trim());
    if (key && value) {
      properties[key] = value;
    }
  });

  return properties;
}

export function replaceCSSProperties(
  cssClassName,
  cssFileContent,
  newProperties
) {
  // Create a regex to find the class definition
  const regex = new RegExp(`(\\.${cssClassName}\\s*\\{)([^}]*)\\}`, "g");

  // Build the new properties string
  const newPropertiesString = Object.entries(newProperties)
    .map(([key, value]) => `${key}: ${value};`)
    .join(" ");

  // Replace the old properties with the new properties
  const newCSSFileContent = cssFileContent.replace(
    regex,
    `$1 ${newPropertiesString} }`
  );

  return newCSSFileContent;
}

// Example usage:
// const cssContent = `
// .myClass {
//     color: red;
//     margin: 10px;
//     display: flex;
// }

// .anotherClass {
//     background-color: blue;
// }
// `;

// const className = "myClass";
// const newProps = {
//   color: "blue",
//   margin: "20px",
//   "flex-direction": "column",
// };

// const updatedCSS = replaceCSSProperties(className, cssContent, newProps);

// console.log(updatedCSS);

/**
 *
 * @param {{ifrDocument:Document , currentEl:HTMLElement , cssProp:string , value:string}} param0
 */
export function setClassForCurrentEl({
  ifrDocument,
  currentEl,
  cssProp,
  value,
}) {
  const cssClassesStyle = ifrDocument.head.querySelector("#elements-classes");
  const oldCssProps = getCSSPropertiesFromClass(
    currentEl.id,
    cssClassesStyle.innerHTML
  );
  const newCssProps = { ...oldCssProps, [cssProp]: value };
  const newContent = replaceCSSProperties(
    currentEl.id,
    cssClassesStyle.innerHTML,
    newCssProps
  );
  const newPropsString = Object.keys(newCssProps)
    .map((key) => `${key}:${newCssProps[key]};`)
    .toString();
  const finalClass = `.${currentEl.id} {${newPropsString}}`;

  cssClassesStyle.innerHTML = newContent ? newContent : finalClass;
  currentEl.classList.add(currentEl.id);
}

/**
 *
 * @param {{typeOfEl : keyof HTMLElementTagNameMap , inner:string , attrs : Partial<HTMLElementTagNameMap[keyof HTMLElementTagNameMap]>}} param0
 * @returns
 */
export const createBlock = ({ typeOfEl, inner, attrs }) => {
  const el = document.createElement(typeOfEl);

  el.addEventListener("click", (ev) => {
    dispatchCurrentEl(ev.target);
  });

  console.log("true", attrs);
  for (const key in attrs) {
    el.setAttribute(key, attrs[key]);
  }

  if (!inner) return el;
  const parsedInner = parseToHTML(inner);
  el.appendChild(parsedInner);
  return el;
};

/**
 *
 * @param {import('grapesjs').Block[]} blocks
 * @param {import('grapesjs').Editor} editor
 * @returns {{[categoryName : string] : import('grapesjs').BlockProperties[]}}
 */
export function handleCustomBlock(blocks, editor) {
  /**
   * @type {{[categoryName : string] : import('grapesjs').BlockProperties[]}}
   */
  const ctgs = {};
  console.log(blocks);

  blocks.forEach((block) => {
    const id = block.attributes.category.id || block.attributes.category;

    if (Array.isArray(ctgs[id])) {
      ctgs[id].push(editor.Blocks.render(block.attributes, { external: true }));
    } else {
      ctgs[id] = [];
      ctgs[id].push(editor.Blocks.render(block.attributes, { external: true }));
    }
  });

  console.log(ctgs);

  return ctgs;
}

/**
 *
 * @param {{commandName:string , editor : import('grapesjs').Editor , commandCallback:(editor:import('grapesjs').Editor)=>void , label:string}} param0
 */
export function addItemInToolBarForEditor({
  commandName,
  editor,
  commandCallback = (_) => {},
  label,
}) {
  !editor.Commands.has(commandName) &&
    editor.Commands.add(commandName, commandCallback);
  const selectedEl = editor.getSelected();
  const toolbar = selectedEl.get("toolbar");
  const isExist = toolbar.find((item) => item.command == commandName);

  if (!isExist) {
    selectedEl.set({
      toolbar: [
        {
          label: label,
          command: commandName,
        },
        ...toolbar,
      ],
    });
  }
}

/**
 *
 * @param {{editor: import('grapesjs').Editor , titleJsx:import('react').ReactNode , contentJsx:import('react').ReactNode}} param0
 */
export const createModal = ({ editor, titleJsx, contentJsx }) => {
  const titleId = uniqueID();
  const contentId = uniqueID();
  editor.Modal.open({
    title: html`<h1 id="${titleId}"></h1>`,
    content: html`<main id="${contentId}"></main>`,
  });

  createRoot(document.querySelector(`#${titleId}`)).render(titleJsx);
  createRoot(document.querySelector(`#${contentId}`)).render(contentJsx);
};
