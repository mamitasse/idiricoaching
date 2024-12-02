//components/carousel.js
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Nécessaire pour le style

const CarouselComponent = ({ images }) => {
  return (
    <Carousel
      showArrows={true}
      autoPlay={true}
      infiniteLoop={true}
      interval={3000}
      showThumbs={false}
      showStatus={false}
       showIndicators={false}
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
