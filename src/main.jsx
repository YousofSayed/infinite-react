import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "grapesjs/dist/css/grapes.min.css";
import "./index.css";
import { makeAppResponsive } from "./helpers/cocktail.js";
import { RecoilRoot } from "recoil";
makeAppResponsive("#root");
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <RecoilRoot>
    <App />
  </RecoilRoot>
  // </React.StrictMode>,
);
