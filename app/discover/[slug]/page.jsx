'use client'
import SearchList from '@/components/SearchList';
import TopSpace from '@/components/TopSpace';
import { fetchDataFromApi } from '@/utils/api';
import { useEffect, useState } from 'react';

const SearchResults = ({ params }) => {
  const [movies, setMovies] = useState([]);
  const [tv, setTv] = useState([]);
  const [page, setPage] = useState(1);
  const [displayMovies, setDisplayMovies] = useState(true);
  const { slug } = params;

  useEffect(() => {
    fetchMovie();
    fetchTv();
  }, [slug, page]);

  const fetchTv = () => {
    fetchDataFromApi(`/discover/tv?with_genres=${slug}&page=${page}&sort_by=vote_count.desc`)
      .then((res) => {
        setTv(prevTv => page === 1 ? res.results : [...prevTv, ...res.results]);
      })
      .catch((error) => {
        console.error('Error fetching TV shows:', error);
      });
  };

  const fetchMovie = () => {
    fetchDataFromApi(`/discover/movie?with_genres=${slug}&page=${page}&sort_by=vote_count.desc`)
      .then((res) => {
        setMovies(prevMovies => page === 1 ? res.results : [...prevMovies, ...res.results]);
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
      });
  };

  const loadPage = (pageNumber) => {
    setPage(pageNumber);
    setMovies([]);
    setTv([]);
  };

  return (
    <div className='pages overflow-auto'>
      <TopSpace />
      <div className='flex flex-wrap overflow-auto'>
        <div className='flex gap-2 mb-3'>
          <button
            className={`mt-5 ${displayMovies ? 'bg-yellow-500' : 'bg-transparent'} ms-5 py-2 px-2 bg-yellow-500 text-black min-w-20 text-xs rounded-lg font-extrabold`}
            onClick={() => setDisplayMovies(true)}
          >MOVIES</button>

          <button
            className={`mt-5 ${displayMovies ? 'bg-transparent' : 'bg-yellow-500'} py-2 px-2 bg-yellow-500 text-black min-w-20 text-xs rounded-lg font-extrabold`}
            onClick={() => setDisplayMovies(false)}
            disabled={tv.length === 0}
          >TV</button>
        </div>

        {displayMovies ? (
          <>
            <SearchList popularMovie={movies} />
          </>
        ) : (
          <>
            <SearchList popularMovie={tv} />
          </>
        )}
        <div className="flex h-10 mx-auto mt-5 mb-5">
          {[...Array(9).keys()].map((pageNumber) => (
            <button
              key={pageNumber}
              className={`mr-2 py-2 px-3 rounded-lg font-semibold ${page === pageNumber + 1 ? 'bg-yellow-500' : ''}`}
              onClick={() => loadPage(pageNumber + 1)}
            >
              {pageNumber + 1}
            </button>
          ))}
          <TopSpace/>
        </div>
        <TopSpace/>
      </div>
    </div >
  );
};

export default SearchResults;
