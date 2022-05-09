import React from "react";
import authContext from "./authContext";

const HOST = "http://localhost:5000";

const AuthState = (props) => {
  const createUser = async (name, username, email, password) => {
    const url = `${HOST}/api/auth/register/`;
    const bodyData = {
      name: name,
      username: username, 
      email: email,
      password: password,
      isAdmin:false
    };
    const data = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyData),
    });
    const json = await data.json();
    return json;
  };

  const fetchAllUsers =async()=>{
    const url = `${HOST}/api/users/fetch/all`;
    const data = await fetch(url);
    const resJson = await data.json();

    return resJson;
  }

  return (
    <authContext.Provider value={{ createUser , fetchAllUsers }}>
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
