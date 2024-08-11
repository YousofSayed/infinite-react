/**
 * 
 * @param {HTMLElement} el 
 * @param {string} val 
 */
export function getPropVal(el , val) {
   const prop = el ? window.getComputedStyle(el , null).getPropertyValue(val) : 0;
   console.log(prop);
   
   return prop;
}