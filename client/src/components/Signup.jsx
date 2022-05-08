import React from "react";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

export const Signup = () => {
  return (
    <div className="flex justify-center items-center bg-slate-200 w-[100%] h-[100vh]">
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
          name=""
          id=""
        />
        <input
          type="email"
          placeholder="Enter Your E-mail"
          className="mb-4 px-7 py-4 outline-none rounded-md border-2 border-slate-300 w-[100%]"
          name=""
          id=""
        />
        <input
          type="password"
          placeholder="Enter Your Password"
          className="mb-4 px-7 py-4 outline-none rounded-md border-2 border-slate-300 w-[100%]"
          name=""
          id=""
        />
        <button className="px-6 py-4 w-[100%] bg-green-600 rounded-md hover:shadow-2xl text-white font-bold hover:bg-green-700">
          Signup
        </button>
      </div>
    </div>
  );
};
