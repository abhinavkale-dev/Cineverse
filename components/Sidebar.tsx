import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
  return (
    <div className="w-[20%] h-full border-r-2 border-zinc-500 p-10 flex flex-col">
        <h1 className="text-2xl font-bold">
        <i className="text-[#6556CD] ri-tv-fill mr-2"></i>
        <span>
          Cineverse
        </span>
        </h1>

        <nav className="flex flex-col text-zinc-400 text-xl">
            <h1 className="text-white font-semibold text-xl mt-10 mb-5">Feed</h1>
            <Link className="hover:bg-[#6556CD] hover:text-white rounded-lg p-5 duration-300" href="">
            <i className="mr-2 ri-fire-fill"></i> Trending
            </Link>
            <Link className="hover:bg-[#6556CD] hover:text-white rounded-lg p-5 duration-300" href="">
            <i className="mr-2 ri-bard-fill"></i> Popular
            </Link>
            <Link className="hover:bg-[#6556CD] hover:text-white rounded-lg p-5 duration-300" href="">
            <i className="mr-2 ri-movie-2-fill"></i> Movies
            </Link>
            <Link className="hover:bg-[#6556CD] hover:text-white rounded-lg p-5 duration-300" href="">
            <i className="mr-2 ri-tv-2-fill"></i> TV Shows
            </Link>
        </nav>

        <hr className="border-none h-[1px] bg-zinc-400"/>
         
        <nav className="flex flex-col text-zinc-400 text-xl">
            <h1 className="text-white font-semibold text-xl mt-6 mb-5">Menu</h1>
            <Link className="hover:bg-[#6556CD] hover:text-white rounded-lg p-5 duration-300" href="">
            <i className="mr-2 ri-user-3-fill"></i> Profile
            </Link>
            <Link className="hover:bg-[#6556CD] hover:text-white rounded-lg p-5 duration-300" href="">
            <i className="mr-2 ri-information-fill"></i> About
            </Link>
        </nav>
    </div>
  )
}

export default Sidebar 