import React, { useEffect, useState } from 'react';
import nadiaImage from '../assets/nadiapagedaccueil.png';
import sabrinaImage from '../assets/sabrinapagedaccueil.jpg';

import { Link } from 'react-router-dom';
import './Home.css'; 

function Home() {
  const [title, setTitle] = useState('');

  useEffect(() => {
    const fullTitle = 'IdiriCoaching: coaching personnalisé';
    let index = 0;

    const interval = setInterval(() => {
      setTitle(fullTitle.slice(0, index + 1));
      index++;
      if (index === fullTitle.length) clearInterval(interval);
    }, 100); // Changez la vitesse ici (100ms par lettre)
  }, []);

  return (
    <div className="home-container">
      <main className="main-content">
        <h1>{title}</h1>
        <p>avec Nadia (Marne la Vallée) et Sabrina (Paris et périphérie nord 92, 95)</p>

        <div className="coaches">
          <div className="coach-card">
          <div className="coach-info">
                <h2>NADIA</h2>
                
               
              </div>
            <Link to="/nadia" className="coach-link">
              <img src={nadiaImage} alt="Nadia" className="coach-image" />
             
            </Link>
          </div>

          <div className="coach-card">
          <div className="coach-info">
                <h2>SABRINA</h2>
               
              </div>
            <Link to="/sabrina" className="coach-link">
            
              <img src={sabrinaImage} alt="Sabrina" className="coach-image" />
          
            </Link>
          </div>
        </div>

        <div className='connexion-inscription'>
          <div className="signin-section">
            <button className="signup-button connexion" onClick={() => window.location.href = '/login'}>
              Connexion
            </button>
          </div>
          <div className="signin-section">
            <button className="signup-button connexion" onClick={() => window.location.href = '/signup'}>
              Inscription
            </button>
          </div>
        </div>
        
     
      </main>
    </div>
  );
}

export default Home;
