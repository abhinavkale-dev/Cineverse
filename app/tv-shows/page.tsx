"use client"

import MediaCard from '@/components/MediaCard'
import { TMDBSearchResponse } from '@/types/tmdb'
import axios from '@/utils/axios'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useCallback, useState } from 'react'

const fetchShows = async ({ pageParam = 1 }) => {
  const { data } = await axios.get<TMDBSearchResponse>(
    `/discover/tv?language=en-US&page=${pageParam}`
  )

  data.results = data.results.map(show => ({
    ...show,
    media_type: 'tv'
  }))
  return data
}

const TVShows = () => {
  const router = useRouter()
  const observerRef = useRef<IntersectionObserver | null>(null)
  const lastShowRef = useRef<HTMLDivElement | null>(null)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error
  } = useInfiniteQuery({
    queryKey: ['tv-shows'],
    queryFn: fetchShows,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    initialPageParam: 1
  })

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  )

  useEffect(() => {
    if (lastShowRef.current) {
      observerRef.current = new IntersectionObserver(handleObserver, {
        threshold: 0.5,
      })
      observerRef.current.observe(lastShowRef.current)
    }
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [handleObserver, data])

  if (status === 'pending') {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="w-full h-screen flex items-center justify-center text-white">
        <p>Error: {error.message}</p>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center gap-4 mb-6">
        <button
          className="p-2 rounded-full text-white hover:text-white hover:bg-white/10 transition-colors"
          onClick={() => router.push('/home')}
        >
          <i className="ri-arrow-left-line text-xl"></i>
        </button>
        <h1 className="text-2xl font-bold text-white">TV Shows</h1>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {data?.pages.map((page) =>
          page.results.map((show, index) => {
            if (page.results.length === index + 1) {
              return (
                <div key={show.id} ref={lastShowRef}>
                  <MediaCard data={show} />
                </div>
              )
            }
            return <MediaCard key={show.id} data={show} />
          })
        )}
      </div>
      {isFetchingNextPage && (
        <div className="w-full flex items-center justify-center mt-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      )}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-white hover:bg-gray-200 text-black rounded-full transition-all duration-300 shadow-lg"
          aria-label="Scroll to top"
        >
          <i className="ri-arrow-up-line text-xl"></i>
        </button>
      )}
    </div>
  )
}

export default TVShows
