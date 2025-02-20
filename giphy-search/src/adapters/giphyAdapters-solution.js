/* 
An adapter is a helper function for sending a request to specific endpoint. Here, we have one adapter for fetching from the /trending endpoint and another for fetching from the /search endpoint. 
*/
import { API_KEY } from '../../config.js'
import { handleFetch } from './handleFetch.js'

const baseUrl = 'https://api.giphy.com/v1/gifs'
const baseUrlBroken = 'https://foo.bar.api';

export const getTrendingGifs = async () => {
  const [data, error] = await handleFetch(baseUrl + `/trending?rating=g&api_key=${API_KEY}`);
  if (error) return [data, error];

  const gifs = data.data.slice(0, 3)
  return [gifs, error];
}

export const getGifsBySearch = async (term) => {
  const [data, error] = await handleFetch(baseUrl + `/search?rating=g&api_key=${API_KEY}&q=${term}`);
  if (error) return [data, error];

  const gifs = data.data.slice(0, 3)
  return [gifs, error];
}