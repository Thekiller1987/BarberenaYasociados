import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import About from './pages/About';
import Abogado from './pages/Abogado';
import AbogadoList from './pages/AbogadoList';
import Cliente from './pages/Cliente'
import ClientList from './pages/Clientelist';
import Caso from './pages/Casos';
import CasoList from './pages/Casolist';
import Testimonio from './pages/Testimonio';
import TestimoniosList from './pages/Testimoniolist';
import SinAcceso from './pages/SinAcceso';


function App() {

  const storedRol = localStorage.getItem('userRol');

  //const [userRol, setUserRol] = useState('');
  const [userRol, setUserRol] = useState(storedRol || '');

  // Guardar el rol del usuario en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('userRol', userRol);
  }, [userRol]);

  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login setRol={setUserRol} />} />
        <Route path="/home" element={userRol ? <Home rol={userRol} />: <Navigate to="/sinacceso" />} />
        <Route path="/about" element={userRol ? <About rol={userRol}/>: <Navigate to="/sinacceso" />} />
        <Route path="/abogado" element={userRol ? <Abogado rol={userRol}/>: <Navigate to="/sinacceso" />} />
        <Route path="/abogadolist" element={userRol ? <AbogadoList rol={userRol}/>: <Navigate to="/sinacceso" />} />
        <Route path="/ClientList" element={userRol ? <ClientList rol={userRol}/>: <Navigate to="/sinacceso" />} />
        <Route path="/Cliente" element={userRol ? <Cliente rol={userRol}/>: <Navigate to="/sinacceso" />}/>
        <Route path="/Casos" element={userRol ? <Caso rol={userRol}/>: <Navigate to="/sinacceso" />} />
        <Route path="/CasoList" element={userRol ? <CasoList rol={userRol}/>: <Navigate to="/sinacceso" />} />
        <Route path="/Testimonio" element={userRol ? <Testimonio rol={userRol}/>: <Navigate to="/sinacceso" />} />
        <Route path="/TestimonioList" element={userRol ? <TestimoniosList rol={userRol}/>: <Navigate to="/sinacceso" />} />
        <Route path="/sinacceso" element={<SinAcceso />} />

      </Routes>
    </Router>
  );
}

export default App;