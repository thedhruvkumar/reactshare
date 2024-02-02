import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/users/userState";
import { usePostContext } from "../context/posts/posts";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import Tooltip from "@mui/material/Tooltip";
import PostMenu from "./PostMenu";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

export const Cards = ({ desc, userId, date, id, likes }) => {
  const UserState = useUserContext();
  const { getUser, realUser } = UserState;
  const PostState = usePostContext();
  const { deletePost, likePost } = PostState;
  const [user, setUser] = useState({});
  useEffect(() => {
    getUser(userId).then((data) => {
      setUser(data);
    });
  }, []);

  const handleLike = async (id) => {
    await likePost(id);
  };

  return (
    <div>
      {user && (
        <div className="p-0 my-4 border-b-2 w-full overflow-hidden rounded-lg shadow-lg">
          <div className=" w-[100%] lg:flex">
            <div className="bg-white rounded-lg p-4 flex flex-col justify-between leading-normal w-[100%]">
              <div className="flex items-center relative">
                <img
                  className="w-10 h-10 rounded-full mr-4"
                  src="/user.png"
                  alt="Avatar of Writer"
                />
                <div className="text-sm flex">
                  <Link
                    to={`/acc/${userId}`}
                    className="text-gray-900 leading-none font-semibold text-base"
                  >
                    {user.name}{" "}
                    {user.isVerified ? (
                      <Tooltip title="Verified User">
                        <VerifiedIcon style={{ color: "blue" }} />
                      </Tooltip>
                    ) : (
                      ""
                    )}{" "}
                    <span className="text-gray-500 text-sm font-light flex">
                      @{user.username}
                      <p className="text-gray-500 mx-2">• {format(date)}</p>
                    </span>{" "}
                  </Link>
                </div>
                <div className="absolute right-1 top-0">
                  <PostMenu id={id} delFunc={deletePost} />
                </div>
              </div>
              <div className="mt-4 p-3">
                <p className="text-gray-700 text-base">{desc}</p>
              </div>
              <span className="text-base text-gray-400 font-normal mt-2 px-3 py-1 border-t-2 ">
                {likes.length} People Liked
              </span>
              <div className=" flex justify-between items-center">
                <button
                  onClick={() => handleLike(id)}
                  className="font-semibold rounded-md p-3 hover:bg-blue-100 hover:text-blue-600"
                >
                  {likes.includes(realUser?.id) ? (
                    <ThumbUpIcon />
                  ) : (
                    <ThumbUpOffAltIcon />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
