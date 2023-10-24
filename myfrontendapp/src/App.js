import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Abogado from './pages/Abogado';
import AbogadoList from './pages/AbogadoList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/abogado" element={<Abogado />} />
        <Route path="/abogadolist" element={<AbogadoList />} />
      </Routes>
    </Router>
  );
}

export default App;