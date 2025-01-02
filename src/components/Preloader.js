import React, { useEffect, useState } from 'react';
import './Preloader.css';
import logo from '../assets/logoIdiriCoaching.png'; // Assurez-vous d'utiliser le bon chemin pour le logo

const Preloader = ({ duration = 1200 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer); // Nettoyage du timer
  }, [duration]);

  if (!visible) return null; // Cache le Preloader une fois terminé

  return (
    <div className="preloader">
      <img src={logo} alt="Idiri Coaching" className="preloader-logo" />
    </div>
  );
};

export default Preloader;
