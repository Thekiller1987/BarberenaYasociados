import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import About from './pages/About';
import Abogado from './pages/Abogado';
import AbogadoList from './pages/AbogadoList';
import Cliente from './pages/Cliente'
import ClientList from './pages/Clientelist';
import Caso from './pages/Casos';
import CasoList from './pages/Casolist';


function App() {

  const [userRol, setUserRol] = useState('');

  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login setRol={setUserRol} />} />
        <Route path="/home" element={<Home rol={userRol} />} />
        <Route path="/about" element={<About rol={userRol}/>} />
        <Route path="/abogado" element={<Abogado rol={userRol}/>} />
        <Route path="/abogadolist" element={<AbogadoList rol={userRol}/>} />
        <Route path="/ClientList" element={<ClientList rol={userRol}/>} />
        <Route path="/Cliente" element={<Cliente rol={userRol}/>} />
        <Route path="/Casos" element={<Caso rol={userRol}/>} />
        <Route path="/CasoList" element={<CasoList rol={userRol}/>} />
      </Routes>
    </Router>
  );
}

export default App;