import { TMDBSearchResult } from '@/types/tmdb'
import Link from 'next/link'
import React from 'react'

interface HeaderProps {
  data: TMDBSearchResult[]
}

const Header = ({ data }: HeaderProps) => {
  
  if (!data || !data[0]) return null;

  return (
    <div 
      style={{ 
        backgroundImage: `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.7),rgba(0,0,0,.9)), url(https://image.tmdb.org/t/p/original${data[0]?.backdrop_path || data[0]?.poster_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}  
      className="w-full h-[50vh] relative"
    >
      <div className="absolute bottom-[10%] left-[6%] flex flex-col gap-4 max-w-[800px]">
        <h1 className="text-5xl font-bold text-white">{data[0]?.title || data[0]?.name}</h1> 
        <p className="text-white text-lg opacity-80">
           {data[0]?.overview?.length > 200 
            ? <>
                {data[0].overview.slice(0, 200)}...
                <Link className="text-blue-400 ml-2" href="">Show more</Link>
              </>
            : data[0]?.overview
          }
        </p>

        <p className="text-white flex items-center gap-6 opacity-80"> 
          <span className="flex items-center gap-2">
            <i className="text-yellow-300 ri-megaphone-fill"></i>
            {data[0]?.release_date || data[0]?.first_air_date || "No Information"}
          </span>
          <span className="flex items-center gap-2">
            <i className="text-yellow-300 ri-album-fill"></i>
            {data[0]?.media_type?.toUpperCase()}
          </span>
        </p>
        <Link 
          href="" 
          className="bg-[#6556CD] hover:bg-[#4c3fc9] transition-all duration-300 text-white py-3 px-6 rounded-lg w-fit flex items-center gap-2 mt-4"
        >
          <i className="ri-play-circle-fill text-xl"></i>
          Watch Trailer
        </Link>
      </div>
    </div> 
  )
}

export default Header