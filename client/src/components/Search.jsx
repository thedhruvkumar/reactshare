import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export const Search = ({isOpen}) => {
  return (
    <div className='w-full h-auto relative top-0 bg-white overflow-auto flex justify-center items-center p-5 '>
        <div className={` ${isOpen ? 'w-3/5':'w-9/12'} h-14  relative shadow-2xl `}>
            <input type="text" placeholder='Search Something ....' className='w-full h-full outline-none px-5 py-3 text-lg pr-20 border-[1px] border-gray-100 shadow-lg focus:shadow-blue-200 focus:border-blue-500 transition-colors duration-300 valid:border-blue-500 valid:shadow-blue-200'/>
            <button className='absolute top-2 bottom-2 right-2 border-l-2 px-4 py-2 text-lg text-black z-10'><FontAwesomeIcon icon="fas fa-search" /></button>
        </div>
    </div>
  )
}
