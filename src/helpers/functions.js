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
    droppedEl.innerHTML = `Hello i am ${ev.data.elType}`;
    
    /**
     * 
     * @param {HTMLElement} el 
     */
    const initDroppedEl = (el)=>{
      el.setAttribute("editable", "true");
      el.setAttribute("draggable", "true");
      el.id = uniqueID();
    }

    initDroppedEl(droppedEl);
    gElement.appendChild(droppedEl);
    gElement.classList.remove("ondragover");

    /**
     * 
     * @param {HTMLElement} el 
     */
    const initSeperators = (el)=>{
      el.insertAdjacentHTML(
        "afterbegin",
        html`
          <div draggable="false" class="seperator top"></div>
          <div draggable="false" class="seperator bottom"></div>
        `
      );
      const seperatorT = el.querySelector(".seperator.top");
      const seperatorB = el.querySelector(".seperator.bottom");
  
  
      /**
       *
       * @param {HTMLDivElement} div
       */
      const sidesHandler = (div) => {
        div.addEventListener("drag", (ev) => {
          ev.preventDefault();
          return;
        });
  
        div.addEventListener("dragover", (ev) => {
          ev.preventDefault();
          return;
        });
  
        div.addEventListener("dragenter", (ev) => {
          ev.target.classList.add("ondragover");
        });
  
        div.addEventListener("dragleave", (ev) => {
          ev.target.classList.remove("ondragover");
        });
  
      };
      sidesHandler(seperatorT);
      sidesHandler(seperatorB);
    }

    initSeperators(droppedEl);


    /**
     * 
     * @param {HTMLElement} el 
     */
    const droppedElDragHandler = (el)=>{
      el.addEventListener('dragstart',(ev)=>{
        isInWindow = true;
        const className = ev.target.className;
        ev.dataTransfer.setData('text/html',el.outerHTML);
        ev.dataTransfer.setData('text/plain',el.id);
      });
      
      el.addEventListener('drop',(ev)=>{
        const className = ev.target.className;
        const newEl = parseToHTML(ev.dataTransfer.getData('text/html'));
        newEl.innerHTML = 'Fucken HEllo text....'
        const id = ev.dataTransfer.getData('text/plain');
        initDroppedEl(newEl);

        if(className.includes('seperator top')){
          console.log('top');
          ev.target.parentNode.insertAdjacentElement('beforebegin',newEl);
        }
        else if(className.includes('seperator bottom')){
          console.log('bottom');
          ev.target.parentNode.insertAdjacentElement('afterend',newEl);

        }
        else{
          ev.target.appendChild(newEl);
        }
        ev.target.classList.remove('ondragover');
        // document.body.parentNode
        body.querySelector(`#${id}`).remove();
        isInWindow=false;
        initSeperators(newEl);
        droppedElDragHandler(newEl);
      });
    }

    // document.body
    droppedElDragHandler(droppedEl);

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
    // log
    console.log(ev.target.className);
    if (isInWindow || ev.target.className.includes('seperator')) {
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