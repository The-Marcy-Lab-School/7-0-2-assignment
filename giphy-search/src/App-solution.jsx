/* 
GifSearch is a controlled form that sets a search term to find gifs
GifContainer must take the search term and then fetch gifs according from the search/ endpoint

TODO:
- Share the searchTerm state set by the GifSearch form with the GifContainer
*/

import NavBar from './components/NavBar'
import GifContainer from './components/GifContainer-solution'
import GifSearch from './components/GifSearch-solution'
import { useState } from 'react';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
      <NavBar color='black' title="Giphy Search" />
      <div className="ui container">
        <GifSearch setSearchTerm={setSearchTerm} />
        <br />
        <GifContainer searchTerm={searchTerm} />
      </div>
    </div>
  );
}

export default App;
