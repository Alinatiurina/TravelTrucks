import axios from "axios";

export const GetCars = async () => {
  const url = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers';
  const response = await axios.get(url);
    return response.data;
}

export const getCarById = async (carsId) => {
  const urlById = `https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers/${carsId}`;

    const response = await axios.get(urlById);
    return response.data;
}
