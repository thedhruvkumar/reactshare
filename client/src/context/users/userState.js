import React from "react";
import userContext from "./userContext";

const HOST = process.env.REACT_APP_HOST;

const UserState = (props) => {
  const getUser = async(username)=>{
    const url = `${HOST}/api/users/${username}`;
    const data = await fetch(url,{
        method:'GET',
        headers:{'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('auth-token')}
    })

    const json = await data.json();
    return json;
  }
  return (
    <userContext.Provider value={{ getUser }}>
      {props.children}
    </userContext.Provider>
  );
};

export default UserState;
