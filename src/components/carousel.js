import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Nécessaire pour le style

const CarouselComponent = () => {
  return (
    <Carousel
      showArrows={true}
      autoPlay={true}
      infiniteLoop={true}
      interval={3000}
      showThumbs={false}
      showStatus={false}
    >
      <div>
        <img src="url_de_image1" alt="Performance 1" />
        <p className="legend">Performance 1</p>
      </div>
      <div>
        <img src="url_de_image2" alt="Performance 2" />
        <p className="legend">Performance 2</p>
      </div>
      <div>
        <img src="url_de_image3" alt="Performance 3" />
        <p className="legend">Performance 3</p>
      </div>
    </Carousel>
  );
};

export default CarouselComponent;
