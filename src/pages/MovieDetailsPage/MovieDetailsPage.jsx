import { useState, useEffect, useRef } from 'react';
import { useParams, Outlet, Link, useLocation } from 'react-router-dom';
import { fetchMovieDetails } from '../../services/moviesAPI';
import Loader from '../../components/Loader/Loader';
import css from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from || '/movies');

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setLoading(true);
        const movieDetails = await fetchMovieDetails(movieId);
        setMovie(movieDetails);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [movieId]);

  return (
    <div className={css.container}>
      <Link to={backLinkRef.current} className={css.backLink}>
        Go back
      </Link>

      {loading && <Loader />}
      {error && <p>Error: {error}</p>}

      {movie && (
        <>
          <div className={css.movieInfo}>
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width="300"
              />
            ) : (
              <div className={css.noImage}>No image</div>
            )}
            <div>
              <h2>
                {movie.title} ({new Date(movie.release_date).getFullYear()})
              </h2>
              <p>User Score: {Math.round(movie.vote_average * 10)}%</p>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
              <h3>Genres</h3>
              <p>{movie.genres.map(genre => genre.name).join(', ')}</p>
            </div>
          </div>

          <div className={css.additionalInfo}>
            <h3>Additional information</h3>
            <ul>
              <li>
                <Link to="cast">Cast</Link>
              </li>
              <li>
                <Link to="reviews">Reviews</Link>
              </li>
            </ul>
          </div>

          <Outlet />
        </>
      )}
    </div>
  );
}