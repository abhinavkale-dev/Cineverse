"use client"

import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import TrendingCard from '@/components/TrendingCard'
import { TMDBSearchResponse } from '@/types/tmdb'
import axios from '@/utils/axios'
import { useEffect, useState } from 'react'

const Home = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [wallpaper, setWallpaper] = useState<TMDBSearchResponse['results']>([])
  const [trending, setTrending] = useState<TMDBSearchResponse['results']>([])

  const getHeaderWallpaper = async() => { 
    try {
      const { data } = await axios.get<TMDBSearchResponse>(`/trending/all/day?language=en-US`);
      setWallpaper(data.results.slice(0, 5));
    } catch (error) {
      console.log("Wallpaper error:", error);
    } 
  }

  const getTrending = async() => {
    try {
      const { data } = await axios.get<TMDBSearchResponse>(`/trending/all/week?language=en-US`);
      setTrending(data.results);
    } catch (error) {
      console.log("Trending error:", error);
    }
  }

  useEffect(() => {
    getHeaderWallpaper()
    getTrending()
  }, [])

  if (wallpaper.length === 0 || trending.length === 0) {
    return <div className="w-full h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
    </div>
  }

  return (
    <div className="flex h-screen w-full">
      <Sidebar isOpen={mobileMenuOpen} setIsOpen={setMobileMenuOpen} />
      <div className="flex-1 flex flex-col overflow-x-hidden">
        <Topbar onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)} />
        <main className="flex-1 overflow-y-auto">
          <Header data={wallpaper}/>
          
          <section className="px-3 py-6 md:px-4 md:py-8 lg:px-8">
            <h2 className="text-white text-xl font-semibold mb-4 flex items-center gap-2">
              <i className="ri-funds-line text-[#6556CD]"></i>
              Trending This Week
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
              {trending.map((item) => (
                <TrendingCard key={item.id} data={item} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default Home