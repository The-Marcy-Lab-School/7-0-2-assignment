/* 
This component is meant to display gifs. However, there are two different sets of gifs that this component can display, depending on the user's actions. At first, they will see trending gifs but after submitting a search term in the GifSearch form, they will see gifs related to their search.

useState — we create a piece of state for the fetched gifs. Depending on the user's actions, this state will either be trending gifs or searched gifs.

useEffect — we run the effect to fetch the gifs using the getTrendingGifs adapter and set the gifs state. If the searchTerm prop changes, we will run the effect  again, this time using the getGifsBySearch adapter.
*/

import { useEffect, useState } from 'react';
import { getGifsBySearch, getTrendingGifs } from '../adapters/giphyAdapters';

const GifContainer = ({ searchTerm }) => {
    const [gifs, setGifs] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGifs = async () => {
            const [data, error] = searchTerm ? await getGifsBySearch(searchTerm) : await getTrendingGifs();
            if (error) setError(error);
            if (data) setGifs(data);
        }
        fetchGifs();
    }, [searchTerm]);

    console.log('searchTerm: ', searchTerm, 'gifs', gifs)

    return (
        <ul>
            {
                gifs.map((gif) => (
                    <li key={gif.id}>
                        <img src={gif.images.original.url} alt={gif.alt_text} />
                    </li>
                ))
            }
        </ul>
    )
}

export default GifContainer
