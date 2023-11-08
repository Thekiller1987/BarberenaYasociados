import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Abogado from './pages/Abogado';
import AbogadoList from './pages/AbogadoList';
import Cliente from './pages/Cliente'
import ClientList from './pages/Clientelist';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/abogado" element={<Abogado />} />
        <Route path="/abogadolist" element={<AbogadoList />} />
        <Route path="/ClientList" element={<ClientList />} />
        <Route path="/Cliente" element={<Cliente />} />
      </Routes>
    </Router>
  );
}

export default App;