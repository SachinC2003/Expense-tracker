import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) throw new Error("Root element not found in index.html");

ReactDOM.createRoot(rootElement).render(
  <GoogleOAuthProvider clientId="593417087275-if2hvfr86idse6dbl87a49floa0qpi5t.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
