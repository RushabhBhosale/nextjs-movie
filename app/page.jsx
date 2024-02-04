'use client'
import { fetchDataFromApi } from "@/utils/api";
import { useEffect, useState } from "react";
import Carousel from "@/components/Carousel";
import CardList from "@/components/CardList";
import Image from "next/image";
import { PlayIcon } from "@heroicons/react/24/solid";

export default function Home() {

  const [tv, setTv] = useState();
  const [genre, setGenre] = useState();
  const [popularMovie, setPopularMovie] = useState();
  const [list, setList] = useState();
  const [list2, setList2] = useState();
  const [list3, setList3] = useState();
  const [list4, setList4] = useState();
  const [kage, setKage] = useState();

  useEffect(() => {
    fetchTopTv()
    fetchTvGenres()
    fetchPopularMovie()
    fetchList2()
    fetchList3()
    fetchList4()
    fetchList()
    fetchKage()
  }, [])

  const fetchList = async () => {
    fetchDataFromApi('/list/8289873')
      .then((res) => {
        setList2(res);
      })
  };

  const fetchList2 = async () => {
    fetchDataFromApi('/list/8289851')
      .then((res) => {
        setList(res);
      })
  };

  const fetchList3 = async () => {
    fetchDataFromApi('/list/8289875')
      .then((res) => {
        setList3(res);
      })
  };

  const fetchList4 = async () => {
    fetchDataFromApi('/list/8289877')
      .then((res) => {
        setList4(res);
      })
  };

  const fetchTopTv = async () => {
    fetchDataFromApi('/tv/top_rated')
      .then((res) => (
        setTv(res)
      ))
  };

  const fetchTvGenres = async () => {
    fetchDataFromApi('/genre/tv/list')
      .then((res) => (
        setGenre(res)
      ))
  };

  const getGenreById = (genreId) => {
    if (genre && genre.genres) {
      for (let i = 0; i < genre.genres.length; i++) {
        const id = genre.genres[i].id;
        const name = genre.genres[i].name;

        if (id == genreId) {
          return name
        }
      }
    }
  };

  const fetchPopularMovie = async () => {
    fetchDataFromApi('/movie/popular')
      .then((res) => (
        setPopularMovie(res)
      ))
  };

  const fetchKage = async () => {
    fetchDataFromApi('/tv/119495')
      .then((res) => (
        setKage(res)
      ))
  };

  return (

      <div className=" h-[38rem] p-6 overflow-auto">
        {tv && list && <Carousel tv={list} getGenreById={getGenreById} />}

        <p className="text-2xl my-4 mt-6 font-bold">Popular Movie</p>
        {popularMovie && <CardList popularMovie={popularMovie} />}

        <p className="text-2xl my-4 mt-6 font-bold">Top Rated Tv Series</p>
        {popularMovie && <CardList popularMovie={tv} />}

        {kage &&
          <>
            <div className="relative w-full my-10 h-[30rem]">
              <Image fill alt="kage" sizes={100} className="object-cover" src={`https://image.tmdb.org/t/p/original/${kage.backdrop_path}`} />
              <div className="absolute z-20 w-full h-full bg-black opacity-60"></div>
              <div className="absolute z-30 w-full h-full flex flex-col justify-center px-16">
                <h3 className="text-4xl text-white font-bold">{kage.name}</h3>
                <div className="flex gap-6">
                  <p className=" text-gray-200 text-lg font-bold my-4">{new Date(kage.first_air_date).getFullYear()}</p>
                  <p className=" text-white text-sm font-bold my-4 px-2 py-1 rounded-sm bg-[#313036e7] bg-opacity-85">{(kage.vote_average).toFixed(1)}</p>
                </div>

                <div className="w-2/4">
                  {kage.overview.slice(0, 200)}...
                </div>
                <div className="my-7 flex gap-3 w-40 rounded-md bg-red-700 hover:bg-red-800 px-4 py-2">
                  <PlayIcon width={20} />
                  <button className=" font-medium">Watch Now</button>
                </div>
              </div>
            </div>
          </>
        }

        <p className="text-2xl my-4 mt-6 font-bold">Bollywood</p>
        {popularMovie && <CardList popularMovie={list2} />}

        <p className="text-2xl my-4 mt-6 font-bold">Korean</p>
        {popularMovie && <CardList popularMovie={list3} />}

        <p className="text-2xl my-4 mt-6 font-bold">Japanese</p>
        {popularMovie && <CardList popularMovie={list4} />}

      </div>
  );
}
