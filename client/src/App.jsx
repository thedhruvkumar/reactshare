import { useContext,useEffect } from "react";
import authContext from "./context/auth/authContext";
import { BrowserRouter , Route , Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Signup } from "./components/Signup";
import { Dashboard } from "./components/Dashboard";
import {Login} from "./components/Login";
import { NotFound } from "./components/NotFound";
import { Feed } from "./components/Feed";
import { Profile } from "./components/Profile";

function App() {
  const authState = useContext(authContext);
  const {login} =authState;

  

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

           <Route exact path ="/" element={login?<Feed/>:<Login/>} />
           <Route exact path ="/dashboard" element={<Dashboard/>} />
           <Route exact path ="/signup" element={<Signup/>} />
           <Route exact path ="/user/:userId" element={<Profile/>} />
           <Route exact path ="*" element={<NotFound/>} />
        
          </Routes>
        
          </BrowserRouter>
        
    </>
  );
}

export default App;
