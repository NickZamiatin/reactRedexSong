import React from 'react';
import logo from './logo.svg';
import './App.css';

import {selectSong} from './actions'
import SongList from './SongList';
import SongDetail from './SongDetail';

function App() {
  return (
    <div className="App">
         <SongList />
         <SongDetail />
    </div>
  );
}

export default App;
