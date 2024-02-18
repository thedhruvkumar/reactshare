import React, { useState , createContext, useContext} from "react";
import { User } from "../../@types/interfaces/user";

const userContext = createContext<User | undefined | unknown>(undefined);


const HOST =  import.meta.env.VITE_APP_SERVER_HOST || `http://localhost:3001`;

const UserState = ({children}:{children:React.ReactNode}) => {
  const [realUser, setrealUser] = useState({});
  const loadUser = async () => {
    if (localStorage.getItem("auth-token")) {
      const data = await fetch(`${HOST}/api/users/u`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "auth-token":  `${localStorage.getItem("auth-token")}`,
        },
      });
      const res = await data.json();
      setrealUser(res);
    }
  };

  const getUser = async (id:string) => {
    const url = `${HOST}/api/users/${id}`;
    const data = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "auth-token": `${localStorage.getItem("auth-token")}`,
      },
    });

    const json = await data.json();
    return json;
  };
  const getAllUsers = async () => {
    const url = `${HOST}/api/users/fetch/all`;
    const data = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "auth-token": `${localStorage.getItem("auth-token")}`,
      },
    });

    const json = await data.json();
    return json;
  };

  const followUser = async (id:string) => {
    const url = `${HOST}/api/users/${id}/follow`;
    const data = await fetch(url, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "auth-token": `${localStorage.getItem("auth-token")}`,
      },
    });
    const json = await data.json();
    return json;
  };
  const unfollowUser = async (id:string) => {
    const url = `${HOST}/api/users/${id}/unfollow`;
    const data = await fetch(url, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "auth-token": `${localStorage.getItem("auth-token")}`,
      },
    });
    const json = await data.json();
    return json;
  };
  return (
    <userContext.Provider
      value={{
        getUser,
        getAllUsers,
        followUser,
        unfollowUser,
        loadUser,
        realUser,
        setrealUser,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserState;


export function useUserContext(){
  const UserState = useContext(userContext);
  if(UserState===undefined) throw new Error("PostContext Undefined");

  return UserState;
}