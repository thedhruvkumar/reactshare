import React, { useEffect } from "react";
import { Cards } from "./Cards";
import { PostBox } from "./PostBox";
import {usePostContext} from "../context/posts/posts";

export const Feed = () => {
  const PostState = usePostContext();
  const { getTimeline, posts } = PostState;

  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      getTimeline();
    }
  }, []);

  return (
    <div className="bg-slate-100 w-full h-screen overflow-auto flex items-center flex-col lg:p-0 p-2">
      <div className="my-8">
        <div className="lg:w-[640px] w-full mb-16">
          <PostBox />
        </div>
        <div className="lg:w-[640px] w-full ">
          {!posts && <div>No posts to show</div>}
          {posts &&
            posts.map((item) => {
              return (
                <div key={item._id}>
                  <Cards
                    id={item._id}
                    desc={item.desc}
                    userId={item.userId}
                    likes={item.likes}
                    date={item.createdAt}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
