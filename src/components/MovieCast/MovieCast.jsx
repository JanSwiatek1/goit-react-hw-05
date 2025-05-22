import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCredits } from '../../services/moviesAPI';
import Loader from '../Loader/Loader';
import css from './MovieCast.module.css';

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovieCredits = async () => {
      try {
        setLoading(true);
        const credits = await fetchMovieCredits(movieId);
        setCast(credits);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getMovieCredits();
  }, [movieId]);

  return (
    <div className={css.castContainer}>
      {loading && <Loader />}
      {error && <p>Error: {error}</p>}
      {cast.length > 0 ? (
        <ul className={css.castList}>
          {cast.map(actor => (
            <li key={actor.id} className={css.castItem}>
              {actor.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={actor.name}
                  width="100"
                />
              ) : (
                <div className={css.noImage}>No photo</div>
              )}
              <p>{actor.name}</p>
              <p>Character: {actor.character}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No cast information available</p>
      )}
    </div>
  );
}