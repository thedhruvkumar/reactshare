import React from 'react'
import { Outlet , Navigate } from 'react-router-dom'
import { Search } from "./Search";

export const Main = ({isOpen}) => {
  const user = localStorage.getItem('auth-token')
  
  

  return (
    <div>
      {!user && ( <Navigate to={'/login'} replace={true}/>)}
        <div className={`h-screen overflow-auto fixed right-0 top-0 ${isOpen ? 'w-4/5':'w-11/12'}`}>
        <Search isOpen={isOpen} />
        <Outlet/>
      </div>
    </div>
  )
}
