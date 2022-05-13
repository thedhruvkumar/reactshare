import AuthState from "./context/auth/auth";
import { BrowserRouter , Route , Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Signup } from "./components/Signup";
import { Dashboard } from "./components/Dashboard";
import {Login} from "./components/Login";
import { NotFound } from "./components/NotFound";
import { Feed } from "./components/Feed";
import PostState from "./context/posts/posts"
import UserState from "./context/users/userState"
import { Profile } from "./components/Profile";

function App() {
  const userLogin = localStorage.getItem("auth-token")

  return (
    <>
      <AuthState>
        <UserState>

        <PostState>

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

           <Route exact path ="/" element={userLogin?<Feed/>:<Login/>} />
           <Route exact path ="/dashboard" element={<Dashboard/>} />
           <Route exact path ="/signup" element={<Signup/>} />
           <Route exact path ="/user/:userId" element={<Profile/>} />
           <Route exact path ="*" element={<NotFound/>} />
        
          </Routes>
        
          </BrowserRouter>
        </PostState>
        </UserState>
      </AuthState>
    </>
  );
}

export default App;
