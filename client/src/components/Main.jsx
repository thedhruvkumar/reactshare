import React from 'react'
import { Outlet } from 'react-router-dom'

export const Main = () => {
  return (
    <div>
        <div className="h-screen w-4/5 overflow-auto bg-gray-200 fixed right-0 top-0">
        <Outlet/>
      </div>
    </div>
  )
}
