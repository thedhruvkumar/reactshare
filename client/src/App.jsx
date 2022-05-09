import { Signup } from "./components/Signup";
import AuthState from "./context/auth/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dashboard } from "./components/Dashboard";

function App() {
  return (
    <>
      <AuthState>
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
        <Signup />
        {/* <Dashboard/> */}
        
      </AuthState>
    </>
  );
}

export default App;
