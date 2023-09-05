import React from 'react'
import {BsSearch} from "react-icons/bs"
export const GlobalFilter = ({filter, setFilter}) => {
  return (
        <label className="flex gap-2 items-center justify-end mb-4">
        <BsSearch className=""/>
        <input className="text-sm border-b-2 border-gray-400 outline-none opacity-50 focus:border-[#FFA557]" value={filter || ''} onChange={(e) => setFilter(e.target.value)}/>
    </label>
  )
}
