import {
  html,
  parse,
  parseToHTML,
  stringify,
  uniqueID,
  isHTMLElement,
  def,
} from "/scripts/cocktail.js";

let body = document.body;
body.style.height = `${window.innerHeight}px`;

const scriptsSrc = [
  "/scripts/tailwindcss.js",
  "/scripts/htmx.js",
  "/scripts/alpine.js",
  "/scripts/alpine-morph.js",
  "/scripts/htmx-clinet-side-template.js",
  "/scripts/mustache.js",
];

window.addEventListener("DOMContentLoaded", () => {
  //  For body
  initDragEvents(body);
  //  For body

  const domObsever = new MutationObserver((entries) => {
    entries.forEach((entry) => {
      if (
        entry.addedNodes[0] instanceof HTMLElement &&
        !entry.addedNodes[0].hasAttribute("once")
        // !entry.addedNodes[0].parentNode.hasAttribute("once")
      ) {
        entry.addedNodes[0].setAttribute("once", "");
        initDragEvents(entry.addedNodes[0]);
        initControllers(entry.addedNodes[0]);
        entry.addedNodes[0].children.length <= 0 &&
          initSeperators(entry.addedNodes[0]);
      }
    });
  });

  domObsever.observe(document.body, {
    subtree: true,
    attributes: true,
    childList: true,
  });
});

/**
 *
 * @param {DragEvent} ev
 * @returns {{ tagType: string, inner: string, oldId: string, cssText:string, classes: string, attrs: {} }}
 */
const dataModel = (ev) => {
  //local storage for chrome don’t support (dataTransfer) in dragenter or dragover events :(
  const data =
    ev?.dataTransfer?.getData("application/json") ||
    localStorage.getItem("elData");
  return JSON.parse(data);
};

/**
 *
 * @param {DragEvent} ev
 */
function dragCallback(ev) {
  ev.target.classList.add("showControllers", "drag");
}

/**
 *
 * @param {DragEvent} ev
 */
function dragEndCallback(ev) {
  ev.target.classList.remove("showControllers", "drag");
}

/**
 *
 * @param {DragEvent} ev
 * @param {HTMLElement} root
 */
function dropCallback(ev) {
  ev.stopPropagation();

  const data = dataModel(ev);
  if (
    (data.oldId && ev.target.id && data.oldId == ev.target.id) ||
    (data.oldId &&
      ev.target.id &&
      body.querySelector(`#${data.oldId}`).querySelector(`#${ev.target.id}`))
  ) {
    ev.target.classList.remove(
      "ondragover",
      "prevent",
      "drag",
      "showControllers"
    );
    return;
  }

  const el = document.createElement(data.tagType);
  el.id = uniqueID();
  el.innerHTML = data.inner;
  el.style.cssText = data.cssText;
  data.classes && el.classList.add(...data.classes.split(" "));
  for (const key in data.attrs) {
    el.setAttribute(key, data.attrs[key]);
  }

  if (
    ev.target.className.includes("seperator top") ||
    ev.target.className.includes("seperator left")
  ) {
    ev.target.parentNode.insertAdjacentElement("beforebegin", el);
  } else if (
    ev.target.className.includes("seperator bottom") ||
    ev.target.className.includes("seperator right")
  ) {
    ev.target.parentNode.insertAdjacentElement("afterend", el);
  } else {
    ev.target.appendChild(el);
  }

  data.oldId && body.querySelector(`#${data.oldId}`).remove();
  ev.target.classList.remove(
    "ondragover",
    "prevent",
    "drag",
    "showControllers"
  );
  window.parent.currentEl = el;
  el.classList.remove("ondragover", "prevent", "drag", "showControllers");
  console.log(el.parentNode.id);
  
  const iframeBodyChangeCEvent = new CustomEvent('iframeBodyChange',{detail:{
    elAdded:el,
    bodyInner:document.body.innerHTML,
    data:{
      dropped:el,
      droppedIn:el.parentNode.id
    }
  }});
  window.parent.dispatchEvent(iframeBodyChangeCEvent);
}

/**
 *
 * @param {DragEvent} ev
 */
