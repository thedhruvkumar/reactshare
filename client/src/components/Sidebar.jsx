import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useJwt } from "react-jwt";
import {useNavigate} from "react-router-dom";

export const Sidebar = () => {
    const { decodedToken } = useJwt(localStorage.getItem("auth-token"));
    const navigate = useNavigate();


  return (
    <div className="sidebar">
      <div className="header text-2xl p-4">
        <span className="text-center dark:text-white">ReactShare</span>
      </div>
      <div className="mt-6">
        <ul className="space-y-6 px-3 py-2">
          <li>
            <Link to={"/"} className="side-nav-btn">
              <FontAwesomeIcon icon="fas fa-home" />{" "}
              <span className="mx-5">Home</span>
            </Link>
          </li>
          <li>
            <Link to={`acc/${decodedToken?.user?.id}`} className="side-nav-btn">
              <FontAwesomeIcon icon="fas fa-user-circle" />{" "}
              <span className="mx-5">Account</span>
            </Link>
          </li>
          <li>
            <Link to={"sett"} className="side-nav-btn">
              <FontAwesomeIcon icon="fas fa-cog" />{" "}
              <span className="mx-5">Settings</span>
            </Link>
          </li>
          <li>
            <button
              className="side-nav-btn w-full"
              onClick={() => {
                localStorage.removeItem("auth-token");
                setTimeout(() => {
                  navigate("/login");
                }, 1000);
              }}
            >
              <FontAwesomeIcon icon="fas fa-sign-out" />{" "}
              <span className="mx-5">Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};