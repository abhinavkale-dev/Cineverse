"use client"

import { ChangeEvent, useState, useEffect, useRef } from 'react'
import { Input } from '@/components/ui/input'
import axios from '@/utils/axios'
import Link from 'next/link'
import Image from 'next/image'
import { TMDBSearchResult, TMDBSearchResponse } from '@/types/tmdb'
import noimage from '@/public/noimage.jpeg'

interface TopbarProps {
  onMenuClick: () => void;
}

const Topbar = ({ onMenuClick }: TopbarProps) => {
    const [query, setQuery] = useState("")
    const searchRef = useRef<HTMLInputElement>(null)
    const [search, setSearch] = useState<TMDBSearchResult[] | null>([])


    const getSearch = async() => {
        if (!query.trim()) {
            setSearch([]); 
            return;
        }
        
        try {
           const { data } = await axios.get<TMDBSearchResponse>(`/search/multi?query=${query}&language=en-US`);
           setSearch(data.results);
        } catch (error) {
            console.error("Search error:", error);
            setSearch([]);
        }
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            getSearch();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [query])

    //Keyboard Shortcut
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey) {
                e.preventDefault()
                searchRef.current?.focus()
            }
        }

        document.addEventListener('keydown', handleKeyPress)
        return () => document.removeEventListener('keydown', handleKeyPress)
    }, [])
  return (
      <div className="w-full h-[10vh] flex items-center justify-center relative">
        <i onClick={onMenuClick} className="ri-menu-line text-2xl text-white absolute left-4 cursor-pointer lg:hidden hover:text-[#6556CD] transition-colors duration-300"></i>
        <div className="relative lg:w-[600px] w-[70%]">
          <div className="relative flex items-center">
            <i className="absolute lg:left-4 left-2.5 text-zinc-500 lg:text-lg text-sm ri-search-2-line"></i>
            <Input 
              ref={searchRef}
              className="w-full lg:text-sm text-xs lg:py-2 py-1 lg:pl-12 pl-8 lg:pr-12 pr-8 bg-black/50 border-zinc-800 focus:border-[#6556CD] rounded-md"
              value={query}
              onChange={(e:ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
              type="text"
              placeholder="Search... (or press /)"
            />
            {query.length > 0 && (
              <i 
                onClick={() => {
                  setQuery('');
                  setSearch([]);
                }}
                className="absolute lg:right-4 right-2.5 text-zinc-500 lg:text-lg text-sm ri-close-circle-fill cursor-pointer hover:text-zinc-300 duration-300"
              ></i>
            )}
          </div>
        </div>

        {query.trim() && search && search.length > 0 && (
          <div className="absolute w-full max-h-[70vh] top-full bg-[#1F1E24] mt-0 rounded-b-lg overflow-auto border-b-3 border-zinc-700 z-50">
            {search.map((s,i) => (
                <Link key={i} href="" className="text-zinc-400 font-semibold hover:text-white duration-300 hover:bg-zinc-800 w-full p-10 flex justify-start items-center border-b border-zinc-700 last:border-b-0">
                    <Image 
                        src={
                          s.backdrop_path || s.poster_path
                            ? `https://image.tmdb.org/t/p/w500/${s.backdrop_path || s.poster_path}`
                            : noimage.src
                        } 
                        alt={s.name || s.title || "No image available"} 
                        width={80} 
                        height={45} 
                        className="rounded object-cover mr-4 shadow-lg"
                    />
                    <span>{s.name || s.title || s.original_name || s.original_title}</span>
                </Link>
            ))}
          </div>
        )}
    </div>
  )
}

export default Topbar