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
    gElement.appendChild(droppedEl);
    gElement.classList.remove("ondragover");
    initSeperators(initDropEl(droppedEl));

    console.log("getMesg function");
    /**
     *
     * @param {HTMLElement} el
     */
    function initDropEl(el) {
      el.id = uniqueID();
      el.setAttribute("draggable", "true");
      el.setAttribute("editable", "true");
      el.textContent
        ? ""
        : el.insertAdjacentText("beforeend", `Hello i am ${ev.data.elType}`);
      el.insertAdjacentHTML(
        "beforeend",
        html`
          <div class="seperator top"></div>
          <div class="seperator bottom"></div>
        `
      );

      el.addEventListener("dragstart", (ev) => {
        ev.stopPropagation();
        console.log(ev.target.innerHTML , el.innerHTML , el.outerHTML);
        ev.dataTransfer.setData("text/html", ev.target.outerHTML);
        ev.dataTransfer.setData("text/plain", el.innerHTML);
      });

      el.addEventListener("drop", (ev) => {
        ev.stopPropagation();
        const outerEl = ev.dataTransfer.getData("text/html");
        const innerEl = ev.dataTransfer.getData("text/plain");
        const nodeEl = parseToHTML(outerEl);
        const id = nodeEl.id;
        if (ev.target.className.includes("seperator top")) {
          ev.target.parentNode.insertAdjacentElement("beforebegin", nodeEl);
        } else if (ev.target.className.includes("seperator bottom")) {
          ev.target.parentNode.insertAdjacentElement("afterend", nodeEl);
        } else {
          ev.target.appendChild(nodeEl);
        }
        ev.target.classList.remove("ondragover");
        initSeperators(initDropEl(nodeEl));
        body.querySelector(`#${id}`).remove();
      });
      return [
        el.querySelector(".seperator.top"),
        el.querySelector(".seperator.bottom"),
      ];
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
          ev.stopPropagation() ;
          ev.target.classList.add("ondragover");
        });
        el.addEventListener("dragleave", (ev) => {
          ev.stopPropagation() ;
          ev.target.classList.remove("ondragover");
        });
      });
    }
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

//trash
// if (ev.target.classList.contains("ondragover") && gElement == ev.target) {
//   return;
// }
