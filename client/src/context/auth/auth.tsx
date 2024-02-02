import React, { useState, useEffect , useContext , createContext } from "react";


export const AuthContext = createContext<unknown | undefined>(undefined);

// const HOST =  `https://determined-pleat-worm.cyclic.app`;
const HOST =  import.meta.env.VITE_APP_SERVER_HOST || `http://localhost:3001`;

const AuthProvider = ({ children }:{children :React.ReactNode}) => {
  const [login, setLogin] = useState(false);
  const token = localStorage.getItem("auth-token");
  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);

  const createUser = async (name : string, username : string, email : string, password : string) => {
    const url = `${HOST}/api/auth/register/`;
    const bodyData = {
      name: name,
      username: username,
      email: email,
      password: password,
      isAdmin: false,
    };
    const data = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });
    const json = await data.json();
    return json;
  };

  const fetchAllUsers = async () => {
    const url = `${HOST}/api/users/fetch/all`;
    const data = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "auth-token": `${token}`,
      },
    });
    const resJson = await data.json();
    return resJson;
  };

  const authenticateUser = async (email:string, password:string) => {
    const url = `${HOST}/api/auth/login`;
    const data = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    const json = await data.json();
    return json;
  };

  const deleteUser = async (userid:string) => {
    const url = `${HOST}/api/users/${userid}`;
    const data = await fetch(url, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "auth-token": `${token}`,
      },
    });
    const json = await data.json();
    return json;
  };

  return (
    <AuthContext.Provider
      value={{ createUser, fetchAllUsers, authenticateUser, deleteUser, login }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;


export function useAuth(){
  const auth = useContext(AuthContext);
  if(auth===undefined) throw new Error("AuthContext Undefined");

  return auth;
}