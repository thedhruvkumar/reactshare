/* eslint-disable @typescript-eslint/ban-ts-comment */
import {  useState , useEffect } from "react";
// ts-expect-error
// import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// @ts-expect-error
import { Signup } from "./components/Signup";
// @ts-expect-error
import { Dashboard } from "./components/Dashboard";
// @ts-expect-error
import { Login } from "./components/Login";
// ts-expect-error
// import { NotFound } from "./components/NotFound";
// @ts-expect-error
import { Feed } from "./components/Feed";
// @ts-expect-error
import { Profile } from "./components/Profile";
// @ts-expect-error
import { Sidebar } from "./components/Sidebar";
// @ts-expect-error
import { Main } from "./components/Main";
import { useUserContext } from "./context/users/userState";
// @ts-expect-error
import { SearchResult } from "./components/SearchResult";


function App() {
  
  
  const [isOpen, setOpen] = useState(true);
  const UserState = useUserContext();
  
  const { loadUser } = UserState;
  useEffect(() => {
    loadUser()
    if(window.innerWidth <=1024){
      setOpen(false)
    }
  }, [])


  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div className="flex w-full">
                <Sidebar isOpen={isOpen} setOpen={setOpen} />
                <Main isOpen={isOpen} setOpen={setOpen} />
              </div>
      ),
      children: [
        {
          path: "/",
          element:(
            <div className="flex w-full">
                  <Feed />
                </div>
          ),
        }, 
        {
          path: "acc/:userId",
          element:(
            <div className="flex w-full">
                  <Profile />
                </div>
          ),
        },
        {
          path: "sett",
          element:(
            <div className="flex w-full">
                  <p className="text-6xl">Settings</p>
                </div>
          ),
        },
        {
          path: "search/:query",
          element:(
            <div className="w-full">
                  <SearchResult/>
                </div>
          ),
        }
      ],
    },
    {
      path: "/dashboard",
      element:(
        <Dashboard />
      ),
    },
    {
      path: "/login",
      element:(
        <Login />
      ),
    },
    {
      path: "/signup",
      element:(
          <Signup />
      ),
    },
  ]);


  return (
    <>
    <ToastContainer
          position="top-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      <RouterProvider router={router} />
    </>
  )
}

export default App
