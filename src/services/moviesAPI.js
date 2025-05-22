import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYjQyZTBhZDExYmYyMzIxZjAwZDRjZDQwMjE1MWNhMiIsIm5iZiI6MTc0NzkxOTY2NS41NzcsInN1YiI6IjY4MmYyMzMxZDYwYjQwOTJjZDVlZDQ5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.noJPxLw_NZTCrAUN2vpV6RZ3trklJbakndDGgA4_KNY'; // Replace with your actual API key

const options = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
};

export const fetchTrendingMovies = async () => {
  const response = await axios.get(
    `${BASE_URL}/trending/movie/day?language=en-US`,
    options
  );
  return response.data.results;
};

export const fetchMoviesByQuery = async query => {
  const response = await axios.get(
    `${BASE_URL}/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    options
  );
  return response.data.results;
};

export const fetchMovieDetails = async movieId => {
  const response = await axios.get(
    `${BASE_URL}/movie/${movieId}?language=en-US`,
    options
  );
  return response.data;
};

export const fetchMovieCredits = async movieId => {
  const response = await axios.get(
    `${BASE_URL}/movie/${movieId}/credits?language=en-US`,
    options
  );
  return response.data.cast;
};

export const fetchMovieReviews = async movieId => {
  const response = await axios.get(
    `${BASE_URL}/movie/${movieId}/reviews?language=en-US&page=1`,
    options
  );
  return response.data.results;
};