import React,{useState,useContext}  from 'react'
import authContext from "../context/auth/authContext";
import { toast } from 'react-toastify';
import { CircularProgress } from "@mui/material";
import {Navigate} from "react-router-dom";


export const Login = () => {
  
  const authState = useContext(authContext);
  const {authenticateUser} = authState;
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email:"",
    password:""
  });

 const user = localStorage.getItem('auth-token'); 


const handleChange = (e) =>{
    setFormData({...formData,[e.target.name]:e.target.value})
}
const handleClick =async()=>{
  try {
    setLoading(true)
    const jsonData = await authenticateUser(formData.email,formData.password);
  if(jsonData.success){
    
    toast.success('Authenticated Successfully', {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
      setLoading(false);
      localStorage.setItem("auth-token",jsonData.authtoken)
      // setLoading(false)
      

      
  }else{
    toast.error(jsonData.error, {
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
  } catch (error) {
    toast.error(error, {
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
    
    

}

  return (
    <>
    {user && (<Navigate to={'/'} replace={true}/>)}
    <div className='bg-slate-200 h-screen w-screen px-16 lg:flex justify-between items-center hidden'>
      <div className="left">
      <h1 className="text-4xl text-blue-600 my-2 font-extrabold">
      ReactShare
       </h1>
        <span className='text-2xl'>ReactShare helps you connect and share with the people in your life.</span>
      </div>
      <div className="right">
        <div className="box-border bg-white shadow-lg h-auto rounded-xl w-[420px]">
        <h1 className='py-5 px-6 border-b-2 font-bold text-xl '>Login To Your Account</h1>
        <div className='p-4 my-2'>
          <input type="email" placeholder='Email' className='px-6 py-3 border-2 w-[100%] my-2 outline-none rounded-md' name="email" onChange={handleChange} />
          <input type="password" placeholder='Password' className='px-6 py-3 border-2 w-[100%] my-2 outline-none rounded-md' name="password" onChange={handleChange} />
          <button disabled={isLoading?true:false} onClick={handleClick} className="bg-blue-500 px-5 py-3 text-white my-3 w-[100%] font-semibold rounded-md text-xl hover:bg-blue-700 disabled:opacity-70">{isLoading?<span> <CircularProgress size={'1rem'} color="inherit" className="mx-2"/> Logging in...</span>:"Login"}</button>
          <a href="http://localhost:3000/reset" className='block text-center text-blue-500 hover:underline hover:text-blue-700'>Forgot Your Password?</a>

        </div>
        <div className='border-t-2 px-4 py-2'>
          <button className="bg-green-500 px-5 py-3 text-white my-3 w-[100%] font-semibold rounded-md text-xl hover:bg-green-700">Create a new Account</button>
        </div>
        </div>
      </div>
    </div>


    <div className="flex px-5 justify-center items-center bg-slate-200 h-screen lg:hidden">

    <div className="box-border bg-white shadow-lg w-screen h-[460px] rounded-xl">
        <h1 className='py-5 px-6 border-b-2 font-bold text-xl '>Login To Your Account</h1>
        <div className='p-4 my-2'>
          <input type="email" placeholder='Email' className='px-6 py-3 border-2 w-[100%] my-2 outline-none rounded-md' name="email" onChange={handleChange} />
          <input type="password" placeholder='Password' className='px-6 py-3 border-2 w-[100%] my-2 outline-none rounded-md' name="password" onChange={handleChange} />
          <button disabled={isLoading?true:false} onClick={handleClick} className="bg-blue-500 px-5 py-3 text-white my-3 w-[100%] font-semibold rounded-md text-xl hover:bg-blue-700 disabled:opacity-70">{isLoading?<span> <CircularProgress size={'1rem'} color="inherit" className="mx-2"/> Logging in...</span>:"Login"}</button>
          <a href="http://localhost:3000/reset" className='block text-center text-blue-500 hover:underline hover:text-blue-700'>Forgot Your Password?</a>

        </div>
        <div className='border-t-2 px-4 py-2'>
          <a href='/signup' className="w-full block text-center bg-green-500 px-5 py-3 text-white my-3 font-semibold rounded-md text-xl hover:bg-green-700">Create a new Account</a>
        </div>
        </div>
    </div>
    </>
  )
}
