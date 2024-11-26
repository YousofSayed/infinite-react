import { html, uniqueID } from "../helpers/cocktail";
import {
  getAllStandardCSSProperties,
  getArrayProps,
  getWindowBuiltInClasses,
} from "../helpers/functions";
import {
  conversions,
  defaultAttributeNames,
  eventNames,
  eventsModifiers,
  hsZoo,
  httpMethods,
  measure,
  operators,
  putPositions,
} from "./constants";

const globalVarHandler = (setGlobalVarState) => {
  setGlobalVarState((values) => [...new Set([...values, `$${this.value}`])]);
  // console.log(this.value);
  console.log('lol' , this);
  
};

const localVarHandler = (setLocalVarState) => {
  setLocalVarState((values) => [...new Set([...values, `:${this.value}`])]);
};


export const hsCmds = {
  setGlobalVar: {
    cmd: `set \${name} to {value}`,
    params: [

      { name: "name", type: "text", required: true },
      {
        name: "value",
        type: "select",
        required: true,
        keywords: [...hsZoo, "object", "array"],
        value: "",
        handler: true,
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
      { name: "name", type: "text", required: true },
      {
        name: "value",
        type: "select",
        keywords: [...hsZoo, "object", "array"],
        required: true,
        value: "",
        handler: true,
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
    cmd: `on {event} {modifier}`,
    desc: `event handlers allow you to respond to any event (not just DOM events, as with onClick handlers) and provide a slew of features for making working with events easier.`,
    params: [
      {
        name: "event",
        desc: `event name`,
        type: "select",
        keywords: eventNames,
        required: true,
      },
      {
        name: "modifier",
        desc: html`
          <article>
            <h1>The Every Modifier</h1>

            <p>
              An event handler with the every modifier will execute the event
              handler for every event that is received, even if the preceding
              handler execution has not finished. This is useful in cases where
              you want to make sure you get the handler logic for every event
              going immediately.
            </p>
          </article>

          <article>
            <h1>The Queue Modifier</h1>

            <p>
              The every keyword is a prefix to the event name, but for other
              queuing options, you postfix the event name with the queue
              keyword. You may pick from one of four strategies: -none - Any
              events that arrive while the event handler is active will be
              dropped -all - All events that arrive will be added to a queue and
              handled in order -first - The first event that arrives will be
              queued, all others will be dropped -last - The last event that
              arrives will be queued, all others will be dropped
            </p>
          </article>
        `,
        type: "select",
        keywords: eventsModifiers,
      },
    ],
  },

  event_from: {
    cmd: `on {event} from {target}`,
    desc: `respond event from another target (not just DOM events)`,
    ex: html`
      <h1>on storage from window</h1>
      Or
      <h1>on click from #another_element</h1>
    `,
    params: [
      { name: "event", type: "select", keywords: eventNames, required: true },
      { name: "target", type: "select", keywords: hsZoo, required: true },
    ],
  },

  halt_event: {
    cmd: `halt the event`,
    desc: html`
      <p>
        It is prevent default behavior in browser as : event.preventDefault() in
        javascript
      </p>
    `,
    params: [],
  },

  send_event: {
    cmd: `send {event_name} to {target}`,
    desc: html` <h1>send events to other elements</h1> `,
    params: [
      { name: "event_name", type: "text", required: true },
      { name: "target", type: "select", keywords: hsZoo, required: true },
    ],
  },

  send_event_with_params: {
    cmd: `{event_name} to {target}({params}) `,
    desc: html`
      <h1>send events to other elements with params (key & value)</h1>
    `,
    params: [
      { name: "event_name", type: "text", required: true },
      { name: "target", type: "select", keywords: hsZoo, required: true },
      { name: "params", type: "object", required: true },
    ],
  },

  on_muatation: {
    cmd: `on mutation of {selector}`,
    desc: html`
      <p>
        You can listen for mutations on current element with the on mutation
        form. This will use the Mutation Observer API, but will act more like a
        regular event handler.
      </p>
    `,
    ex: html`
      <ul>
        <li>-on mutation of @class</li>
        <li>-on mutation of anything</li>
      </ul>
    `,
    params: [
      {
        name: "selector",
        type: "select",
        keywords: ["anything"],
        required: true,
      },
    ],
  },

  on_intersection: {
    cmd: `on intersection(intersecting) having threshold {threshold}`,
    desc: `Another synthetic event is the intersection event that uses the Intersection Observer API.`,
    ex: html`
      <p>
        on intersection(intersecting) having threshold 0.5 if intersecting
        transition opacity to 1 else transition opacity to 0
      </p>
    `,
    params: [{ name: "threshold", type: "number", required: true }],
  },

  transition: {
    cmd: `transition {css-property} to {value}`,
    desc: `It is set transition effect when set css property `,
    params: [
      {
        name: "css-property",
        type: "select",
        keywords: getAllStandardCSSProperties(),
        required: true,
      },
      {
        name: "value",
        type: "text",
        required: true,
      },
    ],
  },

  settle: {
    cmd: `settle `,
    desc: html`
      <p>
        If you wish to wait until a transition completes after adding a new
        class, you should use the <strong>settle</strong> command which will let
        any transitions that are triggered by adding or removing a class finish
        before continuing.
      </p>
    `,
    params: [],
  },

  wait: {
    cmd: `wait {time}s`,
    desc: `It wait and do the next command when it finnish , (the time is by seconds!) `,
    params: [{ name: "time", type: "number", required: true }],
  },

  increment: {
    cmd: `increment {variable}`,
    desc: `increment variable`,
    params: [
      {
        name: "variable",
        accessVars: true,
        type: "select",
        required: true,
      },
    ],
  },

  decrement: {
    cmd: `decrement {variable}`,
    desc: `decrement variable`,
    params: [
      {
        name: "variable",
        accessVars: true,
        type: "select",
        required: true,
      },
    ],
  },

  get: {
    cmd: `get {variable}`,
    params: [
      {
        name: "variable",
        type: "select",
        accessVars: true,
        required: true,
        keywords: hsZoo,
      },
    ],
  },

  log: {
    cmd: "log {target}",
    params: [
      {
        name: "target",
        type: "select",
        accessVars: true,
        keywords: hsZoo,
        required: true,
      },
    ],
  },

  toggle: {
    cmd: `toggle .{class_name} `,
    desc: `toggle class on current element`,
    params: [
      {
        name: "class_name",
        type: "text",
        required: true,
      },
    ],
  },

  toggle_on: {
    cmd: `toggle {class} on {selector}`,
    desc: `toggle class on another element`,
    params: [
      {
        name: "class",
        type: "text",
        required: true,
      },
      {
        name: "selector",
        type: "text",
        required: true,
      },
    ],
  },

  make: {
    cmd: `make {Class} from {values} called {variable name}`,
    desc: html`
      <article>
        <h1>If you want to make new objects, you can use the make :</h1>
        <p>
          make a URL from "/path/", "https://origin.example.com" Which is equal
          to the JavaScript
          <code>new URL("/path/", "https://origin.example.com")</code>
        </p>
      </article>

      <article>
        <h1>
          If you wish to assign an identifier to the new object you can use the
          called modifier:
        </h1>
        <p>
          make a URL from "/path/", "https://origin.example.com" called myURL
          log myURL
        </p>
      </article>
    `,
    params: [
      {
        name: "Class",
        required: true,
        type: "select",
        keywords: getWindowBuiltInClasses(),
      },
      {
        name: "values",
        required: true,
        type: "array",
      },
      {
        name: "variable name",
        required: true,
        value: "",
        handler:true,
        type: "text",
      },
    ],
  },

  closures: {
    cmd: `{variable}.{closure}(\\ {params} -> {return} )`,
    params: [
      {
        name: "variable",
        accessVars: true,
        type: "select",
        required: true,
      },
      {
        required: true,
        name: "closure",
        type: "select",
        keywords: getArrayProps(),
      },
      {
        required: true,
        name: "params",
        type: "array",
        length: 2,
      },
      {
        required: true,
        name: "return",
        type: "code",
        lang: "javascript",
      },
    ],
  },

  condition: {
    cmd: `if {target-1} {operator} {target-2}`,
    params: [
      {
        name: "target-1",
        type: "select",
        keywords: hsZoo,
        required: true,
        accessVars: true,
      },
      { name: "operator", type: "select", keywords: operators, required: true },
      {
        name: "target-2",
        type: "select",
        keywords: hsZoo,
        required: true,
        accessVars: true,
      },
    ],
  },

  repeat_until: {
    cmd: `repeat until {target-1} {operator} {target-2}`,
    params: [
      {
        name: "target-1",
        type: "select",
        keywords: hsZoo,
        required: true,
        accessVars: true,
      },
      { name: "operator", type: "select", keywords: operators, required: true },
      {
        name: "target-2",
        type: "select",
        keywords: hsZoo,
        required: true,
        accessVars: true,
      },
    ],
  },

  repeat_times: {
    cmd: `repeat {times} times`,
    params: [{ name: "times", type: "number", required: true }],
  },

  repeat_while: {
    cmd: `repeat while {target-1} {operator} {target-2}`,
    params: [
      {
        name: "target-1",
        type: "select",
        keywords: hsZoo,
        required: true,
        accessVars: true,
      },
      { name: "operator", type: "select", keywords: operators, required: true },
      {
        name: "target-2",
        type: "select",
        keywords: hsZoo,
        required: true,
        accessVars: true,
      },
    ],
  },

  repeat_forever: {
    cmd: `repeat forever`,
    params: [],
  },

  for_loop: {
    cmd: `for {var_name} in {array} index {index}`,
    params: [
      { name: "var_name", type: "select", accessVars: true, required: true },
      { name: "array", type: "select", required: true },
      { name: "index", type: "text", required: true },
    ],
  },

  add_selector: {
    cmd: `add {selector-1} to {selector-2}`,
    desc: `if you want to add the class .foo to all elements that have the class .bar on it, you can simply write this: add .foo to .bar`,
    params: [
      { name: "selector-1", type: "text" },
      { name: "selector-2", type: "select", keywords: hsZoo },
    ],
  },

  remove_element: {
    cmd: `remove {target}`,
    desc: html`
      <h1>
        you can also use the remove command to remove content from the DOM
      </h1>
      <p>
        The remove command is smart enough to figure out what you want to happen
        based on what you tell it to remove.
      </p>
    `,
    params: [
      {
        name: "target",
        type: "select",
        keywords: hsZoo,
        required: true,
        accessVars: true,
      },
    ],
  },

  show_or_hide: {
    cmd: `{command} {target}`,
    desc: html`
      <h1>You can show and hide things with the show and hide commands:</h1>
    `,
    params: [
      {
        name: "command",
        type: "select",
        keywords: ["show", "hide"],
        required: true,
      },
      { name: "target", type: "select", keywords: hsZoo, required: true },
    ],
  },

  show_or_hide_with_custom_property: {
    cmd: `{command} {target} with *{property}`,
    desc: html`
      <h1>
        By default, the show and hide commands will use the display style
        property. You can instead use visibility or opacity with the following
        syntax
      </h1>
    `,
    params: [
      {
        name: "command",
        type: "select",
        keywords: ["show", "hide"],
        required: true,
      },
      {
        name: "target",
        type: "select",
        keywords: hsZoo,
        required: true,
        accessVars: true,
      },
      {
        name: "property",
        type: "select",
        keywords: getAllStandardCSSProperties(),
        required: true,
      },
    ],
  },

  remove_selector: {
    cmd: `remove  {selector-1} from {selector-2}`,
    desc: `if you want to remove the class .foo to all elements that have the class .bar on it, you can simply write this: add .foo to .bar`,
    params: [
      { name: "selector-1", type: "text", required: true },
      { name: "selector-2", type: "select", keywords: hsZoo, required: true },
    ],
  },

  append_to: {
    cmd: `append {value} to {variable}`,
    desc: `The append command can append content to strings (as well as to arrays and the DOM`,
    params: [
      { name: "value", type: "text", required: true },
      {
        name: "variable",
        type: "select",
        keywords: hsZoo,
        required: true,
        accessVars: true,
      },
    ],
  },

  convert_to: {
    cmd: `{variable} as {type}`,
    desc: `To convert values between different types `,
    params: [
      {
        name: "variable",
        type: "select",
        keywords: hsZoo,
        accessVars: true,
        required: true,
      },
      { name: "type", type: "select", keywords: conversions, required: true },
    ],
  },

  to_fixed_number: {
    cmd: `{variable} as Fixed<:{N}>`,
    desc: `convert to a fixed precision string representation of the number, with an optional precision of N`,
    params: [
      {
        name: "variable",
        type: "select",
        keywords: hsZoo,
        required: true,
        accessVars: true,
      },
      { name: "N", type: "number", required: true },
    ],
  },

  get_random_number: {
    cmd: `set \${var_name} to random `,
    desc: `get random number`,
    params: [
      {
        name: "var_name",
        type: "text",
        required: true,
        handler:true,
      },
    ],
  },

  get_random_in_array: {
    cmd: `set \${var_name} random in {array}`,
    desc: `get random number in array as global variable`,
    params: [
      {
        name: "var_name",
        value: "",
        type: "text",
        handler: true,
        required: true,
      },
      {
        name: "array",
        type: "select",
        keywords: hsZoo,
        accessVars: true,
        required: true,
      },
    ],
  },

  throwing_exception: {
    cmd: `throw {exception}`,
    desc: `You may throw an exception using the familiar throw keyword:`,
    params: [{ name: "exception", type: "text", required: true }],
  },

  put_content_element: {
    cmd: `put \`\${content}\` {position} {element}`,
    desc: html`
      <article>
        <h1>put {content} before {element}</h1>
        <p>Puts the content in front of the element, using Element.before.</p>
      </article>

      <article>
        <h1>put {content} at the start of {element}</h1>
        <p>
          Puts the content at the beginning of the element, using
          Element.prepend.
        </p>
      </article>

      <article>
        <h1>put {content} at the end of {element}</h1>
        <p>Puts the content at the end of the element, using Element.append.</p>
      </article>

      <article>
        <h1>put content after element</h1>
        <p>Puts the content after the element, using Element.after.</p>
      </article>
    `,
    params: [
      { name: "content", type: "code", lang: "html", required: true },
      {
        name: "position",
        type: "select",
        keywords: putPositions,
        required: true,
      },
      { name: "element", type: "select", keywords: hsZoo, required: true },
    ],
  },

  get_attribute_as_var: {
    cmd: `get @{attribute_name} then set \${var_name} to it`,
    desc: `get attribute for current element`,
    params: [
      {
        name: "attribute_name",
        type: "select",
        keywords: defaultAttributeNames,
        required: true,
      },
      {
        name: "var_name",
        handler:true,
        type: "text",
        keywords: defaultAttributeNames,
        required: true,
      },
    ],
  },

  set_attribute: {
    cmd: `set @{attribute_name} to {value}`,
    desc: `set attribute for current element`,
    params: [
      {
        name: "attribute_name",
        type: "text",
        keywords: defaultAttributeNames,
        required: true,
      },
      { name: "value", type: "text", required: true },
    ],
  },

  measure: {
    cmd: `measure {target} {dimension}`,
    desc: html`
      <p>
        The measure command gets the measurements for a given element using
        getBoundingClientRect() as well as the scroll* properties. It will place
        the result into the result variable. You may also specify particular
        measurements to be saved into local variables, by name. The available
        measurements are:
      </p>

      <ul>
        <li>x</li>
        <li>y</li>
        <li>left</li>
        <li>top</li>
        <li>right</li>
        <li>bottom</li>
        <li>width</li>
        <li>height</li>
        <li>bounds</li>
        <li>scrollLeft</li>
        <li>scrollTop</li>
        <li>scrollLeftMax</li>
        <li>scrollTopMax</li>
        <li>scrollWidth</li>
        <li>scrollHeight</li>
        <li>scroll</li>
      </ul>
    `,
    ex: html`
      <code>on click measure me then log it</code>
      <code>on click measure my top then log top</code>
    `,
    params: [
      { name: "target", type: "select", keywords: hsZoo, required: true },
      { name: "dimension", type: "select", keywords: measure, required: true },
    ],
  },

  fetchData: {
    cmd: `fetch {url} as {response_type} with {
        method: '{method}',
        headers: {headers},
        body : {body}
    } then set \${variable_name} to result`,
    desc: html` <h1>Fetch data and set it as global variable</h1> `,
    ex: html`
      <code>
        fetch 'https://jsonplaceholder.typicode.com/todos/' as JSON with {
        method: 'GET', headers: {'content-type' : 'application/json'} } then set
        $todos to result
      </code>
    `,
    id: uniqueID(),
    name: "fetchData",
    params: [
      {
        name: "method",
        type: "select",
        keywords: httpMethods,
        value: "",
        required: true,
      },
      { name: "headers", type: "object", value: {}, required: true },
      { name: "body", type: "object", value: {}, required: true },
      {
        name: "variable_name",
        type: "text",
        value: "",
        handler:true,
        required: true,
      },
    ],
  },
  elemnet:{
    cmd:`append '<button id="${uniqueID()}">Clikc231</button>' to me`,
    params:[]
  },
  end:{
    cmd : ` end ` , 
    desc:`end command is necessary when you use condtions of loops or you wanna to end event and start new` ,
    params:[],
    color:''
  },
  then:{
    cmd : ` then `,
    desc:`It is useful to make your commands readable and easy to understand`,
    color:'',
    params:[]
  }
};

// hsCmds.setGlobalVar.params[1].handler((name)=>name) 