function dragEnterCallback(ev) {
  ev.preventDefault();
  ev.stopPropagation();
  const data = dataModel(ev);

  data.oldId && ev.target.id && data.oldId == ev.target.id
    ? ev.target.classList.add("ondragover", "prevent")
    : ev.target.classList.add("ondragover");

  data.oldId &&
  ev.target.id &&
  body.querySelector(`#${data.oldId}`).querySelector(`#${ev.target.id}`)
    ? ev.target.classList.add("ondragover", "prevent")
    : null;
}

/**
 *
 * @param {DragEvent} ev
 */
function dragLeaveCallback(ev) {
  ev.stopPropagation();
  ev.target.classList.remove("ondragover", "prevent");
}

/**
 *
 * @param {DragEvent} ev
 */
function dragStartCallback(ev) {
  ev.stopPropagation();

  const data = {
    tagType: ev.target.tagName,
    inner: ev.target.innerHTML,
    oldId: ev.target.id,
    classes: ev.target.className,
    cssText:ev.target.style.cssText,
    attrs: { editable: true, draggable: true },
  };

  ev.dataTransfer.setData("application/json", JSON.stringify(data));
  localStorage.setItem("elData", JSON.stringify(data));
}

/**
 *
 * @param {HTMLElement} el
 */
function initDragEvents(el) {
  el.addEventListener("drag", dragCallback);
  el.addEventListener("dragstart", dragStartCallback);
  el.addEventListener("dragend", dragEndCallback);
  el.addEventListener("dragover", (ev) => ev.preventDefault());
  el.addEventListener("dragenter", dragEnterCallback);
  el.addEventListener("dragleave", dragLeaveCallback);
  el.addEventListener("drop", (ev) => dropCallback(ev));
}

/**
 *
 * @param {HTMLElement} el
 */
function initSeperators(el) {
  el.insertAdjacentHTML(
    "beforeend",
    html`
      <div class="seperator top" hide-in-observer="true"></div>
      <div class="seperator bottom" hide-in-observer="true"></div>
      <div class="seperator left" hide-in-observer="true"></div>
      <div class="seperator right" hide-in-observer="true"></div>
    `
  );

  const seperatorTop = el.querySelector(".seperator.top"),
    seperatorBottom = el.querySelector(".seperator.bottom"),
    seperatorLeft = el.querySelector(".seperator.left"),
    seperatorRight = el.querySelector(".seperator.right");

  const prev = [seperatorTop, seperatorRight],
    next = [seperatorBottom, seperatorLeft];

  const all = [...prev, ...next];
  all.forEach((el) => {
    el.id = uniqueID();
    el.addEventListener("drag", (ev) => {
      ev.stopPropagation();
    });

    el.addEventListener("dragover", (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
    });

    el.addEventListener("dragenter", dragEnterCallback);
    el.addEventListener("dragleave", dragLeaveCallback);
  });
}

/**
 *
 * @param {HTMLElement} el
 */
