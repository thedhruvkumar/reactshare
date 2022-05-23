import React, { useState } from "react";
import userContext from "./userContext";


const HOST = process.env.REACT_APP_HOST;

const UserState = (props) => {
  const [realUser, setrealUser] = useState({})
  const loadUser = async()=>{
    if(localStorage.getItem("auth-token")){

      const data = await fetch('http://localhost:5000/api/users/u' , {
        method:"POST",
        headers:{
          "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
        }
      })
      const res = await data.json();
      setrealUser(res)

    }
  }

  const getUser = async (id) => {
    const url = `${HOST}/api/users/${id}`;
    const data = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
    });

    const json = await data.json();
    return json;
  };


  const followUser = async (id) => {
    const url = `${HOST}/api/users/${id}/follow`;
    const data = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    const json = await data.json();
    return json;
  };
  const unfollowUser = async (id) => {
    const url = `${HOST}/api/users/${id}/unfollow`;
    const data = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    const json = await data.json();
    return json;
  };
  return (
    <userContext.Provider
      value={{
        getUser,
        followUser,
        unfollowUser,
        loadUser,
        realUser,
        setrealUser
      }}
    >
      {props.children}
    </userContext.Provider>
  );
};

export default UserState;
