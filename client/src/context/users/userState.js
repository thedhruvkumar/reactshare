import React, { useState } from "react";
import userContext from "./userContext";
import { useJwt } from "react-jwt";

const HOST = process.env.REACT_APP_HOST;

const UserState = (props) => {
  const { decodedToken, isExpired } = useJwt(
    localStorage.getItem("auth-token")
  );

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
      }}
    >
      {props.children}
    </userContext.Provider>
  );
};

export default UserState;
