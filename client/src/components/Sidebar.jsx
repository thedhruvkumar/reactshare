import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useJwt } from "react-jwt";
import { Navigate , useNavigate } from 'react-router-dom'

export const Sidebar = ({isOpen,setOpen}) => {
  const { decodedToken } = useJwt(localStorage.getItem("auth-token"));
  const user = localStorage.getItem('auth-token')
  const navigate = useNavigate();
  const mobclick = () =>{
    if(window.innerWidth <=1024){
      setOpen(false)
    }
  }
 
 

  return (
    <>
    {!user && ( <Navigate to={'/login'} replace={true}/>)}
    <div className={`sidebar ${isOpen ? 'lg:w-1/5 left-0 w-full' : 'lg:w-1/12 -left-96 lg:left-0 lg:block'}`}>
      <div className={`header text-2xl p-4 flex ${isOpen?"justify-between":"justify-center"} items-center`}>
            {isOpen && <span className='text-center dark:text-white'>ReactShare</span>}
            <button className='transition-all duration-500 text-center' onClick={()=> setOpen(!isOpen)}><FontAwesomeIcon icon="fas fa-bars" /></button>
        </div>
      <div className="mt-6">
        <ul className="space-y-6 xl:px-3 xl:py-2 p-1">
          <li>
            <NavLink
            onClick={mobclick}
              to={"/"}
              className="side-nav-btn"
              style={({ isActive }) =>
                isActive
                  ? { color: "#1d4ed8", backgroundColor: "#bfdbfe" }
                  : undefined
              }
            >
              <FontAwesomeIcon icon="fas fa-home" />{" "}
              {isOpen &&<span className='mx-5'>Home</span>}
            </NavLink>
          </li>
          <li>
            <NavLink
            onClick={mobclick}
              to={`acc/${decodedToken?.user?.id}`}
              className="side-nav-btn"
              style={({ isActive }) =>
                isActive
                  ? { color: "#1d4ed8", backgroundColor: "#bfdbfe" }
                  : undefined
              }
            >
              <FontAwesomeIcon icon="fas fa-user-circle" />{" "}
              {isOpen &&<span className='mx-5'>Account</span>}
            </NavLink>
          </li>
          <li>
            <NavLink
            onClick={mobclick}
              to={"/sett"}
              className="side-nav-btn"
              style={({ isActive }) =>
                isActive
                  ? { color: "#1d4ed8", backgroundColor: "#bfdbfe" }
                  : undefined
              }
            >
              <FontAwesomeIcon icon="fas fa-cog" />{" "}
              {isOpen &&<span className='mx-5'>Settings</span>}
            </NavLink>
          </li>
          <li>
            <button
              className="side-nav-btn w-full"
              onClick={() => {
                localStorage.removeItem("auth-token");
                navigate("/login")
                
              }}
            >
              <FontAwesomeIcon icon="fas fa-sign-out" />{" "}
              {isOpen &&<span className='mx-5'>Logout</span>}
            </button>
          </li>
        </ul>
      </div>
    </div>
  </>
  );
};
