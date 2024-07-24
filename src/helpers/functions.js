import { html, parseToHTML, uniqueID } from "./cocktail";

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
 * @param {MessageEvent} ev
 */
const getMsg = (ev) => {
  if (ev.data.type == "end") {
    const droppedEl = document.createElement(ev.data.elType);
    let id;
    droppedEl.innerHTML = `Hello i am ${ev.data.elType}`;
    droppedEl.setAttribute("editable", "true");
    droppedEl.setAttribute("draggable", "true");
    droppedEl.id = uniqueID();
    // droppedEl.insertAdjacentHTML(
    //   "beforeend",
    //   html`
    //     <div class="left"></div>
    //     <div class="right"></div>
    //   `
    // );
    gElement.appendChild(droppedEl);
    const leftDiv = droppedEl.querySelector(".left");
    const rightDiv = droppedEl.querySelector(".right");
    console.log(leftDiv , rightDiv);

    gElement.classList.remove("ondragover");

    /**
     *
     * @param {HTMLDivElement} div
     */
    // const sidesHandler = (div) => {
    //   div.addEventListener("dragenter", (ev) => {
    //     ev.target.classList.add("ondragover");
    //   });

    //   div.addEventListener("dragleave", (ev) => {
    //     ev.target.classList.remove("ondragover");
    //   });

      
    // };
    // sidesHandler(leftDiv);
    // sidesHandler(rightDiv);

    droppedEl.addEventListener("dragstart", (ev) => {
      isInWindow = true;
      console.log("start");
      ev.dataTransfer.setData("text/html", ev.target.outerHTML);
      ev.dataTransfer.setData("text/plain", ev.target.id);
    });

    droppedEl.addEventListener("dragenter", (ev) => {
      ev.target.classList.add("ondragover");
    });

    droppedEl.addEventListener("dragleave", (ev) => {
      ev.target.classList.remove("ondragover");
    });

    droppedEl.addEventListener("drop", (ev) => {
        const el = parseToHTML(ev.dataTransfer.getData("text/html"));
        const className = ev.target.className;
        el.id = uniqueID();
        if(className.includes('left')){
            ev.target.prepend(el)
        }else if(className.includes('right')){
            ev.target.append(el)
        }
        // document.body.
        ev.target.appendChild(el);
        ev.target.classList.remove("ondragover");
        leftDiv.classList.remove("ondragover");
        // rightDiv.classList.remove("ondragover");
        // console.log(ev.dataTransfer.getData("text/plain"));
        body
          .querySelector(`#${ev.dataTransfer.getData("text/plain")}`)
          .remove();
        isInWindow = false;
    });
  }
};

/**
 *
 * @param {HTMLIFrameElement} iframeEl
 */
export const iframeHandler = (iframeEl) => {
  body = iframeEl.contentDocument.body;
  frameWindow = iframeEl.contentWindow;
  body.style.height = frameWindow.innerHeight;

  frameWindow.addEventListener("dragover", (ev) => {
    ev.preventDefault();
    if (isInWindow) {
      console.log(" isInWindow");
      return;
    }
    if (ev.target.classList.contains("ondragover") && gElement == ev.target) {
      return;
    }
    gElement = ev.target;

    const removeClass = (ev) => {
      ev.target.classList.remove("ondragover");
      ev.target.removeEventListener("dragleave", removeClass);
    };

    ev.target.addEventListener("dragleave", removeClass);
    ev.target.classList.add("ondragover");
  });

  window.parent.addEventListener("message", getMsg);
};

export const cleaner = () => {
  window.parent.removeEventListener("message", getMsg);
};
