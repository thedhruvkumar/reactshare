import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import userContext from "../context/users/userContext";
import VerifiedIcon from '@mui/icons-material/Verified';
import ErrorIcon from '@mui/icons-material/Error';
export const Profile = () => {
  const { userId } = useParams();
  const UserState = useContext(userContext);
  const { getUser } = UserState;
  const [user, setUser] = useState({});

  useEffect(() => {
    getUser(userId).then((data) => {
      setUser(data);
      
    });
  }, []);

  console.log(user)

  return (
    <div className="px-32 h-screen ">
        <div className="h-full w-full shadow-xl">
        <div className="relative">
        <div className="banner w-full h-80">
            <img src="https://timelinecovers.pro/facebook-cover/download/lush-green-grass-mountains-at-kosovo-facebook-cover.jpg" className="w-full h-full" alt="coverimage" />
        </div>
        <div className="logo flex justify-between items-center bg-transparent w-full absolute -bottom-12">
            <img src="http://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png" className="w-28 h-28 rounded-full border-4 border-blue-800 mx-8 " alt="userlogo" />
            <button className="px-14 py-3 mx-5 rounded-2xl bg-slate-900 text-white font-bold">Follow</button>
        </div>
        </div>
        <div className="bg-white mt-10 py-4 px-11">
            <p className="font-extrabold text-2xl">{user?.name} <span>{user.isVerified? <VerifiedIcon style={{ color: "blue" }} />:<ErrorIcon style={{ color: "red" }} />}</span></p>
            <p className="font-semibold text-sm text-gray-500">@{user.username}</p>
            <p className="mt-6" >{user.desc || "No Bio"}</p>
            <p className="flex mt-3"><span className="text-gray-700"> <span className="font-extrabold">{user.followings?.length}</span>  Followings</span> <span className="mx-4 text-gray-700"> <span className="font-extrabold">{user.followers?.length}</span>  Followers</span></p>
        </div>
        </div>

    </div>
  );
};
