import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "./context/Auth";

const rootElement = document.getElementById("root") as HTMLElement;

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Provider>
        <App />
      </Provider>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}
