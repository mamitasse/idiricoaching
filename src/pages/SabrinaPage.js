import React from 'react';
import CarouselComponent from '../components/carousel'; // Assure-toi d'importer correctement le carousel
import './SabrinaPage.css'; // Fichier CSS pour styliser la page

const SabrinaPage = () => {
  const Images = [];

  for (let i = 1; i <= 9; i++) {
    Images.push({
      url: require(`../assets/imageSabrina/photoSabrina${i}.jpg`)
    });
  }
  
  return (
    <div className="sabrina-page">
      <div className="sabrina-header">
        <h1>Bienvenue, Coach Sabrina</h1>
        <p>Coach personnel à Paris et dans le nord de la périphérie (92, 95).</p>
      </div>

      <div className="sabrina-carousel">
  <h2>profitez de l'experience de Sabrina</h2>
  <CarouselComponent images={Images} />
</div>


      <div className="sabrina-services">
        <h2>Services proposés par Sabrina</h2>
        <ul>
        <li>yoga , bien-être</li>
          <li>Perte de poids</li>
          <li>Remise en forme</li>
          <li>Préparation à la compétition</li>
          <li>Coaching personnalisé</li>
        </ul>
      </div>

      <div className="sabrina-signup">
      <h2>Intéressé(e) par ses services ?</h2>
      
        <button className="signup-button contact" onClick={() => window.location.href = '/Contact'}>
          
        Contactez-nous pour bénéficier d'un coaching personnalisé
        </button>
      
      </div>
    </div>
  );
};

export default SabrinaPage;
