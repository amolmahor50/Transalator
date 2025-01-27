import { StrictMode, useContext, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { TranslateContextData, TranslateProvider } from "./context/TranslateContext.jsx";
import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";
import App from "./App.jsx";
import About from "./routes/About.jsx";
import ImageTranslate from "./routes/ImageTranslate.jsx";
import WebsiteTranslate from "./routes/WebsiteTranslate.jsx";
import DocumentTranslate from "./routes/DocumentTranslate.jsx";
import { TranslateActionButton } from "./components/TranslateActionButtons.jsx";
import { Toaster } from "sonner";
import LoginForm from "./components/Authentication/loginForm.jsx";
import Loader from "./components/ui/Loader.jsx";
import { getUser } from "./components/Authentication/auth.jsx";

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { user, setLoading, setUser, loading } = useContext(TranslateContextData);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = getUser(); // Load user from localStorage
    if (savedUser) {
      setUser(savedUser);
    } else {
      navigate("/"); // Redirect to login page if no user
    }
    setLoading(false);
  }, [setUser, setLoading, navigate]);

  if (loading) {
    return <Loader />;
  }

  return user ? children : null; // Only render children if user exists
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />, // Login page for the root
  },
  {
    path: "/translator",
    element: <ProtectedRoute>
      <App />
    </ProtectedRoute>, // Main app layout
    children: [
      {
        path: "", // Default child route for `/translator`
        element: <TranslateActionButton />,
      },
      {
        path: "images", // Relative path under `/translator`
        element: <ImageTranslate />,
      },
      {
        path: "docs", // Relative path under `/translator`
        element: <DocumentTranslate />,
      },
      {
        path: "websites", // Relative path under `/translator`
        element: <WebsiteTranslate />,
      },
      {
        path: "about", // Relative path under `/translator`
        element: <About />,
      },
    ],
  },
]);



// Render App
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TranslateProvider>
      <RouterProvider router={router} />
    </TranslateProvider>
    <Toaster />
  </StrictMode>
);

