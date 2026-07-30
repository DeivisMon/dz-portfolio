import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import { TransitionProvider } from "./context/TransitionProvider";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <TransitionProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </TransitionProvider>
    </HashRouter>
  </StrictMode>,
);
