import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useUserContext } from "../context/users/userState";

export const SearchResult = () => {
  const { query } = useParams();
  const UserState = useUserContext();
  const { getAllUsers } = UserState;
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getAllUsers().then((data) => {
      console.log(
        data.filter(
          (u) => u.name.startsWith(query) || u.username.startsWith(query)
        )
      );
      setUsers(
        data.filter(
          (u) =>
            u.name.startsWith(query) ||
            u.username.startsWith(query) ||
            u.name.endsWith(query) ||
            u.username.endsWith(query)
        )
      );
    });
  }, [query]);

  return (
    <>
      <div className="w-full p-6">
        <p className="text-xl">
          SearchResult for - <span className="text-xl font-bold">{query}</span>
        </p>
      </div>
      <div className="p-4">
        {users &&
          users.map((user) => {
            return (
              <div
                key={user._id}
                className="shadow-2xl rounded-2xl my-5 w-full p-4 bg-white dark:bg-gray-800"
              >
                <div className="flex flex-row items-start gap-4">
                  <img
                    src="/user.png"
                    className="w-28 h-28 rounded-lg"
                    alt="user.png"
                  />
                  <div className="h-28 w-full my-1 flex flex-col justify-between">
                    <div>
                      <p className="text-gray-800 dark:text-white text-xl font-medium">
                        {user.name}
                      </p>
                      <p className="text-gray-400 text-sm">@{user.username}</p>
                    </div>
                    <div className="rounded-lg bg-blue-100 dark:bg-white p-2 w-auto">
                      <div className="flex items-center justify-around text-sm text-gray-400 dark:text-black">
                        <p className="flex flex-col">
                          Followers
                          <span className="text-black dark:text-indigo-500 font-bold">
                            {user.followers.length}
                          </span>
                        </p>
                        <p className="flex flex-col">
                          Followings
                          <span className="text-black dark:text-indigo-500 font-bold">
                            {user.followings.length}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 mt-6">
                  <button
                    type="button"
                    className="w-1/2 px-4 py-2 text-base border rounded-lg text-grey-500 bg-white hover:bg-gray-200 "
                  >
                    Follow
                  </button>
                  <Link
                    to={`/acc/${user._id}`}
                    className="w-1/2 px-4 py-2 text-base text-center border rounded-lg text-white bg-indigo-500 hover:bg-indigo-700 "
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};
