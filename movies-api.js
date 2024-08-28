import axios from "axios";

const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
const options = {
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YWM0MzU4NmVhZWMzMjk0YWJjNzk2ZTY2YTEyMTJkZCIsInN1YiI6IjY2Mjc3MDIyYjlhMGJkMDE3YWQ4NjZlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3VFAv-UdQSZtrNJMOVKF2mZEVvpi_qUOYWYhNzR0uPg'
  }
};

export const GetMovies = async () => {
    const response = await axios.get(url, options);
    return response.data.results;
}

export const getMovieById = async (moviesId) => {
  const urlById = `https://api.themoviedb.org/3/movie/${moviesId}?language=en-US`;
    const response = await axios.get(urlById, options);
    return response.data;
  }

export const getMovieCastById = async (moviesId) => {
  const urlById = `https://api.themoviedb.org/3/movie/${moviesId}/credits?language=en-US`;
    const response = await axios.get(urlById, options);
    return response.data.cast;
}
  
export const getMovieReviewById = async (moviesId) => {
  const urlById = `https://api.themoviedb.org/3/movie/${moviesId}/reviews?language=en-US&page=1`;
    const response = await axios.get(urlById, options);
    return response.data.results;
}
export const getMovieByQwery = async (searchQuery, currentPage) => {
  const urlByQwery = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=${currentPage}`;
    const response = await axios.get(urlByQwery, options);
    return response.data.results;
}