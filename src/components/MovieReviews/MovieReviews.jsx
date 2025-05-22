import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../services/moviesAPI';
import Loader from '../Loader/Loader';
import styles from './MovieReviews.module.css';


export default function MovieReviews() {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [reviews, setReviews] = useState();


  useEffect(() => {
    const getMovieReviews = async () => {
      try {
        setLoading(true);
        const movieReviews = await fetchMovieReviews(movieId);
        setReviews(movieReviews);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getMovieReviews();
  }, [movieId]);

  return (
    <div className={styles.container}>
      {loading && <Loader />}
      {error && <p>Error: {error}</p>}

    {reviews.length>0 ? (
              <ul>
                  {reviews.map(review => (
                      <li key={review.id}>
                          <h4>Author: {review.author}</h4>
                          <p>{review.content}</p>
                      </li>
                  ))}
                  
                </ul>
        ) : (
                  <p>No revives</p>
      )}
    </div>
  );
}