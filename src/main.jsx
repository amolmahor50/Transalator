import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { TranslateProvider } from "./context/TranslateContext.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import About from "./routes/About.jsx";
import ImageTranslate from "./routes/ImageTranslate.jsx";
import WebsiteTranslate from "./routes/WebsiteTranslate.jsx";
import DocumentTranslate from "./routes/DocumentTranslate.jsx";
import { TextAreaGrid } from "./components/TextAreaComponent.jsx";
import { TranslateActionButton } from "./components/TranslateActionButtons.jsx";
import { Toaster } from "sonner";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <TranslateActionButton />,
        children: [
          {
            path: "/",
            element: <TextAreaGrid />
          },
          {
            path: '/images',
            element: <ImageTranslate />
          },
          {
            path: '/docs',
            element: <DocumentTranslate />
          },
          {
            path: '/websites',
            element: <WebsiteTranslate />
          },
        ]
      },
      {
        path: "/about",
        element: <About />
      },
    ]
  }

])

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TranslateProvider>
      <RouterProvider router={router} />
    </TranslateProvider>
    <Toaster />
  </StrictMode>
);
