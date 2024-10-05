import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Si tu as un fichier CSS pour la navbar
import logo from '../assets/logoIdiriCoaching.png'; // Chemin vers le logo

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Idiri Coaching Logo" className="logo" />
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/" className="nav-link">Accueil</Link>
        </li>
        <li>
          <Link to="/services" className="nav-link">Services</Link>
        </li>
        <li>
          <Link to="/nadia" className="nav-link">Nadia</Link>
        </li>
        <li>
          <Link to="/sabrina" className="nav-link">Sabrina</Link>
        </li>
        <li>
          <Link to="/contact" className="nav-link">Contact</Link>
        </li>
        <li>
          <Link to="/signup" className="nav-link">Inscription</Link>
        </li>
        <li>
          <Link to="/login" className="nav-link">connexion</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
