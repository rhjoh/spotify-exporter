import React from 'react';
import { Route, Routes } from 'react-router-dom'

import Navbar from './components/Navbar';
import Home from './pages/Home';
import LandingPage from './pages/Landing';

function App() {
  return (
    <>
      <div className="App">
        <Navbar />
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spotify_landing" element={<LandingPage />} />
      </Routes>

    </>
  );
}

export default App;
