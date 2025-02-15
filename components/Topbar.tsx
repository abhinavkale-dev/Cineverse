"use client"

import { ChangeEvent, useState, useEffect, useRef } from 'react'
import { Input } from './ui/input'
import Link from 'next/link'
import Image from 'next/image'

const Topbar = () => {
    const [query, setQuery] = useState("")
    const searchRef = useRef<HTMLInputElement>(null)

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
              onClick={() => setQuery('')}
              className="absolute right-3 text-zinc-400 text-2xl ri-close-circle-fill cursor-pointer hover:text-zinc-200 duration-300"
            ></i>
          )}
        </div>

        <div className="absolute w-[50%] max-h-[50vh] top-full bg-zinc-300 ml-[20%] mt-2 rounded-lg overflow-auto">
          {/* <Link href="" className="text-zinc-800 font-semibold hover:text-black duration-300 hover:bg-zinc-300 w-full p-10 flex justify-start items-center">
            <Image src="" alt=""/>
            <span>Hello World</span>
          </Link> */}
        </div>
    </div>
  )
}

export default Topbar