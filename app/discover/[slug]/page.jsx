'use client'
import SearchList from '@/components/SearchList'
import TopSpace from '@/components/TopSpace'
import { fetchDataFromApi } from '@/utils/api'
import { useEffect, useState } from 'react'

const SearchResults = ({ params }) => {

    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const { slug } = params;
  
    useEffect(() => {
      fetchMovie();
    }, [slug, page]);
  
    const fetchMovie = () => {
      fetchDataFromApi(`/discover/movie?with_genres=${slug}&page=${page}`)
        .then((res) => {
          setMovies(prevMovies => page === 1 ? res.results : [...prevMovies, ...res.results]);
        })
        .catch((error) => {
          console.error('Error fetching movies:', error);
        });
    };
  
    const loadMore = () => {
      setPage(page + 1);
    };

  return (
    <div className='pages overflow-auto'>
      <TopSpace />
      <div className='flex flex-wrap justify-center overflow-auto'>
        <SearchList popularMovie={movies} />
        <button className=' bg-yellow-500 w-28 h-10 mt-1 rounded-lg text-black font-semibold' onClick={loadMore}>Load more</button>
      <TopSpace />

      </div>
    </div>
  )
}

export default SearchResults