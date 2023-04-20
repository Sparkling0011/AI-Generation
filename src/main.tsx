import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import SDK from "synthetical-monitor/lib";

SDK.init({
  pid: "7b4c872d-bef3-443a-b69c-b433cbbb15b0",
  enableBehavior: true,
  enablePerformance: true,
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
