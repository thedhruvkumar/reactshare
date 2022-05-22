import { useContext, useState } from "react";
import authContext from "./context/auth/authContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Signup } from "./components/Signup";
import { Dashboard } from "./components/Dashboard";
import { Login } from "./components/Login";
import { NotFound } from "./components/NotFound";
import { Feed } from "./components/Feed";
import { Profile } from "./components/Profile";
import { Sidebar } from "./components/Sidebar";
import { Main } from "./components/Main";

function App() {
  const authState = useContext(authContext);
  const { login } = authState;
  const [isOpen, setOpen] = useState(true);

  return (
    <>
      <BrowserRouter>
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

        <Routes>
          <Route
            exact
            path="/"
            element={
              <div className="flex w-full">
                <Sidebar isOpen={isOpen} setOpen={setOpen} />
                <Main isOpen={isOpen} setOpen={setOpen} />
              </div>
            }
          >
            <Route
              path="/"
              element={
                <div className="flex w-full">
                  <Feed />
                </div>
              }
            />
            <Route
              path="acc/:userId"
              element={
                <div className="flex w-full">
                  <Profile />
                </div>
              }
            />
            <Route
              path="sett"
              element={
                <div className="flex w-full">
                  <p className="text-white text-6xl">Settings</p>
                </div>
              }
            />
          </Route>
          {/*  --------------  */}
          <Route exact path="dashboard" element={<Dashboard />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
