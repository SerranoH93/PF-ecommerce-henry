import axios from 'axios';

const API_URL = 'http://localhost:3002/';

interface Filters {
  [key: string]: string | undefined;
}

export const getFilteredProducts = async (filters: Filters) => {
  // Filtra las claves vacías o undefined
  const filteredParams = Object.entries(filters)
    .filter(([key, value]) => value !== undefined && value !== null && value !== '') // Elimina entradas con valores vacíos, undefined o null
    .reduce((obj: Filters, [key, value]) => {
      if (value) {
        obj[key] = value;
      }
      return obj;
    }, {});

  const params = new URLSearchParams(filteredParams as Record<string, string>);
  const response = await axios.get(`${API_URL}filter?${params.toString()}`);
  return response.data;
};