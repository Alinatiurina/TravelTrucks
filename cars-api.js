import axios from "axios";

const url = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers';

export const GetCars = async () => {
  const response = await axios.get(url);
  console.log(response.data)
    return response.data;
}

// export const getCarById = async (carssId) => {
//   const urlById = `https://api.themoviedb.org/3/movie/${moviesId}?language=en-US`;
//     const response = await axios.get(urlById);
//     return response.data;
//   }

// export const getCarCastById = async (carsId) => {
//   const urlById = `https://api.themoviedb.org/3/movie/${moviesId}/credits?language=en-US`;
//     const response = await axios.get(urlById);
//     return response.data.cast;
// }
  
// export const getCarReviewById = async (carsId) => {
//   const urlById = `https://api.themoviedb.org/3/movie/${moviesId}/reviews?language=en-US&page=1`;
//     const response = await axios.get(urlById);
//     return response.data.results;
// }
// export const getCarByQwery = async (searchQuery, currentPage) => {
//   const urlByQwery = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=${currentPage}`;
//     const response = await axios.get(urlByQwery);
//     return response.data.results;
// }