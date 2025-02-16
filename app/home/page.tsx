"use client"

import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import { TMDBSearchResponse } from '@/types/tmdb'
import axios from '@/utils/axios'
import { useEffect, useState } from 'react'

const Home = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [wallpaper, setWallpaper] = useState<TMDBSearchResponse['results']>([])

  const getHeaderWallpaper = async() => { 
    try {
      const { data } = await axios.get<TMDBSearchResponse>(`/trending/all/day?language=en-US`);

      setWallpaper(data.results.slice(0, 5));
    } catch (error) {
      console.log("Search error:", error);
    } 
  }

  useEffect(() => {
    getHeaderWallpaper()
  }, [])
    return wallpaper.length > 0 ? (
    <div className="flex h-screen w-full">
      <Sidebar isOpen={mobileMenuOpen} setIsOpen={setMobileMenuOpen} />
      <div className="flex-1 flex flex-col">
        <Topbar onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)} />
        <Header data={wallpaper}/>
      </div>
    </div>
  ) : <h1>Loader</h1>
}

export default Home