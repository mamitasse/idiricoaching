import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Si tu as un fichier CSS pour la navbar
import logo from '../assets/logoIdiriCoaching.png'; // Chemin vers le logo

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Idiri Coaching Logo" className="logo" />
      </div>

      <button className="menu-toggle" onClick={toggleMenu}>
        {/* Menu hamburger icon */}
        ☰
      </button>

      <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
        <li>
          <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>Accueil</Link>
        </li>
        <li>
          <Link to="/services" className="nav-link" onClick={() => setIsOpen(false)}>Services</Link>
        </li>
        <li>
          <Link to="/nadia" className="nav-link" onClick={() => setIsOpen(false)}>Nadia</Link>
        </li>
        <li>
          <Link to="/sabrina" className="nav-link" onClick={() => setIsOpen(false)}>Sabrina</Link>
        </li>
        <li>
          <Link to="/contact" className="nav-link" onClick={() => setIsOpen(false)}>Contact</Link>
        </li>
        <li>
          <Link to="/signup" className="nav-link" onClick={() => setIsOpen(false)}>Inscription</Link>
        </li>
        <li>
          <Link to="/login" className="nav-link" onClick={() => setIsOpen(false)}>Connexion</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
