import React, { useEffect, useState } from 'react';
import nadiaImage from '../assets/nadiapagedaccueil.png';
import sabrinaImage from '../assets/sabrinapagedaccueil.jpg';
import eventImage from '../assets/event.jpeg';
import event2Image from '../assets/event2.jpeg';// Ajoute ton image d'événement ici
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
    }, 100); 
  }, []);

  return (
    <div className="home-container">
      <main className="main-content">
        <h1>{title}</h1>
        <p>avec Nadia (Marne la Vallée) et Sabrina (Paris et périphérie nord 92, 95)</p>
        <p>site en construction .............  </p>

        {/* Section Événement */}
        <div className="event-section">
          <img src={eventImage} alt="Événement Spécial" className="event-image" />
          <div className="event-details">
            <h2>📢 Événement Spécial !</h2>
            <h2> STAGE PILATE</h2>
            <p>Rejoignez notre prochain coaching exclusif avec Nadia.</p>
            <p>📅 Date : 23/02/2025 - Restez informé !</p>
            <p>📍 Lieu : Crossfit Claye  15 rue victor Baltard  77410 CLAYE-Souilly</p>
            <p>💌 Pour vous inscrire, envoyez un email avec nom, prénom, télephone à :</p>
            <a href="mailto:idiricoaching56@gmail.com" className="event-mail">idiricoaching56@gmail.com</a>
          </div>
        </div>
        <div className="event-section">
  <img src={event2Image} alt="Événement Spécial" className="event-image" />
  <div className="event-details">
    <h2>📢 Événement Spécial !</h2>
    <h2> SESSION STREETLIFTING</h2>
    <p>Rejoignez notre prochain coaching exclusif avec Nadia.</p>
    <p>📅 Dates : 01, 02, 08, 09, 15, 16, 22, 23, 29, 30 MARS 2025 - Restez informé !</p>
    <p>📍 Lieu : Crossfit Claye, 15 rue Victor Baltard, 77410 CLAYE-Souilly</p>
    
    {/* Nouveau paragraphe pour les horaires */}
    <p>⏰ Horaires : Toutes les sessions auront lieu à <strong>14h00</strong>.</p>
    
    {/* Nouveau paragraphe pour les tarifs */}
 
    <p><Link to="/Services" className="coach-link"><strong>pour en savoir plus,cliquez ici!</strong>.</Link></p>

    
    <p>💌 Pour vous inscrire ou plus d'infos, envoyez un email avec nom, prénom, date de session choisie et téléphone à :</p>
    <a href="mailto:idiricoaching56@gmail.com" className="event-mail">idiricoaching56@gmail.com</a>
  </div>
</div>

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
