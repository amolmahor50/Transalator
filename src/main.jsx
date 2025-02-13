import React, { StrictMode, useContext, useEffect } from "react";
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
import { TextAreaGrid } from './components/TextAreaComponent.jsx';
import LoginForm from "./components/Authentication/loginForm.jsx";
import Loader from "./components/ui/Loader.jsx";
import { getUser } from "./components/Authentication/auth.jsx";
import ForgotForm from "./components/Authentication/forgotForm.jsx";
import CreateAccount from "./components/Authentication/CreateAccount.jsx";
import Profile from "./components/Profile.jsx";
import Setting from "./components/Setting.jsx";

// LoginHandler Component
const LoginHandler = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = getUser();
    if (savedUser) {
      navigate("/translator"); // Redirect if user exists
    }
  }, [navigate]);

  return children; // Render login page only if no redirect occurs
};

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { user, setLoading, setUser, loading } = useContext(TranslateContextData);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = getUser(); // Load user from localStorage
    if (savedUser) {
      setUser(savedUser); // Set the user in context
    } else {
      navigate("/"); // Redirect to login if no user
    }
    setLoading(false);
  }, [setUser, setLoading, navigate]);

  if (loading) {
    return <Loader />; // Show loader while checking user
  }

  return user ? children : null; // Render children if user exists
};

// Router Setup
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <LoginHandler>
        <LoginForm />
      </LoginHandler>
    ),
  },
  {
    path: "/sign-up",
    element: <CreateAccount />,
  },
  {
    path: "/forgot-pass",
    element: <ForgotForm />,
  },
  {
    path: "/translator",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <TranslateActionButton />,
        children: [
          { path: "", element: <TextAreaGrid /> },
          { path: "images", element: <ImageTranslate /> },
          { path: "docs", element: <DocumentTranslate /> },
          { path: "websites", element: <WebsiteTranslate /> },
        ],
      },
    ],
  },
  {
    path: "/about",
    element: (
      <ProtectedRoute>
        <About />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/setting",
    element: (
      <ProtectedRoute>
        <Setting />
      </ProtectedRoute>
    ),
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
