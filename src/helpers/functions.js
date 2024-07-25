import { html, parse, parseToHTML, stringify, uniqueID } from "./cocktail";

/**
 *
 * @param {string} scriptContent
 * @param {HTMLIFrameElement} iframeEl
 */
export const appendScript = (scriptContent, iframeEl) => {
  const script = document.createElement("script");
  script.innerHTML = scriptContent;
  script.className = "main-script";
  iframeEl.contentDocument.body.appendChild(script);
};

/**
 *
 * @param {string} styleContent
 * @param {HTMLIFrameElement} iframeEl
 */
export const appendStyle = (styleContent, iframeEl) => {
  const style = document.createElement("style");
  style.innerHTML = styleContent;
  iframeEl.contentDocument.body.appendChild(style);
};

/**
 *
 * @param {HTMLIFrameElement} iframeEl
 */
export const removeOldScriptsAndStyles = (iframeEl) => {
  const allScriptsAdded = iframeEl.contentDocument.querySelectorAll("script");
  allScriptsAdded.forEach((script, i) => {
    script.innerHTML = "";
    script.remove();
  });
  const allStylesAdded = iframeEl.contentDocument.querySelectorAll("style");
  allStylesAdded.forEach((style, i) => {
    style.remove();
  });
};

let gElement,
  body = document.body,
  frameWindow,
  historyI = 0,
  isInWindow = false;
const history = [""];
let eventsWillClear = {
  drop: () => {},
  dragstart: () => {},
  dragenter: () => {},
  dragleave: () => {},
  dragend: () => {},
};

/**
 *
 * @param {HTMLBodyElement} element
 */
const handleHistory = (element) => {
  window.parent.addEventListener("keyup", (ev) => {
    console.log(ev);
    // ctrlKey
  });
};

/**
 *
 * @param {HTMLIFrameElement} iframeEl
 */
export const iframeHandler = (iframeEl) => {
  body = iframeEl.contentDocument.body;
  frameWindow = iframeEl.contentWindow;
  body.style.height = frameWindow.innerHeight;

  body.addEventListener("drop", dropCallback);

  initDragAndDrop(body);
};

/**
 *
 * @param {DragEvent} ev
 */
function dropCallback(ev) {
  ev.stopPropagation();
  const data = parse(ev.dataTransfer.getData("application/json"));
  const droppedEl = document.createElement(data.name);
  droppedEl.innerHTML = data.inner;
  droppedEl.setAttribute("draggable", "true");
  droppedEl.setAttribute("editable", "true");
  // droppedEl.id
  body.appendChild(droppedEl);
  body.classList.remove("ondragover");

  initSeperators(initDropEl(droppedEl, data.name));
  data.oldId ? body.querySelector(`#${data.oldId}`).remove() : "";
}

/**
 *
 * @param {HTMLElement} el
 */
function initDropEl(el, dataType) {
  el.id = uniqueID();
  el.setAttribute("draggable", "true");
  el.setAttribute("editable", "true");
  el.textContent
    ? ""
    : el.insertAdjacentText("beforeend", `Hello i am ${dataType}`);
  el.insertAdjacentHTML(
    "beforeend",
    html`
      <div class="seperator top"></div>
      <div class="seperator bottom"></div>
    `
  );

  initDragAndDrop(el);

  /**
   *
   * @param {DragEvent} ev
   */
  const dropCallback = (ev) => {
    ev.stopPropagation();
    const data = parse(ev.dataTransfer.getData("application/json"));
    if (
      (data.oldId &&
        body
          .querySelector(`#${data.oldId}`)
          .querySelector(`#${ev.currentTarget.id}`)) ||
      data.oldId == ev.currentTarget.id
    ) {
      ev.target.classList.remove("ondragover", "prevent");
      console.log('testttt');
      return;
    }

    const newEl = document.createElement(data.name);
    newEl.innerHTML = data.inner;
    newEl.id = uniqueID();

    if (ev.target.className.includes("seperator top")) {
      ev.currentTarget.insertAdjacentElement("beforebegin", newEl);
    } else if (ev.target.className.includes("seperator bottom")) {
      ev.currentTarget.insertAdjacentElement("afterend", newEl);
    } else {
      ev.target.appendChild(newEl);
    }

    ev.target.classList.remove("ondragover");
    initSeperators(initDropEl(newEl));
    console.log(data.oldId, data.inner);
    data.oldId ? body.querySelector(`#${data.oldId}`).remove() : "";
  };
  eventsWillClear = { ...eventsWillClear, drop: dropCallback };
  document.body.parentElement;

  el.addEventListener("drop", dropCallback);

  return [
    el.querySelector(".seperator.top"),
    el.querySelector(".seperator.bottom"),
  ];
}

/**
 *
 * @param {HTMLElement} el
 */
function initDragAndDrop(el) {
  const dragStartCallback = (ev) => {
    console.log(ev.target, ev.currentTarget);
    ev.stopPropagation();

    const elData = {
      name: ev.target.tagName,
      inner: ev.target.innerHTML,
      oldId: ev.target.id,
    };
    ev.dataTransfer.setData("application/json", stringify(elData));
  };

  /**
   *
   * @param {DragEvent} ev
   */
  const dragEnterCallback = (ev) => {
    ev.stopPropagation();
    const data = parse(ev.dataTransfer.getData("application/json"));
    (data.oldId &&
      ev.currentTarget.id &&
      body
        .querySelector(`#${data.oldId}`)
        .querySelector(`#${ev.currentTarget.id}`)) ||
    (data.oldId && data.oldId == ev.currentTarget.id)
      ? ev.target.classList.add("ondragover", "prevent")
      : ev.target.classList.add("ondragover");
  };

  const dragLeaveCallback = (ev) => {
    ev.stopPropagation();
    ev.target.classList.remove("ondragover", "prevent");
  };

  const dragOverCallback = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
  };

  el.addEventListener("dragstart", dragStartCallback);

  el.addEventListener("dragenter", dragEnterCallback);

  el.addEventListener("dragleave", dragLeaveCallback);

  el.addEventListener("dragover", dragOverCallback);

  eventsWillClear = {
    ...eventsWillClear,
    dragstart: dragStartCallback,
    dragenter: dragEnterCallback,
    dragleave: dragLeaveCallback,
    dragover: dragOverCallback,
  };
}

/**
 *
 * @param {HTMLElement[]} els
 */
function initSeperators(els) {
  const preventDefautlt = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    return;
  };
  els.forEach((el) => {
    el.addEventListener("drag", preventDefautlt);
    el.addEventListener("dragover", preventDefautlt);
    el.addEventListener("dragenter", (ev) => {
      ev.stopPropagation();
      const data = parse(ev.dataTransfer.getData("application/json"));
      (data.oldId &&
        body
          .querySelector(`#${data.oldId}`)
          .querySelector(`#${ev.currentTarget.parentNode.id}`)) ||
      data.oldId == ev.currentTarget.parentNode.id
        ? ev.target.classList.add("ondragover", "prevent")
        : ev.target.classList.add("ondragover");
    });
    el.addEventListener("dragleave", (ev) => {
      ev.stopPropagation();
      ev.target.classList.remove("ondragover", "prevent");
    });
  });
}

export const cleaner = () => {
  body.removeEventListener("drop", dropCallback);
};

//trash
// if (ev.target.classList.contains("ondragover") && gElement == ev.target) {
//   return;
// }
