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

// const stylesSrc = ["/styles/style.css"];

function appendScript(index) {
  if (index >= scriptsSrc.length - 1) return;
  let indexClone = index;
  const script = document.createElement("script");
  script.src = scriptsSrc[indexClone];
  document.head.appendChild(script);
  indexClone++;
  script.addEventListener("load", () => {
    appendScript(indexClone);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  // appendScript(0);

  // Observer handlers

  //  For body
  initDragEvents(body);
  //  For body

  // body.addEventListener("drop", (ev) => {});

  const domObsever = new MutationObserver((entries) => {
    entries.forEach((entry) => {
      if (isHTMLElement(entry.addedNodes[0])) {
        initDragEvents(entry.addedNodes[0]);
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
 * @returns {{ tagType: string, inner: string, oldId: string, classes: string, attrs: {} }}
 */
const dataModel = (ev) => {
  return JSON.parse(ev.dataTransfer.getData("application/json"));
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
  ev.stopPropagation();
  const data = dataModel(ev);
  ev.target.classList.add("ondragover");

  data.oldId && ev.target.id && data.oldId == ev.target.id
    ? ev.target.classList.add("ondragover", "prevent")
    : ev.target.classList.add("ondragover");

  data.oldId &&
    ev.target.id &&
    body.querySelector(`#${data.oldId}`).querySelector(`#${ev.target.id}`) &&
    ev.target.classList.add("ondragover", "prevent");
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
  ev.dataTransfer.setData(
    "application/json",
    JSON.stringify({
      tagType: ev.target.tagName,
      inner: ev.target.innerHTML,
      oldId: ev.target.id,
      classes: ev.target.className,
      attrs: { editable: true, draggable: true },
    })
  );
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

  const handleNewElement = (ev) => {
    const data = dataModel(ev);
    const el = document.createElement(data.tagType);
    el.id = uniqueID();
    el.innerHTML = data.inner;
    data.classes && el.classList.add(...data.classes.split(" "));
    for (const key in data.attrs) {
      el.setAttribute(key, data.attrs[key]);
    }

    return { el, data };
  };

  // prev.forEach((el) => {
  //   el.addEventListener("drop", (ev) => {
  //     ev.stopPropagation();
  //     console.log(ev.target , ev.currentTarget);

  //     const {el , data} = handleNewElement(ev);
  //     if(body.querySelector(`#${data.oldId}`).querySelector(`#${ev.target.id}`) ){
  //       ev.target.classList.remove('ondragover','prevent');
  //       return;
  //     };
  //     ev.currentTarget.parentNode.insertAdjacentElement("beforebegin", el);
  //     body.querySelector(`#${data.oldId}`).remove();
  //     ev.target.classList.remove('ondragover');
  //     // dropCallback(ev, ev.target , 'before');
  //   });
  // });

  // next.forEach((el) => {
  //   el.addEventListener("drop", (ev) => {
  //     ev.stopPropagation();
  //     console.log(ev.target , ev.currentTarget);

  //     const {el , data}  = handleNewElement(ev);
  //     if(body.querySelector(`#${data.oldId}`).querySelector(`#${ev.target.id}`) ){
  //       ev.target.classList.remove('ondragover','prevent');
  //       return;
  //     };
  //     ev.currentTarget.parentNode.insertAdjacentElement("afterend", el);
  //     body.querySelector(`#${data.oldId}`).remove();
  //     ev.target.classList.remove('ondragover');

  //     // dropCallback(ev, ev.target , 'after');
  //   });
  // });
}
// where == "before" && root.insertAdjacentElement("beforebegin", el);
// where == "after" && root.insertAdjacentElement("afterend", el);

console.log('loloer 5');

