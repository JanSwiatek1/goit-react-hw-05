import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchMoviesByQuery } from '../../services/moviesAPI';
import MovieList from '../../components/MovieList/MovieList';
import SearchForm from '../../components/SearchForm/SearchForm';
import Loader from '../../components/Loader/Loader';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  useEffect(() => {

    const getMovies = async () => {
      try {
        setLoading(true);
        const movies = await fetchMoviesByQuery(query);
        setMovies(movies);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [query]);

  const handleSubmit = searchQuery => {
    setSearchParams({ query: searchQuery });
  };

  return (
    <div>
      <SearchForm onSubmit={handleSubmit} />
      {loading && <Loader />}
      {error && <p>Error: {error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
      {movies.length === 0 && query && !loading && (
        <p>No movies found for "{query}"</p>
      )}
    </div>
  );
}