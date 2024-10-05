import React from 'react';
import CarouselComponent from './carousel'; // Utilise le même carousel si nécessaire
import './NadiaPage.css'; // Fichier CSS pour styliser la page

const NadiaPage = () => {
  return (
    <div className="nadia-page">
      <div className="nadia-header">
        <h1>Bienvenue sur la page de Nadia</h1>
        <p>Coach personnel à Marne-la-Vallée et en Seine-et-Marne.</p>
      </div>

      <div className="nadia-carousel">
        <h2>Les performances de Nadia</h2>
        <CarouselComponent />
      </div>

      <div className="nadia-services">
        <h2>Services proposés par Nadia</h2>
        <ul>
          <li>Perte de poids</li>
          <li>Remise en forme</li>
          <li>Préparation à la compétition</li>
          <li>Coaching personnalisé</li>
        </ul>
      </div>

      <div className="nadia-signup">
        <h2>Intéressé(e) par ses services ?</h2>
        <p>Inscrivez-vous pour bénéficier d'un coaching personnalisé.</p>
        <button className="signup-button" onClick={() => window.location.href = '/signup'}>
          Inscription / Connexion
        </button>
      </div>
    </div>
  );
};

export default NadiaPage;

