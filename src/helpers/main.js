import {
  html,
  parse,
  parseToHTML,
  stringify,
  uniqueID,
  isHTMLElement,
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

  // Observer handlers

  //  For body
  initDragEvents(body);
  //  For body

  // body.addEventListener("drop", (ev) => {});

  const domObsever = new MutationObserver((entries) => {
    entries.forEach((entry) => {
      if (isHTMLElement(entry.addedNodes[0])) {
        initDragEvents(entry.addedNodes[0]);
        entry.addedNodes[0].children.length <= 0 && initSeperators(entry.addedNodes[0]);
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
 * @returns {{ tagType: string, inner: string, oldId: string, classes: string, attrs: {} }}
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
    ev.target.classList.remove("ondragover", "prevent");
    return;
  }

  const el = document.createElement(data.tagType);
  el.id = uniqueID();
  el.innerHTML = data.inner;
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
  ev.target.classList.remove("ondragover", "prevent");
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
    body.querySelector(`#${data.oldId}`).querySelector(`#${ev.target.id}`) ?
    ev.target.classList.add("ondragover", "prevent") : null;
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
    attrs: { editable: true, draggable: true },
  };

  ev.dataTransfer.setData(
    "application/json",
    JSON.stringify(data)
  );
  localStorage.setItem('elData',JSON.stringify(data));
}

/**
 *
 * @param {HTMLElement} el
 */
function initDragEvents(el) {
  el.addEventListener("dragover", (ev) => ev.preventDefault());
  el.addEventListener("dragenter", dragEnterCallback);
  el.addEventListener("dragleave", dragLeaveCallback);
  el.addEventListener("dragstart", dragStartCallback);
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
      <div class="seperator top"></div>
      <div class="seperator bottom"></div>
      <div class="seperator left"></div>
      <div class="seperator right"></div>
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

console.log("loloer 7");
