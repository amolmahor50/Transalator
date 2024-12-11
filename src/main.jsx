import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";
import { ThemeProvider } from "@material-tailwind/react";
import { BrowserRouter } from "react-router-dom";
import { TranslateProvider } from "./context/TranslateContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TranslateProvider>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </TranslateProvider>
  </StrictMode>
);
