import React from 'react';
import './Service.css';
import servicespecial from '../assets/streetliftingimage.jpg';

const Service = () => {
  return (
    <div className="service-container">
      <h1>Nos Services</h1>
      <p>
        Chez IdiriCoaching, nous vous offrons une gamme complète de services personnalisés pour répondre à vos objectifs de santé, bien-être et performance.
      </p>

      <div className="service-section">
        <h2>Evènements spécials</h2>
        <img src={servicespecial} alt="Événement Spécial" className="eventservice" />
        <h2>Yoga, Bien-être</h2>
        <p>
          Nos cours de yoga sont adaptés à tous les niveaux et vous aident à améliorer votre souplesse, renforcer votre esprit, et détendre votre corps. Le yoga est également un excellent moyen de travailler la posture et la respiration. Nous vous aidons à trouver un équilibre mental et physique à travers des techniques de relaxation et de gestion du stress. L'accent est mis sur l'amélioration de votre bien-être global.
        </p>
        {/* Ajout du texte visible pour le lien */}
        <a href="https://www.instagram.com/tv/CPn52yLqtDr/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" target="_blank" rel="noopener noreferrer">
          Découvrez notre vidéo de yoga sur Instagram
        </a>
      </div>

      <div className="service-section">
        <h2>Remise en forme</h2>
        <p>
          Que vous cherchiez à améliorer votre condition physique générale, à retrouver la forme ou à maintenir votre niveau actuel, notre programme de remise en forme vous aidera à atteindre vos objectifs à votre rythme.
        </p>
      </div>

      <div className="service-section">
        <h2>Perte de poids</h2>
        <p>
          Nous proposons des programmes personnalisés de perte de poids, combinant des conseils nutritionnels et des séances d'entraînement spécifiques pour vous aider à perdre du poids de manière saine et durable.
        </p>
      </div>

      <div className="service-section">
        <h2>Prise de masse musculaire</h2>
        <p>
          Si vous souhaitez développer votre masse musculaire, nous créons des plans d'entraînement et des programmes alimentaires adaptés à vos besoins spécifiques. Vous gagnerez en force et en volume avec des exercices ciblés.
        </p>
      </div>

      <div className="service-section">
        <h2>Entraînement de compétition et préparation</h2>
        <p>
          Pour les athlètes, nous offrons des programmes d'entraînement spécialisés pour préparer les compétitions. Que vous participiez à des compétitions de fitness, des marathons, ou d'autres événements sportifs, nous vous aiderons à vous préparer mentalement et physiquement.
        </p>
      </div>
    </div>
  );
};

export default Service;
