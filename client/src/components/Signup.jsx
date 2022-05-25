import React,{useState,useContext} from "react";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import authContext from "../context/auth/authContext";
import { toast } from 'react-toastify';
import { CircularProgress } from "@mui/material";

export const Signup = () => {
  const authState = useContext(authContext);
  const {createUser} = authState;

  const [isLoading, setLoading] = useState(false)


  const [formData, setFormData] = useState({
    name:"",
    username:"",
    email:"",
    password:""
  })

  const handleChange = (e) =>{
      setFormData({...formData,[e.target.name]:e.target.value})
  }
  const handleClick =async()=>{
    setLoading(true)
    const jsonData = await createUser(formData.name,formData.username,formData.email,formData.password);
   
    setTimeout(async() => {
      
      if(jsonData.success){
        
        toast.success('Account Created Successfully', {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
          setLoading(false);
      }else{
        toast.error('An Error Occured', {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
          setLoading(false)
      }
    }, 1000);

  }

  return (
    <div className="flex justify-center items-center bg-slate-200 w-[100%] h-[100vh] lg:p-0 px-3">
      <div className="shadow-2xl bg-white w-[460px] p-9 rounded-md">
        <div className="text-xl border-b-2 pb-4 text-center font-bold ">
          <span>Sign up now</span>
        </div>
        <div className="text-center w-[100%] h-[120px] flex justify-center items-center">
          <AccountCircleRoundedIcon className="scale-[5]" />
        </div>
        <input
          type="text"
          placeholder="Enter Your Name"
          className="mb-4 px-7 py-4 outline-none rounded-md border-2 border-slate-300 w-[100%]"
          name="name"
          id="name"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Enter Your Username"
          className="mb-4 px-7 py-4 outline-none rounded-md border-2 border-slate-300 w-[100%]"
          name="username"
          id="uname"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Enter Your E-mail"
          className="mb-4 px-7 py-4 outline-none rounded-md border-2 border-slate-300 w-[100%]"
          name="email"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Enter Your Password"
          className="mb-4 px-7 py-4 outline-none rounded-md border-2 border-slate-300 w-[100%]"
          name="password"
          id="password"
          onChange={handleChange}
        />
        <button disabled={isLoading?true:false} onClick={handleClick} className="px-6 py-4 w-[100%] bg-green-600 disabled:opacity-70 rounded-md hover:shadow-2xl text-white font-bold hover:bg-green-700">
          {isLoading?<span><CircularProgress size={'1rem'} color="inherit" className="mx-2"/>Signing up...</span>:"Sign up"}
        </button>
      </div>
    </div>
  );
};
