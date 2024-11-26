import { uniqueID } from "../helpers/cocktail";
import {
  getAllCssProperties,
  getWindowBuiltInClasses,
} from "../helpers/functions";
import { eventNames, operators, tagNames } from "./constants";

const observerId = uniqueID();

/**
 * @type {{[key:string]:import('../helpers/types').CMD}}
 */
export const vjsCmds = {
  openVariable : {
    cmd: `var {name} = `,
    desc: "Sets a global variable.",
    params:[
      { name: "name", type: "text", required: true  },
    ]
  },

  closeVariable:{
    cmd:` ; `,
    desc:'close a global variable.',
    params:[]
  },

  makeArray:{
    cmd:`[{array}]`,
    desc:`it is make array and you should use it before closeVariable`,
    params:[
      {name:'array',type:'array' , required:true ,}
    ]
  },
  
  
  openEventListener: {
    cmd: `document.querySelector('{selector}').addEventListener('{event}', function({function_params}) { `,
    desc: "Adds an event listener to an element.",
    params: [
      { name: "selector", type: "text", required: true },
      {
        name: "event",
        type: "select",
        required: true,
        keywords: eventNames,
      },
      { name: "function_params", type: "array", required: true },
    ],
  },
  preventDefaultAction: {
    cmd: `{event}.preventDefault(); `,
    desc: `It is prevent default behavior in browser`,
    params: [{ name: "event", type: "text", required: true }],
  },
  stopPropagationAction: {
    cmd: `{event}.stopPropagation(); `,
    desc: "Stops the event from propagating further.",
    params: [{ name: "event", type: "text", required: true }],
  },
  logToConsole: {
    cmd: `console.log({message}); `,
    desc: "Logs a message to the console.",
    params: [{ name: "message", type: "text", required: true }],
  },
  closeEvent: {
    cmd: `}); `,
    desc: `close event to start new code`,
    params: [],
  },
  openLoop: {
    cmd: `for (let {variable} = {start}; {variable} < {end}; {variable}++) { `,
    desc: "Creates a basic for loop.",
    params: [
      { name: "variable", type: "text", required: true },
      { name: "start", type: "select", required: true },
      { name: "end", type: "select", required: true },
      // { name: "code", type: "text", required: true },
    ],
  },
  closeLoop: {
    cmd: ` } `,
    desc: `close current loop to start new code , don’t forget to close loop`,
    params: [],
  },
  openWhile: {
    cmd: `while ( `,
    desc: "Opens a while loop.",
    params: [],
  },
  closeWhile: {
    cmd: ` ) { `,
    desc: "Closes a while condition.",
    params: [],
  },

  selectAllElements: {
    cmd: `document.querySelectorAll('{selector}')`,
    desc: "Selects all DOM elements matching the selector.",
    params: [{ name: "selector", type: "text", required: true }],
  },

  setInnerHTML: {
    cmd: `document.querySelector('{selector}').innerHTML = '{html}'`,
    desc: "Sets the inner HTML of an element.",
    params: [
      { name: "selector", type: "text", required: true },
      { name: "html", type: "text", required: true },
    ],
  },
  toggleClass: {
    cmd: `document.querySelector('{selector}').classList.toggle('{class}')`,
    desc: "Toggles a CSS class on an element.",
    params: [
      { name: "selector", type: "text", required: true },
      { name: "class", type: "text", required: true },
    ],
  },
  addToArray: {
    cmd: `{array}.push({item})`,
    desc: "Adds an item to an array.",
    params: [
      { name: "array", type: "select", required: true },
      { name: "item", type: "text", required: true },
    ],
  },
  domTraversal: {
    cmd: `document.querySelector('{parentSelector}').querySelector('{childSelector}')`,
    desc: "Selects a child element within a parent.",
    params: [
      { name: "parentSelector", type: "text", required: true },
      { name: "childSelector", type: "text", required: true },
    ],
  },
  appendToDom: {
    cmd: `document.querySelector('{parentSelector}').appendChild({element})`,
    desc: "Appends an element to a parent in the DOM.",
    params: [
      { name: "parentSelector", type: "text", required: true },
      {
        name: "element",
        type: "select",
        required: true,
      },
    ],
  },
  setTimeout: {
    cmd: `setTimeout(function() {  `,
    desc: "Executes code after a specified delay.",
    params: [],
  },
  clostTimeOut: {
    cmd: ` }, {delay}) `,
    desc: `close current time out to start new code`,
    params: [{ name: "delay", type: "number", required: true }],
  },

  fetchRequest: {
    cmd: `async function fetchData() {
      const response = await fetch('{url}', {
        method: '{method}',
        headers: {headers} ,
        body: {body},
        credentials: '{credentials}',
      });
      const data = await response.{responseType}();
      return data;
    }`,
    desc: "Performs an async fetch request with customizable options and response type, returning the data.",
    params: [
      { name: "url", type: "text", required: true },
      {
        name: "method",
        type: "select",
        required: true,
        keywords: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      },
      {
        name: "headers",
        type: "object",
        required: false,
        desc: "A JSON object of headers (e.g., { 'Content-Type': 'application/json' }).",
      },
      {
        name: "body",
        type: "object",
        required: false,
        desc: "The body of the request (e.g., JSON.stringify({ key: 'value' })).",
      },
      {
        name: "credentials",
        type: "select",
        required: false,
        keywords: ["same-origin", "include", "omit"],
      },
      {
        name: "responseType",
        type: "select",
        required: true,
        keywords: ["json", "text", "blob", "arrayBuffer", "formData"],
        desc: "Determines the type of the response.",
      },
    ],
  },
  
  openIf: {
    cmd: `if ( `,
    desc: "Open if statement ",
    params: [],
  },
  condition: {
    cmd: `{value-1} {operator} {value-2}`,
    desc: "Creates a condition.",
    params: [
      { name: "value-1", type: "select", required: true },
      { name: "operator", type: "select", keywords: operators, required: true },
      { name: "value-2", type: "select", required: true },
    ],
  },
  or: {
    cmd: `||`,
    desc: `It or operator like { || } in javaScript`,
    params: [],
  },
  and: {
    cmd: `&&`,
    desc: `It and operator like { && } in javaScript`,
    params: [],
  },
  closeCondition: {
    cmd: ` ) { `,
    desc: `close condition`,
    params: [],
  },
  closeIf: {
    cmd: ` } `,
  },

  createElement: {
    cmd: `document.createElement('{tagName}')`,
    desc: "Creates a new DOM element.",
    params: [
      {
        name: "tagName",
        type: "select",
        required: true,
        keywords: tagNames,
      },
    ],
  },
  selectAndRemoveClass: {
    cmd: `document.querySelector('{selector}').classList.remove('{className}')`,
    desc: "Selects an element and removes a class from it.",
    params: [
      { name: "selector", type: "text", required: true },
      { name: "className", type: "text", required: true },
    ],
  },
  selectAndAddClass: {
    cmd: `document.querySelector('{selector}').classList.add('{className}')`,
    desc: "Selects an element and adds a class to it.",
    params: [
      { name: "selector", type: "text", required: true },
      { name: "className", type: "text", required: true },
    ],
  },
  addClassForAll: {
    cmd: `document.querySelectorAll('{selector}').forEach(el => el.classList.add('{className}')); `,
    desc: "Adds a class to all elements matching the selector.",
    params: [
      { name: "selector", type: "text", required: true },
      { name: "className", type: "text", required: true },
    ],
  },
  removeClassForAll: {
    cmd: `document.querySelectorAll('{selector}').forEach(el => el.classList.remove('{className}')); `,
    desc: "Removes a class from all elements matching the selector.",
    params: [
      { name: "selector", type: "text", required: true },
      { name: "className", type: "text", required: true },
    ],
  },
  toggleClassForAll: {
    cmd: `document.querySelectorAll('{selector}').forEach(el => el.classList.toggle('{className}')); `,
    desc: "Toggles a class on all elements matching the selector.",
    params: [
      { name: "selector", type: "text", required: true },
      { name: "className", type: "text", required: true },
    ],
  },

  setAttributeToElement: {
    cmd: `document.querySelector('{selector}').setAttribute('{attribute}', '{value}')`,
    desc: "Sets an attribute on a selected element.",
    params: [
      { name: "selector", type: "text", required: true },
      { name: "attribute", type: "text", required: true },
      { name: "value", type: "text", required: true },
    ],
  },
  removeAttribute: {
    cmd: `document.querySelector('{selector}').removeAttribute('{attribute}'); `,
    desc: "Removes an attribute from an element.",
    params: [
      { name: "selector", type: "text", required: true },
      { name: "attribute", type: "text", required: true },
    ],
  },
  scrollToElement: {
    cmd: `document.querySelector('{selector}').scrollIntoView({ behavior: '{behavior}' }); `,
    desc: "Scrolls to the specified element.",
    params: [
      { name: "selector", type: "text", required: true },
      {
        name: "behavior",
        type: "select",
        keywords: ["smooth", "auto"],
        required: true,
      },
    ],
  },
  getElementById: {
    cmd: `document.getElementById('{id}'); `,
    desc: "Gets an element by its ID.",
    params: [{ name: "id", type: "text", required: true }],
  },
  appendElement: {
    cmd: `document.querySelector('{parentSelector}').appendChild({childElement}); `,
    desc: "Appends a child element to a parent element.",
    params: [
      { name: "parentSelector", type: "text", required: true },
      { name: "childElement", type: "select", required: true },
    ],
  },
  removeElement: {
    cmd: `document.querySelector('{selector}').remove(); `,
    desc: "Removes an element from the DOM.",
    params: [{ name: "selector", type: "text", required: true }],
  },

  setTextContentBySelector: {
    cmd: `document.querySelector('{selector}').textContent = '{textContent}';`,
    desc: "Sets the text content of an element.",
    params: [
      { name: "selector", type: "text", required: true },
      { name: "textContent", type: "text", required: true },
    ],
  },

  setTextContentByVariable: {
    cmd: `{variable}.textContent = {textContent}`,
    desc: "Sets the text content of an element.",
    params: [
      { name: "variable", type: "text", required: true },
      { name: "textContent", type: "text", required: true },
    ],
  },

  setTransition: {
    cmd: `document.querySelector('{selector}').style.transition = '{property} {duration} {timingFunction} {delay}';`,
    desc: "Sets a CSS transition on an element.",
    params: [
      { name: "selector", type: "text", required: true },
      {
        name: "property",
        type: "select",
        required: true,
        keywords: getAllCssProperties(),
      },
      { name: "duration", type: "text", required: true },
      { name: "timingFunction", type: "text", required: true },
      { name: "delay", type: "text", required: true },
    ],
  },

  setInputValue: {
    cmd: `document.querySelector('{selector}').value = '{value}';`,
    desc: "Sets the value of an input field.",
    params: [
      { name: "selector", type: "text", required: true },
      { name: "value", type: "text", required: true },
    ],
  },

  addStyle: {
    cmd: `document.querySelector('{selector}').style['{property}'] = '{value}';`,
    desc: "Sets an inline style on an element.",
    params: [
      { name: "selector", type: "text", required: true },
      {
        name: "property",
        type: "select",
        required: true,
        keywords: getAllCssProperties(), // Dynamically load all CSS properties as select options
      },
      { name: "value", type: "text", required: true },
    ],
  },

  openFunction: {
    cmd: `function {name}({params}) { `,
    desc: "Opens a function declaration.",
    params: [
      { name: "name", type: "select", required: true },
      { name: "params", type: "array", required: false },
    ],
  },
  closeFunction: {
    cmd: ` } `,
    desc: "Closes a function declaration.",
    params: [],
  },
  return: {
    cmd: `return {value};`,
    desc: "Returns a value from a function.",
    params: [{ name: "value", type: "select", required: true }],
  },
  callFunction: {
    cmd: `{function_name}({function_params})`,
    desc: `call function to implement`,
    params: [
      { name: "function_name", type: "text", required: true },
      { name: "function_params", type: "array", required: true },
    ],
  },

  createClassInstance: {
    cmd: `let {var_name} = new {Class}({params});`,
    desc: "Creates an instance of a built-in JavaScript class.",
    params: [
      {
        name: "var_name",
        type: "text",
        required: true,
      },
      {
        name: "className",
        type: "select",
        required: true,
        keywords: getWindowBuiltInClasses(),
      },
      {
        name: "params",
        type: "array",
        required: false,
        desc: "Parameters needed for class constructor (e.g., for WebSocket: 'ws://example.com').",
      },
    ],
  },

  createPromise: {
    cmd: `let {promise_name} = new Promise(function({resolve}, {reject}) {  `,
    desc: "Creates a new Promise instance.",
    params: [{ name: "executor", type: "text", required: true }],
  },

  closePromise: {
    name: " }); ",
    desc: `close promise`,
    params: [],
  },

  openIntersectionObserver: {
    cmd: `let {observer_name} = new IntersectionObserver(`,
    desc: "Creates a new IntersectionObserver instance to observe an element entering or leaving the viewport.",
    params: [
      {
        name: "observer_name",
        type: "text",
        required: true,
        desc: "The observer name variable ",
      },
      {
        name: "callback",
        type: "text",
        required: true,
        desc: "The callback function that will be triggered when the target element enters or leaves the viewport.",
      },
    ],
  },

  closeIntersectionObserver: {
    cmd: `, { root: {root}, rootMargin: '{rootMargin}', threshold: {threshold} });`,
    params: [
      {
        name: "root",
        type: "text",
        required: false,
        default: "null",
        desc: "The element to use as the root of the intersection. Defaults to null (viewport).",
      },
      {
        name: "rootMargin",
        type: "text",
        required: false,
        default: "0px",
        desc: "Margin around the root element, similar to CSS margin.",
      },
      {
        name: "threshold",
        type: "text",
        required: false,
        default: "0",
        desc: "Percentage of visibility required to trigger the callback.",
      },
    ],
  },

  initGlobalObserver: {
    cmd: `
      if (!window.globalObserver) {
        window.globalObserver = (function() {
          const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                const animationClass = entry.target.dataset.animationClass;
                entry.target.classList.add(animationClass);
                if (entry.target.dataset.once === "true") {
                  observer.unobserve(entry.target);
                }
              }
            });
          });
          return observer;
        })();
      }
    `,
    desc: "Initializes a global IntersectionObserver instance for efficient element observation.",
    params: [],
  },
  observeWithAnimation: {
    cmd: `
      document.querySelectorAll('{selector}').forEach(element => {
        element.dataset.animationClass = '{animationClass}';
        element.dataset.once = '{once}';
        window.globalObserver.observe(element);
      });
    `,
    desc: "Adds elements to the global observer and assigns animation classes and behavior.",
    params: [
      {
        name: "selector",
        type: "text",
        required: true,
        desc: "The selector for elements to observe.",
      },
      {
        name: "animationClass",
        type: "text",
        required: true,
        desc: "The CSS class to apply for the animation (e.g., fade-in).",
      },
      {
        name: "once",
        type: "boolean",
        required: false,
        default: true,
        desc: "Whether the animation should trigger only once.",
      },
    ],
  },

  accessObjectPropOrMethod: {
    cmd: `{object}['{key}']{methodCall}`,
    desc: "Accesses a property or calls a method of an object without using dot notation.",
    params: [
      {
        name: "object",
        type: "text",
        required: true,
        desc: "The name of the object.",
      },
      {
        name: "key",
        type: "text",
        required: true,
        desc: "The property or method name to access.",
      },
      {
        name: "methodCall",
        type: "text",
        required: false,
        default: "",
        desc: "Optional method call (e.g., `('value')` if calling a method). Leave empty for properties.",
      },
    ],
  },

  accessNestedObjectValue: {
    cmd: `{keys}.reduce((obj, key) => obj && obj[key] !== undefined ? obj[key] : undefined, {object})`,
    desc: "Accesses the final value of a deeply nested property of an object using an array of keys.",
    params: [
      {
        name: "object",
        type: "text",
        required: true,
        desc: "The root object to access.",
      },
      {
        name: "keys",
        type: "array",
        required: true,
        desc: "An array of keys representing the path to the nested property.",
      },
    ],
  },

  convertType: {
    cmd: `({value}) => {
      switch('{type}') {
        case 'string':
          return String(value);
        case 'number':
          return Number(value);
        case 'boolean':
          return Boolean(value);
        case 'array':
          return Array.isArray(value) ? value : [value];
        case 'object':
          return typeof value === 'string' ? JSON.parse(value) : value;
        default:
          return value;
      }
    }`,
    desc: "Converts a value to a specified type (e.g., string, number, boolean, etc.).",
    params: [
      {
        name: "value",
        type: "text",
        required: true,
        desc: "The value to be converted.",
      },
      {
        name: "type",
        type: "select",
        required: true,
        keywords: ["string", "number", "boolean", "array", "object"],
        desc: "The type to which the value will be converted.",
      },
    ],
  },

  //arrays
  arrayLength: {
    cmd: `({array}).length`,
    desc: "Gets the length of the array.",
    params: [{ name: "array", type: "array", required: true }],
  },

  arrayMap: {
    cmd: `({array}).map(`,
    desc: "Maps through the array with a given action.",
    params: [
      { name: "array", type: "array", required: true },
      { name: "callback", type: "text", required: true },
    ],
  },

  arrayFilter: {
    cmd: `({array}).filter(`,
    desc: "Filters the array based on a given condition.",
    params: [
      { name: "array", type: "array", required: true },
      { name: "condition", type: "text", required: true },
    ],
  },

  arrayPush: {
    cmd: `({array}).push({value})`,
    desc: "Pushes a value into the array.",
    params: [
      { name: "array", type: "array", required: true },
      { name: "value", type: "text", required: true },
    ],
  },

  arrayConcat: {
    cmd: `({array}).concat({value})`,
    desc: "Concatenates a value to the array.",
    params: [
      { name: "array", type: "array", required: true },
      { name: "value", type: "array", required: true },
    ],
  },

  arrayIncludes: {
    cmd: `({array}).includes({value})`,
    desc: "Checks if the array includes a specific value.",
    params: [
      { name: "array", type: "array", required: true },
      { name: "value", type: "text", required: true },
    ],
  },

  arraySort: {
    cmd: `({array}).sort(`,
    desc: "Sorts the array in a specified order.",
    params: [
      { name: "array", type: "array", required: true },
      { name: "sortFunction", type: "text", required: false },
    ],
  },

  arrayReduce: {
    cmd: `({array}).reduce(`,
    desc: "Reduces the array to a single value using a reducer function.",
    params: [
      { name: "array", type: "array", required: true },
      { name: "reducer", type: "text", required: true },
    ],
  },

  arrayForEach: {
    cmd: `({array}).forEach(`,
    desc: "Executes a function for each element in the array.",
    params: [
      { name: "array", type: "array", required: true },
      { name: "action", type: "text", required: true },
    ],
  },

  closeArrayFucntion: {
    cmd: " ) ",
    desc: "close array function like map,filter,reduce .et",
    params:[]
  },
};

// const objec = {
//   info: {
//     org: {
//       name: "yousef",
//     },
//   },
// };

// console.log(
//   ["info", "org", "name"].reduce(
//     (obj, key) => (obj && obj[key] !== undefined ? obj[key] : undefined),
//     objec
//   )
// );

// const lol = ({value}) => {
//   switch('object') {
//     case 'string':
//       return String(value);
//     case 'number':
//       return Number(value);
//     case 'boolean':
//       return Boolean(value);
//     case 'array':
//       return Array.isArray(value) ? value : [value];
//     case 'object':
//       return typeof value === 'string' ? JSON.parse(value) : value;
//     default:
//       return value;
//   }
// }

// console.log(lol({value:{n:'sdads'}}));
