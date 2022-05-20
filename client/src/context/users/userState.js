import React,{useState} from "react";
import userContext from "./userContext";
import { useJwt } from "react-jwt";

const HOST = process.env.REACT_APP_HOST;

const UserState = (props) => {
  const [currentUser, setCurrentUser] = useState({});
  const { decodedToken, isExpired } = useJwt(
    localStorage.getItem("auth-token")
  );

  const getUser = async(id)=>{
    const url = `${HOST}/api/users/${id}`;
    const data = await fetch(url,{
        method:'GET',
        headers:{'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('auth-token')}
    })

    const json = await data.json();
    return json;
  }

  const fetchCurrentUser = async()=>{
    const url = `${HOST}/api/users/${decodedToken.id}`;
    const data = await fetch(url,{
        method:'GET',
        headers:{'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('auth-token')}
    })
    const json = await data.json();
    setCurrentUser(json);
  }
  return (
    <userContext.Provider value={{ getUser , fetchCurrentUser , currentUser }}>
      {props.children}
    </userContext.Provider>
  );
};

export default UserState;
