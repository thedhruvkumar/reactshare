import React from 'react'
import { Outlet } from 'react-router-dom'
import { Search } from "./Search";

export const Main = ({isOpen}) => {
  return (
    <div>
        <div className={`h-screen overflow-auto fixed right-0 top-0 ${isOpen ? 'w-4/5':'w-11/12'}`}>
        <Search isOpen={isOpen} />
        <Outlet/>
      </div>
    </div>
  )
}
