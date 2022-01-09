import * as React from 'react';
import './App.css';
import Game from './game/Game';

function App() {
  return (
    <div className='container'>
      <header>Conway's Game of Life</header>
      <main id='game-container'><Game /></main>
    </div>
  )
}

export default App;
