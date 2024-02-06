'use client'
import MovieCard from '@/components/MovieCard';
import TopSpace from '@/components/TopSpace';
import { fetchDataFromApi } from '@/utils/api'
import { StarIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useEffect, useState } from 'react'

const Detail = ({ params }) => {
  const [movie, setMoviedetails] = useState();
  const [credits, setCredits] = useState();
  const [videos, setVideos] = useState();
  const [recommendations, setRecommendations] = useState();
  const { id } = params

  useEffect(() => {
    fetchMovieDetails()
    fetchTvDetails()
    fetchTvCredits()
    fetchMovieCredits()
    fetchTvVideos()
    fetchMovieVideos()
    fetchTvRecommendations()
    fetchMovieRecommendations()
  }, [])

  const fetchTvRecommendations = () => {
    if (id.includes("tv")) {
      fetchDataFromApi(`/tv/${id}/recommendations`)
        .then((res) => (
          setRecommendations(res)
        ))
    }
  }
  const fetchMovieRecommendations = () => {
    if (id.includes("movie")) {
      fetchDataFromApi(`/movie/${id}/recommendations`)
        .then((res) => (
          setRecommendations(res)
        ))
    }
  }

  const fetchTvVideos = () => {
    if (id.includes("tv")) {
      fetchDataFromApi(`/tv/${id}/videos`)
        .then((res) => (
          setVideos(res)
        ))
    }
  }
  const fetchMovieVideos = () => {
    if (id.includes("movie")) {
      fetchDataFromApi(`/movie/${id}/videos`)
        .then((res) => (
          setVideos(res)
        ))
    }
  }

  const fetchTvDetails = () => {
    if (id.includes("tv")) {
      fetchDataFromApi(`/tv/${id}`)
        .then((res) => {
          setMoviedetails(res)
        })
    }
  }
  const fetchMovieDetails = () => {
    if (id.includes("movie")) {
      fetchDataFromApi(`/movie/${id}`)
        .then((res) => {
          setMoviedetails(res)
        })
    }
  }

  const fetchTvCredits = () => {
    if (id.includes("tv")) {
      fetchDataFromApi(`/tv/${id}/credits`)
        .then((res) => {
          setCredits(res)
        })
    }
  }
  const fetchMovieCredits = () => {
    if (id.includes("movie")) {
      fetchDataFromApi(`/movie/${id}/credits`)
        .then((res) => {
          setCredits(res)
        })
    }
  }


  return (
    <div className='w-full relative overflow-auto pages bg-black'>
      <TopSpace />
      {movie && <Image className=' z-0 relative object-cover rounded-tl-3xl' alt='backdrop' src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} fill sizes={100} />}
      <div className="absolute z-0 w-full h-full gradient"></div>
      <div className=" flex h-full z-20 m-5">
        <div className='w-2/3'>
          {movie && <Image className='rounded-3xl sticky w-[24rem] top-[4.3rem]' src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt='poster' width={344} height={512} />}
        </div>
        <div className='z-30'>
          <div className='px-10 mt-6'>
            <div className='text-5xl font-bold'>
              {movie && movie.title || movie && movie.name}
            </div>
            <div className='my-5 flex text-[#918f90e2] text-lg gap-5 items-center'>
              <div className='flex gap-2 items-center'>
                <StarIcon width={18} color='#fcb900' height={18} />{movie && movie.vote_average.toFixed(1)}
              </div>
              <div className="flex">
                {movie && (movie.runtime ? `${movie.runtime}` : movie.episode_run_time ? `${movie.episode_run_time && movie.episode_run_time > 0 ? `${movie.episode_run_time}m` : ""}` : "")}
              </div>
              <div className="flex">
                {new Date(movie && movie.release_date || movie && movie.first_air_date).getFullYear()}
              </div>
              <div className="text-xs py-1 px-2 rounded-md bg-[#313036]">R</div>
            </div>
            <div className='flex text-[#918f90e2] gap-2'>
              {movie && movie.genres.map((genre, index) => (
                <p key={index}>{genre.name}</p>
              ))}
            </div>
              {movie && movie.number_of_seasons && <div className='flex gap-4 mt-4 text-[#918f90e2]'>
                <p>Seasons: <span className='text-white'>{movie.number_of_seasons}</span></p>
                <p>Episodes: <span className='text-white'>{movie.number_of_episodes}</span></p>
              </div>}

              {movie && movie.status && <div className='text-[#918f90e2] mt-4'>Status: <span className='text-white'>{movie.status}</span></div>}
            <div className='mt-5 text-lg text-[#fffffff3]'>
              {movie && movie.overview.slice(0, 350)}...
            </div>
            <div className='flex mt-6 text-lg'>
              <div className='w-1/4 text-[#918f90e2]'>Starring: </div>
              <div className='w-3/4 flex flex-wrap'>
                {credits && credits.cast.slice(0, 10).map((cast, index) => (
                  <p key={index}>{cast.name} ,</p>
                ))}
              </div>
            </div>
            <div className='flex mt-6 text-lg'>
              <div className='w-1/4 text-[#918f90e2]'>Production : </div>
              <div className='w-3/4 flex flex-wrap'>
                {movie && movie.production_companies.map((prod, index) => (
                  <p key={index}>{prod.name} ,</p>
                ))}
              </div>
            </div>
          </div>
          <div className='mt-8 px-4'>
            <div className='text-3xl my-5 font-bold'>
              Trailers & Clips
            </div>
            {videos && videos.results.length > 0 ? (
              <div className='flex gap-4 h-[12.2rem] overflow-auto'>
                {videos.results.slice(0, 6).map((video, index) => (
                  <iframe
                    key={index}
                    className="youtube-video inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${video.key}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ))}
              </div>
            ) : (
              <div className='text-3xl mx-72 text-red-700 my-20'>No Videos Available</div>
            )}
          </div>
        </div>
      </div>
      <div className='overflow-auto px-4'>
        <div className='text-4xl my-8 text-white'> You may also like</div>
        <div className='flex gap-5'>
          {recommendations && recommendations.results.map((recommendation) => (
            <MovieCard movie={recommendation} />
          ))}
        </div>
      </div>
      <TopSpace />
    </div>
  )
}

export default Detail