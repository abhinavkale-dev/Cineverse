"use client"

import { ChangeEvent, useState, useEffect, useRef } from 'react'
import { Input } from './ui/input'
import axios from '@/utils/axios'
import Link from 'next/link'
import Image from 'next/image'
import { TMDBSearchResult, TMDBSearchResponse } from '@/types/tmdb'
import noimage from '@/public/noimage.jpeg'

const Topbar = () => {
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
      <div className="w-full h-[10vh] flex items-center relative">
        <div className="flex items-center w-[50%] relative ml-[20%]">
          <Input 
            ref={searchRef}
            className="w-full text-2xl py-3 pl-12 pr-10"
            value={query}
            onChange={(e:ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
            type="text"
            placeholder="Search... (or press /)"
          />
          <i className="absolute left-3 text-zinc-400 text-2xl ri-search-2-line"></i>
          {query.length > 0 && (
            <i 
              onClick={() => {
                setQuery('');
                setSearch([]);
              }}
              className="absolute right-3 text-zinc-400 text-2xl ri-close-circle-fill cursor-pointer hover:text-zinc-200 duration-300"
            ></i>
          )}
        </div>

        {query.trim() && search && search.length > 0 && (
          <div className="absolute w-[50%] max-h-[70vh] top-full bg-[#1F1E24] ml-[20%] mt-2 rounded-lg overflow-auto border-b-3 border-zinc-700 z-50">
            {search.map((s,i) => (
                <Link key={i} href="" className="text-zinc-400 font-semibold hover:text-white duration-300 hover:bg-zinc-800 w-full p-10 flex justify-start items-center border-b border-zinc-700 last:border-b-0">
                    <Image 
                        src={
                          s.backdrop_path || s.poster_path ?
                          `https://image.tmdb.org/t/p/w500/${s.backdrop_path || s.poster_path}`
                          : noimage} 
                        alt={s.name || s.title || ""} 
                        width={130} 
                        height={110} 
                        className="rounded object-cover mr-3 shadow-lg"
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