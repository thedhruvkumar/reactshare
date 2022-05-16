import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import userContext from "../context/users/userContext";
import postContext from "../context/posts/postContext";
import VerifiedIcon from '@mui/icons-material/Verified';
import ErrorIcon from '@mui/icons-material/Error';
import Tooltip from "@mui/material/Tooltip";
import { Cards } from "./Cards";
export const Profile = () => {
  const { userId } = useParams();
  const UserState = useContext(userContext);
  const PostState = useContext(postContext);
  const { getUser } = UserState;
  const { getTimeline } = PostState;
  const [user, setUser] = useState({});
  const [userPost, setUserPost] = useState([])

  useEffect(() => {
    getUser(userId).then((data) => {
      setUser(data);
      
    });
    getTimeline().then((data)=>{
      const profilePost = data.filter((post)=>post.userId === userId)
      setUserPost(profilePost)
    })
  }, []);


  return (
    <div className="px-32 h-screen ">
        <div className="h-full w-full bg-white shadow-xl">
        <div className="relative">
        <div className="banner w-full h-80">
            <img src="https://timelinecovers.pro/facebook-cover/download/lush-green-grass-mountains-at-kosovo-facebook-cover.jpg" className="w-full h-full" alt="coverimage" />
        </div>
        <div className="logo flex justify-between items-center bg-transparent w-full absolute -bottom-12">
            <img src="/user.png" className="w-28 h-28 rounded-full border-4 border-blue-800 mx-8 " alt="userlogo" />
            <button className="px-14 py-3 mx-5 rounded-2xl bg-slate-900 text-white font-bold">Follow</button>
        </div>
        </div>
        <div className="bg-white mt-10 py-4 px-11 border-b-2">
            <p className="font-extrabold text-2xl">{user?.name} <span>{user.isVerified? <Tooltip title="Verified User"><VerifiedIcon style={{ color: "blue" }} /></Tooltip>:<ErrorIcon style={{ color: "red" }} />}</span></p>
            <p className="font-semibold text-sm text-gray-500">@{user.username}</p>
            <p className="mt-6" >{user.desc || "No Bio"}</p>
            <p className="flex mt-3"><span className="text-gray-700"> <span className="font-extrabold">{user.followings?.length}</span>  Followings</span> <span className="mx-4 text-gray-700"> <span className="font-extrabold">{user.followers?.length}</span>  Followers</span></p>
        </div>

        <div className="mt-5">
          {userPost && userPost.map((item)=>{
          return <div key={item._id}><Cards id={item._id} desc={item.desc} userId={item.userId} likes={item.likes} date={item.createdAt}/>
          </div>
          })}
        </div>
        </div>

    </div>
  );
};
