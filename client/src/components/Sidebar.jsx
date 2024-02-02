import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useJwt } from "react-jwt";
import { Navigate, useNavigate } from "react-router-dom";
import { Button, Flex } from "@radix-ui/themes";
import { FaHome } from "react-icons/fa";
import { RiAccountCircleFill } from "react-icons/ri";
import { IoExitSharp } from "react-icons/io5";

export const Sidebar = ({ isOpen, setOpen }) => {
  const { decodedToken } = useJwt(localStorage.getItem("auth-token"));
  const user = localStorage.getItem("auth-token");
  const navigate = useNavigate();
  const mobclick = () => {
    if (window.innerWidth <= 1024) {
      setOpen(false);
    }
  };

  return (
    <>
      {!user && <Navigate to={"/login"} replace={true} />}
      <div
        className={`sidebar ${
          isOpen
            ? "lg:w-1/5 left-0 w-full"
            : "lg:w-1/12 -left-96 lg:left-0 lg:block"
        }`}
      >
        <div
          className={`header text-2xl p-4 flex ${
            isOpen ? "justify-between" : "justify-center"
          } items-center`}
        >
          {isOpen && <span className="text-center">ReactShare</span>}
          <button
            className="transition-all duration-500 text-center"
            onClick={() => setOpen(!isOpen)}
          >
            <FontAwesomeIcon icon="fas fa-bars" />
          </button>
        </div>
        <div className="mt-6">
          <Flex
            direction="column"
            gap="8"
            style={{ padding: 15, margin: "50px 0" }}
          >
            <Button size="4" variant="solid">
              <FaHome />
              <NavLink onClick={mobclick} to={"/"}>
                {isOpen && <span className="mx-5">Home</span>}
              </NavLink>
            </Button>
            <Button color="green" size="4" variant="solid">
              <RiAccountCircleFill />
              <NavLink onClick={mobclick} to={`acc/${decodedToken?.user?.id}`}>
                {isOpen && <span className="mx-5">Account</span>}
              </NavLink>
            </Button>

            <Button
              size="4"
              variant="solid"
              color="red"
              onClick={() => {
                localStorage.removeItem("auth-token");
                navigate("/login");
              }}
            >
              <IoExitSharp />
              {isOpen && <span className="mx-5">Logout</span>}
            </Button>
          </Flex>
        </div>
      </div>
    </>
  );
};
