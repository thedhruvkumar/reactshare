/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import AuthState from "./context/auth/auth";
import UserState from "./context/users/userState";
import PostState from "./context/posts/posts";

import { library } from '@fortawesome/fontawesome-svg-core'

import { fab } from '@fortawesome/free-brands-svg-icons'
import { faHome , faUserCircle , faCog, faSignOut, faBars , faSearch} from '@fortawesome/free-solid-svg-icons'
library.add(fab ,faHome , faUserCircle , faCog , faSignOut , faBars , faSearch )

const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthState>
      <UserState>
        <PostState>
          <Theme>
              <QueryClientProvider client={queryClient}>
                  <App /> 
              </QueryClientProvider> 
          </Theme>
        </PostState>
      </UserState>
    </AuthState>
  </React.StrictMode>,
)
