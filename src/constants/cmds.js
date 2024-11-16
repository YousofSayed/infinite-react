import { getArrayProps, getWindowBuiltInClasses } from "../helpers/functions";
import { eventNames, hsZoo } from "./constants";

export const cmds = {
  setGlobalVar: {
    cmd: `set {{symbol}}{name} to {value}`,
    params: [
      { name: "name", type: "text" },
      {
        name: "value",
        type: "select",
        keywords: [...hsZoo, "object", "array"],
        custom: [
          {
            name: "object",
            type: "object",
          },
          {
            name: "array",
            type: "array",
          },
        ],
      },
    ],
    symbol: "$",
  },

  setLocalVar: {
    cmd: `set {{symbol}}{name} to {value}`,
    params: [
      { name: "name", type: "text" },
      {
        name: "value",
        type: "select",
        keywords: [...hsZoo, "object", "array"],
        custom: [
          {
            name: "object",
            type: "object",
          },
          {
            name: "array",
            type: "array",
          },
        ],
      },
    ],
    symbol: ":",
  },

  event: {
    cmd: `on {event}`,
    params: [
      {
        name: "event",
        type: "select",
        keywords: eventNames,
      },
    ],
  },

  increment: {
    cmd: `increment {variable}`,
    params: [
      {
        name: "variable",
        type: "text",
      },
    ],
  },

  decrement: {
    cmd: `decrement {variable}`,
    params: [
      {
        name: "variable",
        type: "text",
      },
    ],
  },


  get: {
    cmd: `get {variable}`,
    params: [
      {
        name: "variable",
        type: "select",
        keywords: hsZoo,
      },
    ],
  },

  log: {
    cmd: "log {target}",
    params: [
      {
        name: "target",
        type: "text",
      },
    ],
    type: "replace",
  },

  toggle: {
    cmd: `toggle {class} on {if_another_element}`,
    params: [
      {
        name: "class-1",
        type: "text",
      },
      {
        name:'if_another_element',
        type:'text'
      }
    ],
  },

  make: {
    cmd: `make {Class} from {values} called {variable name}`,
    params: [
      {
        name: "Class",
        type: "select",
        keywords: getWindowBuiltInClasses(),
      },
      {
        name: "values",
        type: "array",
      },
      {
        name: "variable name",
        type: "text",
      },
    ],
  },

  closures: {
    cmd: `{variable}.{closure}(\\ {closureParams} -> {returnedClouser} )`,
    params: [
      {
        name: "variable",
        type: "select",
      },
      {
        name: "closure",
        type: "select",
        keywords: getArrayProps(),
      },
    ],
  },

  condition:{
    cmd:`if `
  }
};
