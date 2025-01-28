import React from "react";
import CarouselComponent from "../components/carousel"; // Assure-toi d'importer correctement le carousel
import "./NadiaPage.css"; // Fichier CSS pour styliser la page

const NadiaPage = () => {
  const Images = [];

  for (let i = 1; i <= 22; i++) {
    Images.push({
      url: require(`../assets/imageNadia/photoNadia${i}.jpg`),
    });
  }

  return (
    <div className="nadia-page">
      <div className="nadia-header">
        <h1>Bienvenue, Coach Nadia</h1>
        <p>Coach personnel à Marne la Vallée ,77, Ile de France</p>
      </div>

      <div className="nadia-carousel">
        <h2>profitez de l'experience de Nadia</h2>
        <CarouselComponent images={Images} />
      </div>

      <div className="nadia-services">
        <h2>Services proposés par Nadia</h2>
        <ul>
          <li>yoga , bien-être</li>
          <li>Perte de poids</li>
          <li>Remise en forme</li>
          <li>Préparation à la compétition</li>
          <li>Coaching personnalisé</li>
        </ul>
      </div>

      <div className="nadia-signup">
        <h2>Intéressé(e) par ses services ?</h2>
        <p>Contactez-nous pour bénéficier d'un coaching personnalisé.</p>
        <button
          className="signup-button"
          onClick={() => (window.location.href = "/Contact")}
        >
          Contact
        </button>
      </div>
    </div>
  );
};

export default NadiaPage;
