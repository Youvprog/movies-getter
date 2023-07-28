import axios from 'axios';
import apiConfig from '../config/api-config';
import movieService from './movie.service';

const create = (baseURL = apiConfig.baseURL) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const api = axios.create({
    baseURL,
    headers,
  });
  return {
    ...movieService(api),
  };
};

const apiCalls = create();

export default apiCalls;
