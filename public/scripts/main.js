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

// scriptsSrc.forEach((src) => {
//   const script = document.createElement("script");
//   script.src = src;
//   document.head.appendChild(script);
//   script.addEventListener("load", () => {
//     console.log("script loaded");
//   });
// });

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


