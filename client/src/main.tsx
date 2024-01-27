/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// @ts-expect-error
import AuthState from "./context/auth/auth.jsx";
// @ts-expect-error
import UserState from "./context/users/userState.jsx";
// @ts-expect-error
import PostState from "./context/posts/posts.jsx";

import { library } from '@fortawesome/fontawesome-svg-core'

import { fab } from '@fortawesome/free-brands-svg-icons'
import { faHome , faUserCircle , faCog, faSignOut, faBars , faSearch} from '@fortawesome/free-solid-svg-icons'
library.add(fab ,faHome , faUserCircle , faCog , faSignOut , faBars , faSearch )



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthState>
      <UserState>
        <PostState>
          <App />
        </PostState>
      </UserState>
    </AuthState>
  </React.StrictMode>,
)
