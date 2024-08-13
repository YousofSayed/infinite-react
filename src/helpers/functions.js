/**
 *
 * @param {HTMLElement} el
 * @param {string} val
 */
export function getPropVal(el, val) {
  const prop = el
    ? window.getComputedStyle(el, null).getPropertyValue(val)
    : "";
  console.log(prop);

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
  console.log(props);
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
      +vals[i].match(/\d+/gi).join("") <= 0
        ? +vals[i].match(/\d+/gi).join("") * 100
        : +vals[i].match(/\d+/gi).join("");
  }
  return {
    props,
    names,
    vals,
    namesAndVals,
  };
}

export function getValsFromString(prop) {}

console.log(getAllValsFromMultiProp(document.body, "transform").namesAndVals);
