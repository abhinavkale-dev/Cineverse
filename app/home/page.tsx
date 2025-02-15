"use client"

import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import { TMDBSearchResponse } from '@/types/tmdb'
import axios from '@/utils/axios'
import React, { useEffect, useState } from 'react'

const Home = () => {
  const [wallpaper, setWallpaper] = useState<TMDBSearchResponse['results']>([])

  const getHeaderWallpaper = async() => { 

    try {
       const { data } = await axios.get<TMDBSearchResponse>(`/trending/all/day?language=en-US`);
       let randomData = data.results[Math.floor(Math.random() * data.results.length)]
       setWallpaper([randomData])
    } catch (error) {
        console.log("Search error:", error);
    } 
  } 

  useEffect(() => {
    if (wallpaper.length === 0) {
      getHeaderWallpaper()
    }
  }, [])
    return wallpaper ? (
    <div className="flex h-screen w-full">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <Header data={wallpaper}/>
      </div>
    </div>
  ) : <h1>Loader</h1>
}

export default Home