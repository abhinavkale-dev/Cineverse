"use client"

import { TMDBSearchResult } from '@/types/tmdb'
import Image from 'next/image'
import Link from 'next/link'
import noimage from '@/public/noimage.jpeg'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface TrendingCardProps {
  data: TMDBSearchResult
}

const TrendingCard = ({ data }: TrendingCardProps) => {
  return (
    <Link 
      href={`https://www.themoviedb.org/${data.media_type}/${data.id}`}
      target="_blank" 
      className="block w-full"
    >
      <Card className="group border-0 bg-black/20 hover:bg-black/40 transition-colors duration-300 cursor-pointer">
        <CardContent className="p-3">
          <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden">
            <Image
              src={
                data.poster_path
                  ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
                  : noimage.src
              }
              alt={data.title || data.name || "No title"}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-2 right-2 bg-black/60 text-white text-xs py-1 px-2 rounded">
              {data.media_type?.toUpperCase()}
            </div>
          </div>
          <CardHeader className="p-0 pt-2 space-y-1">
            <CardTitle className="text-white font-medium text-sm line-clamp-1">
              {data.title || data.name}
            </CardTitle>
            <CardDescription className="flex items-center gap-2 text-xs text-zinc-400">
              <span className="flex items-center gap-1">
                <i className="ri-calendar-line"></i>
                {data.release_date?.split('-')[0] || data.first_air_date?.split('-')[0] || "N/A"}
              </span>
              <span className="flex items-center gap-1">
                <i className="ri-star-fill text-yellow-500"></i>
                {data.vote_average ? data.vote_average.toFixed(1) : "N/A"}
              </span>
            </CardDescription>
          </CardHeader>
        </CardContent>
      </Card>
    </Link>
  )
}

export default TrendingCard
