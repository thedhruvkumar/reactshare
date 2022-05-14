import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./input.css";
import AuthState from "./context/auth/auth";
import UserState from "./context/users/userState";
import PostState from "./context/posts/posts";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthState>
      <UserState>
        <PostState>
          <App />
        </PostState>
      </UserState>
    </AuthState>
  </React.StrictMode>
);
