import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export function debounce(func: (args: unknown) => void, timeout = 300) {
  let timer: number;

  return (...args: unknown[]) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      func(args);
    }, timeout);
  };
}
