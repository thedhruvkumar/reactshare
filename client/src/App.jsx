import AuthState from "./context/auth/auth";
import { BrowserRouter , Route , Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Signup } from "./components/Signup";
import { Dashboard } from "./components/Dashboard";
import {Login} from "./components/Login";
import { NotFound } from "./components/NotFound";
import { PostBox } from "./components/PostBox";

function App() {
  return (
    <>
      <AuthState>
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

           <Route exact path ="/" element={<Login/>} />
           <Route exact path ="/dashboard" element={<Dashboard/>} />
           <Route exact path ="/signup" element={<Signup/>} />
           <Route exact path ="/posts" element={<PostBox/>} />
           <Route exact path ="*" element={<NotFound/>} />
        
          </Routes>
        
          </BrowserRouter>
      </AuthState>
    </>
  );
}

export default App;
