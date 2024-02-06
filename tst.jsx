import TopSpace from '@/components/TopSpace';
import { fetchDataFromApi } from '@/utils/api';
import { useEffect, useState } from 'react';

const SearchResults = ({ params }) => {
  const { slug } = params;

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchMovies();
  }, [slug]);

  const fetchMovies = () => {
    fetchDataFromApi(`/discover/movie?with_genres=${slug}&page=${page}`)
      .then((res) => {
        // If it's page 1, replace existing data with new data
        // If it's a subsequent page, append new data to existing data
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
    <div>
      <TopSpace />
      <h2>Movies in the genre: {slug}</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
      <button onClick={loadMore}>Load More</button>
    </div>
  );
};

export default SearchResults;
