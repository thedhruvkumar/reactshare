import React from 'react'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';


export const Signup = () => {
  return (
    <div className='flex justify-center items-center w-[100%] h-[100vh]'>
      <div className="shadow-md bg-white w-[460px] p-9">
        <div className="text-xl border-b-2 pb-4 text-center font-bold">
          <span>Sign up now</span>
        </div>
        <div className="text-center text-6xl">
        <AccountCircleRoundedIcon/>
        </div>
        <input type="text" placeholder="Enter Your Name" className="mb-4 px-7 py-4 outline-none shadow-md w-[100%]" name="" id="" />        
        <input type="email" placeholder="Enter Your E-mail" className="mb-4 px-7 py-4 outline-none shadow-md w-[100%]" name="" id="" />  
        <input type="password" placeholder="Enter Your Password" className="mb-4 px-7 py-4 outline-none shadow-md w-[100%]" name="" id="" />  
        <button className='px-6 py-4 w-[100%] bg-green-600 text-white font-bold'>Signup</button>      
      </div>
    </div>
  )
}
