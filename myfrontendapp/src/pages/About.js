// About.js
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/App.css';

function About() {
  return(
    <div>
      <Header />
      <Link to="/">abogados</Link>
    </div>
  );
}

export default About;