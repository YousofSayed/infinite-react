document.body.style.height = `${window.innerHeight}px`;

const scriptsSrc = [
  "/scripts/tailwindcss.js",
  "/scripts/htmx.js",
  "/scripts/alpine.js",
  "/scripts/alpine-morph.js",
  "/scripts/htmx-clinet-side-template.js",
  "/scripts/mustache.js",
];

const stylesSrc = ["/styles/style.css"];

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

appendScript(0);

stylesSrc.forEach((src) => {
  const link = document.createElement("link");
  link.href = src;
  link.rel = "stylesheet";
  document.head.appendChild(link);
});

// Observer handlers
let body = document.body;
/**
 *
 * @param {string} detail
 * @returns
 */
const iframeBodyChange = (detail) => {
  const csv = new CustomEvent("iframeBodyChange", {
    detail,
  });

  window.dispatchEvent(csv);
};

/**
 *
 * @param {DragEvent} ev
 */
function dropCallback(ev) {
  console.log('dropped');
  ev.stopPropagation();
  const data = JSON.parse(ev.dataTransfer.getData("application/json"));
  const droppedEl = document.createElement(data.tagType);
  body.appendChild(droppedEl);
  body.classList.remove("ondragover");
  // initSeperators(initDropEl(droppedEl, data));
  data.oldId ? body.querySelector(`#${data.oldId}`).remove() : "";
  iframeBodyChange(body.innerHTML);
}

body.addEventListener('drop',dropCallback);
body.addEventListener('dragover',(ev)=>{ev.preventDefault();})

const domObsever = new MutationObserver((entries) => {
  entries.forEach((entry) => {
    entry.addedNodes;
  });
});

domObsever.observe(document.body, {
  subtree: true,
  attributes: true,
  childList: true,
});
