//components/navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logoIdiriCoaching.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const links = [
    { to: '/', label: 'Accueil' },
    { to: '/services', label: 'Services' },
    { to: '/nadia', label: 'Nadia' },
    { to: '/sabrina', label: 'Sabrina' },
    { to: '/contact', label: 'Contact' },
    { to: '/signup', label: 'Inscription' },
    { to: '/login', label: 'Connexion' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Idiri Coaching Logo" className="logo" />
      </div>
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
      <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
        {links.map((link, index) => (
          <li key={index}>
            <Link to={link.to} className="nav-link" onClick={() => setIsOpen(false)}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
