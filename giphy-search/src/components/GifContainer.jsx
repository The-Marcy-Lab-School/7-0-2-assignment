/* 
This component is meant to display gifs. However, there are two different sets of gifs that this component can display, depending on the user's actions. At first, they should see trending gifs but after submitting a search term in the GifSearch form, they should see gifs related to their search.

TODO:
- use the getTrendingGifs adapter to fetch trending gifs on the first render
- each time the user submits the form in GifSearch, use the getGifsBySearch adapter to fetch gifs according to the search term.
*/

import { getGifsBySearch, getTrendingGifs } from '../adapters/giphyAdapters';

const GifContainer = () => {
    return (
        <ul>

        </ul>
    )
}

export default GifContainer
