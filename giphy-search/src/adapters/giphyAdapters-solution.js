/* 
An adapter is a helper function for sending a request to specific endpoint. Here, we have one adapter for fetching from the /trending endpoint and another for fetching from the /search endpoint. 
*/
import { API_KEY } from '../../config.js'
import { handleFetch } from './handleFetch.js'

const baseUrl = 'https://api.giphy.com/v1/gifs'

export const getTrendingGifs = async () => {
  const [data, error] = await handleFetch(baseUrl + `/trending?limit=3&rating=g&api_key=${API_KEY}`);
  return [data.data, error];
}

export const getGifsBySearch = async (term) => {
  const [data, error] = await handleFetch(baseUrl + `/search?limit=3&rating=g&api_key=${API_KEY}&q=${term}`);
  return [data.data, error];
}