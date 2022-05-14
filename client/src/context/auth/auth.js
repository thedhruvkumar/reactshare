import React,{useState,useEffect} from "react";
import authContext from "./authContext";

const HOST = "http://localhost:5000";

const AuthState = (props) => {
  const [login, setLogin] = useState(false)


  useEffect(() => {
    if(localStorage.getItem('auth-token')){
      setLogin(true);

    }else{
      setLogin(false)
    }
  }, [])
  

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

  const authenticateUser = async (email,password) =>{
    const url = `${HOST}/api/auth/login/`;
    const data = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email,password}),
    });
    const json = await data.json();
    return json;
  }

  const deleteUser = async(userid)=>{
    const url = `${HOST}/api/users/${userid}`;
    const data = await fetch(url, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('auth-token')
      },
      
    });
    const json = await data.json();
    return json;
  }

  return (
    <authContext.Provider value={{ createUser , fetchAllUsers , authenticateUser ,deleteUser , login}}>
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
