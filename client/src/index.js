import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./input.css";
import AuthState from "./context/auth/auth";
import UserState from "./context/users/userState";
import PostState from "./context/posts/posts";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faHome , faUserCircle , faCog, faSignOut } from '@fortawesome/free-solid-svg-icons'
library.add(fab ,faHome , faUserCircle , faCog , faSignOut)


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