function initControllers(el) {
  // el.insertAdjacentHTML(
  //   "beforeend",
  //   html`<div id="controllers" once>
  //     <i id="edite" once>
  //       <?xml version="1.0" encoding="utf-8"?><svg
  //         version="1.1"
  //         id="Layer_1"
  //         xmlns="http://www.w3.org/2000/svg"
  //         xmlns:xlink="http://www.w3.org/1999/xlink"
  //         x="0px"
  //         y="0px"
  //         viewBox="0 0 122.88 122.88"
  //         style="enable-background:new 0 0 122.88 122.88"
  //         xml:space="preserve"
  //         fill="white"
  //         stroke-color="white"
  //       >
  //         <style type="text/css">
  //           .st0 {
  //             fill-rule: evenodd;
  //             clip-rule: evenodd;
  //           }
  //         </style>
  //         <g>
  //           <path
  //             class="st0"
  //             d="M10.27,0h102.34c5.65,0,10.27,4.62,10.27,10.27v102.34c0,5.65-4.62,10.27-10.27,10.27H10.27 C4.62,122.88,0,118.26,0,112.61V10.27C0,4.62,4.62,0,10.27,0L10.27,0z M51.45,86.83c-2.05,0.68-4.14,1.31-6.19,1.99 c-2.05,0.68-4.09,1.36-6.19,2.05c-4.88,1.57-7.55,2.47-8.13,2.62c-0.58,0.16-0.21-2.1,1-6.82l3.88-14.85L65.09,41.4l15.58,15 L51.45,86.83L51.45,86.83L51.45,86.83z M80.62,30.38c-0.73-0.68-1.57-1.05-2.52-1c-0.94,0-1.78,0.37-2.47,1.1l-5.56,5.77 l15.58,15.06l5.61-5.88c0.68-0.68,0.94-1.57,0.94-2.52c0-0.94-0.37-1.84-1.05-2.47L80.62,30.38L80.62,30.38L80.62,30.38z"
  //           />
  //         </g>
  //       </svg>
  //     </i>

  //     <i id="drag" once>
  //       <?xml version="1.0" encoding="utf-8"?>
  //       <svg
  //         once
  //         version="1.1"
  //         id="Layer_1"
  //         xmlns="http://www.w3.org/2000/svg"
  //         xmlns:xlink="http://www.w3.org/1999/xlink"
  //         x="0px"
  //         y="0px"
  //         viewBox="0 0 122.88 122.88"
  //         style="enable-background:new 0 0 122.88 122.88"
  //         xml:space="preserve"
  //         fill="white"
  //         stroke-color="white"
  //       >
  //         <style type="text/css">
  //           .st0 {
  //             fill-rule: evenodd;
  //             clip-rule: evenodd;
  //           }
  //         </style>
  //         <g>
  //           <polygon
  //             class="st0"
  //             points="61.44,0 37.02,25.4 52.74,25.4 52.74,52.74 25.4,52.74 25.4,37.02 0,61.44 25.4,85.86 25.4,70.15 52.74,70.15 52.74,97.48 37.02,97.48 61.44,122.88 85.86,97.48 70.15,97.48 70.15,70.15 97.48,70.15 97.48,85.86 122.88,61.44 97.48,37.02 97.48,52.74 70.15,52.74 70.15,25.4 85.86,25.4 61.44,0"
  //           />
  //         </g>
  //       </svg>
  //     </i>

  //     <i id="del" once>
        // <?xml version="1.0" encoding="utf-8"?><svg
        //   version="1.1"
        //   id="Layer_1"
        //   xmlns="http://www.w3.org/2000/svg"
        //   xmlns:xlink="http://www.w3.org/1999/xlink"
        //   x="0px"
        //   y="0px"
        //   width="109.484px"
        //   height="122.88px"
        //   viewBox="0 0 109.484 122.88"
        //   enable-background="new 0 0 109.484 122.88"
        //   xml:space="preserve"
        //   fill="white"
        //   stroke-color="white"
        // >
        //   <g>
        //     <path
        //       fill-rule="evenodd"
        //       clip-rule="evenodd"
        //       d="M2.347,9.633h38.297V3.76c0-2.068,1.689-3.76,3.76-3.76h21.144 c2.07,0,3.76,1.691,3.76,3.76v5.874h37.83c1.293,0,2.347,1.057,2.347,2.349v11.514H0V11.982C0,10.69,1.055,9.633,2.347,9.633 L2.347,9.633z M8.69,29.605h92.921c1.937,0,3.696,1.599,3.521,3.524l-7.864,86.229c-0.174,1.926-1.59,3.521-3.523,3.521h-77.3 c-1.934,0-3.352-1.592-3.524-3.521L5.166,33.129C4.994,31.197,6.751,29.605,8.69,29.605L8.69,29.605z M69.077,42.998h9.866v65.314 h-9.866V42.998L69.077,42.998z M30.072,42.998h9.867v65.314h-9.867V42.998L30.072,42.998z M49.572,42.998h9.869v65.314h-9.869 V42.998L49.572,42.998z"
        //     />
        //   </g>
        // </svg>
  //     </i>
  //   </div>`
  // );

  el.addEventListener("click", (ev) => {
    ev.stopPropagation();
    window.parent.currentEl &&
      window.parent.currentEl.classList.remove("showControllers");
    window.parent.currentEl = undefined;
    el.classList.toggle("showControllers");
    window.parent.currentEl = el;
    window.parent.dispatchEvent(
      new CustomEvent("currentel", {
        detail: {
          currentEl: el,
        },
      })
    );
  });

  window.addEventListener('click',(ev)=>{
    ev.stopPropagation();
    window.parent.currentEl?.classList.remove("showControllers");
  });

}

console.log("loloer 7");
