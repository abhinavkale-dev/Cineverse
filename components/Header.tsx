"use client"

import { TMDBSearchResult } from '@/types/tmdb'
import Link from 'next/link'

interface HeaderProps {
  data: TMDBSearchResult[]
}

const Header = ({ data }: HeaderProps) => {
  if (!data || data.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * data.length);
  const item = data[randomIndex];

  return (
    <div className="w-full h-[60vh] relative">
      <div 
        style={{ 
          backgroundImage: `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.7),rgba(0,0,0,.9)), url(https://image.tmdb.org/t/p/original${item?.backdrop_path || item?.poster_path})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}  
        className="w-full h-full relative"
      >
        <div className="absolute bottom-[10%] left-8 flex flex-col gap-2 max-w-[800px]">
          <h1 className="lg:text-4xl text-2xl font-bold text-white">{item?.title || item?.name}</h1> 
          <p className="text-white lg:text-base text-sm opacity-80 line-clamp-2">
            {item?.overview}
          </p>

          <p className="text-white flex items-center gap-4 opacity-80 text-sm"> 
            <span className="flex items-center gap-2">
              <i className="text-yellow-300 ri-megaphone-fill"></i>
              {item?.release_date || item?.first_air_date || "No Information"}
            </span>
            <span className="flex items-center gap-2">
              <i className="text-yellow-300 ri-album-fill"></i>
              {item?.media_type?.toUpperCase()}
            </span>
          </p>
          <Link 
            href={`https://www.themoviedb.org/${item?.media_type}/${item?.id}`}
            target="_blank"
            className="bg-[#6556CD] hover:bg-[#4c3fc9] transition-all duration-300 text-white py-2 px-4 rounded-md w-fit flex items-center gap-2 mt-2 text-sm"
          >
            <i className="ri-play-circle-fill text-xl"></i>
            Find More
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header