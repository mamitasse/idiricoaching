import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Nécessaire pour le style

const CarouselComponent = () => {
  // Tableau d'images et de légendes
  const images = [
    { url: "url_de_image1", legend: "Performance 1" },
    { url: "url_de_image2", legend: "Performance 2" },
    { url: "url_de_image3", legend: "Performance 3" },
    // Ajoute d'autres images ici si nécessaire
  ];

  return (
    <Carousel
      showArrows={true}
      autoPlay={true}
      infiniteLoop={true}
      interval={3000}
      showThumbs={false}
      showStatus={false}
    >
      {images.map((image, index) => (
        <div key={index}>
          <img src={image.url} alt={image.legend} />
          <p className="legend">{image.legend}</p>
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
